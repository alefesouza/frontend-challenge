const request = require('supertest');
const app = require('../app')
const fields = require('../fields.json');

describe('Test server', () => {
  it('should return the content of index.html file', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.header['content-type']).toBe('text/html; charset=UTF-8');

      done();
    });
  });

  it('should return the content of fields.json file', (done) => {
    request(app).get('/fields').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');

      expect(JSON.stringify(fields)).toBe(response.text);

      done();
    });
  });
});
