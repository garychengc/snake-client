const setupInput = function() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  handleUserInput();
  return stdin;
};

const handleUserInput = function() {
  const stdin = process.stdin;
  stdin.on("data", key => {
    if (key === "\u0003") {
      console.log("Thanks!");
      process.exit();
    }
  });
};

module.exports = { setupInput };
