const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');



describe('Downgrade user test', () => {
    let token
    let userID = '629212873e064e49f55addc3'
    let moderatorID = '629212873e064e49f55addc4'
    let pendingID = '629212873e064e49f55addc5'
    beforeAll( async () => {
        jest.setTimeout(100000);
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
            },
            {
                "_id": {"$oid": "629212873e064e49f55addc4"},
                "email": "moderator@gmail.com",
                "passwordHash": "9c142d288c143c208a43afd5aa48a4d64f4f3da1c73770f8f30cdefdedf631af",
                "passwordSalt": "kxKto29XMW9KUvyoCxA1mA==",
                "joinDate": {"$date": {"$numberLong": "1653740167601"}},
                "userType": "moderator",
                "username": "moderator",
                "subscription": {
                    "subType": "nerd",
                    "area": "",
                    "creationDate": {"$date": {"$numberLong": "1653740167601"}},
                    "lastPayment": {"$date": {"$numberLong": "1653740167601"}}
                },
                "savedDocuments": [],
                "avatar": {},
                "__v": {"$numberInt": "8"}
            },
            {
                "_id": {"$oid": "629212873e064e49f55addc5"},
                "email": "pending@gmail.com",
                "passwordHash": "9c142d288c143c208a43afd5aa48a4d64f4f3da1c73770f8f30cdefdedf631af",
                "passwordSalt": "kxKto29XMW9KUvyoCxA1mA==",
                "joinDate": {"$date": {"$numberLong": "1653740167601"}},
                "userType": "pending",
                "username": "pending",
                "subscription": {
                    "subType": "nerd",
                    "area": "",
                    "creationDate": {"$date": {"$numberLong": "1653740167601"}},
                    "lastPayment": {"$date": {"$numberLong": "1653740167601"}}
                },
                "savedDocuments": [],
                "avatar": {},
                "__v": {"$numberInt": "8"}
            },

        ]).exec()


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
        mongoose.disconnect();
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('DOWNGRADE with non-moderator account', () => {
        return request(app)
            .patch('/api/v2/users/'+id+'/downgrade?token='+jwt.sign({
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
