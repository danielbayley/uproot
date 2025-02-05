Uproot
======
Reliable method to find the root path of your `git` repository,
\[[`p`][pnpm]\][`npm`]/[`yarn`] package, or app.

The algorithm is primarily reliant on [`git rev-parse --show-toplevel`][git],
but will fallback on the following [_glob_ pattern]s to determine the `root` path:

| Path/pattern            | Example                 |
|:------------------------|:------------------------|
| `pnpm-*.yaml`           | [`pnpm-workspace.yaml`] |
| `package.{yaml,json}`   | [`package.yaml`]        |
| [`package-lock.json`]   |                         |
| [`npm-shrinkwrap.json`] |                         |
| [`yarn.lock`]           |                         |
| [`.git*`]               | [`.gitignore`]          |
| `.n[pv]mrc`             | [`.npmrc`]              |
| [`.editorconfig`]       |                         |
| `LICEN[SC]E*`           | `LICENSE.md`            |
| [`.vscode/`]            |                         |
| [`packages/`]           |                         |
| `src/`                  |                         |
| [`public/`]             |                         |

## Examples
~~~ js
import {root} from "@danielbayley/uproot"
console.log(root) // ~/path/to/project/root
~~~
~~~ js
import {uproot} from "@danielbayley/uproot"
const root = await uproot()
~~~

You can override these search paths by passing alternatives to `uproot`:
~~~ js
const root = await uproot(".github", ".vscode")

## Install
~~~ sh
pnpm install @danielbayley/matchup
~~~
> [!IMPORTANT]
> This package is _[ESM]_ [only], so must be [`import`]ed instead of [`require`]d,
> and [depends] on _[Node]_ [`>=`][][`20`].

Specify this requirement with [`engines`] and/or [`devEngines`]:
~~~ jsonc
// package.json
"type": "module",
"engines": {
  "node": ">=20"
},
"devEngines": {
  "runtime": {
    "name": "node",
    "version": ">=20"
  }
},
~~~

License
-------
[MIT] © [Daniel Bayley]

[MIT]:                    LICENSE.md
[Daniel Bayley]:          https://github.com/danielbayley

[node]:                   https://nodejs.org
[ESM]:                    https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules
[only]:                   https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[`import`]:               https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import
[`require`]:              https://nodejs.org/api/modules.html#requireid
[depends]:                https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
[`>=`]:                   https://docs.npmjs.com/cli/v6/using-npm/semver#ranges
[`20`]:                   https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V20.md
[`engines`]:              https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines
[`devEngines`]:           https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines

[`npm`]:                  https://npmjs.com
[pnpm]:                   https://pnpm.io
[`yarn`]:                 https://yarnpkg.com

[git]:                    https://git-scm.com/docs/git-rev-parse#Documentation/git-rev-parse.txt---show-toplevel
[_glob_ pattern]:         https://globster.xyz

[`pnpm-workspace.yaml`]:  https://pnpm.io/pnpm-workspace_yaml
[`package.yaml`]:         https://github.com/pnpm/pnpm/pull/1799
[`package-lock.json`]:    https://docs.npmjs.com/cli/configuring-npm/package-lock-json
[`npm-shrinkwrap.json`]:  https://docs.npmjs.com/cli/configuring-npm/npm-shrinkwrap-json
[`yarn.lock`]:            https://classic.yarnpkg.com/docs/yarn-lock
[`.gitignore`]:           https://git-scm.com/docs/gitignore#_description
[`.npmrc`]:               https://pnpm.io/npmrc
[`.editorconfig`]:        https://editorconfig.org
[`.vscode/`]:             https://code.visualstudio.com/docs/getstarted/settings#_workspace-settings
[`packages/`]:            https://pnpm.io/catalogs#the-catalog-protocol-catalog
[`public/`]:              https://create-react-app.dev/docs/using-the-public-folder
