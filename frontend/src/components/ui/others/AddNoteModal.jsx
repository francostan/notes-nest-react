import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Chip,
} from "@mui/material";

const AddNoteModal = ({ open, handleClose, handleSave, selectedNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [id, setId] = useState("");

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput && tags.length < 25) {
      setTags([...tags, `#${tagInput.trim()}`]);
      setTagInput("");
    }
  };

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleAddCategory = () => {
    if (categoryInput && categories.length < 25) {
      setCategories([...categories, categoryInput.toUpperCase().trim()]);
      setCategoryInput("");
    }
  };

  const handleDeleteCategory = (index) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  useEffect(() => {
    if (selectedNote && Object.keys(selectedNote).length > 0) {
      setTitle(selectedNote.title);
      setDescription(selectedNote.description);
      setTags(selectedNote.tags);
      setCategories(selectedNote.categories);
      setId(selectedNote.id);
    }
  }, [selectedNote]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ textAlign: "center" }}>
        {selectedNote ? "Editar nota" : "Añadir nota"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Título"
          type="text"
          fullWidth
          variant="outlined"
          style={{ marginBottom: "15px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="content"
          label="Descripción"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          style={{ marginBottom: "15px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          id="tag"
          label="Tags"
          type="text"
          fullWidth
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag();
            }
          }}
          variant="outlined"
          style={{ marginBottom: "15px" }}
        />
        <div>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(index)}
              style={{ margin: "5px" }}
            />
          ))}
        </div>
        <TextField
          margin="dense"
          id="categories"
          label="Categories"
          type="text"
          fullWidth
          value={categoryInput}
          onChange={handleCategoryInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddCategory();
            }
          }}
          variant="outlined"
          style={{ marginBottom: "15px" }}
        />
        <div>
          {categories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              onDelete={() => handleDeleteCategory(index)}
              style={{ margin: "5px" }}
            />
          ))}
        </div>
      </DialogContent>
      <Button
        style={{ color: "#1976D2" }}
        onClick={() => {
          handleSave({ title, description, tags, categories }, id);
          setTimeout(() => {
            setTitle("");
            setDescription("");
            setTags([]);
            setTagInput("");
            setCategories([]);
            setCategoryInput("");
          }, 500);

          handleClose();
        }}
      >
        Guardar
      </Button>
      <Button style={{ color: "red" }} onClick={handleClose}>
        Cancelar
      </Button>
    </Dialog>
  );
};

export default AddNoteModal;
