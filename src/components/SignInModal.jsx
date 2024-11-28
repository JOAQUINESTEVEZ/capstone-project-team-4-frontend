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
import { useAuth } from "/src/context/AuthContext"

const SignInModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast();
  const { setIsAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {

  try{
      const response = await axios.post("http://localhost:5000/auth/login", formData);
      const token = response.data.token;

      localStorage.setItem('token', token);

      setIsAuthenticated(true);

          toast({
              title: "Login success",
              description: "Welcome to Event Master.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "top",
          });
          onClose();
      } catch (error) {
          toast({
              title: "Login failed",
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
      <Button onClick={onOpen}>Sign In</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="700px">
          <ModalHeader>Log in to your account</ModalHeader>
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

             {/* Password */}
            <FormControl mt={2}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Log in
            </Button>
            <Button onClick={onClose}>cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default SignInModal