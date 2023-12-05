import connection from '../../db/connection';
import challongeSavedInfo from '../../db/models/challongeSavedInfo';

export default async function handler(req, res) {
    const { method, body } = req;
    await connection();
    switch (method) {
        case 'POST':
            try {
                console.log('Received Data:', body);
                const existingData = await challongeSavedInfo.findOne(body); // checking if data exists already in the db. if so, the system will not save a copy.
                if (existingData) {
                    res.status(400).json({ success: false, error: 'Data already exists in the database' });
                } else {
                    const savedInfo = await challongeSavedInfo.create(body);
                    res.status(201).json({ success: true, data: savedInfo });
                }
            } catch (error) {
                console.error('Error saving data:', error);
                res.status(400).json({ success: false, error: 'Error: saveData.js' });
            }
            break;
        default:
            res.status(400).json({ success: false, error: 'Your GET Method is not supported' });
            break;
    }
}