require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * TEST GET CURRENT WEATHER DETAILS
 */
describe('POST /api/v1/weather/current', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/api/v1/weathers/current')
            .send({
                "lat": "-1.234",
                "lng": "36.234"
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
 * TEST GET FORECAST WEATHER DETAILS
 */
describe('POST /api/v1/weather/forecast', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/api/v1/weathers/forecast')
            .send({
                "lat": "-1.234",
                "lng": "36.234"
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
