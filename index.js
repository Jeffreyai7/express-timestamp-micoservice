// index.js
// where your node app starts

// init project
import express from "express";
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from "cors";
app.use(cors({ origin: "*" }, { optionsSuccessStatus: 200 })); // allow all origins
// app.use(cors());  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;
  if (!dateInput) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }

  // Check if dateInput is a valid date string or timestamp
  if (!isNaN(dateInput) && /^\d+$/.test(dateInput)) {
    dateInput = new Date(parseInt(dateInput));
  } else {
    dateInput = new Date(dateInput);
  }

  if (dateInput.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: dateInput.getTime(),
    utc: dateInput.toString(),
  });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
