const noteValidation = {
  userId: {
    notEmpty: true,
    errorMessage: "NamUser Identity is required",
  },
  text: {
    notEmpty: true,
    errorMessage: "Text is required",
  },
}
const updateNoteValidation = {
  userId: {
    notEmpty: true,
    errorMessage: "NamUser Identity is required",
  },
  noteId: {
    notEmpty: true,
    errorMessage: "NamUser Identity is required",
  },
  text: {
    notEmpty: true,
    errorMessage: "Text is required",
  },
}

module.exports = { noteValidation, updateNoteValidation }
