export const logPromise = x => {
  console.log(x)
  return Promise.resolve(x)
}
