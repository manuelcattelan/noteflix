const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');

describe('Change password test', () => {
    let token
    let invToken
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
            id: '629212873e064e49f55addc3',
            type: 'user',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

        const Document = require('../models/documentModel');

        //mock find user function to return a mock user
        documentSpy = jest.spyOn(Document, 'findById').mockImplementation((criterias) => {
            let ret
            if (criterias=='6298a480ae458ccc9943fb26')
                ret = mockDocument
            return {exec: ()=> { return ret; }};
        });

        //prevent saving to actual database
        mockSaveDocument = jest.spyOn(Document.prototype, 'save').mockImplementation(async (criterias) => {
            return true;
        });
    })

    afterAll( async () => {
        documentSpy.mockRestore();
        mockSaveDocument.mockRestore();
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('CHANGE PASSWORD with invalid user', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password',
                    newPassword: 'password1' }) 
            .send() 
            .expect(404);
    });
    
    test('CHANGE PASSWORD with wrong old password', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password_sbagliata',
                    newPassword: 'password1' }) 
            .send() 
            .expect(400);
    });

    test('CHANGE PASSWORD without old password', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ newPassword: 'password1' }) 
            .send() 
            .expect(400);
    });

    test('CHANGE PASSWORD to same as the old one', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password',
                    newPassword: 'password' }) 
            .send() 
            .expect(200);
    });

    test('CHANGE PASSWORD succesfully', () => {
        return request(app)
            .patch('/api/v2/users/changePassword?token='+token)
            .set('Accept', 'application/json')
            .send({ oldPassword: 'password',
                    newPassword: 'password1' }) 
            .send() 
            .expect(200);
    });

})
