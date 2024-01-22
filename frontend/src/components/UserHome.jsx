import React, { useState, useEffect } from "react";
import NotesTable from "./ui/tables/NotesTable";
import { Box, Typography } from "@mui/material";
import LogOut from "./ui/buttons/LogOut";
import {
  getNotesFetch,
  updateOne,
  deleteOne,
  addOne,
  modelUser,
} from "../utils";
import { useSnackbar } from "notistack";
import AddNoteButton from "./ui/buttons/AddNoteButton";
import AddNoteModal from "./ui/others/AddNoteModal";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

const classes = {
  typography: {
    textAlign: "center",
    marginBottom: "2rem",
    marginTop: "2rem",
    color: "black",
  },
};

const UserHome = () => {
  const [open, setOpen] = React.useState(false);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const getNotes = async (email) => {
    try {
      const notes = await getNotesFetch(email || user.email);
      setNotes(notes);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteNote = async (id) => {
    try {
      const deletedNote = await deleteOne(id);
      if (deletedNote.message) {
        enqueueSnackbar(deletedNote.message, { variant: "success" });
        setTimeout(async () => {
          await getNotes();
        }, 1000);
      } else
        enqueueSnackbar("An error occurred while deleting the note", {
          variant: "error",
        });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred while deleting the note", {
        variant: "error",
      });
    }
  };

  const handleEditNote = async (note, id) => {
    try {
      const editedNote = await updateOne(note, id);
      if (editedNote.id) {
        enqueueSnackbar("Note updated successfully", { variant: "success" });
        await getNotes();
      } else
        enqueueSnackbar("An error occurred while updating the note", {
          variant: "error",
        });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred while updating the user", {
        variant: "error",
      });
    }
  };

  const handleArchiveNote = async (note,id) => {
    try {
      const archivedNote = await updateOne(note, id);
      if (archivedNote.id) {
        enqueueSnackbar( archivedNote.active ? "Note unarchived successfully": "Note archived successfully", { variant: "info" });
        await getNotes();
      } else
        enqueueSnackbar("An error occurred while archiving the note", {
          variant: "error",
        });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occurred while archiving the note", {
        variant: "error",
      });
    }
    
  }

  const handleAddNote = async (noteObject) => {
    try {
      const note = await addOne(noteObject);
      if (note) await getNotes();
      else
        enqueueSnackbar("An error occurred while adding the note", {
          variant: "error",
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    supabase.auth.getUser().then(({ data }) => {
      const user = modelUser(data);
      setUser(user);
      return getNotes(user.email);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (noteObject, id) => {
    noteObject.email = user.email;
    noteObject.active = true;
    await handleAddNote(noteObject);
    enqueueSnackbar("Note added successfully", { variant: "success" });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" my={4}>
        <Typography variant="h5" style={classes.typography}>
          {`Welcome, ${user.name || "User"}`}
        </Typography>
        <LogOut />
      </Box>

      <Box display="flex" justifyContent="center" mt={5} mb={1}>
        <AddNoteButton handleClick={handleClick} />
      </Box>

      <Box display="flex" justifyContent="center" mb={7}>
        <AddNoteModal
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </Box>

      <Typography variant="h5" gutterBottom style={classes.typography}>
        Your notes
      </Typography>
      <NotesTable
        notes={notes}
        handleDeleteNote={handleDeleteNote}
        handleEditNote={handleEditNote}
        handleAddNote={handleAddNote}
        handleArchiveNote={handleArchiveNote}
      />
    </Box>
  );
};

export default UserHome;
