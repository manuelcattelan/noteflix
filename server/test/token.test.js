const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');


describe('Document test (without documents)', () => {
    let token
    let invToken
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

        invToken = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'user',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },'wrong_secret', { expiresIn: 86400 });

    })


    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });

    test('TOKEN try to access token API without a token', () => {
        return request(app)
            .get('/api/v2/token')
            .send() 
            .expect(401);
    }); 

    test('TOKEN try to access token with an invalid token', () => {
        return request(app)
            .get('/api/v2/token?token='+invToken)
            .send() 
            .expect(403);
    });
    
    test('TOKEN try to access token with a valid token', () => {
        return request(app)
            .get('/api/v2/token?token='+token)
            .send() 
            .expect(200);
    });

})