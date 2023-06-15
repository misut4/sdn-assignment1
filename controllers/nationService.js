const nationRepository = require("../models/nationModels");

async function getRoute(req, res) {
  const nationId = req.params._id;

  const found = await nationRepository.findOne({ _id: nationId }).catch(() => {
    console.log("sth went wrong");
  });

  // res.json(found);
  res.render("nationForm.ejs", { nation: found });
}

async function getAllRoute(req, res) {
  const foundList = await nationRepository.find();
  excludeNullInResponse(foundList);
  // res.json(foundList);
  const headers = await setTableHeader();
  res.render("nationView.ejs", { list: foundList, headers: headers });
}

async function postRoute(req, res) {
  const newNation = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    await nationRepository.create(newNation).then(() => {
      console.log(`Created ${newNation}`);
      // res.json(newNation);
      getAllRoute(req, res);
    });
  } catch (error) {
    console.log(error);
  }
}

async function putRoute(req, res) {
  const nationId = req.params._id;
  const updateNation = {
    name: req.body.name,
    description: req.body.description,
  };

  const found = await nationRepository.findOne({ _id: nationId });

  try {
    await nationRepository.updateOne(
      { _id: nationId },
      {
        name: updateNation.name,
        description: updateNation.description,
      }
    );
    // res.json(`Updated ${updateNation}`);
    getAllRoute(req, res);
  } catch (error) {
    console.log(error);
  }
}

async function delRoute(req, res) {
  const nationId = req.params._id;

  try {
    await nationRepository.findOneAndDelete({ _id: nationId }).then(() => {
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
  const headers = ["[_id]", "[name]", "[description]"];

  return headers;
}

module.exports = { getRoute, getAllRoute, postRoute, putRoute, delRoute };
