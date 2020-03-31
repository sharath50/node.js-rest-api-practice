// *** handling rejected promises
// if we async operation then use
// then catch the error
// using try {} catch(){} block
try {
  res.status(200).send("success");
} catch (err) {
  res.status(500).send("500 : Server Error");
  // if we use error catching in our app then use
  next(err);
}

// or user .catch()
Promise.then(data => console.log(data)).catch(err => next(err));

try {
  res.status(200).send("success");
} catch (err) {
  res.status(500).send("500 : Server Error");
}

//
app.get(
  "/",
  // asyncMiddleware is called by us, it return a function
  // returned function will called by express
  // then we call handler function inside try block
  asyncMiddleware(async (req, res, next) => {
    const user = await user.find();
    res.send(user);
  })
);

// *** making try catch block seperate from logic
function asyncMiddleware(handler) {
  // always express framework calls the middleware function in router
  // but above in router we are calling asyncMiddleware function
  // so we need to return a function for express framework
  // and express will pass the req, res, next arguments
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
}

// *** express-async-errors
// to implement above thing we have an npm module
// npm i express-async-errors
// no need to implement any code here
// just import the above module to main app, thats all..!
// and write routers usually without try catch block
require("express-async-errors");
