import { Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import axios from 'axios';

let response: any;

Given('I send a PUT request to {string} with body:', async function (url: string, docString: string) {
  const body = JSON.parse(docString);
  response = await axios.put(`http://localhost:5001${url}`, body, { validateStatus: () => true });
});

Then('the response status code should be {int}', function (statusCode: number) {
  assert.strictEqual(response.status, statusCode);
});