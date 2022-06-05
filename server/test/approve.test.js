const request  = require('supertest');
const app      = require('../app');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');

describe('Approve document test', () => {
    let documentSpy
    let token
    
    let reportedDocID = "6298b4da9498d878f934874b"
    let pendingDocID = "6298b4da9498d878f934874c"
    
    beforeAll( async () => {
        jest.setTimeout(100000);

        token = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'moderator',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

        connection = await  mongoose.connect(process.env.TEST_DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

        const Document = require('../models/documentModel.js');

        await Document.deleteMany({}).exec();
        await Document.insertMany([{
                "_id": reportedDocID,
                "title": "TESTDOC ",
                "author": '629212873e064e49fa5addca',
                "description": "TESTDOC",
                "area": "Fisica",
                "creationDate": "2022-06-02T13:02:18.217Z",
                "status": "public",
                "reported": ['629212873e064e49fa5addc3'],
                "url": "https://noteflix.s3.eu-central-1.amazonaws.com/1654174935691.pdf",
                "__v": 5
            },{
                "_id": pendingDocID,
                "title": "TESTDOC ",
                "author": '629212873e064e49fa5addca',
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
        
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('APPROVE document with invalid ID', () => {
        return request(app)
            .patch('/api/v2/documents/hhhhhhhhhhhhhhh/validate?token='+token)
            .send() 
            .expect(400);
    });
    test('APPROVE document with valid, but non existant ID', () => {
        return request(app)
            .patch('/api/v2/documents/6298a480ae458ccc9943fb2f/validate?token='+token)
            .send() 
            .expect(404);
    });
    test('APPROVE document without a moderator account', () => {
        return request(app)
            .patch('/api/v2/documents/'+pendingDocID+'/validate?token='+jwt.sign({
                id: '629212873e064e49f55addc3',
                type: 'user',
                subscription: {
                    type: 'nerd',
                    area: ''
                }
            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(403);
    });

    test('APPROVE document successfully', () => {
        return request(app)
            .patch('/api/v2/documents/'+pendingDocID+'/validate?token='+token)
            .send() 
            .expect(200);
    });

    test('APPROVE document that is already public', () => {
        return request(app)
            .patch('/api/v2/documents/'+pendingDocID+'/validate?token='+token)
            .send() 
            .expect(400);
    });

    test('APPROVE document that has been reported', () => {
        return request(app)
            .patch('/api/v2/documents/'+reportedDocID+'/validate?token='+token)
            .send() 
            .expect(200);
    });

    test('APPROVE second document that has been reported', () => {
        return request(app)
            .patch('/api/v2/documents/'+reportedDocID+'/validate?token='+token)
            .send() 
            .expect(400);
    });

})
