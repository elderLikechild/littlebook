var data = require("./data.json");
var userdata = require("./userdata.json");
var postdata = require("./postdata.json");
var news = require("./news.json");

module.exports = {
  devServer: {
    before(app) {
      app.get("/dis", function(req, res) {
        res.json({ data });
      });
      app.get("/user", function(req, res) {
        res.json({ userdata });
      });
      app.get("/postdetail", function(req, res) {
        res.json({ postdata });
      });
      app.get("/news", function(req, res) {
        res.json({ news });
      });
    },
    proxy: {
      "/api": {
        target: "http://api01.idataapi.cn:8000/post/xiaohongshu",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      },
      "/articalapi": {
        //http://api01.idataapi.cn:8000/post/xiaohongshu?apikey=a7rk0FAi7cEAi979zZqpypIwbR8dc9PZZRgULQZyZZbiZcr3ChijEISIgayYcf9Q&id=5d243a00000000002703d4ca
        target: "http://api01.idataapi.cn:8000/post/xiaohongshu",
        changeOrigin: true,
        pathRewrite: { "^/articalapi": "" }
      }
      // "/newsapi": {
      //   target: "http://api01.idataapi.cn:8000/news/cctvplus",
      //   changeOrigin: true,
      //   pathRewrite: { "^/newsapi": "" }
      // }
    }
  }
};
