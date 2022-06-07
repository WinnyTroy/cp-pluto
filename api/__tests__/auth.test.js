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
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjI1NDcxMTc1OTI4NCIsIm5hdGlvbmFsSUQiOiI2NTgwNDA5IiwiY29kZSI6IjY1ODA0MDkiLCJvdHBJZCI6IjJkZTY2ODZlLWEyNTMtNGNmYy1iNGU3LTNiMGFmZjQxMTU3YSIsImlkIjoyLCJpYXQiOjE2NTQ2MDg1OTAsImV4cCI6MTY1NDg2Nzc5MH0.2v7Qg5qgJfVnmZbimZGZpfA-EYI4BM0bj4QzkhNyCg0`)
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