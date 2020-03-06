const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/userController');
const ReController = require('./controllers/reController');
const middlewares = require('./middlewares/auth');

routes.post("/", UserController.store);
routes.post("/register", ReController.store);
routes.get("/home", middlewares, ReController.show);

module.exports = routes;