function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function mensajes () {
  await sleep(1000); console.log('Este es el primer mensaje')
  await sleep(1500); console.log('Este es el segundo mensaje')
  await sleep(2000); console.log('Este es el tercer mensaje')
  await sleep(800); console.log('Este es el cuarto mensaje')
}

mensajes()
