const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');

describe('Change subscrition test', () => {
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
    
    test('CHANGE SUBSCIPTION with invalid plan', () => {
        return request(app)
            .patch('/api/v2/users/changeSubsciption?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'aaaaaaaaaaa',
                    subscriptionArea: 'Ingegneria Informatica, Informatica' }) 
            .send() 
            .expect(400);
    });
    
    test('CHANGE SUBSCIPTION with invalid plan', () => {
        return request(app)
            .patch('/api/v2/users/changeSubsciption?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'aaaaaaaaaaa',
                    subscriptionArea: 'Ingegneria Informatica, Informatica' }) 
            .send() 
            .expect(400);
    });

    test('CHANGE SUBSCIPTION to student plan wih no area', () => {
        return request(app)
            .patch('/api/v2/users/changeSubsciption?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'studenti',
                    subscriptionArea: '' }) 
            .send() 
            .expect(400);
    });

    test('CHANGE SUBSCIPTION to nerd plan', () => {
        return request(app)
            .patch('/api/v2/users/changeSubsciption?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'nerd' }) 
            .send() 
            .expect(200);
    });

    test('CHANGE SUBSCIPTION to matricole plan', () => {
        return request(app)
            .patch('/api/v2/users/changeSubsciption?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'matricole' }) 
            .send() 
            .expect(200);
    });

    test('CHANGE SUBSCIPTION to valid student plan ', () => {
        return request(app)
            .patch('/api/v2/users/changeSubsciption?token='+token)
            .set('Accept', 'application/json')
            .send({ subscriptionType: 'studenti',
                    subscriptionArea: 'Ingegneria Informatica, Informatica' }) 
            .send() 
            .expect(200);
    });

})
