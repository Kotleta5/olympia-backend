import config from './tsconfig.json';
const s = require('shelljs')
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/common/swagger`);
s.cp('server/common/openapi.yml', `${outDir}/common/openapi.yml`);
