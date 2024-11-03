import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useDisclosure,
  Button,
  FormLabel,
  Input,
  useToast, Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const SignUpModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toast = useToast();

  // State to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirm_password: "",
  });

  // Handle form field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const { email, first_name, last_name, password } = formData;
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        { email, first_name, last_name, password }, // Exclude confirmPassword
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Show success toast
      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      onClose(); // Close the modal after success
    } catch (error) {
      // Handle errors
      toast({
        title: "Error creating account",
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
      <Button onClick={onOpen}>Sign Up</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="700px">
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>

              {/* Email address */}
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                  ref={initialRef}
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
            </FormControl>

            {/* First name */}
            <Flex alignItems={"center"} gap={4}>
            <FormControl mt={2}>
              <FormLabel>First Name</FormLabel>
              <Input
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </FormControl>

            {/* Last name */}
            <FormControl mt={2}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </FormControl>
            </Flex>

            {/* Password */}
            <Flex alignItems={"center"} gap={4}>
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

            {/* Confirm password */}
            <FormControl mt={2}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </FormControl>
            </Flex>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create account
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpModal;