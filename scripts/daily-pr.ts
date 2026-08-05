import { execFileSync } from 'node:child_process';

function argValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}
function run(command: string, args: string[]): string {
  return execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

const today = argValue('--date') ?? new Date().toISOString().slice(0, 10);
const execute = process.argv.includes('--execute');
const reviewer = argValue('--reviewer');
const branch = `goose/daily-links/${today}`;
const title = `Daily links for ${today}`;
const currentBranch = run('git', ['branch', '--show-current']);
const hasBranch = currentBranch === branch || run('git', ['branch', '--list', branch]).length > 0;
try {
  run('git', ['rev-parse', '--verify', 'main']);
} catch {
  throw new Error('Cannot compare daily branch: local main does not exist yet. Create/fetch main before running daily-pr.');
}
const diff = run('git', ['diff', '--name-only', 'main...HEAD']);
console.log(JSON.stringify({ branch, title, currentBranch, hasBranch, changedFiles: diff ? diff.split('\n') : [], execute }, null, 2));
if (!execute) process.exit(0);
if (!hasBranch) throw new Error(`Daily branch does not exist locally: ${branch}`);
if (!diff) throw new Error('No changes relative to main; refusing to open an empty PR.');
run('git', ['push', '--set-upstream', 'origin', branch]);
const existing = run('gh', ['pr', 'list', '--head', branch, '--json', 'url', '--jq', '.[0].url // ""']);
if (existing) { console.log(existing); process.exit(0); }
const args = ['pr', 'create', '--base', 'main', '--head', branch, '--title', title, '--body', 'Daily curated link proposals prepared by Goose for Seth review.'];
if (reviewer) args.push('--reviewer', reviewer);
console.log(run('gh', args));
