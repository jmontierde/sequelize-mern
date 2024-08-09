import React, { useState } from "react";
import TodoCard from "./TodoCard";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, fetchTodos, postTodo } from "../api/todos";
import { useTodoStore } from "../stores/useTodoStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Todos = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTodo = useTodoStore((state) => state.createTodo);
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 30000,
  });

  console.log("todos", todos);

  const mutation = useMutation({
    mutationFn: () => postTodo(title, description),
    onSuccess: (newTodo) => {
      createTodo(newTodo);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleConfirmDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpen}>
        ADD TODO
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              py: "4rem",
              px: "2rem",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add To-Do List
            </Typography>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-textarea"
              label="Description"
              fullWidth
              multiline
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="outlined"
              fullWidth
              sx={{ py: ".5rem" }}
              onClick={() => mutation.mutate()}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <TodoCard todos={todos || []} handleConfirmDelete={handleConfirmDelete} />
    </Box>
  );
};

export default Todos;
