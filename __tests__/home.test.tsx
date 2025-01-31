import axios from 'axios';

describe('Home Page', () => {
  it('should respond with status 200 for GET request to localhost:8080', async () => {
    const response = await axios.get('http://dev-az-automation-portal-pohlmanprotean-dns.northeurope.azurecontainer.io:8080');
    expect(response.status === 200);
  });
});