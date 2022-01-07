const Launches = require('./launches.mongo');
const planets = require('./planets.mongo');


const DEFAULT_FLIGHTNO = 100;



const launches = new Map();


let latestFlightNumber = 100;


const launch = {
    flightNumber: 100,
    mission:"Kepler Exploration X",
    rocket: "Exloration IS1",
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers:['NASA','ZTM',],
    upcoming:true,
    success: true,
}

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId){

    return await Launches.findOne({
        flightNumber: launchId
    })

}

async function getLatestFlightNumber(){
    const latestLaunch = await Launches.findOne({}).sort('-flightNumber')

    if(!latestLaunch){

        return DEFAULT_FLIGHTNO;

    }
    return await latestLaunch.flightNumber;

}

async function getAllLaunches(){
    return await Launches.find({},{'_id':0,'__v':0});
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target
    });
    if(!planet){
        throw new Error('No matching Planet found');
    }
    await Launches.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    },launch,{upsert:true})
}

async function scheduleNewLaunch(launch){
    const newFlightNumber = await getLatestFlightNumber() + 1;


    const newLaunch = Object.assign(launch,{
        success: true,
        upcoming: true,
        customers :[
            'NASA','Zero To Mastery'
        ],
        flightNumber: newFlightNumber
    });
    await saveLaunch(newLaunch)

}




async function abortLaunchById(launchId){
    const aborted = await Launches.updateOne({
        flightNumber:launchId
    }, {
        upcoming:false,
        success:false
    });

    return aborted.modifiedCount === 1;

}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById
} 