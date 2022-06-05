const request  = require('supertest');
const app      = require('../app');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');


describe('Request upgrade to mentor test', () => {
    let token
    let id = "629213153660aff1889873ea"
    let mentorid = "629213153660aff18898a3ea"
    let connection
    beforeAll( async () => {
        jest.setTimeout(100000);

        token = jwt.sign({
            id: id,
            type: 'user',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

        connection = await  mongoose.connect(process.env.TEST_DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

        const User = require('../models/userModel.js');

        await User.deleteMany({}).exec();
        await User.insertMany([
            {
                "subscription": {
                    "subType": "nerd",
                    "area": "",
                    "creationDate": "2022-05-28T12:18:29.731Z",
                    "lastPayment": "2022-05-28T12:18:29.731Z"
                },
                "avatar": {},
                "_id": id,
                "email": "user@gmail.com",
                "passwordHash": "cca581732cf13327e5f96143b3f9e273ed6f5f3053f355bf750f433ab7f419a5",
                "passwordSalt": "0xCjdsPwxwk9JEGfwivBBw==",
                "joinDate": "2022-05-28T12:18:29.731Z",
                "userType": "user",
                "username": "User",
                "__v": 75
            },{
                "subscription": {
                    "subType": "nerd",
                    "area": "",
                    "creationDate": "2022-05-28T12:18:29.731Z",
                    "lastPayment": "2022-05-28T12:18:29.731Z"
                },
                "avatar": {},
                "_id": mentorid,
                "email": "mentor@gmail.com",
                "passwordHash": "cca581732cf13327e5f96143b3f9e273ed6f5f3053f355bf750f433ab7f419a5",
                "passwordSalt": "0xCjdsPwxwk9JEGfwivBBw==",
                "joinDate": "2022-05-28T12:18:29.731Z",
                "userType": "mentor",
                "username": "mentor",
                "__v": 75
            }
        ])

    })

    afterAll( async () => {
        mongoose.disconnect();
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('MENTOR REQUEST with invalid user in token', () => {
        return request(app)
            .patch('/api/v2/users/userToMentor?token='+jwt.sign({
                id: '629212873e064e49f55addc3',
                type: 'user',
                subscription: {
                    type: 'nerd',
                    area: ''
                }
            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(404);
    });

    test('MENTOR REQUEST with non basic user', () => {
        return request(app)
            .patch('/api/v2/users/userToMentor?token='+jwt.sign({
                id: mentorid,
                type: 'user',
                subscription: {
                    type: 'nerd',
                    area: ''
                }
            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(403);
    });

    test('MENTOR REQUEST succesfully', () => {
        return request(app)
            .patch('/api/v2/users/userToMentor?token='+token)
            .send() 
            .expect(200);
    });

    test('MENTOR REQUEST after already requesting', () => {
        return request(app)
            .patch('/api/v2/users/userToMentor?token='+token)
            .send() 
            .expect(403);
    });



})
