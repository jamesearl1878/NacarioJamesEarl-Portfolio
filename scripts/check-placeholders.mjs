#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const textExtensions = new Set(['.html', '.css', '.js', '.jsx', '.json', '.txt'])

const rules = [
  {
    label: 'Unresolved deployment URL',
    pattern: /REPLACE-ME/,
    hint: 'Replace every REPLACE-ME URL with the final Vercel address.',
  },
  {
    label: 'Placeholder email address',
    pattern: /your\.email@example\.com/i,
    hint: 'Add a real, professional email address in src/data/site.js.',
  },
  {
    label: 'Placeholder GitHub profile',
    pattern: /github\.com\/your-?username/i,
    hint: 'Add the real GitHub profile and URL, or remove the GitHub card.',
  },
  {
    label: 'Contact still flagged as placeholder',
    pattern: /isPlaceholder:\s*true/,
    hint: 'Set isPlaceholder to false only after the real contact details are in place.',
  },
  {
    label: 'Invented experience claim',
    pattern: /(3\+\s*years?|years? of experience|20\+\s*projects?|15\+\s*clients?)/i,
    hint: 'Remove unverified experience, project, or client counts.',
  },
  {
    label: 'Invented client or award claim',
    pattern: /(happy clients?|satisfied clients?|award[- ]winning|internationally recognized)/i,
    hint: 'Only include claims that can be supported with real work.',
  },
  {
    label: 'Dead anchor link',
    pattern: /href=(["'])#\1|href:\s*['"]#['"]/,
    hint: 'Point the link at a real section, page, or external profile.',
  },
  {
    label: 'Placeholder copy',
    pattern: /lorem ipsum/i,
    hint: 'Replace placeholder copy with real writing.',
  },
]

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry)
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath]
  })
}

const scanRoots = ['index.html', 'src', 'public']
const files = scanRoots.flatMap((entry) => {
  const fullPath = join(root, entry)
  if (!existsSync(fullPath)) return []
  return statSync(fullPath).isDirectory()
    ? walk(fullPath).filter((file) => textExtensions.has(file.slice(file.lastIndexOf('.'))))
    : [fullPath]
})

const findings = []

for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const lines = text.split(/\r?\n/)

  lines.forEach((line, index) => {
    rules.forEach((rule) => {
      if (rule.pattern.test(line)) {
        findings.push({
          file: relative(root, file),
          line: index + 1,
          label: rule.label,
          hint: rule.hint,
          excerpt: line.trim().slice(0, 140),
        })
      }
    })
  })
}

const projectSource = readFileSync(join(root, 'src/data/projects.js'), 'utf8')
const projectImages = [...projectSource.matchAll(/src:\s*'(\/images\/projects\/[^']+)'/g)].map(
  (match) => `public${match[1]}`,
)

const requiredAssets = [
  'public/favicon.svg',
  'public/og-image.png',
  'public/robots.txt',
  'public/demos/promise-lab/index.html',
  ...projectImages,
]

const missingAssets = requiredAssets.filter((asset) => !existsSync(join(root, asset)))

if (findings.length === 0 && missingAssets.length === 0) {
  console.log('Content check passed: no placeholders, dead links, or unverified claims found.')
  process.exit(0)
}

console.error('Content check failed. Fix these before publishing:\n')

if (findings.length > 0) {
  findings.forEach((finding) => {
    console.error(`  ${finding.file}:${finding.line}  ${finding.label}`)
    console.error(`    ${finding.excerpt}`)
    console.error(`    → ${finding.hint}\n`)
  })
}

if (missingAssets.length > 0) {
  console.error('Missing required assets:')
  missingAssets.forEach((asset) => console.error(`  ${asset}`))
  console.error('')
}

console.error(
  `${findings.length} content issue${findings.length === 1 ? '' : 's'} and ` +
    `${missingAssets.length} missing asset${missingAssets.length === 1 ? '' : 's'} found.`,
)

process.exit(1)
