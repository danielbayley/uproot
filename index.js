import {exec}      from "node:child_process"
import {promisify} from "node:util"
import {matchup}   from "@danielbayley/matchup"

const shell = promisify(exec)
const cwd = import.meta.dirname
function error() {} // noop
const pipe = "|"

const lockfiles = [
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
]
const config = [
  ".git*",
  ".npmrc",
  ".editorconfig",
]
const folders = [
  ".vscode",
  "packages",
  "src",
  "public",
]
const patterns = [
  "pnpm-*.yaml",
  "package.{yaml,json}",
  ...lockfiles,
  ...config,
  "LICEN[SC]E*",
  ...folders,
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
