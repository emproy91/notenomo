const notesCtrl = {};
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    //console.log(req.user); //!
    res.render('notes/new-note');
    //res.send('notes add');
};

notesCtrl.createNewNote = async(req, res) => {
    const { title, description } = req.body; //extraer datos de la vista
    const newNote = new Note({ title, description });
    newNote.user = req.user.id; //!
    await newNote.save();
    req.flash('success_msg', 'Nota agregada');
    //res.send('new note')
    res.redirect('/notes')
};

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean(); //!{ user: req.user.id }
    res.render('notes/all-notes', { notes });
    //res.send('render notes')
};

notesCtrl.renderEditForm = async(req, res) => {
    //res.send('render edit form')
    const note = await Note.findById(req.params.id).lean();
    //console.log(note);
    if (note.user != req.user.id) { //!
        req.flash('error_msg', 'No autorizado.');
        return res.redirect('/notes');
    } //!
    res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description }) //.lean()
        //console.log(req.body);
    req.flash('success_msg', 'Nota actualizada.');
    res.redirect('/notes');
}

notesCtrl.deletNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada');
    //console.log(req.params.id);
    //res.send('deleting note')
    res.redirect('/notes')
}

module.exports = notesCtrl;