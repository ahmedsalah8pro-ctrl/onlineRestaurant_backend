<?php

namespace App\Services\Settings;

use App\Models\Setting;
use Illuminate\Support\Collection;

class SettingService
{
    public function getGroup(string $group): Collection
    {
        return Setting::query()
            ->where('group', $group)
            ->get()
            ->mapWithKeys(fn (Setting $setting) => [$setting->key => $setting->value]);
    }

    public function setGroup(string $group, array $values): void
    {
        foreach ($values as $key => $value) {
            Setting::updateOrCreate(
                ['group' => $group, 'key' => $key],
                [
                    'value' => $value,
                    'value_type' => get_debug_type($value),
                ]
            );
        }
    }

    public function getValue(string $group, string $key, mixed $default = null): mixed
    {
        $setting = Setting::query()
            ->where('group', $group)
            ->where('key', $key)
            ->first();

        return $setting ? $setting->value : $default;
    }

    public function featureEnabled(string $key, bool $default = false): bool
    {
        return (bool) $this->getValue('features', $key, $default);
    }

    public function publicSettings(): array
    {
        return [
            'general' => $this->getGroup('general'),
            'currency' => $this->getGroup('currency'),
            'features' => $this->getGroup('features'),
        ];
    }
}
