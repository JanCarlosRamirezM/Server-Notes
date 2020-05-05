const Note = require('../models/note.model');
const { status } = require('../helpers/statusCode.helpers');

/**
   * Add A Note
   * 
   * POST api/v1/Note
 */
exports.addNote = async (req, res) => {
    let { title, note, background } = req.body;
    let user = req.user._id;
    let noteBody = new Note({
        title,
        note,
        background,
        user
    })

    //save note
    await noteBody.save((error, noteDB) => {

        // validate if error exists
        if (error) {
            return res.status(status.error).json({
                ok: false,
                error
            })
        }

        res.status(status.created).json({
            ok: true,
            note: noteDB,
            msg: "Nota creada correctamente"
        })
    });
}
/**
   * Update A Note
   * 
   * PUT api/v1/note/5
 */
exports.UpdateNote = async (req, res) => {

    let _id = req.params.id;
    let { title, note, color } = req.body;
    let user = req.user._id;
    let noteBody;
    noteBody = {
        title,
        note,
        color,
        user
    }

    await Note.findByIdAndUpdate({ _id }, noteBody, (error, noteDB) => {

        // validate if error exists
        if (error) {
            return res.status(status.error).json({
                ok: false,
                error
            })
        }
        // validate if the note exists
        if (!noteDB) {
            return res.status(status.error).json({
                ok: false,
                error: {
                    msg: `Nota no encontrada`
                }
            })
        }

        res.status(status.success).json({
            ok: true,
            note: noteBody,
            msg: "Nota actualizada correctamente"
        })
    })
}
/**
   * Delete A Note
   * 
   * DELETE api/v1/note/5
 */
exports.deleteNote = async (req, res) => {
    let _id = req.params.id;
    await Note.findByIdAndDelete({ _id }, (error, noteDB) => {

        // validate if error exists
        if (error) {
            return res.status(status.error).json({
                ok: false,
                error
            })
        }
        // validate if the note exists
        if (!noteDB) {
            return res.status(status.error).json({
                ok: false,
                error: {
                    msg: `Nota no encontrada`
                }
            })
        }
        res.status(status.success).json({
            ok: true,
            note: noteDB,
            msg: "Nota eliminada correctamente"
        })
    });
}
/**
   * Get notes by user
   *
   * GET api/v1/note/
 */
exports.getNotesByUser = async (req, res) => {
    let _idUser = req.user._id;
    await Note.find({ user: _idUser }, (error, notesDB) => {
        // validate if error exists
        if (error) {
            return res.status(status.error).json({
                ok: false,
                error
            })
        }
        // validate if the note exists
        if (!notesDB) {
            return res.status(status.error).json({
                ok: false,
                error: {
                    msg: `Nota no encontrada`
                }
            })
        }
        res.status(status.success).json({
            ok: true,
            notes: notesDB,
        })
    });

}


