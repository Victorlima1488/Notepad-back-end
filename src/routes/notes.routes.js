const { Router } = require("express");

const noteRouter = Router()

const NotesController = require("../controllers/NotesController");

const notesController = new NotesController()

noteRouter.post('/:user_id', notesController.create) 
noteRouter.get('/:id', notesController.show)
noteRouter.delete('/:id', notesController.delete)
noteRouter.get('/', notesController.index)

module.exports = noteRouter