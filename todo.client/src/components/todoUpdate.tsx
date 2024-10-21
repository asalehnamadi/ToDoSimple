import { Checkbox } from "@chakra-ui/react";
import { Todo } from "../hooks/useTodos";

interface Props {
  todo: Todo;
  changeComplete: (event: any) => void;
}

const TodoComplete = ({ todo, changeComplete }: Props) => {
  return (
    <Checkbox
      onChange={changeComplete}
      isChecked={todo.isCompleted}></Checkbox>
  );
};
export default TodoComplete;
