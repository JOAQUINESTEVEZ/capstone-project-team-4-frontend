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

const LeaveModal = ({ event }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setIsSubmitting(true);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `https://eventmaster-backend-1hao.onrender.com/events/${event.id}/leave`,
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
                title: isSuccess ? "Left Event" : "failed",
                description: message,
                status: isSuccess ? "success" : "error",
                duration: 4000,
                isClosable: true,
                position: "top",
            });

            if (isSuccess) {
                onClose();
                window.location.reload();
            }

        } catch (error) {
            toast({
                title: "Leaving Event Failed",
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
            <Button colorScheme="red" onClick={onOpen}>Leave Event</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="500px">
                    <ModalHeader>Leave Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <Text>Would you like to leave this event?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleRegister} isLoading={isSubmitting}>
                            Leave
                        </Button>
                        <Button colorScheme="blue" onClick={onClose} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default LeaveModal;