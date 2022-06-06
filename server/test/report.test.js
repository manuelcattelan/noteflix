const request  = require('supertest');
const app      = require('../app');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');

describe('Report document test', () => {
    let docID = "6298b4da9498d878f934874b"
    let pendingDocID = "6298b4da9498d878f934874c"
    let authorID = '629212873e064e49f55addc3'
    let token
    beforeAll( async () => {
        jest.setTimeout(100000);
        
        token = jwt.sign({
            id: '629212873e064e49f55addc4',
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
                "author": authorID,
                "description": "TESTDOC",
                "area": "Fisica",
                "creationDate": "2022-06-02T13:02:18.217Z",
                "status": "public",
                "reported": [],
                "url": "https://noteflix.s3.eu-central-1.amazonaws.com/1654174935691.pdf",
                "__v": 5
            },{
                "_id": pendingDocID,
                "title": "TESTDOC ",
                "author": authorID,
                "description": "TESTDOC",
                "area": "Fisica",
                "creationDate": "2022-06-02T13:02:18.217Z",
                "status": "pending",
                "reported": [],
                "url": "https://noteflix.s3.eu-central-1.amazonaws.com/1654174935691.pdf",
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
    
    test('REPORT document with invalid ID', () => {
        return request(app)
            .patch('/api/v2/documents/hhhhhhhhhhhhhhh/repory?token='+token)
            .send() 
            .expect(400);
    });
    test('REPORT document with valid, but non existant ID', () => {
        return request(app)
            .patch('/api/v2/documents/6298a480ae458ccc9943fb2f/report?token='+token)
            .send() 
            .expect(404);
    });

    test('REPORT document posted by yourself', () => {
        return request(app)
        .patch('/api/v2/documents/'+docID+'/report?token='+jwt.sign({
            id: authorID,
            type: 'mentor',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(403);
        });

    test('REPORT document that is pending', () => {
        return request(app)
            .patch('/api/v2/documents/'+pendingDocID+'/report?token='+token)
            .send() 
            .expect(400);
    });
        
    test('REPORT document successfully', () => {
        return request(app)
            .patch('/api/v2/documents/'+docID+'/report?token='+token)
            .send() 
            .expect(200);
    });


    test('REPORT document that user previously reported', () => {
        return request(app)
            .patch('/api/v2/documents/'+docID+'/report?token='+token)
            .send() 
            .expect(200);
    });
})
