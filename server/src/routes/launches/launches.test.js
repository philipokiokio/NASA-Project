const request = require('supertest');
const app = require('../../app.js');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')


describe('Launches API', () =>{
    beforeAll(async ()=>{
        await mongoConnect();
    });
    afterAll(async ()=>{
        await mongoDisconnect();
    });

    describe("Test GET /launches", ()=>{

        test("It should respond with 200 success", async () =>{
            const response = await request(app)
            .get('/launches')
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
                            .post('/launches')
                            .send(completeLaunchData)
                            .expect("Content-Type",/json/)
                            .expect(201);
            
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            
            const responseDate =new Date (response.body.data.launchDate).valueOf();
    
            expect(responseDate).toBe(requestDate);
    
    
        });
        test("It should catch missing required properties", async () =>{
            const response = await request(app)
                                    .post('/launches')
                                    .send(launchDataNoDate)
                                    .expect('Content-Type', /json/)
                                    .expect(400);
            expect(response.body).toStrictEqual({
                error: "some fields are missing"
            })
    
    
        });
        test("It should catch invalid dates",async () =>{
            const response = await request(app)
            .post('/launches')
            .send(completeInvalidData)
            .expect('Content-Type', /json/)
            .expect(400);
            
            expect(response.body).toStrictEqual({
            error: "Invalid Launch Date"
            })
    
        });
    })    
})