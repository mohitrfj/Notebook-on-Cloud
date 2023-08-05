import React, { useContext } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const { deleteNote } = useContext(noteContext)
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="mx-3" onClick={() => { deleteNote(note._id) }}>
                            <DeleteOutlineIcon />
                        </i>
                        <i className="mx-3" onClick={() => { updateNote(note) }}>
                            <EditIcon />
                        </i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
