if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./ServiceWorker.js')
    .then(() => console.log('Registro Exitoso'))
    .catch(error => console.error(error));
}
