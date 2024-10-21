import { Radio, RadioGroup } from "@chakra-ui/react";
import { Todo } from "../hooks/useTodos";
import { useState } from "react";

interface Request {
  todos: Todo[];
  updateTodos: (updatedTodos: Todo[]) => void;
}

const TodoFilter = ({ todos, updateTodos }: Request) => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (value: "all" | "active" | "complete") => {
    let updatedTodos = [];
    switch (value) {
      case "active":
        updatedTodos = todos.filter((todo) => !todo.isCompleted);
        break;
      case "complete":
        updatedTodos = todos.filter((todo) => todo.isCompleted);
      default:
        updatedTodos = todos;
        break;
    }

    updateTodos(updatedTodos);
    setFilter(value);
  };
  return (
    <>
      {todos.length} items left
      <RadioGroup
        onChange={handleFilter}
        value={filter}>
        <Radio value="all">All</Radio>
        <Radio value="active">Active</Radio>
        <Radio value="complete">Complete</Radio>
      </RadioGroup>
    </>
  );
};
export default TodoFilter;
