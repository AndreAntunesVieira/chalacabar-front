export const initializeServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/chalacabar-service-worker.js')
      .catch(err => console.log('Error to run service worker: ', err))
  }
}
