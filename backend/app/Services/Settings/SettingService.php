<?php

namespace App\Services\Settings;

use App\Models\Setting;
use Carbon\CarbonInterface;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @phpstan-type SettingFieldDefinition array{
 *     type?: string,
 *     default?: mixed,
 *     rules?: array<int, mixed>,
 *     nested_rules?: array<string, array<int, mixed>>,
 *     public?: bool,
 *     description?: mixed,
 *     options?: mixed,
 *     example?: mixed
 * }
 * @phpstan-type SettingGroupDefinition array{
 *     label?: mixed,
 *     description?: mixed,
 *     public?: bool,
 *     fields?: array<string, SettingFieldDefinition>
 * }
 */
class SettingService
{
    /**
     * @return array<string, mixed>
     */
    public function catalog(): array
    {
        $catalog = [];

        foreach ($this->definitions() as $group => $definition) {
            $fields = $this->fieldDefinitions($group);

            $catalog[$group] = [
                'label' => $definition['label'] ?? null,
                'description' => $definition['description'] ?? null,
                'is_public' => (bool) ($definition['public'] ?? false),
                'field_count' => count($fields),
                'updated_at' => $this->groupLastUpdatedAt($group)?->toIso8601String(),
                'values' => $this->getGroup($group),
            ];
        }

        return $catalog;
    }

