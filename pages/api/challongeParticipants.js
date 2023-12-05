export default async function handler(req, res) {
    const apiKey = process.env.CHALLONGE_API_KEY;
    const tournamentCode = req.query.tournamentCode;
    const apiUrl = `https://api.challonge.com/v1/tournaments/${tournamentCode}/participants.json?api_key=${apiKey}`;

    if (!tournamentCode) {
        return res.status(400).json({ error: 'Tournament Code is required' });
    }

    if (!apiKey) {
        return res.status(500).json({ error: 'Challonge API key is not set' });
    }

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Challonge API Response Status:', response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('Challonge API Response Data:', data); // check to see we get all data back
            res.status(200).json(data);
        } else {
            const errorData = await response.text();
            console.error('Challonge API Error:', errorData);
            res.status(response.status).json({ error: 'Failed to fetch participant data' });
        }
    } catch (error) {
        console.error('Error fetching participant data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
