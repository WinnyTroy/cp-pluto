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
                "productInterested": "PRODUCT XXX",
                "ID_Number__c":"350310",
                "firstName": "Doe",
                "lastName":"Joe",
                "mobilePhone":"0713132819",
                "Location__c": "Nairobi Kenya",
                "Water_Source__c":"Yes",
                "Customer_Product_of_Interest__c":"PRODUCT XXX",
                "Purchase_Date__c":"Now",
                "Referral_Name__c":"Jane Doe",
                "Referral_Phone_Number__c":"254115359964",
                "Referral_ID__c":"12345",
                "Preferred_Language__c":"English",
                "Company":"SunCulture",
                "leadSource":"Customer Portal",

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