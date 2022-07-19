require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * TEST TICKETS POST
 */
describe('POST /api/v1/tickets', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/api/v1/tickets')
            .send({
                "customerName": "Sarah",
                "subject": "Evans Subject",
                "description": "Evans description",
                "groupId": 2043001286617
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${process.env.TEST_BEARER_TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body.headers.status_code).toBe(200);
                return done();
            });
    });
});

/**
 * TEST TICKETS GET
 */
describe('POST /api/v1/tickets', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/api/v1/tickets')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${process.env.TEST_BEARER_TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body.headers.status_code).toBe(200);
                return done();
            });
    });
});