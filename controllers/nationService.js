const nationRepository = require("../models/nationModels");

async function getRoute(req, res) {
  const nationName = req.body.name;

  const found = await nationRepository.findOne({ name: nationName });
  res.json(found);
}

async function getAllRoute(req, res) {
  const foundList = await nationRepository.find();
  excludeNullInResponse(foundList);
  res.json(foundList);
}

async function postRoute(req, res) {
  const newNation = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    await nationRepository.create(newNation).then(() => {
      console.log(`Created ${newNation}`);
      res.json(newNation);
    });
  } catch (error) {
    console.log(error);
  }
}

async function putRoute(req, res) {
  const updateNation = {
    name: req.body.name,
    description: req.body.nescription,
  };

  const found = await nationRepository.findOne({ name: req.body.name });

  try {
    await nationRepository
      .updateOne(
        { name: found.name },
        { name: updateNation.name, description: updateNation.description }
      )
      .then(() => {
        console.log(`Updated ${updateNation}`);
        res.json(`Updated ${updateNation}`);
      });
  } catch (error) {
    console.log(error);
  }
}

async function delRoute(req, res) {
  const name = req.body.name;

  try {
    await nationRepository.findOneAndDelete({ name: name }).then(() => {
      console.log(`Deleted ${name}`);
      res.json(`Deleted ${name}`);
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

module.exports = { getRoute, getAllRoute, postRoute, putRoute, delRoute };
