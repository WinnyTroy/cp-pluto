require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * TEST POST REFERRALS
 */
describe('POST /api/v1/referrals', function () {
    it('test post referral service', function (done) {
        request(app)
            .post('/api/v1/referrals')
            .send({
                "fullName": "Doe Joe",
                "phoneNumber": "0713132819",
                "location": "Nairobi Kenya",
                "waterSource": "Yes",
                "productInterested": "PRODUCT XXX"
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
 * TEST FETCH REFERRALS
 */
describe('POST /api/v1/referrals', function () {
    it('test fetch list of referrals', function (done) {
        request(app)
            .get('/api/v1/referrals')
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