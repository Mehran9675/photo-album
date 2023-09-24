import http from "http";
import photos from "./photos.json" assert { type: "json" };
const server = http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
  if (req.url === "/photos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(photos));
    res.end();
  }
});

server.listen(8888);
