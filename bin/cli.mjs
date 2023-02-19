#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'

const ignoreDirs = []

function traverseDir(dirPath) {
  const files = fs.readdirSync(dirPath)

  if (files.includes('.git')) {
    console.log(`Current Path: ${dirPath}`)
    const output = execSync('git pull', { cwd: dirPath })
    console.log(output.toString())
    return
  }

  if (files.includes('package.json'))
    return

  for (const file of files) {
    if (file[0] === '.')
      continue
    const filePath = `${dirPath}/${file}`
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !ignoreDirs.includes(file))
      traverseDir(filePath)
  }
}

traverseDir(process.cwd())

