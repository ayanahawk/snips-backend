require('dotenv').config();
const request = require('supertest');
const app = require('../app.js');
const dbInit = require('../db/init');
const db=require('../db/index');


beforeAll(async () => {
    await dbInit.createTables();
    await dbInit.seedAuthors();
    await dbInit.seedSnippets();
})


describe('Snippets', () => {
    describe('GET /ai/snips', () => {
        it('should get all of the snips', async () => {
            const response= await request(app).get('/api/snippets')

            //expect two rows
            expect(response.body.length).toBe(2)
            //test some things

            expect(response.status).toBe(200);
            expect(response.body.length).toBeFalsy();
            expect(response.body).toMatchSnapshot(); 
            request(app).get("/api/snippets");
            console.log(response.body)
        })
    })

});

//cleanup 
afterall(()=>{
    //closr the db pool
db.end();
})