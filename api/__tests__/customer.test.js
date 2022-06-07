const request = require("supertest");
const app = require("../app")
const models = require("../models/index")
const assert = require('assert');

/**
 * TEST CUSTOMER DETAILS POST
 */
describe('POST /api/v1/customer/details', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/api/v1/customer/details')
            .send({ query: "12345678" })
            .set('Accept', 'application/json')
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
 * VERIFY OTP CODE
 */
describe('POST /customer/verify-otp', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/customer/verify-otp')
            .send({ query: "12345678", code: "1234" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body.headers.status_code).toBe(404);
                return done();
            });
    });
})

