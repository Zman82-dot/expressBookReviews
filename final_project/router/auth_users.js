const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let matchingUsers = users.filter((user)=>{
return user.username === username;
});
if(matchingUsers.length > 0){
  return false;
}
return true;
};

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let matchingUsers = users.filter((user)=>{
return user.username === username && user.password === password;
});
if(matchingUsers.length > 0){
  return true;
}
return false;
};


//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password){
    return res.status(404).send("Cannot log in");
  }
  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign(
      {
        pw:password,
      },
      "access",
      {expiresIn: 60 * 60}
    );
    req.session.authenticated ={
      accessToken, 
      username,
    };
    return res.status(200).send("User logged in");
  }else{
    return res.status(208)
    .send("User name or Password Invalid")
  }
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const bookISBN = req.params.isbn;
  const userReview = req.params.review;

  const currentUser = req.session.authenticated.username;

  let bookReviews = books[bookISBN].bookReviews;

  let reviewExists = false;
  for(const username in bookReviews){
    if(username === currentUser){
      bookReviews[currentUser] = userReview;
      reviewExists = true;
      break;
    }
  }
  if (!reviewExists){
    bookReviews[currentUser] = userReview;
  }
  res.send("Review has been updated successfully!")
});

regd_users.delete("/auth/review/:isbn",(req,res)=>{
  const bookISBN = req.params.isbn;

  const currentUser = req.session.authenticated.username;

  const bookReviews = books[bookISBN].reviews;

  let reviewExists = false;
  for (const username in bookReviews){
    if (username === currentUser){
      delete bookReviews[currentUser];
      reviewExists = true;
      break;

    }
  }
  if (!reviewExists){
    res.send("Oops still here!");
  }
  res.send("Deleted Successfully!")
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
