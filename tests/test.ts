import fs = require('fs')
import path = require('path')
import assert = require('assert')
import * as TSLint from 'tslint'
import { LintResult } from 'tslint/lib/lint'

function lint(fileName: string): LintResult {
  const configFile = fs.readFileSync(path.resolve(__dirname, '../tslint.json'), 'utf8')
  let options = JSON.parse(configFile.toString())
  options['configuration'] = TSLint.loadConfigurationFromPath(path.resolve(__dirname, '../tslint.json'))

  const code = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8')
  const linter = new TSLint(fileName, code, options)
  const result = linter.lint()

  return result
}

function run(): void {
  assert(lint('ok.ts').failureCount === 0)
}

run()
