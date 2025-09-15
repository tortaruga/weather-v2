export async function handler(e) {
    const key = process.env.API_KEY; 
    const params = e.queryStringParameters;
    
    let query;
    if (params.city) {
      query = encodeURIComponent(params.city)
    } else if (params.lat && params.long) {
      query = `${lat},${long}`;
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({error: 'Missing required parameters'})
      }
    }

    try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${query}&aqi=no`);
    const data = await response.json();

    return {
    statusCode: 200, 
    body: JSON.stringify(data),
  };
    } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data" })
    };
  }
    
}
