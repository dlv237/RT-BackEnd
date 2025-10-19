import 'dotenv/config'
import { writeFile } from 'fs/promises'
import { swaggerSpec } from '../src/config/swagger'

async function main() {
  const file = process.argv[2] || 'openapi.json'
  await writeFile(file, JSON.stringify(swaggerSpec, null, 2), 'utf-8')
  console.log(`OpenAPI spec written to ${file}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
