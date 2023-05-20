const playerRepository = require("../models/playerModels");

async function getRoute(req, res) {
  const playerName = req.body.name;

  const found = await playerRepository.findOne({ name: playerName });
  res.json(found);
}

async function getAllRoute(req, res) {
  const foundList = await playerRepository.find();
  excludeNullInResponse(foundList);
  res.json(foundList);
}

async function postRoute(req, res) {
  const foundList = await playerRepository.find();
  excludeNullInResponse(foundList);
  res.json(foundList);
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
      res.json(newplayer);
    });
  } catch (error) {
    console.log(error);
  }
}

async function putRoute(req, res) {
  const updateplayer = {
    name: req.body.name,
    imageURL: req.body.imageURL,
    club: req.body.club,
    position: req.body.position,
    goal: req.body.goal,
    isCaptain: req.body.isCaptain,
  };

  const found = await playerRepository.findOne({ name: req.body.name });

  try {
    await playerRepository
      .updateOne(
        { name: found.name },
        {
          name: updateplayer.name,
          imageURL: updateplayer.imageURL,
          club: updateplayer.club,
          position: updateplayer.position,
          goal: updateplayer.goal,
          isCaptain: updateplayer.isCaptain,
        }
      )
      .then(() => {
        console.log(`Updated ${updateplayer}`);
        res.json(`Updated ${updateplayer}`);
      });
  } catch (error) {
    console.log(error);
  }
}

async function delRoute(req, res) {
  const name = req.body.name;

  try {
    await playerRepository.findOneAndDelete({ name: name }).then(() => {
      console.log(`Deleted ${name}`);
      res.json(`Deleted ${name}`);
    });
  } catch (error) {
    console.log(error);
  }

  return foundList;
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

module.exports = { getRoute, getAllRoute, postRoute, putRoute, delRoute };
