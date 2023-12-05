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
                const deletedData = await ChallongeSavedInfo.deleteMany({ userId: userId }); // deletes data matching the userId ... hopefully doesn't delete the user itself.
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