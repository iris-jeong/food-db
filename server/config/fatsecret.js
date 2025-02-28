import dotenv from 'dotenv';

dotenv.config();

const FATSECRET_ACCESS_TOKEN_URL = 'https://oauth.fatsecret.com/connect/token';
const CLIENT_ID = process.env.FATSECRET_CLIENT_ID;
const CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET;

const getAccessToken = async () => {
	// Create form data for the request payload
	const formData = new URLSearchParams();
	formData.append('grant_type', 'client_credentials');
	formData.append('scope', 'basic');

	try {
		// Make a POST request to FatSecret to get an access token
		const response = await fetch(FATSECRET_ACCESS_TOKEN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${CLIENT_ID}:${CLIENT_SECRET}`
				).toString('base64')}`,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch access token: ${response.statusText}`);
		}

		const data = await response.json();

		return data.access_token;
	} catch (error) {
		console.error('Error fetching access token:', error);
	}
};

export default getAccessToken;
