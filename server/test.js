const array = [{a:false}, {b:false}, {a:true}]

const selfUser = array.find((user)=> {if (user.a === true) return user}) //self is the meta data created using the element.self in forEach function
const array1 = array.find((user)=> {if (user.a !== true) return user}) 
const array2= [selfUser, array1]

console.log(array2)