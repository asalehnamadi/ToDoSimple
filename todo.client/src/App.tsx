import {  Stack, Switch, useColorMode } from "@chakra-ui/react";
import "./App.css";
import TodoList from "./components/todoList";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack
      spacing={2}
      padding={4}>
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}>
        Dark Mode
      </Switch>
      <TodoList />
    </Stack>
  );
}

export default App;
