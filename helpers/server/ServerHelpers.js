export const listenMessage = port => err => {
  if (err) throw err
  process.stdout.write(`> Ready on http://localhost:${port}` + '\n')
}
