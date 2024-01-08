const { Schema, model } = require('mongoose');

const sharedSchema = new Schema({
      userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
      },
      noteId: {
            type: String,
            required: true
      },
}, { timestamps: true });

const Shared = model('Shared', sharedSchema, 'shareds');

module.exports = { Shared };