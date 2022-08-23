require('dotenv').config()
const request = require("supertest");
const app = require("../app")

/**
 * TEST POST SALESFORCE
 */

 const data = new url.URLSearchParams({
    grant_type: process.env.SF_GRANT_TYPE,
    client_id: process.env.SF_CLIENT_ID,
    client_secret: process.env.SF_CLIENT_SECRET,
    password: process.env.SF_PASSWORD,
    username: process.env.SF_USERNAME
})

/**
 * GET ACCESS_TOKEN
 */

describe('get access_token', function () {
    it('test the get acess token', function (done) {
        request(app)
            .post(`${process.env.SF_URL}${data.toString()}`)
           
            .set('Accept', 'application/json')
            
            .expect('Content-Type', /json/)
            .expect(token)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body).toBe("No acess_token");
                return done();
            });
    });
});

/**
 * POST DATA TO SALESFORCE
 */

describe('POST /api/v1/newCustomer/salesforce', function () {
    it('test post salesforce service', function (done) {
        request(app)
            .post('/api/v1/newCustomer/salesforce')
            .send({
                "firstName":"Sarah",
                "lastName": "Sindet",
                "mobilePhone":"0721406307",
                "company": "SunCulture"
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body.headers.status_code).toBe(400);
                return done();
            });
    });
});

