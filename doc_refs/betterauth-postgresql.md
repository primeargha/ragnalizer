# PostgreSQL (/docs/adapters/postgresql)

Integrate Better Auth with PostgreSQL.



PostgreSQL is a powerful, open-source relational database management system known for its advanced features, extensibility, and support for complex queries and large datasets.
Read more about [PostgreSQL](https://www.postgresql.org/).

## Example Usage [#example-usage]

Make sure you have PostgreSQL installed and configured.
Then, you can connect it straight into Better Auth.

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: "postgres://user:password@localhost:5432/database",
  }),
});
```

<Callout>
  For more information, read Kysely's documentation to the
  [PostgresDialect](https://kysely-org.github.io/kysely-apidoc/classes/PostgresDialect.html).
</Callout>

## Schema generation & migration [#schema-generation--migration]

The [Better Auth CLI](/docs/concepts/cli) allows you to generate or migrate
your database schema based on your Better Auth configuration and plugins.

<table>
  <thead>
    <tr className="border-b">
      <th>
        <p className="font-bold text-[16px] mb-1">
          PostgreSQL Schema Generation
        </p>
      </th>

      <th>
        <p className="font-bold text-[16px] mb-1">
          PostgreSQL Schema Migration
        </p>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr className="h-10">
      <td>
        ✅ Supported
      </td>

      <td>
        ✅ Supported
      </td>
    </tr>
  </tbody>
</table>

<Tabs items="[&#x22;migrate&#x22;, &#x22;generate&#x22;]">
  <Tab value="migrate">
    <CodeBlockTabs defaultValue="npm" groupId="persist-install">
      <CodeBlockTabsList>
        <CodeBlockTabsTrigger value="npm">
          npm
        </CodeBlockTabsTrigger>

        <CodeBlockTabsTrigger value="pnpm">
          pnpm
        </CodeBlockTabsTrigger>

        <CodeBlockTabsTrigger value="yarn">
          yarn
        </CodeBlockTabsTrigger>

        <CodeBlockTabsTrigger value="bun">
          bun
        </CodeBlockTabsTrigger>
      </CodeBlockTabsList>

      <CodeBlockTab value="npm">
        ```bash
        npx auth@latest migrate
        ```
      </CodeBlockTab>

      <CodeBlockTab value="pnpm">
        ```bash
        pnpm dlx auth@latest migrate
        ```
      </CodeBlockTab>

      <CodeBlockTab value="yarn">
        ```bash
        yarn dlx auth@latest migrate
        ```
      </CodeBlockTab>

      <CodeBlockTab value="bun">
        ```bash
        bun x auth@latest migrate
        ```
      </CodeBlockTab>
    </CodeBlockTabs>
  </Tab>

  <Tab value="generate">
    <CodeBlockTabs defaultValue="npm" groupId="persist-install">
      <CodeBlockTabsList>
        <CodeBlockTabsTrigger value="npm">
          npm
        </CodeBlockTabsTrigger>

        <CodeBlockTabsTrigger value="pnpm">
          pnpm
        </CodeBlockTabsTrigger>

        <CodeBlockTabsTrigger value="yarn">
          yarn
        </CodeBlockTabsTrigger>

        <CodeBlockTabsTrigger value="bun">
          bun
        </CodeBlockTabsTrigger>
      </CodeBlockTabsList>

      <CodeBlockTab value="npm">
        ```bash
        npx auth@latest generate
        ```
      </CodeBlockTab>

      <CodeBlockTab value="pnpm">
        ```bash
        pnpm dlx auth@latest generate
        ```
      </CodeBlockTab>

      <CodeBlockTab value="yarn">
        ```bash
        yarn dlx auth@latest generate
        ```
      </CodeBlockTab>

      <CodeBlockTab value="bun">
        ```bash
        bun x auth@latest generate
        ```
      </CodeBlockTab>
    </CodeBlockTabs>
  </Tab>
</Tabs>

## Joins [#joins]

Database joins are useful when Better-Auth needs to fetch related data from multiple tables in a single query.
Endpoints like `/get-session`, `/get-full-organization` and many others benefit greatly from this feature,
seeing upwards of 2x to 3x performance improvements depending on database latency.

The Kysely PostgreSQL dialect supports joins out of the box since version `1.4.0`.
To enable this feature, set `advanced.database.joins` to `true` in your auth configuration.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    database: {
      joins: true,
    },
  },
});
```

