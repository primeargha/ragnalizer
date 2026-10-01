# Enable the vector extension

Study notes for turning on pgvector in the Supabase database used by this repo. Prisma 7 is `7.10.0`. The auth tables are unchanged.

## What this change does

Supabase already has the pgvector software on the server. A database still has to turn that extension on before it can store a `vector` column.

This project does that with a new Prisma migration:

`prisma/migrations/20261001025000_enable_vector/migration.sql`

```sql
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;
```

Supabase keeps extensions in a schema named `extensions`, not in `public`. The `vector` type then lives there. Version checked after the migration: **0.8.2**.

`prisma/schema.prisma` stays like this:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

There is no vector column on `User`, `Session`, `Account`, or `Verification`. The database can store vectors. The app models do not use one yet.

## Why the schema does not list the extension

An earlier draft of the schema used the old preview API:

```prisma
generator client {
  provider        = "prisma-client"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  extensions = [vector]
}
```

Prisma deprecated `postgresqlExtensions` in 6.16.0. Prisma 7 does not document that block. The current way is a normal SQL migration with `CREATE EXTENSION`.

## Which migration file to edit

| File | What to do |
| --- | --- |
| `prisma/migrations/20260930135311_init/migration.sql` | Leave it. It already ran and created the auth tables. Editing it makes Prisma reject the history. |
| `prisma/migrations/20261001025000_enable_vector/migration.sql` | This is the new file. It had not run yet, so it was the right place for `CREATE EXTENSION`. |

After a migration succeeds, do not edit its SQL again. The next database change gets another new folder.

The usual Prisma order is:

1. `npx prisma migrate dev --name enable_vector --create-only`
2. Put the SQL in the empty file Prisma creates.
3. `npm run migrate`

`npm run migrate` runs `prisma migrate dev`. Use the direct Supabase connection on port **5432**. The transaction pooler on port **6543** often fails during migrations.

You can also turn vector on in the Supabase dashboard: **Database**, then **Extensions**, then search **vector**. The migration does the same thing. `IF NOT EXISTS` keeps it safe if the dashboard switch is already on.

## Error we hit

The first version of the new migration was only:

```sql
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;
```

Vector was already enabled in the Supabase dashboard. `npm run migrate` still failed:

```text
Error: P3006
Migration `20261001025000_enable_vector` failed to apply cleanly to the shadow database.
Error code: P3018
Database error code: 3F000
ERROR: schema "extensions" does not exist
```

`migrate dev` does two passes:

1. It replays migrations on a blank temporary database (the shadow database).
2. If that replay works, it applies the new migration to the real Supabase database.

The real Supabase project has an `extensions` schema. The blank shadow database does not. The SQL asked for that schema before creating it, so the shadow pass failed and Prisma never updated the real database.

This failure was only on the shadow database. The real database was not left with a broken migration record, so there was nothing to repair with `migrate resolve`.

## The fix

The migration now creates the schema, then the extension:

```sql
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;
```

On the real Supabase project both objects already existed, so the statements did nothing harmful. On the shadow database they created the missing schema, then turned vector on. `npm run migrate` then printed:

```text
Applying migration `20261001025000_enable_vector`
Your database is now in sync with your schema.
```

If a later `npm run migrate` says it cannot create a shadow database, run `npx prisma migrate deploy` instead. That applies pending SQL on the real database only.

## How to check

### Supabase dashboard

Open the project, go to **Database**, then **Extensions**, and search for `vector`. It should be enabled.

### SQL editor

Extension and schema:

```sql
SELECT e.extname, e.extversion, n.nspname AS schema
FROM pg_extension e
JOIN pg_namespace n ON n.oid = e.extnamespace
WHERE e.extname = 'vector';
```

Expected after this migration: one row, `extname` is `vector`, `schema` is `extensions`.

The type itself:

```sql
SELECT n.nspname AS schema, t.typname
FROM pg_type t
JOIN pg_namespace n ON n.oid = t.typnamespace
WHERE t.typname = 'vector';
```

Expected: one row, `schema` is `extensions`, `typname` is `vector`.

Migrations Prisma recorded:

```sql
SELECT migration_name, finished_at
FROM _prisma_migrations
ORDER BY started_at;
```

Expected: both names have a `finished_at` time.

- `20260930135311_init`
- `20261001025000_enable_vector`

A row with `finished_at` empty would mean that migration did not finish.

## What is still not done

The extension is on. No table stores embeddings yet. A later migration can add a column such as `vector(1536)`. Prisma 7 has no native vector field, so that column is written in SQL and shown in the schema as `Unsupported("vector")` when a model needs it.
