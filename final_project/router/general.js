const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  
  if (username.matchingUsers.length > 0 && password.matchingUser.length > 0){
    {if (isValid(username)){
      users.push({username:username, password:password});
    }return res
    .status(200)
    .jason({message:"User Successfully registered!"});
    
    }
   
  }
  else
  return res.status(406).json({message: "User cannot register"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books},null,4))
  
});

public_users.get ("/async",function(req,res){
  const getbooks = new Promise(()=>{
    res.send(JSON.stringify({books}));
  });
  getbooks.then(()=>console.log("resolved"))
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const bookISBN = req.params.isbn;
  res.send(books[bookISBN]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author= req.params.author;

  const allBooksByAuthor = Object.entries(books);
  const finalBooks = [];

  for (const [key, value] of allBooksByAuthor){
    if(value.author === author){
      finalBooks.push(value);
    }
  }
   res.send(finalBooks);
});

public_users.get("/async/author/:author", function (req, res){
  const getAuthorBooks = new Promise(() =>{
    const author = req.params.author;
    const allBooksByAuthor = Object.entries(books);
    const finalBooks =[];
    for (const [key,value] of allBooksByAuthor){
      if (value.author === author){
        finalBooks.push(value);
      }
    }
    res.send(finalBooks);
  })
  getAuthorBooks.then(() => console.log("resolved"))
})
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

  const allBooksByTitle = Object.entries(books);
  const finalBooks = [];

  for(const [key, value] of allBooksByTitle){
    if (value.title === title){
      finalBooks.push(value)
    }
  }
   res.send(finalBooks)
  
});

public_users.get("/async/title/:title", function (req, res){
  const getBookTitles = new Promise(()=>{
    const title = req.params.title;

    const allBooksByTitle = Object.entries(books);
    const finalBooks = [];

    for(const [key, value] of allBooksByTitle){
      if(value.title === title){
        finalBooks.push(value);
      }
    }
    res.send(finalBooks)
  });
  getBooksTitles.then(()=> console.log("resolved") )
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const bookISBN = req.params.isbn;
  const book = books[bookISBN]
   res.send(book.reviews);
});

module.exports.general = public_users;
