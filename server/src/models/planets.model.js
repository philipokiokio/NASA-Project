

const parse = require('csv-parse').parse;
const fs = require('fs');
const path = require('path');



const habitable =(planet) =>{
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    &&planet['koi_prad'] < 1.6;
}

const habitablePlanets =[];

function loadPlanetData(){

    return new Promise((resolve, reject) =>{
        fs.createReadStream(path.join(__dirname, '..', '..','data','kepler_data.csv'))
        .pipe(parse({
        comment: '#',
        columns: true
        }))
        .on('data', (data) =>{ 
            if (habitable(data))
                habitablePlanets.push(data);
            
        })
        .on('error', (err) =>{
            console.log(err);
            return err;
        })
        .on('end', ()=>{
            
            
            resolve();
        });
    });



}




function getAllPlanets(){
    return habitablePlanets;
}

module.exports = {
    loadPlanetData,
    getAllPlanets,
};