const { getAllLaunches,
        addNewLaunch,
    existsLaunchWithId,
        abortLaunchById } = require('../../models/launches.model');

function httpGetAllLuanches(req,res) {

    return res.status(200).json(getAllLaunches());
}


function httpAddNewLaunch(req,res){
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
    addNewLaunch(launch);
    return res.status(201).json({"message":"Date saved to the Database","data":launch});
}


function httpAbortLaunch(req,res){
    const launchId = Number(req.params.Id);
    

    // launch doesn't exist
    if(!existsLaunchWithId(launchId)){


        return res.status(404).json({
            err: "Launch not found"
        });
    }


    // if launch does not exist
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
        
        

}
module.exports = {
    httpGetAllLuanches,
    httpAddNewLaunch,
    httpAbortLaunch
};