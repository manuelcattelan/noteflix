const request  = require('supertest');
const app      = require('../app');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');

describe('Change subscrition test', () => {
    let token
    let connection
    let id = '629212873e064e49f55addc3'
    beforeAll( async () => {
        jest.setTimeout(100000);

        token = jwt.sign({
            id,
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
    
    test('CHANGE SUBSCIPTION with non existant user in token', () => {
        return request(app)
            .patch('/api/v2/users/changeSubsciption?token='+jwt.sign({
                                id: 'f29212873e064e49f55addc3',
                                type: 'user',
                                subscription: {
                                    type: 'nerd',
                                    area: ''
                                }
                            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'aaaaaaaaaaa',
                    subscriptionArea: 'Ingegneria Informatica, Informatica' }) 
            .expect(404);
    });

    test('CHANGE SUBSCIPTION with invalid plan', () => {
        return request(app)
            .patch('/api/v2/users/changeSubscription?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'aaaaaaaaaaa',
                    subscriptionArea: 'Ingegneria Informatica, Informatica' }) 
            .expect(400);
    });
    
    test('CHANGE SUBSCIPTION to student plan wih no area', () => {
        return request(app)
            .patch('/api/v2/users/changeSubscription?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'studenti',
                    subscriptionArea: '' }) 
            .expect(400);
    });

    test('CHANGE SUBSCIPTION to nerd plan', () => {
        return request(app)
            .patch('/api/v2/users/changeSubscription?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'nerd' }) 
            .expect(200);
    });

    test('CHANGE SUBSCIPTION to matricole plan', () => {
        return request(app)
            .patch('/api/v2/users/changeSubscription?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'matricole' }) 
            .expect(200);
    });

    test('CHANGE SUBSCIPTION to valid student plan ', () => {
        return request(app)
            .patch('/api/v2/users/changeSubscription?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'studenti',
                    subscriptionArea: 'Ingegneria Informatica, Informatica' }) 
            .expect(200);
    });

})
