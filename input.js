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
  direction = 'a';

  stdin.on("data", key => {
    if (key === "w" && direction !== 's') {
        clearInterval(interval);
        direction = key;
        interval = setInterval(() => {
          connection.write("Move: up");
        }, 100)
    }
    if (key === "s" && direction !== 'w') {
        clearInterval(interval);
        direction = key;
        interval = setInterval(() => {
          connection.write("Move: down");
        }, 100)

    }
    if (key === "a" && direction !== 'd') {
        clearInterval(interval);
        direction = key;
        interval = setInterval(() => {
          connection.write("Move: left");
        }, 100)
    }
    if (key === "d" && direction !== 'a') {
        clearInterval(interval);
        direction = key;
        interval = setInterval(() => {
          connection.write("Move: right");
        }, 100)
    }

    if (key === "\u0003") {
      console.log("Thanks!");
      process.exit();
    }
  });
}
module.exports = { setupInput };