    /**
     * @return array<string, mixed>
     */
    public function schema(): array
    {
        $groups = [];

        foreach (array_keys($this->definitions()) as $group) {
            $groups[$group] = $this->groupDetails($group);
        }

        return [
            'version' => $this->schemaVersion(),
            'groups' => $groups,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function groupDetails(string $group): array
    {
        $definition = $this->groupDefinition($group);
        $values = $this->getGroup($group);
        $fields = [];

        foreach ($this->fieldDefinitions($group) as $key => $fieldDefinition) {
            $fields[$key] = [
                'type' => $fieldDefinition['type'] ?? 'string',
                'public' => (bool) ($fieldDefinition['public'] ?? false),
                'default' => $fieldDefinition['default'] ?? null,
                'value' => $values[$key] ?? null,
                'description' => $fieldDefinition['description'] ?? null,
                'options' => $fieldDefinition['options'] ?? null,
                'example' => $fieldDefinition['example'] ?? null,
            ];
        }

        return [
            'group' => $group,
            'label' => $definition['label'] ?? null,
            'description' => $definition['description'] ?? null,
            'is_public' => (bool) ($definition['public'] ?? false),
            'updated_at' => $this->groupLastUpdatedAt($group)?->toIso8601String(),
            'fields' => $fields,
            'values' => $values,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function getGroup(string $group): array
    {
        $defaults = [];

        foreach ($this->fieldDefinitions($group) as $key => $fieldDefinition) {
            $defaults[$key] = $fieldDefinition['default'] ?? null;
        }

        return $this->mergeSettingsValues($defaults, $this->storedGroupValues($group));
    }

    /**
     * @param  array<string, mixed>  $values
     * @return array<string, mixed>
     */
    public function setGroup(string $group, array $values): array
    {
        $persistable = $this->validatedPersistableValues($group, $values);
        $this->persistGroupValues($group, $persistable);

        return $this->getGroup($group);
    }

    /**
     * @return array<string, mixed>
     */
    public function resetGroup(string $group): array
    {
        $defaults = [];

        foreach ($this->fieldDefinitions($group) as $key => $fieldDefinition) {
            $defaults[$key] = $fieldDefinition['default'] ?? null;
        }

        Setting::query()->where('group', $group)->delete();
        $this->persistGroupValues($group, $defaults);

        return $this->getGroup($group);
    }

    /**
     * @param  array<string, array<string, mixed>>  $groups
     * @return array<string, mixed>
     */
    public function importGroups(array $groups): array
    {
        $imported = [];

        foreach ($groups as $group => $values) {
            $imported[$group] = $this->setGroup($group, $values);
        }

        return $imported;
    }

    /**
     * @param  array<int, string>|null  $groups
     * @return array<string, mixed>
     */
    public function exportGroups(?array $groups = null): array
    {
        $selectedGroups = $groups === null || $groups === []
            ? array_keys($this->definitions())
            : $groups;

        $payload = [];

        foreach ($selectedGroups as $group) {
            $payload[$group] = $this->getGroup($group);
        }

        return [
            'schema_version' => $this->schemaVersion(),
            'exported_at' => now()->toIso8601String(),
            'groups' => $payload,
        ];
    }

    public function getValue(string $group, string $key, mixed $default = null): mixed
    {
        return $this->getGroup($group)[$key] ?? $default;
    }

    public function featureEnabled(string $key, bool $default = false): bool
    {
        return (bool) $this->getValue('features', $key, $default);
    }

    public function orderGracePeriodMinutes(): int
    {
        $fallback = config('app.order_grace_period_minutes', 2);
        $fallbackMinutes = is_numeric($fallback) ? (int) $fallback : 2;
        $value = $this->getValue('ordering', 'grace_period_minutes', $fallbackMinutes);

        return is_numeric($value) ? (int) $value : $fallbackMinutes;
    }

    public function currencyCode(): string
    {
        $fallback = config('app.currency_code', 'EGP');
        $fallbackCode = is_string($fallback) && $fallback !== '' ? $fallback : 'EGP';
        $value = $this->getValue('currency', 'code', $fallbackCode);

        return is_string($value) && $value !== '' ? $value : $fallbackCode;
    }

    public function uploadDisk(): string
    {
        $value = $this->getValue('uploads', 'public_disk', 'uploads');

        return is_string($value) && $value !== '' ? $value : 'uploads';
    }

    public function uploadPathPrefix(): string
    {
        $value = $this->getValue('uploads', 'path_prefix', 'media');
        $prefix = is_string($value) && $value !== '' ? $value : 'media';

        return trim($prefix, '/');
    }

    public function uploadImageMaxKilobytes(): int
    {
        $value = $this->getValue('uploads', 'image_max_kb', 5120);

        return is_numeric($value) ? (int) $value : 5120;
    }

    public function uploadVideoMaxKilobytes(): int
    {
        $value = $this->getValue('uploads', 'video_max_kb', 51200);

        return is_numeric($value) ? (int) $value : 51200;
    }

    public function uploadFontMaxKilobytes(): int
    {
        $value = $this->getValue('uploads', 'font_max_kb', 10240);

        return is_numeric($value) ? (int) $value : 10240;
    }

    /**
     * @return array<int, string>
     */
    public function allowedUploadImageMimes(): array
    {
        return $this->stringListValue('uploads', 'allowed_image_mimes', ['image/jpeg', 'image/png', 'image/webp']);
    }

    /**
     * @return array<int, string>
     */
    public function allowedUploadVideoMimes(): array
    {
        return $this->stringListValue('uploads', 'allowed_video_mimes', ['video/mp4', 'video/webm']);
    }

    /**
     * @return array<int, string>
     */
    public function allowedUploadFontMimes(): array
    {
        return $this->stringListValue('uploads', 'allowed_font_mimes', [
            'font/woff',
            'font/woff2',
            'font/ttf',
            'application/font-sfnt',
            'application/x-font-ttf',
            'application/x-font-otf',
            'font/otf',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function publicSettings(): array
    {
        $settings = ['schema_version' => $this->schemaVersion()];

        foreach ($this->definitions() as $group => $definition) {
            $groupValues = $this->getGroup($group);
            $publicValues = [];

            foreach ($this->fieldDefinitions($group) as $field => $fieldDefinition) {
                if ((bool) ($fieldDefinition['public'] ?? false)) {
                    $publicValues[$field] = $groupValues[$field] ?? null;
                }
            }

            if ($publicValues !== []) {
                $settings[$group] = $publicValues;
            }
        }

        return $settings;
    }

    public function hasGroup(string $group): bool
    {
        return array_key_exists($group, $this->definitions());
    }

    public function schemaVersion(): int
    {
        $value = config('admin_settings.version', 1);

        return is_numeric($value) ? (int) $value : 1;
    }

    /**
     * @return array<string, SettingGroupDefinition>
     */
    public function definitions(): array
    {
        $groups = config('admin_settings.groups', []);

        if (! is_array($groups)) {
            return [];
        }

        $definitions = [];

        foreach ($groups as $key => $groupDefinition) {
            if (is_string($key) && is_array($groupDefinition)) {
                /** @var SettingGroupDefinition $typedGroupDefinition */
                $typedGroupDefinition = $groupDefinition;
                $definitions[$key] = $typedGroupDefinition;
            }
        }

        return $definitions;
    }

    /**
     * @return SettingGroupDefinition
     */
    public function groupDefinition(string $group): array
    {
        $definition = $this->definitions()[$group] ?? null;

        if ($definition === null) {
            throw new NotFoundHttpException("Unknown settings group [{$group}].");
        }

        return $definition;
    }

    /**
     * @param  array<string, mixed>  $values
     * @return array<string, mixed>
     */
    protected function validatedPersistableValues(string $group, array $values): array
    {
        if ($values === []) {
            throw ValidationException::withMessages([
                'values' => ['At least one setting key must be provided.'],
            ]);
        }

        $fieldDefinitions = $this->fieldDefinitions($group);
        $current = $this->getGroup($group);
        $merged = $this->mergeSettingsValues($current, $values);

        $validator = Validator::make($merged, $this->validationRules($fieldDefinitions));

        $validator->after(function ($validator) use ($values, $fieldDefinitions, $group): void {
            $unknown = array_diff(array_keys($values), array_keys($fieldDefinitions));

            foreach ($unknown as $key) {
                $validator->errors()->add("values.$key", "Unknown setting key [{$key}] for group [{$group}].");
            }
        });

        $validator->validate();

        $persistable = [];

        foreach (array_keys($values) as $key) {
            if (array_key_exists($key, $fieldDefinitions)) {
                $persistable[$key] = $merged[$key] ?? null;
            }
        }

        return $persistable;
    }

    /**
     * @param  array<string, SettingFieldDefinition>  $fieldDefinitions
     * @return array<string, array<int, mixed>>
     */
    protected function validationRules(array $fieldDefinitions): array
    {
        $rules = [];

        foreach ($fieldDefinitions as $key => $definition) {
            $fieldRules = $definition['rules'] ?? ['nullable'];
            $rules[$key] = is_array($fieldRules) ? $fieldRules : ['nullable'];

            $nestedRules = $definition['nested_rules'] ?? [];
            if (! is_array($nestedRules)) {
                continue;
            }

            foreach ($nestedRules as $nestedKey => $nestedDefinitionRules) {
                $rules["{$key}.{$nestedKey}"] = is_array($nestedDefinitionRules) ? $nestedDefinitionRules : ['nullable'];
            }
        }

        return $rules;
    }

    /**
     * @param  array<string, mixed>  $values
     */
    protected function persistGroupValues(string $group, array $values): void
    {
        foreach ($values as $key => $value) {
            Setting::query()->updateOrCreate(
                ['group' => $group, 'key' => $key],
                [
                    'value' => $value,
                    'value_type' => get_debug_type($value),
                ]
            );
        }
    }

    /**
     * @return array<string, mixed>
     */
    protected function storedGroupValues(string $group): array
    {
        $values = [];

        foreach (Setting::query()->where('group', $group)->get() as $setting) {
            $values[$setting->key] = $setting->value;
        }

        return $values;
    }

    /**
     * @param  array<string, mixed>  $base
     * @param  array<string, mixed>  $override
     * @return array<string, mixed>
     */
    protected function mergeSettingsValues(array $base, array $override): array
    {
        foreach ($override as $key => $value) {
            $base[$key] = $this->mergeSettingValue($base[$key] ?? null, $value);
        }

        return $base;
    }

    protected function mergeSettingValue(mixed $base, mixed $override): mixed
    {
        if (! is_array($base) || ! is_array($override)) {
            return $override;
        }

        if (array_is_list($base) || array_is_list($override)) {
            return $override;
        }

        $merged = $base;

        foreach ($override as $key => $value) {
            $merged[$key] = $this->mergeSettingValue($merged[$key] ?? null, $value);
        }

        return $merged;
    }

    protected function groupLastUpdatedAt(string $group): ?CarbonInterface
    {
        $setting = Setting::query()
            ->where('group', $group)
            ->latest('updated_at')
            ->first();

        return $setting?->updated_at;
    }

    /**
     * @return array<string, SettingFieldDefinition>
     */
    protected function fieldDefinitions(string $group): array
    {
        $fields = $this->groupDefinition($group)['fields'] ?? [];

        return is_array($fields) ? $fields : [];
    }

    /**
     * @param  array<int, string>  $default
     * @return array<int, string>
     */
    protected function stringListValue(string $group, string $key, array $default): array
    {
        $value = $this->getValue($group, $key, $default);

        if (! is_array($value)) {
            return $default;
        }

        $strings = [];

        foreach ($value as $item) {
            if (is_string($item) && $item !== '') {
                $strings[] = $item;
            }
        }

        return $strings === [] ? $default : $strings;
    }
}
