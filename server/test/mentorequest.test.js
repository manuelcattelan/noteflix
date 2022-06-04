const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');

describe('Request upgrade to mentor test', () => {
    let token
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

        db_connection = await mongoose.connect(process.env.TEST_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const User = require('../models/userModel');
        await User.deleteMany({}).exec();
        
        await User.insertMany([
            {
                "_id": {"$oid": "629212873e064e49f55addc3"},
                "email": "utente@gmail.com",
                "passwordHash": "9c142d288c143c208a43afd5aa48a4d64f4f3da1c73770f8f30cdefdedf631af",
                "passwordSalt": "kxKto29XMW9KUvyoCxA1mA==",
                "joinDate": {"$date": {"$numberLong": "1653740167601"}},
                "userType": "user",
                "username": "utentenerd",
                "subscription": {
                    "subType": "nerd",
                    "area": "",
                    "creationDate": {"$date": {"$numberLong": "1653740167601"}},
                    "lastPayment": {"$date": {"$numberLong": "1653740167601"}}
                },
                "savedDocuments": [],
                "avatar": {},
                "__v": {"$numberInt": "8"}
            }
        ]).exec()

    })

    afterAll( async () => {
        mongoose.disconnect();
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('MENTOR REQUEST with non-basic user account', () => {
        return request(app)
            .patch('/api/v2/users/userToMentor?token='+jwt.sign({
                id: '629212873e064e49f55addc3',
                type: 'mentor',
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
            .patch('/api/v2/users/userToMentor?token='+jwt.sign({
                id: '629212873e064e49f55addc3',
                type: 'user',
                subscription: {
                    type: 'nerd',
                    area: ''
                }
            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(200);
    });

    test('MENTOR REQUEST after already requesting', () => {
        return request(app)
            .patch('/api/v2/users/userToMentor?token='+jwt.sign({
                id: '629212873e064e49f55addc3',
                type: 'pending',
                subscription: {
                    type: 'nerd',
                    area: ''
                }
            },process.env.TOKEN_SECRET, { expiresIn: 86400 }))
            .send() 
            .expect(403);
    });



})
