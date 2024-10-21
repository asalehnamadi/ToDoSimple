import {
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const TodoSkeleton = () => {
  const skeletons = [1, 2, 3, 4];
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Task</Th>
          </Tr>
        </Thead>
        <Tbody>
          {skeletons.map((skeleton) => (
            <Tr key={skeleton}>
              <Td>
                <SkeletonText />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TodoSkeleton;
