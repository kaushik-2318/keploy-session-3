const app = require("./app");
const { connectDB } = require("./config/config");

connectDB();

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
