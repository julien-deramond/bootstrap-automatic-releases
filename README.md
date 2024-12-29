## Set up

This repository is a copy of the Bootstrap repository with a few changes to make it work with this new repository:

- Forked Bootstrap `main` branch from https://github.com/twbs/bootstrap/commit/0cbfe13adf669ad39ae9d8e873c2ad59befd3a3a
- Changed `if: github.repository == 'twbs/bootstrap'` to `if: github.repository == 'julien-deramond/bootstrap-automatic-releases'` ([3e17b6e](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/3e17b6ebe37d721a33b0a10edaf4e4338c6de257))
- Removed `.github/dependabot.yml` file to avoid having Dependabot alerts
- Fixed CSpell action by adding "deramond" to the dictionary ([45bd8d9](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/45bd8d9f05bb9f5c0e479ea95a83eac007a6d281))
- Disabled BrowserStack workflow because it requires a BrowserStack account. However, it should be pretty easy to make it work afterward when the automatic release is set up in Bootstrap. ([77eb394](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/77eb39406c5c8f1630983ecc70738cbc45820c34))
- Configured Netlify to deploy the _main_ branch at https://bootstrap-automatic-releases.netlify.app/
- Changed package name for this repository in `package.json` to test out the automatic release: used `bootstrap-automatic-releases`
  - This also required changing the name here:

  ```diff
  diff --git a/build/zip-examples.mjs b/build/zip-examples.mjs
  index e5e39be..df254dc 100644
  --- a/build/zip-examples.mjs
  +++ b/build/zip-examples.mjs
  @@ -18,7 +18,7 @@ const pkgJson = path.join(__dirname, '../package.json')
  const pkg = JSON.parse(await fs.readFile(pkgJson, 'utf8'))
  
  const versionShort = pkg.config.version_short
  -const distFolder = `bootstrap-${pkg.version}-examples`
  +const distFolder = `bootstrap-automatic-releases-${pkg.version}-examples`
  const rootDocsDir = '_site'
  const docsDir = `${rootDocsDir}/docs/${versionShort}/`
  
  diff --git a/package.json b/package.json
  index 7c3d4b4..90e3715 100644
  --- a/package.json
  +++ b/package.json
  @@ -89,7 +89,7 @@
      "release": "npm-run-all dist release-sri docs-build release-zip*",
      "release-sri": "node build/generate-sri.mjs",
      "release-version": "node build/change-version.mjs",
  -    "release-zip": "cross-env-shell \"rm -rf bootstrap-$npm_package_version-dist bootstrap-$npm_package_version-dist.zip && cp -r dist/ bootstrap-$npm_package_version-dist && zip -qr9 bootstrap-$npm_package_version-dist.zip bootstrap-$npm_package_version-dist && rm -rf bootstrap-$npm_package_version-dist\"",
  +    "release-zip": "cross-env-shell \"rm -rf bootstrap-automatic-releases-$npm_package_version-dist bootstrap-automatic-releases-$npm_package_version-dist.zip && cp -r dist/ bootstrap-automatic-releases-$npm_package_version-dist && zip -qr9 bootstrap-automatic-releases-$npm_package_version-dist.zip bootstrap-automatic-releases-$npm_package_version-dist && rm -rf bootstrap-automatic-releases-$npm_package_version-dist\"",
      "release-zip-examples": "node build/zip-examples.mjs",
      "dist": "npm-run-all --aggregate-output --parallel css js",
      "test": "npm-run-all lint dist js-test docs-build docs-lint",
  ```

## Changes

Here are the changes that could be made to the original Bootstrap repository to have automatic releases.

### Get rid of the `dist` directory

