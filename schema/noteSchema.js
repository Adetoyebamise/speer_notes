const { Schema, model } = require("mongoose")

const noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    noteItems: [
      {
        noteId: {
          type: Schema.Types.ObjectId,
          ref: "Note",
          required: true,
        }
      }
    ],
    possibly_sensitive: {
      type: Boolean,
      required: false,
      default: false
    },
    text:  {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["not_sharing" , "sharing_completed", "sharing_cancelled"],
      default: "not_sharing",
    },
  },
  { timestamps: true }
)

const Note = model("Note", noteSchema, "notes")

module.exports = { Note }