## Use a non-default schema [#use-a-non-default-schema]

PostgreSQL uses the `public` schema by default. You can select another schema explicitly with `database.schemaName` or configure PostgreSQL's `search_path`.

When both are configured, Better Auth uses `database.schemaName`. Other unqualified queries continue to use the connection's `search_path`.

### Set `database.schemaName` [#set-databaseschemaname]

<Tabs items="[&#x22;Kysely dialect&#x22;, &#x22;Kysely instance&#x22;]">
  <Tab value="Kysely dialect">
    ```ts title="auth.ts"
    import { betterAuth } from "better-auth";
    import { PostgresDialect } from "kysely";
    import { Pool } from "pg";

    export const auth = betterAuth({
      database: {
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: "postgres://user:password@localhost:5432/database",
          }),
        }),
        type: "postgres",
        schemaName: "auth", // [!code highlight]
      },
    });
    ```
  </Tab>

  <Tab value="Kysely instance">
    ```ts title="auth.ts"
    import { betterAuth } from "better-auth";
    import { db } from "./database";

    export const auth = betterAuth({
      database: {
        db,
        type: "postgres",
        schemaName: "auth", // [!code highlight]
      },
    });
    ```
  </Tab>
</Tabs>

The schema applies to runtime queries and CLI migrations. `npx auth@latest migrate` creates it when needed and ignores same-named tables in other schemas.

`npx auth@latest generate` starts the generated migration by creating the schema:

```sql
create schema if not exists "auth";
```

All subsequent statements use schema-qualified table names, such as `"auth"."user"`.

The PostgreSQL role used by Better Auth must be able to create the schema and its tables. Otherwise, create the schema and grant access to that role before running `npx auth@latest migrate`.

### Set `search_path` [#set-search_path]

Use PostgreSQL's `search_path` instead when passing a `pg.Pool` directly, or when every unqualified query on the connection should use the same schema.

When using `search_path`, the Better Auth CLI expects the schema to already exist. Create it and grant access to the connection role before running `npx auth@latest migrate`.

<Tabs items="[&#x22;Pool options&#x22;, &#x22;Connection string&#x22;]">
  <Tab value="Pool options">
    ```ts title="auth.ts"
    import { betterAuth } from "better-auth";
    import { Pool } from "pg";

    export const auth = betterAuth({
      database: new Pool({
        connectionString: "postgres://user:password@localhost:5432/database",
        options: "-c search_path=auth",
      }),
    });
    ```
  </Tab>

  <Tab value="Connection string">
    ```ts title="auth.ts"
    import { betterAuth } from "better-auth";
    import { Pool } from "pg";

    export const auth = betterAuth({
      database: new Pool({
        connectionString: "postgres://user:password@localhost:5432/database?options=-c%20search_path%3Dauth",
      }),
    });
    ```
  </Tab>
</Tabs>

To make the schema the default when a PostgreSQL role connects to a specific database:

```sql
ALTER ROLE your_role IN DATABASE your_database
SET search_path TO auth;
```

Reconnect after changing this default. Run `SHOW search_path` to verify the active value.

## Additional Information [#additional-information]

PostgreSQL is supported under the hood via the [Kysely](https://kysely.dev/) adapter, any database supported by Kysely would also be supported. (<Link href="/docs/adapters/other-relational-databases">Read more here</Link>)

If you're looking for performance improvements or tips, take a look at our guide to <Link href="/docs/guides/optimizing-for-performance">performance optimizations</Link>.

