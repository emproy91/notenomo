const { Router } = require('express')
const router = Router()

//enlazando con controles de notas
const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deletNote
} = require('../controllers/notes.controller');
//const { route } = require('./index.routes');

const { isAuthenticated } = require('../helpers/auth')

// Nueva nota
router.get('/notes/add', isAuthenticated, renderNoteForm); //mostrar el formulario desde controller
router.post('/notes/new-note', isAuthenticated, createNewNote);

// Obtener todas las notas
router.get('/notes', isAuthenticated, renderNotes)

// Editar Notas

router.get('/notes/edit/:id', isAuthenticated, renderEditForm) //formulario de edicion

router.put('/notes/edit/:id', isAuthenticated, updateNote) //actualizamos la nota

// Eliminar Nota
router.delete('/notes/delete/:id', isAuthenticated, deletNote)

module.exports = router