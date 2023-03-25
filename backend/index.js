const dotenv = require("dotenv").config();
const Port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user.js");
const uploadRoutes = require("./routes/upload.js");
const postRoutes = require("./routes/post.js");
var MongoDBStore = require("connect-mongodb-session")(session);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(
  cors({
    origin: "https://mern-blog-weld.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(keys.mongoURI, () => {
  console.log("connected to db");
});

app.use(cookieParser());

var store = new MongoDBStore(
  {
    uri: keys.mongoURI,
    collection: "mySessions",
  },
  function (error) {
    if(error){
      console.log('err',error);
    }
  }
);


app.use(
  session({
    name: "sessionId",
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      path: "/",
      sameSite: "none",
      httpOnly: false,
      domain: "mern-blog-weld.vercel.app"
    },
    store: store,
  })
);


app.use(passport.initialize());
app.use(passport.session());
require("./servises/passport");
app.use("/", userRoutes);
app.use("/", uploadRoutes);
app.use("/", postRoutes);

app.listen(Port, () => {
  console.log(`server running ${Port}`);
});
