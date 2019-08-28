const { MOVE_KEY, MESSAGE } = require("./constants");
let connection;
let interval;
let direction;
let command;

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
  direction = MOVE_KEY.LEFT;

  stdin.on("data", key => {
    if(key === direction) return;

    if (
      (key === MOVE_KEY.UP && direction !== MOVE_KEY.DOWN) ||
      (key === MOVE_KEY.DOWN && direction !== MOVE_KEY.UP) ||
      (key === MOVE_KEY.LEFT && direction !== MOVE_KEY.RIGHT) ||
      (key === MOVE_KEY.RIGHT && direction !== MOVE_KEY.LEFT)) {
      clearInterval(interval);
      direction = key;

      for (let value in MOVE_KEY) {
        if (MOVE_KEY[value] === key) {
          command = value.toLowerCase();
        }
      }
      interval = setInterval(() => {
        connection.write(`Move: ${command}`);
      }, 100);
    }

    if (MESSAGE[key] !== undefined) {
      connection.write(`Say: ${MESSAGE[key]}`);
    }

    if (key === "\u0003") {
      console.log("Thanks for playing this amazing game!");
      process.exit();
    }
  });
};
module.exports = { setupInput };
