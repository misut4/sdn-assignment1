let dataSetNation = require("../dataSetNation");

async function getRoute(req, res) {
  const nationId = req.body.nationId;
  dataSetNation.forEach((nation) => {
    if (nation.nationId === nationId) {
      res.send(nation);
    }
  });
}

async function getAllRoute(req, res) {
  excludeNullInResponse()
  res.send(dataSetNation);
}

async function postRoute(req, res) {
  const newNation = {
    nationId: req.body.nationId,
    nationName: req.body.nationName,
  };

  dataSetNation.forEach((nation) => {
    if (nation.nationId === newNation.nationId) {
      res.send("id already exists");
    }
  });
  dataSetNation.push(newNation);
  res.send(dataSetNation);
}

async function putRoute(req, res) {
  const updateNation = {
    nationId: req.body.nationId,
    nationName: req.body.nationName,
  };

  dataSetNation.forEach((nation) => {
    if (nation.nationId === updateNation.nationId) {
      nation.nationId = updateNation.nationId;
      nation.nationName = updateNation.nationName;
    }
  });

  res.send(dataSetNation);
}

async function delRoute(req, res) {
  const nationId = req.body.nationId;
  dataSetNation.forEach((nation) => {
    if (nation.nationId === nationId) {
      nation.nationId = null;
      nation.nationName = null;
    }
  });
  res.send(`${nationId} deleted successfully`);
}

async function excludeNullInResponse(){
  const newDataSet = dataSetNation?.filter((object) => object.nationId !== null)
  dataSetNation = newDataSet
}

module.exports = { getRoute, getAllRoute, postRoute, putRoute, delRoute };