- Remove `dist` directory and add it to `.gitignore` ([c0797cb](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/c0797cb743c6f6b839b451d66a84a558871f9c3a))
- Add eslint ignore rule `eslint-disable-line import/no-unresolved` to `/js/tests/integration/bundle.js` to fix `npm run lint` without having to build the library ([6d959ab](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/6d959ab51cf97644e512e99e71f0b8b6aa1605f7))
- Change `npm run docs` to add an extra `npm run dist` command so that `/docs/5.3/customize/css-variables` can be built (it embeds the content of the dist CSS built file) ([d8d05b0](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/d8d05b0d22526008959a461f3b32c36e5d897c44))
- Adapt `.github/workflows/docs.yml` to use `npm run docs` instead of several sub-commands ([8dacbe0](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/8deacbe0ed3bf2cba76ebe2f34c4ce1340868588))
- Adapt BrowserStack workflow (not done here because it requires a BrowserStack account)
- Added the package name to `gitignore`:
  ```diff
  +# Ignore built files
  +bootstrap-automatic-releases-*
  ```

### Prepare the releases

- New script [`prepare-version.mjs`](https://github.com/julien-deramond/bootstrap-automatic-releases/blob/main/build/prepare-version.mjs) that takes 'patch', 'minor', or 'major' as an argument and prepares the _main_ branch for the next release.
  - Changes the version in all files
  - Rename the {version} directories (e.g. 5.3 -> 5.4, or 5.3 -> 6.0) **for minor and major versions**
- New npm scripts to prepare the _main_ branch for the next release:
  ```diff
  + "prepare-patch": "node build/prepare-version.mjs patch",
  + "prepare-minor": "node build/prepare-version.mjs minor",
  + "prepare-major": "node build/prepare-version.mjs major",
  ```

### Release

> [!NOTE]
> This test was done by publishing this https://www.npmjs.com/package/bootstrap-automatic-releases package publicly. It will be deleted afterward.

> [!WARNING]
> It would be possible to use GitHub Actions to publish the package to npm, but it would require a npm token. If the action is not set up correctly, the token could be exposed. Moreover, all the core team (with write access) is not currently allowed to publish to npm. Therefore, it would be better to use the manual process for now.

New npm scripts
- `publish-release`: to run the release script, publish the package to npm, push the changes to the _main_ branch, and create/push a new tag
- `publish-patch`: to run the `publish-release` script, and after that, publish the docs to the `gh-pages` branch too
- `publish-minor`: to run the `publish-release` script, and after that, publish the docs to the `gh-pages` branch too
- `publish-major`: to run the `publish-release` script, and after that, publish the docs to the `gh-pages` branch too

New script:
- `build/publish-docs.mjs`: to publish the docs to the `gh-pages` branch

> [!CAUTION]
> For now, the `build/publish-docs.mjs` script does nothing. This step should be done manually for now.

#### How to publish a new release for a patch version

- Run `npm run publish-patch` to publish a new patch version
- Manually build and publish the package to Nuget
- Manually create the GitHub release from the tag

#### How to publish a new release for a minor version

- Run `npm run publish-minor` to publish a new patch version
- Manually build and publish the package to Nuget
- Manually create the GitHub release from the tag

#### How to publish a new release for a major version

- Run `npm run publish-major` to publish a new patch version
- Manually build and publish the package to Nuget
- Manually create the GitHub release from the tag

### After the release

Prepare the _main_ branch for the next release by running:
- `npm run prepare-patch` for a patch release
- `npm run prepare-minor` for a minor release
- `npm run prepare-major` for a major release

This will execute the `npm run release-version <version> <next-version>`. For example, if the current version is `5.3.0`, running `npm run prepare-patch` will execute `npm run release-version 5.3.0 5.3.1`.

> [!CAUTION]
> For now, some steps must be done manually.
> For a minor or major release:
> - Manually change `version_short` in `package.json`
> - Add docs version to `site/data/docs-versions.yml`
> - Manually change `docs_version` in `hugo.yml` and other references to the previous version
> - Update redirects in docs frontmatter (`site/content/docs/_index.html`?)
> - Check that `site/content/docs/{version}/**/*.md` are not modified (should be avoided by the script)
> 
> For a major release, for now, manually:
> - Manually increment the version in `nuget/boosted.nuspec` and `nuget/boosted.sass.nuspec`
