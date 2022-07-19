require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * TEST DEVICE ID VERIFICATION
 * code 202 for max limit reached else 200 success verification
 */
describe('POST /api/v1/devices/verify', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/api/v1/devices/verify')
            .send({ deviceId: "869640056842126" })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${process.env.TEST_BEARER_TOKEN}`)
            .expect('Content-Type', /json/)
            .expect(202)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body.headers.status_code).toBe(202);
                return done();
            });
    });
});