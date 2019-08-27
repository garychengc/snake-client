const {MOVE_UP_KEY, MOVE_DOWN_KEY, MOVE_RIGHT_KEY, MOVE_LEFT_KEY, MESSAGE} = require('./constants')
let connection;
let interval;
let direction;

const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  handleUserInput();
  return stdin;
};

const handleUserInput = function() {
  const stdin = process.stdin;
  direction = MOVE_LEFT_KEY;

  stdin.on("data", key => {
    if (key === MOVE_UP_KEY && direction !== MOVE_DOWN_KEY) {
      clearInterval(interval);
      direction = key;
      interval = setInterval(() => {
        connection.write("Move: up");
      }, 100);
    }
    if (key === MOVE_DOWN_KEY && direction !== MOVE_UP_KEY) {
      clearInterval(interval);
      direction = key;
      interval = setInterval(() => {
        connection.write("Move: down");
      }, 100);
    }
    if (key === MOVE_LEFT_KEY && direction !== MOVE_RIGHT_KEY) {
      clearInterval(interval);
      direction = key;
      interval = setInterval(() => {
        connection.write("Move: left");
      }, 100);
    }
    if (key === MOVE_RIGHT_KEY && direction !== MOVE_LEFT_KEY) {
      clearInterval(interval);
      direction = key;
      interval = setInterval(() => {
        connection.write("Move: right");
      }, 100);
    }

    if (MESSAGE[key] !== undefined) {
      connection.write(`Say: ${MESSAGE[key]}`);
    }


    if (key === "\u0003") {
      console.log("Thanks!");
      process.exit();
    }
  });
};
module.exports = { setupInput };
