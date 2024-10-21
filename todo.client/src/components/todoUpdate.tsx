import { Checkbox } from "@chakra-ui/react";
import { isTaskComplete, Todo } from "../hooks/useTodos";

interface Props {
  todo: Todo;
  changeComplete: (event: any) => void;
}

const TodoComplete = ({ todo, changeComplete }: Props) => {
  return (
    <Checkbox
      onChange={changeComplete}
      isChecked={isTaskComplete(todo)}></Checkbox>
  );
};
export default TodoComplete;
