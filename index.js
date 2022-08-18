const express = require("express"); // 웹서버
const http = require("http"); //node에 원래부터 있던 모듈
const path = require("path"); //node에 원래부터 있던 모듈. 서버가 구동되는 폴더의 절대 경로 알려줌
const app = express();
const moment = require("moment");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server); // 여기서 클라이언트로 데이터 내려줌
app.use(express.static(path.join(__dirname, "/public"))); // 정적 파일 서비스하는 폴더 지정
app.set("port", process.env.PORT || 8099);
const PORT = app.get("port");

io.on("connection", (socket) => {
  console.log("클라이언트 연결 되었습니다.");
  // socket.on("yaho", (data) => {
  //   console.log(data);
  //   io.emit("serverYaho", "aaa");
  // });
  socket.on("chatting", (data) => {
    console.log(data);
    const sendTime = moment(new Date()).format("A hh:mm");
    io.emit("chatting", { nickName: data.nickName, msg: data.msg, time: sendTime });
  });
});

app.get("/", (req, res) => {
  // res.send("hello express");
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
});

app.get("/chatting", (req, res) => {
  // res.send("채팅룸");
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
  //__dirname은 폴더가 있는 절대 경로를 의미.
});

server.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
