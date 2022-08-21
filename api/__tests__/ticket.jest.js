require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * RAISE THE TICKETS
 */
describe('POST /api/v1/tickets', function () {
    it('test raised tickets', function (done) {
        request(app)
            .post('/api/v1/tickets')
            .send({
                "customerName": "Joe Doe",
                "subject": "Payments issues",
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
 * FETCH TICKETS RAISED
 */
describe('POST /api/v1/tickets', function () {
    it('test fetched raised tickets', function (done) {
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