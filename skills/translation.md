# Translation Skill

Tarotpedia's UI translations live in `lang/*.tsv` and are compiled into `js/lang.js` by `bin/compile_lang.py`. **Never edit `js/lang.js` directly** — it is auto-generated and will be overwritten on the next deploy.

## File structure

```
lang/
  languages.tsv        # one row per supported language
  en.tsv               # English translations
  simple.tsv           # Simple English translations
  es.tsv               # Spanish
  de.tsv               # German
  fr.tsv               # French
  ja.tsv               # Japanese
  pt.tsv               # Portuguese
bin/
  compile_lang.py      # reads lang/*.tsv → writes js/lang.js
```

### `lang/languages.tsv` columns

| column   | description                                      |
|----------|--------------------------------------------------|
| `label`  | Short key used everywhere in code (`en`, `fr`, …)|
| `name`   | Display name shown in the language selector      |
| `domain` | Wikipedia subdomain (e.g. `fr.wikipedia.org`)    |
| `default`| Put `YES` in this column for the default language|

### `lang/<label>.tsv` columns

| column  | description                          |
|---------|--------------------------------------|
| `key`   | Camel-case JS property name          |
| `value` | Translated string for that language  |

Use `__` to express nesting. `defaultPositions` entries use two levels:

```
defaultPositions__one          → scalar string (one-card spread)
defaultPositions__three__0     → first position of three-card spread
defaultPositions__celtic__0    → first position of Celtic Cross (0–9)
```

## Compiling

```bash
python3 bin/compile_lang.py
```

`./deploy.sh` runs this automatically before stamping version hashes.

## Adding a new translation key

1. Add a row to **every** `lang/*.tsv` file with the same `key` and the translated `value`.
2. Run `python3 bin/compile_lang.py` to regenerate `js/lang.js`.
3. Reference the key in `js/app.js` using the `t('keyName')` helper.

## Updating an existing translation

Edit the relevant `value` cell in the appropriate `lang/<label>.tsv`, then run the compiler.

## Adding a new language

1. Add a row to `lang/languages.tsv` (leave the `default` column empty).
2. Copy `lang/en.tsv` to `lang/<newlabel>.tsv` and translate every `value`.
3. Run `python3 bin/compile_lang.py`.
4. The new language will automatically appear in the interface and article language selectors (they are populated from `LANGUAGES` in `js/lang.js`).

## TSV format notes

- Delimiter is tab (`\t`). Values must not contain literal tab characters.
- Newlines within values are not supported.
- Files are UTF-8; non-ASCII characters (accented letters, CJK, etc.) are fine.
- The `csv.DictReader` in the compiler uses `"` as the quote character by default, so values containing double quotes should be avoided or the column quoting rules of RFC 4180 apply.
