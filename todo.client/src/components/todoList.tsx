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
} from "@chakra-ui/react";
import useTodos from "../hooks/useTodos";

const TodoList = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { todos, error, isLoading } = useTodos();
  console.log(todos);
  const skeletons = [1, 2, 3, 4];
  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
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
      Todos
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Task</Th>
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
                <Td>{todo.isCompleted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TodoList;
