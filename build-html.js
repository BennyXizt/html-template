const ejs = require("ejs");
const fs = require("fs");

const data = {

}

ejs.clearCache()

ejs.renderFile("./views/index.ejs", data, (err, str) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.writeFileSync("./docs/index.html", str);
  console.log("Статический HTML сгенерирован в docs/index.html");
});
