import { ExpoRequest, ExpoResponse } from 'expo-router/server';

const API_URL = process.env.CRYPTO_API_URL;
const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(request: ExpoRequest) {
	// return ExpoResponse.json({ message: "Hello from API!" });

	const ids = request.expoUrl.searchParams.get('ids');

	const response = await fetch(`${API_URL}/v2/cryptocurrency/info?id=${ids}`,
		{
			headers: {
				'X-CMC_PRO_API_KEY': API_KEY,
			}
		});

	const res = await response.json();

	return ExpoResponse.json(res.data);
}
