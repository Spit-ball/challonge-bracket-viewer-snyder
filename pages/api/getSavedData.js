import connection from '../../db/connection';
import ChallongeSavedInfo from '../../db/models/challongeSavedInfo';

export default async function handler(req, res) {
    const { method, query } = req;
    await connection();

    switch (method) {
        case 'GET':
            try {
                const userId = query.userId;
                if (!userId) {
                    return res.status(400).json({ success: false, error: 'Missing UserID from Query' });
                }

                const savedData = await ChallongeSavedInfo.find({ userId: userId });
                res.status(200).json({ success: true, data: savedData });
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error: getSavedData.js' });
            }
            break;
        default:
            res.status(400).json({ success: false, error: 'Your GET Method is not supported' });
            break;
    }
}


// Original Implementation is below.

/*
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
*/