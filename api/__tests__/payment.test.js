require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * TEST FETCH CUSTOMER PAYMENT HISTORY
 */
describe('POST /api/v1/payment-history', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/api/v1/payment-history')
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