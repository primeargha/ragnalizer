-- Supabase keeps extensions in this schema. Prisma's shadow database does not have it yet.
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;
