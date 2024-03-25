const keystoneFetcher = async (param: any, query: any, variables: any) => {
  // Retrieve the API URL from environment variables
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  if (!URL) {
    throw new Error('API URL is not defined.');
  }

  // Send a POST request to the API URL
  const res = await fetch(BASEURL + param, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      // Optionally, you can include an Authorization header if needed
      // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    },
    //body: JSON.stringify({ query, variables }) // Send the GraphQL query and variables in the request body
  });

  // Parse the response body as JSON
  const json = await res.json();

  // Return the JSON response
  return json;
}

export default keystoneFetcher;