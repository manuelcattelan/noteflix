const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


describe('GET /api/v1/documents', () => {
    let userSpy;
    beforeAll( async () => {
        jest.setTimeout(8000);
        /*jest.unmock('mongoose');
        db_connection = await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database successfully connected!");*/

        const User = require('../models/userModel');
        userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
            let ret;
            if (criterias.email=="utente@gmail.com")
                ret = {"_id":{"$oid":"629212873e064e49f55addc3"},"email":"utente@gmail.com","passwordHash":"9c142d288c143c208a43afd5aa48a4d64f4f3da1c73770f8f30cdefdedf631af","passwordSalt":"kxKto29XMW9KUvyoCxA1mA==","joinDate":{"$date":{"$numberLong":"1653740167601"}},"userType":"user","username":"utentenerd","subscription":{"subType":"nerd","area":"","creationDate":{"$date":{"$numberLong":"1653740167601"}},"lastPayment":{"$date":{"$numberLong":"1653740167601"}}},"savedDocuments":[],"avatar":{"sex":"woman","faceColor":"#F9C9B6","earSize":"big","eyeStyle":"circle","noseStyle":"long","mouthStyle":"laugh","shirtStyle":"polo","glassesStyle":"none","hairColor":"#F48150","hairStyle":"womanLong","hatStyle":"none","hatColor":"#F48150","eyeBrowStyle":"up","shirtColor":"#6BD9E9","bgColor":"#74D153"},"__v":{"$numberInt":"8"}};
                   
            return {
                exec: function (){
                        return  ret;
                }
            }
        
        });
    })
    
    afterAll( async () => {
        mongoose.disconnect();
        console.log("Database connection successfully closed.");
        userSpy.mockRestore();
    })

    /*let token = jwt.sign({
        id: '629212873e064e49f55addc3',
        type: 'user',
        subscription: {
            type: 'nerd',
            area: ''
        }
    },process.env.TOKEN_SECRET, { expiresIn: 86400 });*/
    
    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    test('LOGIN / Should return 200', () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utente@gmail.com', password: 'password' }) 
            .expect(200);
    });
    test('LOGIN / Without password return 400', () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utente@gmail.com' }) 
            .expect(400);
    });
    test('LOGIN / Without username return 400', () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ password: 'password' }) 
            .expect(400);
    });
    test('LOGIN / with invalid email return 400', () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utent7/egmail.com', password: 'password'}) 
            .expect(400);
    });
    test('LOGIN / with invalid password return 400', () => {
        return request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utente@gmail.com', password: 'password_sbagliata'}) 
            .expect(400);
    });
})  
