import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Todo, todoSchema } from "../hooks/useTodos";
import apiClient from "../services/api-client";

const NewTodo = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const handleClose = () => {
    setDescription("");
    setDeadLine("");
    setIsCompleted(false);
    setErrors({});
    setLoading(false);
    onClose();
  };

  const handleSubmit = (event) => {
    setErrors({});
    event.preventDefault();
    const { error } = todoSchema.validate({ description, deadLine });
    if (error) {
      setErrors(
        error.details.reduce(
          (acc, curr) => ({ ...acc, [curr.path]: curr.message }),
          {}
        )
      );
    } else {
      const todoModel: Todo = {
        description,
        deadLine: deadLine === "" ? null : deadLine,
        isCompleted,
      };
      setLoading(true);
      apiClient
        .post("/Todo", todoModel)
        .then((res) => {
          onSubmit(res.data);
          handleClose();
        })
        .catch((err) => {
          toast({
            title: "Error occurd.",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}>
        New Task
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit}>
          <ModalHeader>Create Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isInvalid={errors.description}
              isRequired
              mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <div style={{ color: "red" }}>{errors.description}</div>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Deadline</FormLabel>
              <Input
                type="date"
                value={deadLine}
                onChange={(e) => setDeadLine(e.target.value)}
              />
              {errors.deadLine && (
                <div style={{ color: "red" }}>{errors.deadLine}</div>
              )}
            </FormControl>
            <FormControl mb={4}>
              <Checkbox
                isChecked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}>
                Completed
              </Checkbox>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isLoading}>
              Add Todo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default NewTodo;
