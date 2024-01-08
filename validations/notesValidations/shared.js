const sharedNoteValidation = {
  noteId: {
    notEmpty: true,
    errorMessage: "NoteId is required",
  },
  userId: {
    notEmpty: true,
    errorMessage: "UserId is required",
  }
}

const sharedNote = {
  userId: {
    notEmpty: true,
    errorMessage: "UserId is required",
  },
  sharedId: {
    notEmpty: true,
    errorMessage: "sharedId is required",
  },
}

module.exports = { sharedNoteValidation, sharedNote }
