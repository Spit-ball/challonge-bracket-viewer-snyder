// Need to combine the DELETE, POST, and GET cases into one file, but separated them here for easy testing / separation of concerns.

import connection from '../../db/connection'
import ChallongeSavedInfo from '../../db/models/challongeSavedInfo'

export default async function handler(req, res) {
    const { method, body } = req;
    await connection();

    switch (method) {
        case 'DELETE':
            try {
                const userId = body.userId; // retrieve the userId from the body of the request this time.
                if (!userId) {
                    return res.status(400).json({ success: false, error: 'Missing UserID from Body of Request' });
                }
                const deletedData = await ChallongeSavedInfo.deleteOne({ userId: userId }); // deletes data matching the userId ... still clears the entire page... not sure why.
                res.status(200).json({ success: true, data: deletedData });
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error: deleteSavedData.js' });
            }
            break;
        default:
            res.status(400).json({ success: false, error: 'Your DELETE Method is not supported' });
            break;

    }
}