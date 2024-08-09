import React, { useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Todo } from "../types";
import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusTodo, updateTodo } from "../api/todos"; // Import the updateTodo function

interface TodoCardProps {
  todos: Todo[];
  handleConfirmDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todos, handleConfirmDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updatedTodo: Partial<Todo>) =>
      updateTodo(updatedTodo.id!, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditingId(null);
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: boolean }) =>
      updateStatusTodo(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleStatusUpdate = (id: number, status: boolean) => {
    statusMutation.mutate({ id, status });
  };

  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleSaveClick = (id: number) => {
    updateMutation.mutate({
      id,
      title: editedTitle,
      description: editedDescription,
    });
  };

  const columns = useMemo<MRT_ColumnDef<Todo>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
        Cell: ({ row }) =>
          editingId === row.original.id ? (
            <TextField
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            row.original.title
          ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 150,
        Cell: ({ row }) =>
          editingId === row.original.id ? (
            <TextField
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          ) : (
            row.original.description
          ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 200,
        Cell: ({ cell }) => (cell.getValue() ? "Completed" : "Not Completed"),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 150,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 150,
        Cell: ({ row }) =>
          editingId === row.original.id ? (
            <Box display="flex" gap="8px">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSaveClick(row.original.id)}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Box display="flex" gap="8px">
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleStatusUpdate(row.original.id, !row.original.status)
                }
              >
                {row.original.status ? "Completed" : "Not Completed"}
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditClick(row.original)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleConfirmDelete(row.original.id)}
              >
                Delete
              </Button>
            </Box>
          ),
      },
    ],
    [editingId, editedTitle, editedDescription]
  );

  return <MaterialReactTable columns={columns} data={todos} />;
};

export default TodoCard;
