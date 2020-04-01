require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT ? process.env.PORT : 5000;
require("./app").listen(port, () => {
  console.log(`App Listening on localhost:${port}...`);
});
