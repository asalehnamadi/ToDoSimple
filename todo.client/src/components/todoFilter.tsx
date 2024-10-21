import { Box, Text } from "@chakra-ui/react";
import { Todo } from "../hooks/useTodos";

interface Request {
  todos: Todo[];
  currentFilter: string;
  filterTasks: (filter: string) => void;
}

const TodoFilter = ({ todos, currentFilter, filterTasks }: Request) => {
  const handleFilter = (value: "all" | "active" | "complete") => {
    filterTasks(value);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center">
        <Text>{todos.length} items left</Text>
        {["all", "active", "complete"].map((filter) => (
          <Box
            key={filter}
            onClick={() =>
              handleFilter(filter as "all" | "active" | "complete")
            }
            padding={1}
            marginLeft={2}
            borderWidth={currentFilter === filter ? "2px" : "1px"}
            borderColor={currentFilter === filter ? "blue.500" : "gray.300"}
            borderRadius="md"
            cursor="pointer"
            _hover={{ borderColor: "blue.300" }}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TodoFilter;
