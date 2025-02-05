import {exec}      from "node:child_process"
import {promisify} from "node:util"
import {matchup}   from "@danielbayley/matchup"

const shell = promisify(exec)
const cwd = import.meta.dirname
function error() {} // noop
const pipe = "|"

const lockfiles = [
  "pnpm-lock.yaml",
  "yarn.lock",
  "package-lock.json",
  "npm-shrinkwrap.json",
]
const files = [
  "pnpm-workspace.yaml",
  "package.yaml",
  "package.json",
  ...lockfiles,
  ".npmrc",
  ".gitignore",
]

export const root = await uproot({ cwd })
export default root

export async function uproot(options = {}) {
  const command  = `git -C '${options.cwd}' rev-parse --show-toplevel`
  const {stdout} = await shell(command).catch(error) ?? {}
  let root = stdout?.trimEnd()

  options.patterns ??= patterns
  const pattern = `@(${options.patterns.join(pipe)})`

  options.parse = true
  root ??= await matchup(pattern, options).then(({ dir }) => dir).catch(error)

  return root ?? options.cwd ?? process.cwd()
}
