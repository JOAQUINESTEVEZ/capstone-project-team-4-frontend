import {
    Button, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure, useToast
} from "@chakra-ui/react";
import React, {useState} from "react";
import axios from "axios";

const InviteModal = ({ event }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async() => {

  const token = sessionStorage.getItem('sessionToken');

  try{
      const response = await axios.post("http://localhost:5000/events/" + event.id +"/invite", formData, {
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type':  "application/json",
        }
      });

      toast({
        title: "Invite sent",
        description: "Invite sent",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      onClose();

      } catch (error) {
          toast({
              title: "Invite failed",
              description: error.response?.data?.message || "An error occurred",
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "top",
          });
      }
  };

  return (
    <>
      <Button onClick={onOpen}>Send invites</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="700px">
          <ModalHeader>Send invite</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>

              {/* Email address */}
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                  ref={initialRef}
                  name='email'
                  placeholder='Email address'
                  value={formData.email}
                  onChange={handleChange}
              />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Send
            </Button>
            <Button onClick={onClose}>cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default InviteModal