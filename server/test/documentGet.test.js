const request  = require('supertest');
const app      = require('../app');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');

describe('Get document test', () => {
    let token
    let docID = "6298b4da9498d878f934874c"
    
    beforeAll( async () => {
        jest.setTimeout(100000);

        token = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'user',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

        connection = await  mongoose.connect(process.env.TEST_DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

        const Document = require('../models/documentModel.js');

        await Document.deleteMany({}).exec();
        await Document.insertMany([{
                "_id": docID,
                "title": "TESTDOC ",
                "author": '629212873e064e49fa5addcb',
                "description": "TESTDOC",
                "area": "Fisica",
                "creationDate": "2022-06-02T13:02:18.217Z",
                "status": "public",
                "reported": ['629212873e064e49fa5addc3'],
                "url": "https://noteflix.s3.eu-central-1.amazonaws.com/1654174935691.pdf",
                "like": [],
                "dislike": [],
                "__v": 5
            }
       ])
        
    })

    afterAll( async () => {
        mongoose.disconnect();
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('GET document with invalid ID', () => {
        return request(app)
            .get('/api/v2/documents/hhhhhhhhhhhhhhh?token='+token)
            .send() 
            .expect(400);
    });

    test('GET document with valid but non existant ID', () => {
        return request(app)
            .get('/api/v2/documents/629212873e064e49fa5addca?token='+token)
            .send() 
            .expect(404);
    });

    test('GET document with without valid subscription', () => {
        return request(app)
            .get('/api/v2/documents/'+docID+'?token='+jwt.sign({
                id: '629212873e064e49f55addc3',
                type: 'user',
                subscription: {
                    type: 'matricole',
                    area: ''
                }
            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(403);
    });

    test('GET document with invalid subscription, but with author account', () => {
        return request(app)
            .get('/api/v2/documents/'+docID+'?token='+jwt.sign({
                id: '629212873e064e49fa5addcb',
                type: 'mentor',
                subscription: {
                    type: 'studenti',
                    area: 'Lettere'
                }
            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(200);
    });

    test('GET document with invalid subscription, but with moderator account', () => {
        return request(app)
            .get('/api/v2/documents/'+docID+'?token='+jwt.sign({
                id: '629212873e064e49fa5addc4',
                type: 'moderator',
                subscription: {
                    type: 'matricole',
                    area: ''
                }
            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(200);
    });
})
