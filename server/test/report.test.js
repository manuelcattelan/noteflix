const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');

describe('Report document test', () => {
    let documentSpy
    let token
    let mockSaveDocument
    let mockDocument = {
        "_id": {"$oid": "6298a480ae458ccc9943fb26" },
        "title": "Dispensa di Network Security",
        "author": {"$oid": "62921348de956900eb07bc94"},
        "description": "Protection of the exchange of messages between machines connected to some network, thereby enabling the two entities to communicate in a secure env.",
        "area": "Ingegneria Informatica, Informatica",
        "tag": ["security", "it"],
        "creationDate": {"$date": {"$numberLong": "1654170752351"}},
        "status": "public",
        "reported": [],
        "url": "https://noteflix.s3.eu-central-1.amazonaws.com/1654170749363.pdf",
        "like": [{"$oid": "6298a615ae458ccc9943fbca"},
                 {"$oid": "629213153660aff1889873e7"},
                 {"$oid": "6298b0305ecbb745c9e0c5b9"}
        ],
        "dislike": [{ "$oid": "6298b3e09498d878f9348690"}],
        "comments": [{
                "author": {"$oid": "6298a615ae458ccc9943fbca" },
                "date": {"$date": {"$numberLong": "1654171281048"}},
                "body": "Utilizzata per prepararmi all'esame, scritta in maniera chiara e perfettamente comprensibile nonostante la lingua. Un B1 è sufficiente per comprendere pienamente il significato delle frasi.",
                "_id": {"$oid": "6298a691ae458ccc9943fbf3"}
            },
            {
                "author": {"$oid": "6298b0305ecbb745c9e0c5b9"},
                "date": {"$date": {"$numberLong": "1654174415737"}},
                "body": "Molto utile, ho preso 25 all'esame",
                "_id": {"$oid": "6298b2cfa75f11fec501a07f"}
            }
        ],
        "__v": {"$numberInt": "12"}
    }
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
    
    test('REPORT document with invalid ID', () => {
        return request(app)
            .patch('/api/v2/documents/hhhhhhhhhhhhhhh/report?token='+token)
            .send() 
            .expect(400);
    });
    test('REPORT document with valid, but non existant ID', () => {
        return request(app)
            .patch('/api/v2/documents/6298a480ae458ccc9943fb2f/report?token='+token)
            .send() 
            .expect(404);
    });

    test('REPORT document successfully', () => {
        return request(app)
            .patch('/api/v2/documents/6298a480ae458ccc9943fb26/report?token='+token)
            .send() 
            .expect(200);
    });

    test('REPORT document that user previously reported', () => {
        mockDocument.reported.push("629212873e064e49f55addc3")
        return request(app)
            .patch('/api/v2/documents/6298a480ae458ccc9943fb26/report?token='+token)
            .send() 
            .expect(400);
    });

    test('REPORT document posted by yourself', () => {
        mockDocument.author="629212873e064e49f55addc3"
        return request(app)
            .patch('/api/v2/documents/6298a480ae458ccc9943fb26/report?token='+token)
            .send() 
            .expect(403);
    });

})
