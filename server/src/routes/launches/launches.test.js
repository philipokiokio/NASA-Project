const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const mongo_url = process.env.MONGO_URL;
const app = require('../../app.js');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const { loadPlanetData } = require('../../models/planets.model.js');



describe('Launches API', () =>{
    beforeAll(async ()=>{
        await mongoConnect();
        await loadPlanetData();
    });
    afterAll(async ()=>{
        await mongoDisconnect();
    });

    describe("Test GET /launches", ()=>{

        test("It should respond with 200 success", async () =>{
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type',/json/)
            .expect(200);
        });
    });
    
    
    describe("Test POST /lunches", ()=>{
        const completeLaunchData = {
            mission: "USS enterprise",
            rocket: "Ncc 1701-D",
            target: "Kepler-442 b",
            launchDate: "January 4, 2048",
        }
    
        const launchDataNoDate = {
            mission: "USS enterprise",
            rocket: "Ncc 1701-D",
            target: "Kepler-442 b",
    
        }
        const completeInvalidData = {
            mission: "USS enterprise",
            rocket: "Ncc 1701-D",
            target: "Kepler-442 b",
            launchDate: "soots",
        }
    
        test("It should respond with 201 created", async() =>{
            const response = await request(app)
                            .post('/v1/launches')
                            .send(completeLaunchData)
                            .expect("Content-Type",/json/)
                            .expect(201);
            
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            
            const responseDate =new Date (response.body.data.launchDate).valueOf();
    
            expect(responseDate).toBe(requestDate);
    
    
        });
        test("It should catch missing required properties", async () =>{
            const response = await request(app)
                                    .post('/v1/launches')
                                    .send(launchDataNoDate)
                                    .expect('Content-Type', /json/)
                                    .expect(400);
            expect(response.body).toStrictEqual({
                error: "some fields are missing"
            })
    
    
        });
        test("It should catch invalid dates",async () =>{
            const response = await request(app)
            .post('/v1/launches')
            .send(completeInvalidData)
            .expect('Content-Type', /json/)
            .expect(400);
            
            expect(response.body).toStrictEqual({
            error: "Invalid Launch Date"
            })
    
        });
    })    
})