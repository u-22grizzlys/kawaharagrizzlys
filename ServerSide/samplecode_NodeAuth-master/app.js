var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var session = require("express-session");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user.js");

var promise = mongoose.connect('mongodb://localhost/sample', {
    useMongoClient: true,
    /* other options */
});


var MongoClient = require("mongodb").MongoClient;

// 接続文字列
var url = "mongodb://localhost:27017/sampledb";

// MongoDB へ 接続
MongoClient.connect(url, (error, db) => {
    var collection;

    // コレクションの取得
    collection = db.collection("user");

    // コレクションにドキュメントを挿入
    collection.insertOne({
        "name": "yamada@sample.com",
        "password": "password"
    }, (error, result) => {
        db.close();
    });
});


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    "local-login",
    new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, function (request, username, password, done) {
        process.nextTick(() => {
            User.findOne({ "email": username }, function (error, user) {
                if (error) {
                    return done(error);
                }
                if (!user || user.password != password) {
                    return done(null, false, request.flash("message", "Invalid username or password."));
                }
                return done(null, {
                    id: user.id,
                    name: user.name,
                    role: user.role
                });
            });
        });
    })
);

var authorize = function (role) {
    return function (request, response, next) {
        if (request.isAuthenticated() &&
            request.user.role === role) {
            return next();
        }
        response.redirect("/account/login");
    };
};

// express の実態 Application を生成
var app = express();

// テンプレートエンジンを EJS に設定
app.set("views", "./views");
app.set("view engine", "ejs");

// ミドルウェアの設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use("/public", express.static("public"));

// passport設定
app.use(session({ secret: "some salt", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// ルーティング設定
//トップページの処理
app.use("/", (function () {
    var router = express.Router();
    router.get("/home/index", function (request, response) {
        response.render("./home/index.ejs");
    });
    //ログインページの処理
    router.get("/account/login", function (request, response) {
        response.render("./account/login.ejs", { message: request.flash("message") });
    });
    router.post("/account/login", passport.authenticate(
        "local-login", {
            successRedirect: "/account/profile",
            failureRedirect: "/account/login"
        }));
    //アカウント作成の処理
    router.get("/account/registration", function (request, response) {
        response.render("./account/registration.ejs", { message: request.flash("message") });
    });
    router.post("/account/registration", passport.authenticate(
        "local-login", {
            successRedirect: "/account/profile",
            failureRedirect: "/account/registration"
        }));
    //ログアウトの処理
    router.post("/account/logout", authorize("group1"), function (request, response) {
        request.logout();
        response.redirect("/home/index");
    });
    router.get("/account/profile", authorize("group1"), function (request, response) {
        response.render("./account/profile.ejs", { user: request.user });
    });
    return router;
})());

// サーバーをポート 3000 で起動
app.listen(3000);
