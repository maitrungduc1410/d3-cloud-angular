# Changesets

Every pull request that changes published behaviour adds a changeset:

```sh
npm run changeset
```

Pick the bump (patch for fixes, minor for new features, major for breaking changes) and write
one or two sentences for the changelog. The release workflow turns pending changesets into a
"chore: release vX.Y.Z" pull request (branch `release/vX.Y.Z`); merging that pull request
publishes `angular-d3-cloud` to npm with trusted publishing (OIDC, no npm token in the repo).

You can also write the file by hand: any `.changeset/<name>.md` with this content works the same way.

```md
---
'angular-d3-cloud': patch
---

Fix word cloud not re-rendering when only `fillMapper` changes.
```

## First-time npm trusted publisher setup

On https://www.npmjs.com/package/angular-d3-cloud → **Settings** → **Trusted Publisher**:

- **Repository owner:** `maitrungduc1410`
- **Repository name:** `d3-cloud-angular`
- **Workflow filename:** `release.yml`
- **Environment name:** leave empty (unless you add a GitHub Environment)

Requires npm CLI ≥ 11.5.1 on the runner (the workflow installs `npm@latest`).
