# Changesets

Use Changesets to manage version bumps and changelog entries for this project.

## Common Commands

- `npm run changeset`: create a new changeset file
- `npm run version-packages`: apply pending changesets to `package.json` and `CHANGELOG.md`
- `npm run release`: publish using Changesets

For a single-package repository, the usual flow is:

1. Create a changeset when you make a user-facing change.
2. Commit the generated markdown file under `.changeset/`.
3. Run `npm run version-packages` when preparing a release.
