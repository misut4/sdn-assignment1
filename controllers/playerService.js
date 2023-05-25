const playerRepository = require("../models/playerModels");

async function getRoute(req, res) {
  const playerId = req.params._id;

  const found = await playerRepository.findOne({ _id: playerId }).catch(() => {
    console.log("sth went wrong");
  });
  res.json(found);
}

async function getAllRoute(req, res) {
  const foundList = await playerRepository.find();
  excludeNullInResponse(foundList);
  // res.json(foundList);
  const headers = await setTableHeader();
  res.render("playerView.pug", { list: foundList, headers: headers });
}

async function postRoute(req, res) {
  const newplayer = {
    name: req.body.name,
    imageURL: req.body.imageURL,
    club: req.body.club,
    position: req.body.position,
    goal: req.body.goal,
    isCaptain: req.body.isCaptain,
  };

  try {
    await playerRepository.create(newplayer).then(() => {
      console.log(`Created ${newplayer}`);
      // res.json(newplayer);
      getAllRoute(req, res);
    });
  } catch (error) {
    console.log(error);
  }
}

async function putRoute(req, res) {
  const playerId = req.params._id;
  const updateplayer = {
    name: req.body.name,
    imageURL: req.body.imageURL,
    club: req.body.club,
    position: req.body.position,
    goal: req.body.goal,
    isCaptain: req.body.isCaptain,
  };

  const found = await playerRepository.findOne({ _id: playerId });

  try {
    await playerRepository.updateOne(
      { _id: playerId },
      {
        name: updateplayer.name,
        imageURL: updateplayer.imageURL,
        club: updateplayer.club,
        position: updateplayer.position,
        goal: updateplayer.goal,
        isCaptain: updateplayer.isCaptain,
      }
    );
    // res.json(`Updated ${updateplayer}`);
    getAllRoute(req, res);
  } catch (error) {
    console.log(error);
  }
}

async function delRoute(req, res) {
  const playerId = req.params._id;
  try {
    await playerRepository.findOneAndDelete({ _id: playerId }).then(() => {
      // res.json(`Deleted ${name}`);
      getAllRoute(req, res);
    });
  } catch (error) {
    console.log(error);
  }
}

async function excludeNullInResponse(foundList) {
  foundList.forEach((object) => {
    for (const [key, value] of Object.entries(object)) {
      if (value === null) {
        delete object[key];
      }
    }
  });

  return foundList;
}

async function setTableHeader() {
  const headers = [
    "[_id]",
    "[name]",
    "[imageURL]",
    "[club]",
    "[position]",
    "[goal]",
    "[isCaptain]",
  ];

  return headers;
}

module.exports = { getRoute, getAllRoute, postRoute, putRoute, delRoute };
