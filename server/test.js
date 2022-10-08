// const array = [{a:false}, {b:false}, {a:true}]

// const selfUser = array.find((user)=> {if (user.a === true) return user}) //self is the meta data created using the element.self in forEach function
// const array1 = array.find((user)=> {if (user.a !== true) return user}) 
// const array2= [selfUser, array1]

// console.log(array2)

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  /*Return only the documents with the address "Park Lane 38":*/
  var query = { address: "Park Lane 38" };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});