const express = require('express');
const { httpGetAllLuanches,
        httpAddNewLaunch,
        httpAbortLaunch } = require('./launches.controller');


const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLuanches);

launchesRouter.post('/',httpAddNewLaunch);


launchesRouter.delete('/:Id', httpAbortLaunch);

module.exports = launchesRouter;