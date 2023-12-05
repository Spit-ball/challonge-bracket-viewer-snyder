import connection from '../../db/connection';
import ChallongeSavedInfo from '../../db/models/challongeSavedInfo';

export default async function handler(req, res) {
    await connection();

    try {
        const userId = req.query.userId;
        console.log('userId:', userId);
        const savedData = await ChallongeSavedInfo.find({ userId: userId });
        res.status(200).json({ success: true, data: savedData });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error: getSavedData.js' });
    }
}

