const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

test('app module should be defined', () => {
    expect(app).toBeDefined();
});
test('GET / should return 200', () => {
    return request(app)
    .get('/api/v1/documents')
    .expect(200);
});