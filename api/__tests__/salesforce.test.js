require('dotenv').config()
const request = require("supertest");
const app = require("../app")


/**
 * TEST POST SALESFORCE
 */

describe('POST /api/v1/newCustomer/salesforce', function () {
    it('test post salesforce service', function (done) {
        request(app)
            .post('/api/v1/newCustomer/salesforce')
            .send({
                "firstName":"Sara",
                "lastName": "Auma",
                "mobilePhone":"0737406123",
                "company": "SunCulture",
                "leadSource":"Customer Portal"
            })
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

