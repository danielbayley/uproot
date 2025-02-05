import { describe, it, beforeEach, afterEach } from "node:test"
import assert        from "node:assert/strict"
import { exec }      from "node:child_process"
import { promisify } from "node:util"
import { mkdir }     from "node:fs/promises"
import { sep, join, resolve } from "node:path"
import { createFixture } from "fs-fixture"

const module = "./index.js"
const { root, uproot } = await import(module)
const { dirname } = import.meta
const subpath = join("node_modules", ...dirname.split(sep).slice(-2))
const shell   = promisify(exec)

describe("root", () =>
  it("exports static root path on module import", () =>
    assert.equal(root, dirname)))

describe("uproot", () => {
  let fixtures, cwd
  afterEach(fixtures?.rm)
  beforeEach(async () => {
    fixtures = await createFixture()
    cwd = fixtures.getPath(subpath)

    const copy = [module, "node_modules"]
    await Promise.all(copy.map(path =>
      fixtures.cp(path, join(subpath, path), { recursive: true })))
  })

  it("finds git repository root", async () => {
    await shell(`git init ${fixtures.path}`)
    const root = await uproot({ cwd })
    assert.equal(resolve(fixtures.path), root)
  })

  it("finds root based on a given  file path", async () => {
    fixtures.writeFile("pnpm-workspace.yaml", "packages: [packages/*]")
    const root = await uproot({ cwd })
    assert.equal(resolve(fixtures.path), root)
  })

  it("finds root based on a given .file path", async () => {
    fixtures.writeFile(".npmrc", "lockfile=false")
    const root = await uproot({ cwd })
    assert.equal(resolve(fixtures.path), root)
  })

  it("finds root based on a given  folder path", async () => {
    mkdir(fixtures.getPath("packages"))
    const root = await uproot({ cwd })
    assert.equal(resolve(fixtures.path), root)
  })

  it("finds root based on a given .folder path", async () => {
    mkdir(fixtures.getPath(".github"))
    const root = await uproot({ cwd })
    assert.equal(resolve(fixtures.path), root)
  })

  it("else returns the given directory", async () => {
    const root = await uproot({ cwd })
    assert.equal(cwd, root)
  })

  it("else the current working directory", async () => {
    const root = await uproot()
    assert.equal(process.cwd(), root)
  })

  it("provides an option to override patterns", async () => {
    fixtures.writeFile(".gitignore", "*")
    const root = await uproot({ patterns: [], cwd })
    assert.equal(cwd, root)
  })

  it("passes other options onto dependency", async () => {
    fixtures.writeFile(".gitignore", "*")
    const root = await uproot({ cwd: sep })
    assert.equal(sep, root)
  })
})
