const {MOVE_KEY, MESSAGE} = require('./constants')
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
  direction = MOVE_KEY.left;
  let command;

  stdin.on("data", key => {

    if ((key === MOVE_KEY.up && direction !== MOVE_KEY.down) || (key === MOVE_KEY.down && direction !== MOVE_KEY.up) ||  (key === MOVE_KEY.left && direction !== MOVE_KEY.right) || (key === MOVE_KEY.right && direction !== MOVE_KEY.left)) {
      clearInterval(interval);
      direction = key;

      for (let value in MOVE_KEY) {
        if (MOVE_KEY[value] === key) {
          command = value;
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
      console.log("Thanks!");
      process.exit();
    }
  });
};
module.exports = { setupInput };
