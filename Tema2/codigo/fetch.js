// const fs = require('fs')

async function fetchPeople () {
  const res = await fetch('https://randomuser.me/api/?results=10&nat=es')
  const people = await res.json()
  console.log(people)
  return people
}

fetchPeople()
