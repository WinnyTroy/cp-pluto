require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * TEST THE TOKEN VALIDATION
 */
describe('GET /api/v1/jwttoken/validation', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/api/v1/jwttoken/validation')
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