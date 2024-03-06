import { writeFileSync } from 'fs';
import openapiTS from 'openapi-typescript';

const localPath = new URL('./server/common/openapi.yml', import.meta.url);
const output = await openapiTS(localPath);
writeFileSync('server/api/interfaces/api.ts', output);
