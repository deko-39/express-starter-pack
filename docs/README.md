# Documentation

This folder contains route-level documentation for the starter pack's current features.

## Route Docs

- [Health route](./routes/health/README.md)
- [Users route](./routes/users/README.md)

## Release Workflow

- `npm run changeset`: create a release note and select the version bump type
- `npm run version-packages`: apply pending changesets to `package.json` and `CHANGELOG.md`
- `npm run release`: publish the packaged release with Changesets

The project also installs a pre-commit hook with Husky. Staged files are formatted with Prettier, and staged TypeScript files under `src/` are auto-fixed with ESLint through `lint-staged`.
