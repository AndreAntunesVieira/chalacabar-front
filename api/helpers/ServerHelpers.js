export const listenMessage = port => err => {
  if (err) throw err
  process.stdout.write(`> Ready on https://localhost:${port}` + '\n')
}
