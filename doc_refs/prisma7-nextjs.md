# Prisma 7 (/docs/orm/v7)

> For the complete Prisma documentation index, see [llms.txt](https://www.prisma.io/docs/llms.txt). A markdown version of any docs page is available by appending `.md` to its URL.

Prisma ORM is a next-generation Node.js and TypeScript ORM that provides type-safe database access, migrations, and a visual data editor.

Location: ORM > Prisma 7

Prisma ORM is [open-source](https://github.com/prisma/orm) and consists of:

* [**Prisma Client**](https://www.prisma.io/docs/orm/v7/prisma-client): Auto-generated, type-safe **ORM interface**
* [**Prisma Migrate**](https://www.prisma.io/docs/orm/v7/prisma-migrate): Database migration system
* [**Prisma Studio**](https://www.prisma.io/studio): GUI to view and edit your data

Prisma Client works with any Node.js or TypeScript backend, whether you're deploying to traditional servers, serverless functions, or microservices.

> [!NOTE]
> Try Prisma 8
> 
> Prisma 8 is the current release of Prisma ORM. Start with the [Prisma 8 getting started guide](https://www.prisma.io/docs/getting-started) and share feedback in [Discord](https://pris.ly/discord?utm_source=docs\&utm_medium=inline_text). This section documents Prisma 7, which remains fully supported.

## Get started [#get-started]

- [Quickstart](https://www.prisma.io/docs/v7/prisma-orm/quickstart/prisma-postgres): Prisma ORM 7 with Prisma Postgres in about 5 minutes.

- [Add to an existing project](https://www.prisma.io/docs/v7/prisma-orm/add-to-existing-project/postgresql): Introspect your database and start querying with Prisma ORM 7.

- [Prisma 8 docs](https://www.prisma.io/docs/orm): The docs for the current major version.

If you're working with a coding agent, copy the prompt below, or start from the [getting started page](https://www.prisma.io/docs) for the full stack.

```text
Add Prisma ORM 7 to this project with my existing database.

If I have not given you a database connection string and none exists in the project, stop and ask.

1. Run `npx prisma@prev init` (Prisma 7). For an existing database, set DATABASE_URL in `.env` and introspect it with `npx prisma@prev db pull`; for a new schema, define models in `prisma/schema.prisma` and run `npx prisma@prev migrate dev --name init`. If migrate dev asks to reset the database, stop and ask me first.
2. Install the driver adapter for the database (Prisma 7 requires one), e.g. `npm install @prisma/adapter-pg` for PostgreSQL, and pass it to `new PrismaClient({ adapter })`. Generate the client with `npx prisma@prev generate` and write one query in an existing code path.
3. Run the query (e.g. with `npx tsx`) and show me the output, the schema, and the query you added.

Current docs: https://www.prisma.io/docs/orm/v7.md and https://www.prisma.io/docs/llms.txt.
```

## Why Prisma ORM [#why-prisma-orm]

Traditional database tools force a tradeoff between **productivity** and **control**. Raw SQL gives full control but is error-prone and lacks type safety. Traditional ORMs improve productivity but abstract too much, leading to the [object-relational impedance mismatch](https://en.wikipedia.org/wiki/Object-relational_impedance_mismatch) and performance pitfalls like the n+1 problem.

Prisma takes a different approach:

* **Type-safe queries** validated at compile time with full autocompletion
* **Thinking in objects** without the complexity of mapping relational data
* **Plain JavaScript objects** returned from queries, not complex model instances
* **Single source of truth** in the Prisma schema for database and application models
* **Healthy constraints** that prevent common pitfalls and anti-patterns

## When to use Prisma [#when-to-use-prisma]

**Prisma is a good fit if you:**

* Build server-side applications (REST, GraphQL, gRPC, serverless)
* Want type safety and editor autocompletion for queries
* Work in a team and want a clear, declarative schema
* Need migrations, querying, and data modeling in one toolkit

**Consider alternatives if you:**

* Need full control over every SQL query (use raw SQL drivers)
* Want a no-code backend (use a BaaS like Supabase or Firebase)
* Need an auto-generated CRUD GraphQL API (use Hasura or PostGraphile)

## How it works [#how-it-works]

### 1. Define your schema [#1-define-your-schema]

The [Prisma schema](https://www.prisma.io/docs/orm/v7/prisma-schema/overview) defines your data models and database connection:

```prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client"
  output   = "./generated"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

### 2. Configure your connection [#2-configure-your-connection]

Create a `prisma.config.ts` file in your project root:

```ts title="prisma.config.ts"
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

### 3. Run migrations [#3-run-migrations]

Use [Prisma Migrate](https://www.prisma.io/docs/orm/v7/prisma-migrate) to create and apply migrations:

  

#### bun

```bash
bunx prisma@prev migrate dev
```

#### pnpm

```bash
pnpm dlx prisma@prev migrate dev
```

#### yarn

```bash
yarn dlx prisma@prev migrate dev
```

#### npm

```bash
npx prisma@prev migrate dev
```

Or [introspect](https://www.prisma.io/docs/orm/v7/prisma-schema/introspection) an existing database:

  

#### bun

```bash
bunx prisma@prev db pull
```

#### pnpm

```bash
pnpm dlx prisma@prev db pull
```

#### yarn

```bash
yarn dlx prisma@prev db pull
```

#### npm

```bash
npx prisma@prev db pull
```

### 4. Query with Prisma Client [#4-query-with-prisma-client]

Generate and use the type-safe client:

  

#### bun

```bash
bun add @prisma/client@7
bunx prisma@prev generate
```

#### pnpm

```bash
pnpm add @prisma/client@7
pnpm dlx prisma@prev generate
```

#### yarn

```bash
yarn add @prisma/client@7
yarn dlx prisma@prev generate
```

#### npm

```bash
npm install @prisma/client@7
npx prisma@prev generate
```

```ts
import { PrismaClient } from "./generated/client";
// Import the driver adapter for your specific database (example uses PostgreSQL)
import { PrismaPg } from "@prisma/adapter-pg";

// Initialize the adapter according to your driver's requirements
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Pass the adapter instance to PrismaClient
const prisma = new PrismaClient({ adapter });

// Find all users with their posts
const users = await prisma.user.findMany({
  include: { posts: true },
});

// Create a user with a post
const user = await prisma.user.create({
  data: {
    email: "alice@prisma.io",
    posts: {
      create: { title: "Hello World" },
    },
  },
});
```

> [!NOTE]
> Prisma 7 Connection Requirements
> 
> Starting with **Prisma 7**, providing a [driver adapter](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/database-drivers) is mandatory for direct database connections. This change standardizes database connectivity across Node.js, Serverless, and Edge environments.
> 
> Hosted Prisma Accelerate connections are retiring on December 1, 2026. If your Prisma Postgres application still uses a hosted `prisma+postgres://` URL, [switch to pooled TCP or the Prisma Postgres serverless driver](https://www.prisma.io/docs/postgres/database/switch-from-accelerate).
> 
> To ensure compatibility:
> 
> * **Install an adapter:** Use the specific package for your database (e.g., `@prisma/adapter-pg`, `@prisma/adapter-mariadb`, etc.).
> * **Enable ESM:** Your `package.json` must include `"type": "module"`.
> 
> For detailed instructions, see the [V7 Upgrade Guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7).

## Next steps [#next-steps]

* [**Prisma schema**](https://www.prisma.io/docs/orm/v7/prisma-schema/overview) - Learn the schema language
* [**Prisma Client**](https://www.prisma.io/docs/orm/v7/prisma-client) - Explore the query API

## Related pages

- [`Coming from Prisma ORM 7`](https://www.prisma.io/docs/orm/coming-from-prisma-orm-7): What each Prisma ORM 7 schema attribute, command, and query is called in Prisma ORM 8, and what is not available.
- [`Core concepts`](https://www.prisma.io/docs/orm/core-concepts): The ideas every Prisma ORM command and API builds on: contracts, emitting, plans, the database signature, codecs, and the migration graph.
- [`Extensions`](https://www.prisma.io/docs/orm/extensions): Every package that plugs into Prisma ORM: database packages, column types, indexes, query operations, and middleware, by Prisma and the community.
- [`Overview`](https://www.prisma.io/docs/orm/data-modeling): Describe the data your application needs with models, primary keys, scalar fields, and relations.
- [`Prisma ORM`](https://www.prisma.io/docs/orm/v6): Learn about Prisma ORM