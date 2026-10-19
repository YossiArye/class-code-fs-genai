// Prints a readable, detailed block for every caught error.
export const logError = (
  where: string,
  error: unknown,
  context: Record<string, unknown> = {}
): void => {
  const err = error as any
  const lines = [
    '',
    '========== ERROR ==========',
    `time     : ${new Date().toISOString()}`,
    `where    : ${where}`,
    `type     : ${err?.name ?? typeof error}`,
    `message  : ${err?.message ?? String(error)}`
  ]

  // Extra details that mysql2 attaches to database errors
  if (err?.code) lines.push(`code     : ${err.code}`)
  if (err?.errno) lines.push(`errno    : ${err.errno}`)
  if (err?.sqlState) lines.push(`sqlState : ${err.sqlState}`)
  if (err?.sqlMessage) lines.push(`sqlMsg   : ${err.sqlMessage}`)
  if (err?.sql) lines.push(`sql      : ${String(err.sql).replace(/\s+/g, ' ').trim()}`)

  if (Object.keys(context).length) {
    lines.push(`context  : ${JSON.stringify(context)}`)
  }
  if (err?.stack) lines.push('stack    :', err.stack)
  lines.push('===========================', '')

  console.error(lines.join('\n'))
}
