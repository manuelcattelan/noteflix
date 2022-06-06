const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');


describe('Login/signup test (authHandler)', () => {
    let userSpy;
    let userSaveSpy;
    beforeAll( async () => {
        jest.setTimeout(100000);

        const User = require('../models/userModel');

        //mock find user function to return a mock user
        userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
            let ret;
            if (criterias.email=="utente@gmail.com")
                ret = { "email":"utente@gmail.com",
                        "passwordHash":"9c142d288c143c208a43afd5aa48a4d64f4f3da1c73770f8f30cdefdedf631af", //password is 'password'
                        "passwordSalt":"kxKto29XMW9KUvyoCxA1mA=="
                    }
            return {exec: ()=> { return  ret; }};
        });

        //mock save function to prevent writes to DB
        userSaveSpy = jest.spyOn(User.prototype, 'save').mockImplementation(async (criterias) => {
            return true;
        });
    })
    
    afterAll( async () => {
        userSpy.mockRestore();
        userSaveSpy.mockRestore();
    })
    
    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });

    test('LOGIN / Should return 200', () => {
        return request(app)
            .post('/api/v2/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utente@gmail.com', password: 'password' }) 
            .expect(200);
    });
    test('LOGIN / Without password return 400', () => {
        return request(app)
            .post('/api/v2/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utente@gmail.com' }) 
            .expect(400);
    });
    test('LOGIN / Without email return 400', () => {
        return request(app)
            .post('/api/v2/auth/login')
            .set('Accept', 'application/json')
            .send({ password: 'password' }) 
            .expect(400);
    });
    test('LOGIN / With non-registered email return 400', () => {
        return request(app)
            .post('/api/v2/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utente_falso@gmail.com', password: 'password' }) 
            .expect(400);
    });
    test('LOGIN / with invalid email return 400', () => {
        return request(app)
            .post('/api/v2/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utent7/egmail.com', password: 'password'}) 
            .expect(400);
    });
    test('LOGIN / with invalid password return 400', () => {
        return request(app)
            .post('/api/v2/auth/login')
            .set('Accept', 'application/json')
            .send({ email: 'utente@gmail.com', password: 'password_sbagliata'}) 
            .expect(400);
    });

    // SIGNUP
    test('SIGNUP / with already used email should return 400', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'utente@gmail.com', 
                    password: 'password',
                    subscriptionType: "nerd",
                    avatar: " ",
                    username: 'Utente TEST'
                }) 
            .expect(400);
    });
    test('SIGNUP / with invalid email format should return 400', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'utent7/egmail.com', 
                    password: 'password',
                    subscriptionType: "nerd",
                    avatar: " ",
                    username: 'Utente TEST'
                }) 
            .expect(400);
    });

    test('SIGNUP / With invalid subscription plan', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'uetnte2@yahoo.com', 
                    password: 'password',
                    subscriptionType: "falso",
                    avatar: " ",
                    username: 'Utente TEST'
                 }) 
            .expect(400);
    });

    test('SIGNUP / with new email should return 201', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'uetnte2@yahoo.com', 
                    password: 'password',
                    subscriptionType: "nerd",
                    avatar: " ",
                    username: 'Utente TEST'
                 }) 
            .expect(201);
    });

    test('SIGNUP / with missing email', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ password: 'password',
                    subscriptionType: "nerd",
                    avatar: " ",
                    username: 'Utente TEST'
                 }) 
            .expect(400);
    });

    test('SIGNUP / with missing password', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'uetnte2@yahoo.com', 
                    password: '',
                    subscriptionType: "nerd",
                    avatar: " ",
                    username: 'Utente TEST'
                 }) 
            .expect(400);
    });

    test('SIGNUP / with missing subscription', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'uetnte2@yahoo.com', 
                    password: 'password',
                    subscriptionType: "",
                    avatar: " ",
                    username: 'Utente TEST'
                 }) 
            .expect(400);
    });
    test('SIGNUP / with missing scubscription area in "studenti" plan', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'uetnte2@yahoo.com', 
                    password: 'password',
                    subscriptionType: "studenti",
                    avatar: " ",
                    username: 'Utente TEST'
                 }) 
            .expect(400);
    });
    test('SIGNUP / with missing avatar', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'uetnte2@yahoo.com', 
                    password: 'password',
                    subscriptionType: "nerd",
                    username: 'Utente TEST'
                 }) 
            .expect(400);
    });
    test('SIGNUP / with missing username', () => {
        return request(app)
            .post('/api/v2/auth/signup')
            .set('Accept', 'application/json')
            .send({ email: 'uetnte2@yahoo.com', 
                    password: 'password',
                    subscriptionType: "nerd",
                    avatar: " ",
                    username: ''
                 }) 
            .expect(400);
    });


})  
