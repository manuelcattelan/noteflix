const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');

describe('Document test (without documents)', () => {
    let documentSpy
    let token
    beforeAll( async () => {
        jest.setTimeout(100000);
        
        token = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'moderator',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

        const Document = require('../models/documentModel');

        //mock find user function to return a mock user
        documentSpy = jest.spyOn(Document, 'find').mockImplementation((criterias) => {
            return {exec: ()=> { return; }};
        });

    })

    afterAll( async () => {
        documentSpy.mockRestore();
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('DOCUMENTS get list with no documents', () => {
        return request(app)
            .get('/api/v2/documents?token='+token)
            .send() 
            .expect(204);
    });

    test('DOCUMENTS pending get list with no documents (as moderator)', () => {
        return request(app)
            .get('/api/v2/documents/pending?token='+token)
            .send() 
            .expect(204);
    });

    test('DOCUMENTS reported get list with no documents (as moderator)', () => {
        return request(app)
            .get('/api/v2/documents/reported?token='+token)
            .send() 
            .expect(204);
    });
})


describe('Document test (without documents)', () => {
    let documentSpy
    let mentorToken
    let matricolaToken
    let studentToken
    let nerdToken
    let moderatorToken

    beforeAll( async () => {
        jest.setTimeout(100000);
        
        moderatorToken = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'moderator',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

        studentToken = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'user',
            subscription: {
                type: 'nerd',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });
        
        matricolaToken = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'user',
            subscription: {
                type: 'matricole',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });
        
        mentorToken = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'mentor',
            subscription: {
                type: 'matricole',
                area: ''
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

        studentToken = jwt.sign({
            id: '629212873e064e49f55addc3',
            type: 'user',
            subscription: {
                type: 'studenti',
                area: 'Ingegneria Informatica, Informatica'
            }
        },process.env.TOKEN_SECRET, { expiresIn: 86400 });

        const Document = require('../models/documentModel');

        //mock find user function to return a mock document list
        documentSpy = jest.spyOn(Document, 'find').mockImplementation((criterias) => {
            return {exec: ()=> { return [{
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
            },
            {
                "_id": {"$oid": "6298b4da9498d878f934874b"},
                "title": "Fisica 2, studio dei circuiti ",
                "author": {"$oid": "6298b0305ecbb745c9e0c5b9"},
                "description": "Dispensa sui circuiti e i componenti elettronici, resistori, capacitori, induttori, risposta a gradino, leggi di Kirchhoff",
                "area": "Fisica",
                "tag": ["LeggiKirchhoff", "Fisica2", "rispostaGradino", "Cricuiti", "Comonenti"],
                "creationDate": {"$date": { "$numberLong": "1654174938217" }},
                "status": "pending",
                "reported": [{"$oid": "629213153660aff1889873e7"}],
                "url": "https://noteflix.s3.eu-central-1.amazonaws.com/1654174935691.pdf",
                "like": [],
                "dislike": [
                    {"$oid": "629213153660aff1889873e7"},
                    {"$oid": "6298b0305ecbb745c9e0c5b9"},
                    {"$oid": "6298b3e09498d878f9348690"}
                ],
                "comments": [
                    {   "author": {"$oid": "6298b3e09498d878f9348690"},
                        "date": {"$date": {"$numberLong": "1654175009204"}},
                        "body": "Dispensa incompleta, mi dispiace ma la valuto negativamente.",
                        "_id": {"$oid": "6298b5219498d878f9348781"}
                    },
                    {
                        "author": {"$oid": "6298a615ae458ccc9943fbca"},
                        "date": {"$date": {"$numberLong": "1654175016730"}},
                        "body": "Carina ma non completa purtroppo",
                        "_id": {"$oid": "6298b5289498d878f9348787"}
                    }
                ],
                "__v": {"$numberInt": "5"}
            }]}};
        });

    })

    afterAll( async () => {
        documentSpy.mockRestore();
    })

    test('app module should be defined', () => {
        expect(app).toBeDefined();
    });
    
    test('DOCUMENTS get list with document available', () => {
        return request(app)
            .get('/api/v2/documents?token='+matricolaToken)
            .send() 
            .expect(200);
    });
}) 