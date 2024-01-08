const { createNewNoteService, updateNoteService, getAllNotesService, getNoteByParamService, deleteNoteService, searchNoteService, shareNoteService} = require("../services/noteService");

module.exports.createNewNoteController = async (req, res) => {
      try {
            const note = await createNewNoteService(req.body);

            res.status(note.statusCode).json({ note });
      } catch (error) {
            res.status(500).json({ message: "Something went wrong...", success: false, data: error });
      }
}

module.exports.updateNoteController = async (req, res) => {
      console.log("req.body", req.body)
      try {
            const note = await updateNoteService(req.body);

            res.status(note.statusCode).json({ note });
      } catch (error) {
            console.log("errr", error)
            res.status(500).json({ message: "Something went wrong...", success: false, data: error });
      }
}

module.exports.getAllNotesController = async (req, res) => {
      console.log("req.query", req.query)
      console.log("req.PARAMS", req.params)
      try {
            const note = await getAllNotesService({param: req.params, query: req.query});

            res.status(note.statusCode).json({ note });
      } catch (error) {
            console.log("controller error", error)
            res.status(500).json({ message: "Something went wrong...", success: false, data: error });
      }
}

module.exports.getNoteByParamController = async (req, res) => {
      try {
            const note = await getNoteByParamService(req.query);

            res.status(note.statusCode).json({ note });
      } catch (error) {
            res.status(500).json({ message: "Something went wrong...", success: false, data: error });
      }
}

module.exports.deleteNoteController = async (req, res) => {
      try {
            const note = await deleteNoteService(req.body);

            res.status(note.statusCode).json({ note });
      } catch (error) {
            res.status(500).json({ message: "Something went wrong...", success: false, data: error });
      }
}

module.exports.searchNoteController = async (req, res) => {
      try {
            const note = await searchNoteService(req.query);

            res.status(note.statusCode).json({ note });
      } catch (error) {
            res.status(500).json({ message: "Something went wrong...", success: false, data: error });
      }
}
module.exports.shareNoteController = async (req, res) => {
      try {
            const note = await shareNoteService(req.query);

            res.status(note.statusCode).json({ note });
      } catch (error) {
            res.status(500).json({ message: "Something went wrong...", success: false, data: error });
      }
}