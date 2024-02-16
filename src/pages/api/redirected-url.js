import { createServer } from 'http';

export default function handler(req, res) {
  const targetUrl = 'https://www.infosys.com/';
  const url = 'https://hooks.stripe.com/redirect/authenticate/src_1NNacfJHLdJRVYa5x5pCgvQF?client_secret=src_client_secret_ObgrmXKxqNFip088zmBL64Nl&source_redirect_slug=test_YWNjdF8xS1pEUHFKSExkSlJWWWE1LF9POXVSTUU4QzB3VWpnUmVZWGl5WkM1ZHFmTDdUeVZJ0100RvkqUDqU';

  const client = url.startsWith('https') ? require('https') : require('http');

  const requestOptions = {
    method: 'GET',
    headers: {
      'User-Agent': 'Node.js', // Set a User-Agent header if required
    },
  };

  const request = client.request(url, requestOptions, (response) => {
    if (
      response.statusCode >= 300 &&
      response.statusCode <= 399 &&
      response.headers.location
    ) {
      const redirectedUrl = response.headers.location;
      console.log('Redirected URL:', redirectedUrl);

      if (redirectedUrl.startsWith(targetUrl)) {
        console.log('Redirected URL starts with target:', redirectedUrl);
        res.status(200).json({ redirectedUrl });
      } else {
        console.log('Redirected URL does not start with target:', redirectedUrl);
        setTimeout(() => {
          console.log('Sending the latest report...');
          res.status(200).json({ redirectedUrl });
        }, 10000); // Wait for 10 seconds
      }
    }
  });

  request.end();
}
