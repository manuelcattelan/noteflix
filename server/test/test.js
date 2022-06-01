const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('GET /api/v1/documents', () => {
    beforeAll( async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        db_connection = await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database successfully connected!");
    })

    afterAll( async () => {
        mongoose.disconnect();
        console.log("Database connection successfully closed.");
    })
    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    test('GET / should return 200', () => {
        return request(app)
            .get('/api/v1/documents')
            .expect(200);
    });
})
