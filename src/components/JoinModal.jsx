import {
    Button, Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure, useToast, Text
} from "@chakra-ui/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const JoinModal = ({ event }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
     const navigate = useNavigate();

    const handleRegister = async () => {
        setIsSubmitting(true);
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.post(
                `https://eventmaster-backend-1hao.onrender.com/events/${event.id}/register`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': "application/json",
                    }
                }
            );

            const message = response.data.message;
            const isSuccess = response.status === 200;

            toast({
                title: isSuccess ? "Registration successful" : "Registration failed",
                description: message,
                status: isSuccess ? "success" : "error",
                duration: 4000,
                isClosable: true,
                position: "top",
            });

            if (isSuccess) {
                onClose();
                navigate('/joined-event');
            }
        } catch (error) {
            toast({
                title: "Registration failed",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button colorScheme="blue" onClick={onOpen}>Join Event</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="500px">
                    <ModalHeader>Join Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <Text>Would you like to join this event?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleRegister} isLoading={isSubmitting}>
                            Register
                        </Button>
                        <Button colorScheme="red" onClick={onClose} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default JoinModal;
