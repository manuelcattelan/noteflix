const request  = require('supertest');
const app      = require('../app');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');
require('dotenv').config()

describe('Downgrade user test', () => {
    let token
    let connection
    let userID = '629213153660aff1889873e8'
    let moderatorID = '629213153660aff1889873e7'
    let mentorID = '629213153660aff188987319'
    let pendingID = '629213153660aff1889873e9'
    
    
    beforeAll( async () => {
        jest.setTimeout(80000);
        jest.unmock('mongoose');
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
                "_id": "629213153660aff1889873e7",
                "email": "moderatore@gmail.com",
                "passwordHash": "cca581732cf13327e5f96143b3f9e273ed6f5f3053f355bf750f433ab7f419a5",
                "passwordSalt": "0xCjdsPwxwk9JEGfwivBBw==",
                "joinDate": "2022-05-28T12:18:29.731Z",
                "userType": "moderator",
                "username": "Giulia",
                "__v": 75
            },{
                "subscription": {
                    "subType": "nerd",
                    "area": "",
                    "creationDate": "2022-05-28T12:18:29.731Z",
                    "lastPayment": "2022-05-28T12:18:29.731Z"
                },
                "avatar": {},
                "_id": "629213153660aff1889873e8",
                "email": "utente@gmail.com",
                "passwordHash": "cca581732cf13327e5f96143b3f9e273ed6f5f3053f355bf750f433ab7f419a5",
                "passwordSalt": "0xCjdsPwxwk9JEGfwivBBw==",
                "joinDate": "2022-05-28T12:18:29.731Z",
                "userType": "user",
                "username": "Utente",
                "__v": 75
            },{
                "subscription": {
                    "subType": "nerd",
                    "area": "",
                    "creationDate": "2022-05-28T12:18:29.731Z",
                    "lastPayment": "2022-05-28T12:18:29.731Z"
                },
                "avatar": {},
                "_id": "629213153660aff1889873e9",
                "email": "pending@gmail.com",
                "passwordHash": "cca581732cf13327e5f96143b3f9e273ed6f5f3053f355bf750f433ab7f419a5",
                "passwordSalt": "0xCjdsPwxwk9JEGfwivBBw==",
                "joinDate": "2022-05-28T12:18:29.731Z",
                "userType": "pending",
                "username": "pendning",
                "__v": 75
            },{
                "subscription": {
                    "subType": "nerd",
                    "area": "",
                    "creationDate": "2022-05-28T12:18:29.731Z",
                    "lastPayment": "2022-05-28T12:18:29.731Z"
                },
                "avatar": {},
                "_id": "629213153660aff188987319",
                "email": "mentor@gmail.com",
                "passwordHash": "cca581732cf13327e5f96143b3f9e273ed6f5f3053f355bf750f433ab7f419a5",
                "passwordSalt": "0xCjdsPwxwk9JEGfwivBBw==",
                "joinDate": "2022-05-28T12:18:29.731Z",
                "userType": "mentor",
                "username": "mentor",
                "__v": 75
            }
        ])


        token = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'moderator',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

    })

    afterAll( async () => {
        mongoose.connection.close(true);
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('DOWNGRADE with non-moderator account', () => {
        return request(app)
            .patch('/api/v2/users/'+pendingID+'/downgrade?token='+jwt.sign({
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

    test('DOWNGRADE invalid user ID format', () => {
        return request(app)
            .patch('/api/v2/users/hhhhhhhhhhhh/downgrade?token='+token)
            .send() 
            .expect(400);
    });

    test('DOWNGRADE valid but non existant ID', () => {
        return request(app)
            .patch('/api/v2/users/629212873e064e49f55addc1/downgrade?token='+token)
            .send() 
            .expect(404);
    });

    test('DOWNGRADE basic user', () => {
        return request(app)
            .patch('/api/v2/users/'+userID+'/downgrade?token='+token)
            .send() 
            .expect(400);
    });

    test('DOWNGRADE moderator user', () => {
        return request(app)
            .patch('/api/v2/users/'+moderatorID+'/downgrade?token='+token)
            .send() 
            .expect(400);
    });

    test('DOWNGRADE pending user', () => {
        return request(app)
            .patch('/api/v2/users/'+pendingID+'/downgrade?token='+token)
            .send() 
            .expect(200);
    });

    test('DOWNGRADE mentor user', () => {
        return request(app)
            .patch('/api/v2/users/'+mentorID+'/downgrade?token='+token)
            .send() 
            .expect(200);
    });
})
