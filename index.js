var cors = require('cors');
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const FindTheQueen = require('./game/ftq-game');
const bodyparser = require('body-parser');
const PlayerController = require('./controllers/PlayerController');
const clientPath = `${__dirname}/serverside-client`; //import our server side client
console.log(`Serving static from ${clientPath}`);

const app = require('express')();
//Our TCP port number
const port = 7621
// our server instance
const server = http.createServer(app)
// This creates our socket using the instance of the server
const io = socketIO(server)

let waitingPlayer = null;

////////////////////////////////////////////////////////////////
               //ESTABLISHING THE CONNECTION//
///////////////////////////////////////////////////////////////

io.on('connection', socket => {
console.log('Client connected')

if (waitingPlayer) {
  new FindTheQueen(waitingPlayer, socket);
  waitingPlayer = null;
} else {
  waitingPlayer = socket;
    waitingPlayer.emit('message', 'Waiting for an opponent');
}

  socket.on('message', (text) => { //socket that subscribes and emits to messages from the game instance
    io.emit('message', text);
  });

    socket.on('lobby', (greeting) => { //server sockect Listening for emittance from the cient socket
    io.sockets.emit('lobby', greeting) //to allow players to exit the lobby
  }) 
////////////////////////////////////////////////////////////////
          //disconnect if the client closes the browser/v/
///////////////////////////////////////////////////////////////
})

app.use(express.static(clientPath)); //connecting our client to the tcp port using express

app.use(cors()); //enabling cross-origins from localhost:3000

app.use(bodyparser.json()); //allows us to parse incoming json requests

app.use('/player', PlayerController); //defining endpoint to make requests to our controller

server.listen(port, () => console.log(`Listening on port ${port}`)) //Starting the server and lsitening for connections
