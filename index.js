import {exec}      from "node:child_process"
import {promisify} from "node:util"
import {dirname}   from "node:path"

const error = new Function
const shell = promisify(exec)
const command = "git rev-parse --show-toplevel"

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

export async function uproot(...find) {
  if (find.length === 0) {
    const {stdout} = await shell(command).catch(error) ?? {}
    if (stdout != null) return stdout.trimEnd()
    find.push(...files)
  }
  const {findUp} = await import("find-up")
  return findUp(find).then(dirname).catch(error)
}

export default uproot
export const root = await uproot()
