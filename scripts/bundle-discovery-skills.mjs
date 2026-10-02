/**
 * Build installable brief-analyst and problem-framer skill folders
 * from the canonical method in agents/ and skills/.
 *
 * Edit those sources, then run: node scripts/bundle-discovery-skills.mjs
 *
 * Public copies: .agents/skills/<name>/
 * Claude Code copies (metadata.internal): .claude/skills/<name>/
 * Release zips: dist/<name>.zip
 *
 * Also publishes each discovery method as its own skill (same two locations).
 */
import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const bundles = [
  {
    name: 'brief-analyst',
    description:
      'Translate unstructured RFPs and product docs into a structured briefing for a product design team. Use when the user invokes brief-analyst or starts the pipeline from raw docs.',
    methods: ['assumption-mapping', 'mom-test', 'synthetic-user-profiles'],
  },
  {
    name: 'problem-framer',
    description:
      'Turn needs and JTBDs into bounded design problems, opportunities, and questions that must be answered before exploring solutions. Use when the user invokes problem-framer.',
    methods: ['problem-exploration', 'problem-framing', 'opportunity-mapping'],
  },
];

const methodSkills = [
  ...bundles.flatMap((bundle) => bundle.methods),
];

const publicNames = new Set([
  ...bundles.map((bundle) => bundle.name),
  ...methodSkills,
]);

function rewritePaths(text) {
  return text
    .replace(/skills\/([a-z0-9-]+)\/SKILL\.md/g, '$1.md')
    .replaceAll('../../agents/_shared/host-qa.md', 'host-qa.md')
    .replaceAll('../../agents/_shared/run-workspace.md', 'run-workspace.md')
    .replaceAll('../_shared/host-qa.md', 'host-qa.md')
    .replaceAll('../_shared/run-workspace.md', 'run-workspace.md')
    .replaceAll('agents/_shared/host-qa.md', 'host-qa.md')
    .replaceAll('agents/_shared/run-workspace.md', 'run-workspace.md');
}

function assertPortable(label, text) {
  if (text.includes('agents/') || text.includes('skills/')) {
    throw new Error(`${label} still points outside the skill folder`);
  }
}

function skillMarkdown({ name, description, internal }) {
  const metadata = internal ? 'metadata:\n  internal: true\n' : '';
  return `---
name: ${name}
description: ${description}
${metadata}---

Read and follow \`references/method.md\` completely. Do not improvise a parallel method.

When that file names another document, read it from this skill's \`references/\` folder (\`host-qa.md\`, \`run-workspace.md\`, and the method notes named there). Do not look for \`agents/\` or \`skills/\` outside this skill folder.

Write into the user's project at \`runs/<run-id>/\` (reuse if this chat already has a run). Notes and evals go in \`.lab/*.json\` only.
`;
}

function writeBundle(bundle, destDir, internal) {
  rmSync(destDir, { recursive: true, force: true });
  const references = join(destDir, 'references');
  mkdirSync(references, { recursive: true });

  const method = rewritePaths(
    readFileSync(join(root, 'agents', bundle.name, 'AGENT.md'), 'utf8'),
  );
  assertPortable(`${bundle.name} method`, method);
  writeFileSync(join(references, 'method.md'), method);

  for (const shared of ['host-qa.md', 'run-workspace.md']) {
    const text = rewritePaths(readFileSync(join(root, 'agents', '_shared', shared), 'utf8'));
    assertPortable(`${bundle.name} ${shared}`, text);
    writeFileSync(join(references, shared), text);
  }

  for (const methodName of bundle.methods) {
    const text = rewritePaths(
      readFileSync(join(root, 'skills', methodName, 'SKILL.md'), 'utf8'),
    ).replace(/\nmetadata:\n  internal: true\n/, '\n');
    assertPortable(`${bundle.name} ${methodName}`, text);
    writeFileSync(join(references, `${methodName}.md`), text);
  }

  writeFileSync(
    join(destDir, 'SKILL.md'),
    skillMarkdown({ ...bundle, internal }),
  );
}

function ensureInternal(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    throw new Error(`No frontmatter: ${filePath}`);
  }
  if (/internal:\s*true/.test(frontmatter[1])) return;
  const quoted = frontmatter[1].replace(
    /^(description:\s+)(.+)$/m,
    (full, key, value) => {
      const trimmed = value.trim();
      if (trimmed.startsWith('"') || trimmed.startsWith("'") || trimmed.startsWith('>') || trimmed.startsWith('|')) {
        return full;
      }
      if (!trimmed.includes(':')) return full;
      return `${key}"${trimmed.replaceAll('"', '\\"')}"`;
    },
  );
  const updated = quoted.replace(/\s*$/, '') + '\nmetadata:\n  internal: true';
  const next = `---\n${updated}\n---${text.slice(frontmatter[0].length)}`;
  writeFileSync(filePath, next.endsWith('\n') ? next : `${next}\n`);
}

function writeMethodSkill(name, destDir, internal) {
  rmSync(destDir, { recursive: true, force: true });
  mkdirSync(destDir, { recursive: true });

  let text = rewritePaths(
    readFileSync(join(root, 'skills', name, 'SKILL.md'), 'utf8'),
  ).replace(/\nmetadata:\n  internal: true\n/, '\n');

  if (text.includes('host-qa.md')) {
    const shared = rewritePaths(
      readFileSync(join(root, 'agents', '_shared', 'host-qa.md'), 'utf8'),
    );
    assertPortable(`${name} host-qa`, shared);
    writeFileSync(join(destDir, 'host-qa.md'), shared);
  }

  if (internal) {
    text = text.replace(/\n---\n/, '\nmetadata:\n  internal: true\n---\n');
  }

  assertPortable(name, text);
  writeFileSync(join(destDir, 'SKILL.md'), text.endsWith('\n') ? text : `${text}\n`);
}

function skillFilesUnder(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const skillMd = join(dir, entry, 'SKILL.md');
    try {
      if (statSync(skillMd).isFile()) files.push({ name: entry, file: skillMd });
    } catch {
      // not a skill directory
    }
  }
  return files;
}

for (const bundle of bundles) {
  writeBundle(bundle, join(root, '.agents', 'skills', bundle.name), false);
  writeBundle(bundle, join(root, '.claude', 'skills', bundle.name), true);
}

for (const name of methodSkills) {
  writeMethodSkill(name, join(root, '.agents', 'skills', name), false);
  writeMethodSkill(name, join(root, '.claude', 'skills', name), true);
}

for (const { file } of skillFilesUnder(join(root, 'skills'))) {
  ensureInternal(file);
}

for (const { name, file } of skillFilesUnder(join(root, '.agents', 'skills'))) {
  if (!publicNames.has(name)) ensureInternal(file);
}

for (const { file } of skillFilesUnder(join(root, '.claude', 'skills'))) {
  ensureInternal(file);
}

const dist = join(root, 'dist');
mkdirSync(dist, { recursive: true });
for (const name of [...bundles.map((bundle) => bundle.name), ...methodSkills]) {
  const zipPath = join(dist, `${name}.zip`);
  rmSync(zipPath, { force: true });
  execFileSync(
    'tar',
    ['-a', '-c', '-f', zipPath, '-C', join(root, '.agents', 'skills'), name],
    { stdio: 'inherit' },
  );
}

console.log('Bundled brief-analyst, problem-framer, and their method skills.');
console.log(`Zips: ${[...bundles.map((bundle) => bundle.name), ...methodSkills].map((name) => `dist/${name}.zip`).join(', ')}`);
