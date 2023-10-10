const express = require("express")
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log("=======================================");
  console.log("            United Backend             ");
  console.log(`  Listening on http://localhost:${PORT}`)
  console.log("=======================================");
})