Uproot
======
Reliable method to find the root path of your `git` repository,
\[[p][pnpm]\][npm]/[yarn] package, or app.

## Install
~~~ sh
pnpm add @danielbayley/uproot
~~~
This package is _[ESM]_ [only], and so [requires] _[Node]_ [`>=`]
[`14.16`] and must be [`import`]ed instead of [`require`]d:
~~~ jsonc
// package.json
"type": "module",
"engines": {
  "node": ">=14.16"
},
~~~

The algorithm is primarily reliant on [`git rev-parse --show-toplevel`][git],
but will fallback on the following files to find the root path:

1. [`pnpm-workspace.yaml`]
2. [`package.yaml`]
3. [`package.json`]
4. [`pnpm-lock.yaml`]
5. [`yarn.lock`]
6. [`package-lock.json`]
7. [`npm-shrinkwrap.json`]
8. [`.npmrc`]
9. [`.gitignore`]

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
~~~

License
-------
[MIT] © [Daniel Bayley]

[MIT]:                    LICENSE.md
[Daniel Bayley]:          https://github.com/danielbayley

[node]:                   https://nodejs.org
[requires]:               https://docs.npmjs.com/cli/v9/configuring-npm/package-json#engines
[`>=`]:                   https://docs.npmjs.com/cli/v6/using-npm/semver#ranges
[`14.16`]:                https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V14.md#14.16.0
[ESM]:                    https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules
[only]:                   https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[`import`]:               https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import
[`require`]:              https://nodejs.org/api/modules.html#requireid

[npm]:                    https://npmjs.com
[pnpm]:                   https://pnpm.io
[yarn]:                   https://yarnpkg.com

[git]:                    https://git-scm.com/docs/git-rev-parse#Documentation/git-rev-parse.txt---show-toplevel

[`pnpm-workspace.yaml`]:  https://pnpm.io/pnpm-workspace_yaml
[`package.yaml`]:         https://github.com/pnpm/pnpm/pull/1799
[`package.json`]:         https://docs.npmjs.com/creating-a-package-json-file
[`pnpm-lock.yaml`]:       https://pnpm.io/git#lockfiles
[`yarn.lock`]:            https://classic.yarnpkg.com/docs/yarn-lock
[`package-lock.json`]:    https://docs.npmjs.com/cli/configuring-npm/package-lock-json
[`npm-shrinkwrap.json`]:  https://docs.npmjs.com/cli/configuring-npm/npm-shrinkwrap-json
[`.npmrc`]:               https://pnpm.io/npmrc
[`.gitignore`]:           https://git-scm.com/docs/gitignore#_description
