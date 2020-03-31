const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

let privateKey = "jwtPrivateKey";
let token = jwt.sign(
  {
    _id: "1234",
    name: "sharath",
    isAdmin: true
  },
  privateKey
);
req.header("x-auth-token", token).send({ user });

// store jwt on localStorage for angular and react
// send jwt on req.header('x-auth-token', token);
// store the jwt on localstorage
// send the jwt on header for every request from client

// information expert priciple
userSchema.methods.generateAuthToken = function() {
  let token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      isAdmin: this.isAdmin
    },
    process.env.JWT_PRIVATE_KEY
  );
  console.log("hello");
};

// then we can use document or model to call this method
let token = user.generateAuthToken();
res.send(token);

// to authenticate use middleware
async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("not authenticated");
  try {
    const decoded = await jwt.verity(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send("not have access");
  }
}

// roll base access middleware
async function auth(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("denied");
  next();
}
