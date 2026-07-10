# Express Starter Pack

Express starter built with TypeScript, TypeDI, Valibot, and Winston. The project is structured for API services with a small bootstrap surface, feature-based folders, central error handling, request logging, and a compiled `dist` runtime for production-style execution.

## What Is Included

- Express app bootstrap split between `src/app.ts` and `src/main.ts`
- Dependency injection with `typedi` and `reflect-metadata`
- Environment loading and validation with `dotenv` and `valibot`
- Winston logger with colorized development logs and JSON production logs
- Helmet, CORS, JSON body parsing, and URL-encoded body parsing
- Request logging middleware with request ids and latency tracking
- `404` handling and centralized error handling
- Graceful shutdown for `SIGINT` and `SIGTERM`
- TypeScript path alias support with `@src/*`
- ESLint, Prettier, Husky, and lint-staged
- Changesets-based versioning workflow

## Requirements

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

This starts the app from `src/main.ts` in watch mode with `tsx`.

For compiled output:

```bash
npm run build
npm start
```

`npm start` runs `dist/main.js` with `NODE_ENV=development`, so it expects `dist/` to already exist.

For a production-style local run:

```bash
npm run start:prod
```

That command builds the project and starts the compiled server with `NODE_ENV=production`.

## Scripts

- `npm run dev`: run the source app in watch mode with `tsx`
- `npm run build`: compile TypeScript to `dist` and rewrite aliases with `tsc-alias`
- `npm start`: run the compiled app from `dist` with `NODE_ENV=development`
- `npm run start:prod`: build and run the compiled app with `NODE_ENV=production`
- `npm run typecheck`: run TypeScript without emitting files
- `npm run lint`: lint TypeScript files under `src/`
- `npm run lint:fix`: lint and auto-fix TypeScript files under `src/`
- `npm run format`: format the repository with Prettier
- `npm run changeset`: create a changeset entry
- `npm run version-packages`: apply pending changesets to package versions

## Environment

Create a `.env` file in the project root.

```env
NODE_ENV=development
PORT=3000
CLIENT_ORIGIN=true
```

Supported values:

- `NODE_ENV`: `development`, `test`, or `production`
- `PORT`: positive integer, defaults to `3000`
- `CLIENT_ORIGIN`: `true`, `false`, or a non-empty origin string

## Logging

- Development logs are colorized for readability
- Production logs are JSON to stdout
- Request logs include request id, latency, method, URL, IP, user agent, and status code

## API Surface

Base path: `/api/v1`

- `GET /health`
- `GET /users`
- `GET /users/:id`
- `GET /users/:id/profile`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

These user endpoints currently return starter responses and are intended as the first feature slice to extend.

## Project Structure

```text
src/
    app.ts
    main.ts
    preload.ts
    config/
        env.ts
        index.ts
    features/
        index.ts
        user/
            index.ts
            user.controller.ts
            user.service.ts
    middleware/
        error-handler.ts
        index.ts
        not-found.ts
    routes/
        index.ts
    utils/
        app-error.ts
        error-wrapper.ts
        index.ts
        logger.ts
docs/
    README.md
    controllers/
        health/
            README.md
        users/
            README.md
```

## Architecture Notes

- `src/preload.ts` must load first so decorator metadata is available before DI resolution
- `src/app.ts` wires middleware and mounts the route tree
- `src/main.ts` owns the HTTP server lifecycle and shutdown signals
- `src/routes/index.ts` is the root API router/controller
- Feature code lives together under `src/features/<feature-name>/`
- Use `AppError` for expected client-facing errors
- Use `errorWrapper` for async handlers that should forward failures to the global error middleware

## Tooling Notes

- `dist/` is generated only after `npm run build`
- `.vscode/settings.json` currently hides `dist/` in the Explorer
- staged TypeScript files are auto-fixed through `lint-staged`
- path aliases are compiled and then rewritten by `tsc-alias`

## Documentation

- Project docs index: `docs/README.md`
- Health route docs: `docs/controllers/health/README.md`
- Users route docs: `docs/controllers/users/README.md`

## Suggested Next Steps

- Add request payload validation for feature endpoints
- Add a persistence layer and repositories
- Add API tests with Supertest
- Add OpenAPI generation
