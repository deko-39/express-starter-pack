# Documentation

This folder contains route-level documentation for the current starter features.

## Route Docs

- [Health controller](./controllers/health/README.md)
- [Users controller](./controllers/users/README.md)

## Release Workflow

- `npm run changeset`: create a release note and select the version bump type
- `npm run version-packages`: apply pending changesets to `package.json` and `CHANGELOG.md`

The project also installs a pre-commit hook with Husky. Staged files are formatted with Prettier, and staged TypeScript files under `src/` are auto-fixed with ESLint through `lint-staged`.
