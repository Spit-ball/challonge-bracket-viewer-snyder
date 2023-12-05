import { Schema, model, models } from 'mongoose'

const challongeSavedInfoSchema = new Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    topParticipants: {
        type: Array,
        required: true
    },
    tournamentName: {
        type: String,
        required: true
    }
});

export default models.ChallongeSavedInfo || model('ChallongeSavedInfo', challongeSavedInfoSchema);
