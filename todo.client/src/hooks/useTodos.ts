import { DependencyList, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import Joi from "joi";

export interface Todo {
  id: string;
  description: string;
  deadLine?: Date;
  completeDate?: Date;
}
export const isTaskComplete = (todo: Todo) => {
  return todo.completeDate !== null;
};
export const todoSchema = Joi.object({
  description: Joi.string().min(10).required(),
  deadLine: Joi.string().isoDate().allow(""),
});

interface Request {
  dependency?: DependencyList;
}

const useTodos = ({ dependency }: Request) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const updateTodos = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
  };

  const filterTasks = (filter: string) => {
    setFilter(filter);
  };

  useEffect(
    () => {
      const controller = new AbortController();
      setLoading(true);
      apiClient
        .get<Todo[]>("/Todo")
        .then((res) => {
          let updatedTodos = res.data;
          switch (filter) {
            case "active":
              updatedTodos = res.data.filter((todo) => !todo.completeDate);
              break;
            case "complete":
              updatedTodos = res.data.filter((todo) => todo.completeDate);
              break;
          }
          setTodos(updatedTodos);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
      return () => controller.abort();
    },
    dependency ? [...dependency, filter] : [filter]
  );
  return { todos, error, isLoading, updateTodos, filterTasks, filter };
};
export default useTodos;
