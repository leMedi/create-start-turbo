# create-start-turbo

## Installation

> [!NOTE]
>
> Make sure to follow the system requirements specified in [`package.json#engines`](./package.json#L4) before proceeding.

There are two ways of initializing an app using the `create-start-kit` starter. You can either use this repository as a template:

![use-as-template](https://github.com/leMedi/create-tanstart-t3-turbo/blob/main/assets/use-template-instructions.png?raw=true)

or use Turbo's CLI to init your project (use PNPM as package manager):

```bash
npx create-turbo@latest -e https://github.com/t3-oss/create-t3-turbo
```

## About

It uses [Turborepo](https://turborepo.org) and contains:

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ webapp
      ├─ Tanstack/start
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Authentication using better-auth.
  ├─ db
  |   └─ Typesafe db calls using Drizzle
  └─ ui
      └─ Start of a UI package for the webapp using shadcn-ui
tooling
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ typescript
      └─ shared tsconfig you can extend from
```

> In this template, we use `@acme` as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of `@acme` to something like `@my-company` or `@project-name`.

## Quick Start

> **Note**
> The [db](./packages/db) package is preconfigured to use libsql (turso) driver. If you're using something else, make the necessary modifications to the [schema](./packages/db/src/schema.ts) as well as the [client](./packages/db/src/index.ts) and the [drizzle config](./packages/db/drizzle.config.ts).

To get it running, follow the steps below:

### 1. Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push
```

### 3a. When it's time to add a new UI component

Run the `ui-add` script to add a new UI component using the interactive `shadcn/ui` CLI:

```bash
pnpm ui-add
```

When the component(s) has been installed, you should be good to go and start using it in your app.

### 3b. When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## Deployment

#### Deploy to Netlify

1. Create a new project on Netlify from this repo.

2. Add your environment variables:

   - create a database on [Turso](https://turso.tech/) and get your `DATABASE_URL` and `DATABASE_AUTH_TOKEN`

   - [Genrate a secret](https://www.better-auth.com/docs/installation) for `BETTER_AUTH_SECRET`

3. Done! Your app should successfully deploy.

#### Deploy to Vercel

1. Create a new project on Vercel from this repo.

2. Use the following settings:

   - Framework Preset: `Other`
   - Root Directory: `apps/webapp`
   - Build Command: `pnpm -F webapp build --preset vercel`
   - install command: `pnpm install`

3. Add your environment variables:

   - create a database on [Turso](https://turso.tech/) and get your `DATABASE_URL` and `DATABASE_AUTH_TOKEN`

   - [Genrate a secret](https://www.better-auth.com/docs/installation) for `BETTER_AUTH_SECRET`

4. Done! Your app should successfully deploy.

## References

This setup is heavly inspired from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).
