const { Note } = require("../schema/noteSchema")
const { SUCCESS, NOT_FOUND, BAD_REQUEST } = require("../constants")
const { User } = require("../schema/userSchema")
const { messageHandler, queryConstructor } = require("../utils")
const { Shared } = require("../schema/sharedSchema")
const {  mongoose } = require("mongoose")

const createNewNoteService = async payload => {
  const note = new Note(payload)
  note.save()
  return messageHandler("Note created successfully", true, SUCCESS, note)
}

const updateNoteService = async payload => {
  const result =  await Note.findOneAndUpdate({ _id: new mongoose.Types.ObjectId( payload.noteId) }, {...payload}, {  new: true }) 
    if(!result) {
      return (messageHandler("Something went wrong...", false, BAD_REQUEST, err))
    }
    return (messageHandler("Notes updated successfully", true, SUCCESS, result));
}

const getAllNotesService = async ({param, query}) => {
  console.log("query", query)
  const { error, params, limit, skip, sort} = await queryConstructor(query, 'createdAt', "note" )
    if (error) {
        return (messageHandler(error, false, BAD_REQUEST, { totalnotes: 0, note: [] }))
    }
  
    try {
        const note = await Note.find({...params}).sort(sort).skip(skip).limit(limit)
        let totalnotes = await Note.find({ ...params }).countDocuments()
        if (!note.length > 0) {
          return (messageHandler("note not found", false, BAD_REQUEST, {}))
        }
        return (messageHandler("notes successfully fetched", true, SUCCESS, { totalnotes, note }))
      } catch (err) {
        console.log("service error err", err)
        return (messageHandler("Something went wrong", false, BAD_REQUEST, err))
    }
}

const getNoteByParamService = async query => {
  const notes = await Note.find({ ...query })
  const { error, params, limit, skip, sort} = await queryConstructor(query, 'createdAt', "note" )
  if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalnotes: 0, note: [] }))
  }

  try {
      const note = await Notes.find({...params}).sort(sort).skip(skip).limit(limit)
      let totalnotes = await Notes.find({ ...params }).countDocuments()
      if (!note.length > 0) {
        return callback(messageHandler("Note not found", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Notes successfully fetched", true, SUCCESS, { totalnotes, note }))
    } catch (err) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
    }}

const deleteNoteService = async payload => {
  Note.findOne({ _id: mongoose.Types.ObjectId(advertId) }).exec((err, cat) => {
    if (err) {
      return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err))
    } else if (cat === null) {
      return callback(messageHandler("No notes with the details found, Please Try Again", false, BAD_REQUEST, {}))
    } else {
      Note.deleteOne({ _id: mongoose.Types.ObjectId(advertId) }, (error, success) => {
        if (error) {
          return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
        } else {
          return callback(messageHandler("Note Successfully Deleted", true, SUCCESS, success))
        }
      });
    };
})
};

const searchNoteService = async query => {
  const notes = await Note.findOne({ ...query })
  const { error, params, limit, skip, sort} = await queryConstructor(query, 'createdAt', "note" )
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalnotes: 0, note: [] }))
    }
  
    try {
        const note = await Notes.find({...params}).sort(sort).skip(skip).limit(limit)
        let totalnotes = await Notes.find({ ...params }).countDocuments()
        if (!note.length > 0) {
          return callback(messageHandler("Note not found", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Notes successfully fetched", true, SUCCESS, { totalnotes, note }))
      } catch (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
      }
    
}

const shareNoteService = async query => {
  const shared = await Shared.findOne({ ...query })
    .populate("cartId")
    .populate("userId")
  return messageHandler("Shared fetched successfully", true, SUCCESS, shared)
}

module.exports = { createNewNoteService, getAllNotesService, updateNoteService, getNoteByParamService, deleteNoteService, searchNoteService, shareNoteService }
