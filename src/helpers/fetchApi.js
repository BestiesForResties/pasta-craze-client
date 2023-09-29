const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env'), debug: true })
console.log(process.env.URL);

function transformEndpoint(endpoint, params) {
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const placeholder = `{${key}}`;
            if (endpoint.includes(placeholder)) {
                endpoint = endpoint.replace(placeholder, `${params[key]}`);
            }
        }
    }
    return endpoint;
}

const fetchAPI = async ({ method, endpoint, urlParams = {}, body = null }) => {

    const baseUrl =`https://pasta-craze-server.onrender.com`;
  
    // Construct the full request URL
    let requestUrl = `${baseUrl}${transformEndpoint(endpoint, urlParams)}`;
  
    try {
      // Create request options
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      // If method is 'POST' or 'PUT', include request body
      if (method === 'POST' && endpoint.includes('/user/')|| method === 'PUT' && endpoint.includes('/user/')) {
        if (!body) { 
            throw new Error('information needed to make this request');
        }

        if (urlParams && urlParams.data) {
            requestOptions.body = JSON.stringify(urlParams.data);
        }
      }
  
      // Make the HTTP request
      const response = await fetch(requestUrl, requestOptions);
  
      // Check if the response status code is in the success range (e.g., 200-299)
      if (response.ok) {
        // Parse the JSON response and return it
        return response.json();
      } else {
        // Handle errors here, such as logging or throwing an error
        console.error(`Error: ${response.status} - ${response.statusText}`);
        console.log('response:',response);
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
};

module.exports = fetchAPI;