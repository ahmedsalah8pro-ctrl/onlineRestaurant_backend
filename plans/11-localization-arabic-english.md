# Localization Arabic English

## Goal
- Make the backend language-aware from day one.

## Supported Languages
- Arabic `ar`.
- English `en`.

## Locale Resolution
- Use `Accept-Language` header.
- Default locale can be `ar`.
- Fallback locale can be `en`.

## Content Translation Strategy
- Store product/category/page names in translation-friendly columns.
- JSON/text columns are acceptable.
- API resources return current locale value and optionally full translations when needed by admin endpoints.

## Localized Entities
- Branch name.
- Delivery zone name.
- Category name.
- Tag name.
- Product name.
- Product description.
- Size name.
- Add-on group name.
- Add-on option name.
- Dynamic page title/content.

## API Message Localization
- Validation messages localizable.
- Common success messages localizable.
- Error messages localizable.

## Admin Localization Rules
- Admin write endpoints can accept both `ar` and `en` values.
- Missing secondary translation may be allowed in v1 if primary exists.

## Public Read Rules
- Public APIs return localized content according to request header.
- Optionally include fallback if requested locale missing.

## Example Translation Payload
```json
{
  "name": {
    "ar": "بيتزا مارجريتا",
    "en": "Margherita Pizza"
  }
}
```

## Example Response Strategy
```json
{
  "id": 1,
  "name": "بيتزا مارجريتا",
  "translations": {
    "ar": "بيتزا مارجريتا",
    "en": "Margherita Pizza"
  }
}
```

## Currency Localization Notes
- Currency code and symbol come from settings.
- Formatting may be left to clients, but backend should return raw amounts and currency metadata.

## Validation Notes
- Require Arabic translation for core catalog entities.
- English translation optional but strongly recommended.
- Slugs remain non-translated stable identifiers.

## Testing Scenarios
1. `Accept-Language: ar` returns Arabic name.
2. `Accept-Language: en` returns English name.
3. Missing locale falls back safely.
4. Admin can write both translations.

## Future Extensions
- More languages.
- Localized notification templates.
- Localized SEO metadata for future web client.
