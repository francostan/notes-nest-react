import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import { generatePages, filterAndGetByValue } from "../../../utils";
import Paging from "../others/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Archive } from "@mui/icons-material";
import FilterBar from "../others/FilterBar";
import AddNoteModal from "../others/AddNoteModal";

const classes = {
  tableContainer: {
    marginTop: "2rem",
    marginBottom: "2rem",
    minWidth: 650,
    maxWidth: 850,
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  },
  deleteButton: {
    marginRight: "5px",
    marginBottom: "5px",
    justifyContent: "center",
    color: "red",
  },
  adminButton: {
    marginRight: "5px",
    marginBottom: "5px",
    justifyContent: "center",
  },
  editButton: {
    marginRight: "5px",
    marginBottom: "5px",
    justifyContent: "center",
    color: "green",
  },
  addButton: {
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "20%",
  },
};

const NotesTable = ({
  notes,
  handleDeleteNote,
  handleEditNote,
  handleAddNote,
  handleArchiveNote,
}) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [propertyToFilter, setPropertyToFilter] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = (note) => {
    setSelectedNote(note);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (search !== "") {
      setFilteredNotes(filterAndGetByValue(search, notes, propertyToFilter));
      setPages(generatePages(filterAndGetByValue(search, notes)));
    } else if (notes && notes.length >= 0) {
      setFilteredNotes(notes);
      setPages(generatePages(notes));
    }
  }, [search, notes, propertyToFilter]);
  return (
    <TableContainer component={Paper} style={classes.tableContainer}>
      <FilterBar setSearch={setSearch} search={search} notes={notes} setPropertyToFilter={setPropertyToFilter} />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Tags</TableCell>
            <TableCell align="center">Categories</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredNotes.slice((page - 1) * 5, page * 5).map((note) => (
            <TableRow key={note.id}>
              <TableCell component="th" scope="row" align="center">
                {note.title}
              </TableCell>
              <TableCell align="center">{note.description}</TableCell>
              <TableCell align="right">
                {note.tags.map((tag, index) => (
                  <span key={index} style={{ marginRight: "3px" }}>
                    {tag}{" "}
                  </span>
                ))}
              </TableCell>
              <TableCell align="center">
                {note.categories.map((category, index) => (
                  <span key={index} style={{ marginRight: "3px" }}>
                    {category}{" "}
                  </span>
                ))}
              </TableCell>
              <TableCell align="right">
                <>
                  <Button>
                    <DeleteIcon
                      variant="contained"
                      onClick={() => handleDeleteNote(note.id)}
                      style={classes.deleteButton}
                    />
                  </Button>
                  <Button title={note.active ? "Archivar" : "Desarchivar"}>
                    <Archive
                      variant="contained"
                      onClick={() => {
                        const not = { ...note, active: !note.active };
                        handleArchiveNote(not, note.id);
                      }}
                      style={classes.adminButton}
                    />
                  </Button>
                  <Button>
                    <EditIcon
                      variant="contained"
                      onClick={() => handleClickOpen(note)}
                      title="Editar usuario"
                      style={classes.editButton}
                    />
                  </Button>
                  <Box display="flex" justifyContent="center">
                    <AddNoteModal
                      open={open}
                      handleClose={handleClose}
                      handleSave={handleEditNote}
                      selectedNote={selectedNote}
                    />
                  </Box>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pages >= 1 && filteredNotes && filteredNotes.length > 0 ? (
        <Paging pages={pages} page={page} setPage={setPage} />
      ) : null}
    </TableContainer>
  );
};

export default NotesTable;
