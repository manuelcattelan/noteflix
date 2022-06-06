const request  = require('supertest');
const app      = require('../app');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');

describe('Like/dislike document test', () => {
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
                "author": '629212873e064e49fa5addca',
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
    
    test('VOTE document with invalid ID', () => {
        return request(app)
            .patch('/api/v2/documents/hhhhhhhhhhhhhhh/like?token='+token)
            .send() 
            .expect(400);
    });

    test('VOTE document with valid but non existant ID', () => {
        return request(app)
            .patch('/api/v2/documents/629212873e064e49fa5addca/like?token='+token)
            .send() 
            .expect(404);
    });

    test('VOTE send invalid vote', () => {
        return request(app)
            .patch('/api/v2/documents/'+docID+'/aaaaaa?token='+token)
            .send() 
            .expect(400);
    });

    test('LIKE like document with no likes', () => {
        return request(app)
            .patch('/api/v2/documents/'+docID+'/like?token='+token)
            .send() 
            .expect(200,{ success: true, rating: 'liked', like: 1, dislike: 0 });
    });

    test('VOTE unlike previusly liked document ', () => {
        return request(app)
            .patch('/api/v2/documents/'+docID+'/like?token='+token)
            .send() 
            .expect(200, { success: true, rating: 'none', like: 0, dislike: 0 });
    });

    test('VOTE dislike document with no dislikes', () => {
        return request(app)
            .patch('/api/v2/documents/'+docID+'/dislike?token='+token)
            .send() 
            .expect(200, { success: true, rating: 'disliked', like: 0, dislike: 1 });
    });

    test('VOTE undilike previusly disliked document ', () => {
        return request(app)
            .patch('/api/v2/documents/'+docID+'/dislike?token='+token)
            .send() 
            .expect(200,  { success: true, rating: 'none', like: 0, dislike: 0 });
    });

    test('VOTE like previusly disliked document ', () => {
        request(app).patch('/api/v2/documents/'+docID+'/dislike?token='+token)
        return request(app)
            .patch('/api/v2/documents/'+docID+'/like?token='+token)
            .send() 
            .expect(200,  { success: true, rating: 'liked', like: 1, dislike: 0 });
    });

    test('VOTE dislike previusly liked document ', () => {
        return request(app)
            .patch('/api/v2/documents/'+docID+'/dislike?token='+token)
            .send() 
            .expect(200,  { success: true, rating: 'disliked', like: 0, dislike: 1 });
    });

})
