import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useColorMode,
  Text,
  SkeletonText,
  Checkbox,
  Tfoot,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import useTodos, { Todo } from "../hooks/useTodos";
import { useState } from "react";
import NewTodo from "./newTodo";

const TodoList = () => {
  const [showTodos, setShowTodos] = useState<Todo[]>([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const [filter, setFilter] = useState("all");
  const { todos, error, isLoading } = useTodos({ dependency: [showTodos] });

  const handleSubmit = (result) => {
    setShowTodos(result);
  };
  const skeletons = [1, 2, 3, 4];
  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>{" "}
      {error && <Text color="red.500">{error}</Text>}
      {isLoading && (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Task</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {skeletons.map((skeleton) => (
                <Tr key={skeleton}>
                  <Td>
                    <SkeletonText />
                  </Td>
                  <Td>
                    <SkeletonText />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <br />
      <NewTodo onSubmit={handleSubmit} />
      Todos
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
              <Tr key={todo.id}>
                <Td>
                  <Checkbox isChecked={todo.isCompleted}></Checkbox>
                </Td>
                <Td>{todo.description}</Td>
                <Td>{todo.deadLine}</Td>
                <Td>{todo.isCompleted}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>{todos.length} items left</Th>
              <Th>
                <RadioGroup
                  onChange={setFilter}
                  value={filter}>
                  <Radio value="all">All</Radio>
                  <Radio value="active">Active</Radio>
                  <Radio value="complete">Complete</Radio>
                </RadioGroup>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};
export default TodoList;
