import { DeleteIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  handleDelete: (id: any) => void;
}

const TodoDelete = ({ handleDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState<any>(null);

  const openModal = () => {
    setDeleteId(Date.now);
    onOpen();
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      handleDelete(deleteId);
      setDeleteId(null);
    }
    onClose();
  };

  return (
    <>
      <IconButton
        icon={<DeleteIcon />}
        backgroundColor={"transparent"}
        color={"red"}
        aria-label={"Delete"}
        onClick={openModal}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this item?</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={confirmDelete}
              ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoDelete;
