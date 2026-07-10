# Express Starter Pack

Opinionated TypeScript starter for Express APIs with a clean bootstrap flow, request middleware, centralized error handling, and a structure that scales from a demo route to a larger service.

## Included

- TypeScript build with path aliases
- Environment loading and validation
- Express app/server separation
- Request logging with Winston
- Security and transport middleware with Helmet and CORS
- JSON and URL-encoded body parsing
- Health check route
- 404 and centralized error handling
- Graceful shutdown for SIGINT and SIGTERM
- Husky and lint-staged for pre-commit automation
- Versioned releases with changelog generation

## Scripts

- `npm run dev`: start the API in watch mode with `tsx`
- `npm run build`: compile TypeScript into `dist`
- `npm run start`: run the compiled server
- `npm run start:prod`: build and then run the compiled server
- `npm run typecheck`: run TypeScript checks without emitting files
- `npm run changeset`: create a changeset entry for a user-facing change
- `npm run format`: format the project with Prettier
- `npm run lint`: lint the TypeScript source tree
- `npm run lint:fix`: auto-fix lint issues in the TypeScript source tree
- `npm run version-packages`: apply pending changesets to the package version and changelog
- `npm run release`: publish with Changesets

## Docker

- `docker build -t express-starter .`: build the production image
- `docker compose up --build`: build and run the API with Docker Compose

The Docker image uses a multi-stage build, installs dependencies with `npm ci`, compiles the app before runtime, drops to the non-root `node` user, and exposes the API on port `3000`.

## Environment

Create a `.env` file:

```env
PORT=3000
CLIENT_ORIGIN=http://localhost:3000
```

## Project Structure

```text
src/
    app.ts
    main.ts
    config/
        env.ts
    middleware/
        error-handler.ts
        not-found.ts
    routes/
        index.ts
        user/
            index.ts
    utils/
        app-error.ts
        error-wrapper.ts
        index.ts
        logger.ts
docs/
    routes/
        health/
            README.md
        users/
            README.md
CHANGELOG.md
```

## Starter Conventions

- Register global middleware in `src/app.ts`
- Keep `src/main.ts` focused on server lifecycle only
- Wrap async route handlers with `errorWrapper`
- Throw `AppError` for expected client and domain errors
- Mount new domain routers under `/api/v1`

## Example Endpoints

- `GET /api/v1/health`
- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `GET /api/v1/users/:id/profile`

## Docs And Releases

- Route documentation lives under `docs/`
- Release notes live in `CHANGELOG.md`
- Changeset files live under `.changeset/`
- Husky installs a `pre-commit` hook that runs `lint-staged`

Use `npm install` after pulling these changes so Husky can install hooks from the `prepare` script.

## Next Extensions

- Add request validation with Zod or Joi
- Add database and service layers
- Add tests with Vitest or Jest and Supertest
- Add OpenAPI documentation
