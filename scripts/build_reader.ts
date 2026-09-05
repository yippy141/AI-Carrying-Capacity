import {spawnSync} from 'node:child_process';
import {resolveBuildMode} from '../lib/buildPolicy.ts';

// All supported build commands enter here. No fixture/bypass flag exists.
const mode = resolveBuildMode(process.env, process.argv.slice(2));
const env = {...process.env, READER_EDITION_MODE: mode, READER_BUILD_PIPELINE: mode};
const gate = ['--experimental-strip-types', 'scripts/check_reader_publication.ts', ...(mode === 'publication' ? ['--publication'] : [])];
function run(args: string[]) {
  const result = spawnSync(process.execPath, args, {env, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log(`Reader build target: ${mode}`);
run(gate);
run(['node_modules/next/dist/bin/next', 'build', '--webpack']);
run([...gate, '--rendered']);
