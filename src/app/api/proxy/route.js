export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const sign = searchParams.get('sign');
    const apiUrl = `https://api.keibalv.com/vods?id=${id}&sign=${sign}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('API Response:', data); // Log the response from the external API

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching from API:', error); // Log any errors
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}