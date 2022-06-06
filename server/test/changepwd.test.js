const request  = require('supertest');
const app      = require('../app');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');

describe('Change password test', () => {
    let token
    let invToken
    let id = "629212873e064e49f55addc4"
    beforeAll( async () => {
        jest.setTimeout(100000);

        invToken= jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'user',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

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
                "passwordHash": "de960487b954feff764fab74a2b022a406585e287e64ea1cbda0ae3809c69962",
                "passwordSalt": "7BaZDC9tAD+MCktX9yXFhw==",
                "joinDate": "2022-05-28T12:18:29.731Z",
                "userType": "user",
                "username": "User",
                "__v": 75
            }])
    })

    afterAll( async () => {
        mongoose.disconnect();
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('CHANGE PASSWORD with invalid user', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+invToken)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password',
                    newPassword: 'password1' }) 
            .expect(404);
    });
    
    test('CHANGE PASSWORD with wrong old password', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password_sbagliata',
                    newPassword: 'password1' }) 
            .expect(400);
    });

    test('CHANGE PASSWORD without old password', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ newPassword: 'password1' }) 
            .expect(400);
    });

    test('CHANGE PASSWORD without new password', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password' }) 
            .expect(400);
    });

    test('CHANGE PASSWORD to same as the old one', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password',
                    newPassword: 'password' }) 
            .expect(200);
    });

    test('CHANGE PASSWORD succesfully', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password',
                    newPassword: 'password1' }) 
            .expect(200);
    });

})
