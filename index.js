import express from "express";

const PORT = 3000;
const app = express();

const url = {};
var shortened;
var shorturl;
function shortening(temp) {
  shortened = Math.random().toString(36).slice(2, 8);
  while (shortened in url) {
    shortened = Math.random().toString(36).slice(2, 8);
  }
  shorturl = "localhost:3000/" + shortened;
  url[shortened] = temp;
  console.log(url);
}
app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/shorten", (req, res) => {
  var temp = req.query.url;
  if (temp) {
    shortening(temp);
    res.send(`Your shortened URL is --> ${shorturl}`);
  } else {
    res.send("Enter URL in URL as a query parameter!!");
  }
});

app.get("/:shortened", (req, res) => {
  if (req.params.shortened in url) {
    res.redirect(url[req.params.shortened]);
  } else {
    res.send("Enter a Valid URL");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
