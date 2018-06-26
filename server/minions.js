const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase
} = require('./db');

//Param for minionId
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    req.status(404).send();
  }
});

//GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

//POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  if (newMinion) {
    res.status(201).send(newMinion);
  } else {
    res.status(404).send();
  }
});

//GET /api/minions/minionId to get a single minion by Id.
minionsRouter.get('/:minionId', (req, res, next) => {
  req.send(req.minion);
});

//PUT /api/minions/:minionId to update a single minion by id.



//DELETE /api/minions/:minionId to delete a single minion by id.
