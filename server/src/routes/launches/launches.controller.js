const { getAllLaunches,
        scheduleNewLaunch,
        existsLaunchWithId,
        abortLaunchById 
        } = require('../../models/launches.model');

const { getPagination } = require('../../services/query');


async function httpGetAllLuanches(req,res) {
    const {skip, limit } = getPagination(req.query);
    const launches =await getAllLaunches(skip,limit);
    return res.status(200).json(launches);
}


async function httpAddNewLaunch(req,res){
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){

        return res.status(400).json({"error": "some fields are missing"})
    }

    launch.launchDate = new Date(launch.launchDate);
    if( launch.launchDate.toString() === 'Invalid Date'){
        return res.status(400).json({
            error: "Invalid Launch Date"
        })
    }   
    await scheduleNewLaunch(launch);
    return res.status(201).json({"message":"Date saved to the Database","data":launch});
}


async function httpAbortLaunch(req,res){
    const launchId = Number(req.params.Id);
    const existsLaunch=await existsLaunchWithId(launchId)

    // launch doesn't exist
    if(!existsLaunch){
        return res.status(404).json({
            err: "Launch not found"
        });
    }


    // if launch does not exist
    const aborted = await abortLaunchById(launchId);
    console.log(aborted)
    if (!aborted){

        console.log('wetin')
        return res.status(400).json({
            error:'Launch not aborted'
        })
    }
    return res.status(200).json( {ok: true, 
            data:aborted});
        
        

}
module.exports = {
    httpGetAllLuanches,
    httpAddNewLaunch,
    httpAbortLaunch
};