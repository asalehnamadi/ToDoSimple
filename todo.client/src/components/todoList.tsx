import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Checkbox,
  Heading,
  useToast,
} from "@chakra-ui/react";
import useTodos, { Todo } from "../hooks/useTodos";
import { useState } from "react";
import NewTodo from "./newTodo";
import apiClient from "../services/api-client";
import TodoFilter from "./todoFilter";
import TodoDelete from "./todoDelete";
import TodoSkeleton from "./todoSkeleton";
import TodoComplete from "./todoUpdate";

const TodoList = () => {
  const toast = useToast();
  const [update, setUpdate] = useState();

  const { todos, error, isLoading, updateTodos } = useTodos({});

  const handleSubmit = (result) => {
    const updatedTodos = [...todos, result];
    updatedTodos.sort((a, b) => a.description.localeCompare(b.description));
    updateTodos(updatedTodos);
    setUpdate(result.id);
  };

  const handleComplete = (todo: Todo) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    apiClient
      .put(`/Todo/${todo.id}`, todo)
      .then((res) => {
        const updatedTodos = todos.map((t) =>
          t.id === todo.id ? updatedTodo : t
        );
        updateTodos(updatedTodos);
        setUpdate(todo.id);
      })
      .catch((err) => {
        toast({
          title: "Error occurd.",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleDelete = (id) => {
    apiClient
      .delete(`/Todo/${id}`)
      .then((res) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        updateTodos(updatedTodos);
        setUpdate(id);
      })
      .catch((err) => {
        toast({
          title: "Error occurd.",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const getColor = (todo: Todo) => {
    if (todo.isCompleted) return "green.500";
    if (todo.deadLine === null) return "";
    const dueDate = new Date(todo.deadLine);
    const today = new Date();
    if (dueDate < today) return "red.500";
  };

  const handleFilter = () => {
    console.log("filtered");
  };
  return (
    <>
      {error && <Text color="red.500">{error}</Text>}
      {isLoading && <TodoSkeleton />}
      {todos.length > 0 && (
        <>
          <NewTodo onSubmit={handleSubmit} />
          <Heading as="h1">Todos</Heading>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Task</Th>
                  <Th>Dead Line</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {todos.map((todo) => (
                  <Tr
                    key={todo.id}
                    sx={{ _hover: { bg: "gray.900" } }}
                    color={getColor(todo)}>
                    <Td>
                      <TodoComplete
                        todo={todo}
                        changeComplete={() => handleComplete(todo)}
                      />
                    </Td>
                    <Td>{todo.description}</Td>
                    <Td>
                      {todo.deadLine
                        ? new Date(todo.deadLine).toLocaleDateString()
                        : ""}
                    </Td>
                    <Td>
                      <TodoDelete handleDelete={() => handleDelete(todo.id)} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <TodoFilter
            todos={todos}
            updateTodos={updateTodos}
          />
        </>
      )}
    </>
  );
};
export default TodoList;
