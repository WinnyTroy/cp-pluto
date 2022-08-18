require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * TEST POST REFERRALS
 */
describe('POST /api/v1/salesforce', function () {
    it('test post salesforce service', function (done) {
        request(app)
            .post('/api/v1/newCustomer/salesforce')
            .send({
                "FirstName":"Sarah",
                "LastName": "Sindet",
                "MobilePhone":"0721406307",
                "Company": "SunCulture"
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

