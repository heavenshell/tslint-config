import fs = require('fs')
import path = require('path')
import assert = require('assert')
import { Linter, LintResult } from 'tslint/lib/'
import { loadConfigurationFromPath } from 'tslint/lib/configuration'

function lint(fileName: string): LintResult {
  const configFile = loadConfigurationFromPath(path.resolve(__dirname, '../tslint.json'))

  const code = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8')
  const linter = new Linter({fix: false})
  linter.lint(fileName, code, configFile)
  const result = linter.getResult()

  return result
}

function run(): void {
  assert(lint('ok.ts').failureCount === 0)
}

run()
