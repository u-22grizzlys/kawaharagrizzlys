var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 55005;

app.get('/', function (req, res) {
    //index.htmlにリダイレクトする。
    res.sendFile(__dirname +'/public/html/index.html');
});


app.use(express.static('public'));




io.on('connection', function(socket) {
  //接続時に振られた一意のIDをコンソールに表示
  console.log('%s さんが接続しました。', socket.id);

var channel = 'channel-a';

  //接続時に自分以外の全員にIDを表示
  socket.broadcast.emit('message', socket.id + 'さんが入室しました！','system');

  socket.join(channel);

  //messageイベントで動く
  //同じチャンネルの人にメッセージを送る
  socket.on('message', function(msj) {
    io.sockets.in(channel).emit('message', msj, socket.id);
  });

  //接続が切れた時に動く
  //接続が切れたIDを全員に表示
  socket.on('disconnect', function(e) {
    console.log('%s さんが退室しました。', socket.id);
  });







});

//接続待ち状態になる
http.listen(PORT, function() {
  console.log('接続開始：やめる時はCTRL+Cを押して下さい。', PORT);
});


