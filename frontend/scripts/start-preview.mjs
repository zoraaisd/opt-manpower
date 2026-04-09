import { spawn } from 'node:child_process';

const port = process.env.PORT ?? '8080';
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const child = spawn(
  npmCmd,
  ['exec', 'vite', 'preview', '--', '--host', '0.0.0.0', '--port', port],
  { stdio: 'inherit' }
);

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
