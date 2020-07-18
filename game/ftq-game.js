class FindTheQueen {

  constructor(p1, p2) {
    this._players = [p1, p2];
    this._turns = [null, null];
    this._position = ['Dealer','Spotter'];
    this._round = 1;
    this._Dealer = "";
    this._Spotter = "";
    this._DealerScore = 0
    this._SpotterScore = 0
    this._Random = Math.floor(Math.random() * 2);
    this._RandomOther = 0;

    this._sendToPlayers('________________________________________________________');
    this._sendToPlayers('Round 1');


    this._sendToPlayer(0, "You are the "+this._position[this._Random]);

    if(this._Random == 0)
    {
        this._Dealer = 0
        this._Spotter = 1

    } else {
      this._Dealer = 1
      this._Spotter = 0

    }

    if(this._Random == 0) {
      this._RandomOther = 1
      this._sendToPlayer(1, "You are the "+this._position[this._RandomOther]);
    }
    else if(this._Random == 1){
      this._RandomOther = 0
      this._sendToPlayer(1, "You are the "+this._position[this._RandomOther]);
    }

    this._players.forEach((player, idx) => {
      player.on('turn', (turn) => {
        this._onTurn(idx, turn);
      });
    });
  }

  _sendToPlayer(playerIndex, msg) {
    this._players[playerIndex].emit('message', msg);
  }

  _sendToPlayers(msg) {
    this._players.forEach((player) => {
      player.emit('message', msg);
    });
  }

  _onTurn(playerIndex, turn) {
    this._turns[playerIndex] = turn;
    this._sendToPlayer(playerIndex, `You selected ${turn}`);

    this._checkGameOver(playerIndex);
  }

  _checkGameOver(playerIndex,player) {

    const turns = this._turns;

    if (turns[0] && turns[1]) {
      this._sendToPlayers('Round over: ' + turns.join(' - '));
      this._getGameResult();
      this._turns = [null, null];
      this._round++;
      if(this._round > 5){
          this._sendToPlayers('________________________________________________________');
          this._sendToPlayers('Game is Over');
          if(this._DealerScore > this._SpotterScore){
            this._sendToPlayer(this._Dealer, "VICTORY!!!");
            this._sendToPlayer(this._Spotter, "DEFEAT!!!");
            this._sendToPlayers('Thanks for Playing......');

            this._players.forEach((player) => {
              player.disconnect(true);
            });

          } else {
            this._sendToPlayer(this._Spotter, "VICTORY!!!");
            this._sendToPlayer(this._Dealer, "DEFEAT!!!");
            this._sendToPlayers('Thanks for Playing.....');

            this._players.forEach((player) => {
              player.disconnect(true);
            });
          }
      }
      this._sendToPlayers('________________________________________________________');
      this._sendToPlayers('Round \r\n'+this._round);
      this._SwitchPlayers();
    }
  }

          //THIS IS THE FUNCTION TO SWITCH PLAYERS//
       //BUT THERE WERE DIFFICULTIES IMPLEMENTING IT //
  _SwitchPlayers() {
    if(this._Dealer == 0) {
      this._Dealer = 1;
      this._sendToPlayer(this._Dealer, "You are the Dealer");
      this._Spotter = 0;
      this._sendToPlayer(this._Spotter, "You are the Spotter");
    }else if(this._Dealer == 1){
      this.Dealer = 0;
      this._sendToPlayer(this._Dealer, "You are the Dealer");
      this.Spotter = 1;
      this._sendToPlayer(this._Spotter, "You are the Spotter");
    }
  }

  _getGameResult() {

    const p0 = this._decodeTurn(this._turns[0]);
    const p1 = this._decodeTurn(this._turns[1]);


    if(p0 == p1){
      this._SpotterScore++;
      this._sendToPlayer(this._Spotter, "You are the winner");
      this._sendToPlayer(this._Dealer, "You are the loser");
    } else {
      this._DealerScore++;
      this._sendToPlayer(this._Dealer, "You are the winner");
      this._sendToPlayer(this._Spotter, "You are the loser");
    }

    //this._sendWinMessage(this._players[0], this._players[1]);

    }


  _sendWinMessage(winner, loser) {
    winner.emit('message', 'You won!');
    loser.emit('message', 'You lost.');
    //winner.emit('message', 'Victory!');
  //  loser.emit('message', 'Defeat');
  }

  _decodeTurn(turn) {
    switch (turn) {
      case '1':
        return 1;
      case '2':
        return 2;
      case '3':
        return 3;
      default:
        throw new Error(`Could not decode turn ${turn}`);
    }
  }
}

module.exports = FindTheQueen;
