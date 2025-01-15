# AngularI18n

This project uses Angular i18n with `loadTranslations` to customize the messages before bootstrap. It also uses the third party builder `ngx-merge-json-translations` to keep existing messages in sync with the placeholders in code.

This is a simplified example that extracts directly to JSON, since that is what `loadTranslations` accepts. To support translation notes, we would have to extract to XLIFF for translations and then convert to JSON as a build step.

## Install

```
pnpm install
```

## Run

```
pnpm start
```

## Update message files

```
pnpm extract-i18n
```
