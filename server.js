var express = require("express"),
  mongojs = require("mongojs");
mongoose = require("mongoose"),
  passport = require("passport"),
  session = require("express-session");
// User = require('./models/user');
db = require("./models");

const PORT = process.env.PORT || 3001;
// mongoose.connect("mongodb://localhost:27017/artusers", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/artusers",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

console.log("hello from your server");

var app = express();
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "I'm a master",
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(db.User.authenticate()));


passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


app.post("/api/posts", function (req, res) {
  console.log(req.body.id, req.body.url);
  db.Article.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.get("/api/favorites", function (req, res) {
  db.Article.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data[0]);
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  db.Article.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    function (error, data) {
      if (error) {
        res.send(error);
      } else {
        res.json(data)
      }
    }
  );
});

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});