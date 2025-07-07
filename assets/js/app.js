const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
//agregue los puntos porque son calses y no id, en name falta punto y en blog cambie el # a .
const $n = document.querySelector('.name');
const $b = document.querySelector('.blog');
const $l = document.querySelector('.location');
//Para usar await se usa async
async function displayUser(username) {
  $n.textContent = 'cargando...';
  const response = await fetch(`${usersEndpoint}/${username}`);
  //declare data porque no estaba declarada 
  const data = await response.json();
  console.log(data);
  //cambie comillas simples por las que puse ahorita 
  $n.textContent = `${data.name}`;   
  $b.textContent = `${data.blog}`;   
  $l.textContent = `${data.location}`; 
}

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  $n.textContent = `Algo salió mal: ${err}`
}

displayUser('stolinski').catch(handleError);