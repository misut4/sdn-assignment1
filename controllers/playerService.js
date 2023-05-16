let dataSetPlayer = require("../dataSetPlayer");

async function getRoute(req, res) {
  const playerId = req.body.playerId;
  dataSetPlayer.forEach((player) => {
    if (player.playerId === playerId) {
      res.send(player);
    }
  });
}

async function getAllRoute(req, res) {
  excludeNullInResponse()
  res.send(dataSetPlayer);
}

async function postRoute(req, res) {
  const newPlayer = {
    playerId: req.body.playerId,
    playerName: req.body.playerName,
  };

  let found = false;

  dataSetPlayer.forEach((player) => {
    if (player.playerId === newPlayer.playerId) {
      found = true;
    }
  });

  if (found) {
    res.send(`${newPlayer.playerId} already exists`);
  } else {
    dataSetPlayer.push(newPlayer);
    res.send(dataSetPlayer);
  }
}

async function putRoute(req, res) {
  const updatePlayer = {
    playerId: req.body.playerId,
    playerName: req.body.playerName,
  };

  dataSetPlayer.forEach((player) => {
    if (player.playerId === updatePlayer.playerId) {
      player.playerId = updatePlayer.playerId;
      player.playerName = updatePlayer.playerName;
    }
  });

  res.send(dataSetPlayer);
}

async function delRoute(req, res) {
  const playerId = req.body.playerId;
  dataSetPlayer.forEach((player) => {
    if (player.playerId === playerId) {
      player.playerId = null;
      player.playerName = null;
    }
  });
  res.send(`${playerId} deleted successfully`);
}

async function excludeNullInResponse(){
  const newDataSetPlayer = dataSetPlayer?.filter((object) => object.playerId !== null)
  dataSetPlayer = newDataSetPlayer
}

module.exports = { getRoute, getAllRoute, postRoute, putRoute, delRoute };
