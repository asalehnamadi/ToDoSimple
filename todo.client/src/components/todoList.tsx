import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Heading,
  useToast,
} from "@chakra-ui/react";
import useTodos, { isTaskComplete, Todo } from "../hooks/useTodos";
import { useState } from "react";
import NewTodo from "./newTodo";
import apiClient from "../services/api-client";
import TodoFilter from "./todoFilter";
import TodoDelete from "./todoDelete";
import TodoSkeleton from "./todoSkeleton";
import TodoComplete from "./todoUpdate";

const TodoList = () => {
  const toast = useToast();
  const [, setUpdate] = useState("");
  const { todos, error, isLoading, updateTodos, filterTasks, filter } =
    useTodos({});

  const handleSubmit = (result: Todo) => {
    const updatedTodos = [...todos, result];
    updatedTodos.sort((a, b) => a.description.localeCompare(b.description));
    updateTodos(updatedTodos);
    setUpdate(result.id);
  };

  const handleComplete = (todo: Todo) => {
    apiClient
      .put(`/Todo/${todo.id}/complete`, todo)
      .then((res) => {
        const updatedTodos = todos.map((t) =>
          t.id === todo.id ? res.data : t
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

  const handleDelete = (id: string) => {
    apiClient
      .delete(`/Todo/${id}`)
      .then(() => {
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
    const today = new Date();
    let deadLine;

    if (todo.deadLine) {
      deadLine = new Date(todo.deadLine);
      deadLine.setDate(deadLine.getDate() + 1);
    }

    if (isTaskComplete(todo)) {
      return deadLine && deadLine < today ? "red" : "green";
    } else {
      return deadLine && deadLine < today ? "red" : "initial";
    }
  };

  return (
    <>
      {error && <Text color="red.500">{error}</Text>}
      {isLoading && <TodoSkeleton />}
      {!isLoading && (
        <>
          <NewTodo onSubmit={handleSubmit} />

          <Heading as="h1">Todos</Heading>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Completed</Th>
                  <Th>Task</Th>
                  <Th>Dead Line</Th>
                  <Th>Complete Date</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {todos.map((todo) => (
                  <Tr
                    key={todo.id}
                    color={getColor(todo)}>
                    <Td>
                      <TodoComplete
                        todo={todo}
                        changeComplete={() => handleComplete(todo)}
                      />
                    </Td>
                    <Td>
                      <Text as={isTaskComplete(todo) ? "s" : ""}>
                        {todo.description}
                      </Text>
                    </Td>
                    <Td>
                      {todo.deadLine
                        ? new Date(todo.deadLine).toLocaleDateString()
                        : "-"}
                    </Td>
                    <Td>
                      {todo.completeDate
                        ? new Date(todo.completeDate).toLocaleDateString()
                        : "-"}
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
            currentFilter={filter}
            filterTasks={filterTasks}
          />
        </>
      )}
    </>
  );
};
export default TodoList;
