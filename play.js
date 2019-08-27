const { setupInput } = require("./input");
const { connect } = require("./client");

console.log("Connecting ...");
connect();

setupInput();