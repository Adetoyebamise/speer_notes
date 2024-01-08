const router = require("express").Router()
const { validate } = require("../../validations/validate")
const { tokenVerifier } = require("../../utils")
const { checkSchema } = require("express-validator")

const { userRegistration, userLogin, passwordReset } = require("../../validations/userValidations/user")
const {noteValidation, updateNoteValidation } = require("../../validations/notesValidations/note")

const { userRegistrationController, userLoginController } = require("../../controllers/userController")
const { createNewNoteController, updateNoteController,getAllNotesController, getNoteByParamController,  deleteNoteController, searchNoteController, shareNoteController} = require("../../controllers/noteController")

router.post("/auth/register", validate(checkSchema(userRegistration)), userRegistrationController)
router.post("/auth/login", validate(checkSchema(userLogin)), userLoginController)

router.post("/notes", tokenVerifier, validate(checkSchema(noteValidation)), createNewNoteController)
router.put("/notes",tokenVerifier, validate(checkSchema(updateNoteValidation)), updateNoteController)
router.get("/notes", tokenVerifier, getAllNotesController)
router.get("/notes/:noteId", tokenVerifier, getNoteByParamController)
router.delete("/notes/:noteId", tokenVerifier, deleteNoteController)
router.get("/search?q=:query", tokenVerifier, searchNoteController)
router.post("/note/:id/share", tokenVerifier, shareNoteController)

module.exports = router
