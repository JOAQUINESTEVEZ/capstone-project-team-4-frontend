import {
    Button, Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure, useToast, Text
} from "@chakra-ui/react";
import axios from "axios";
import {useState} from "react";

const CancelModal = ({ event }) => {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async () => {
        setIsSubmitting(true);
        const token = sessionStorage.getItem('sessionToken');

        try {
            const response = await axios.post(
                `http://localhost:5000/events/${event.id}/cancel`,
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
                title: isSuccess ? "Cancellation successful" : "Cancellation failed",
                description: message,
                status: isSuccess ? "success" : "error",
                duration: 4000,
                isClosable: true,
                position: "top",
            });

            window.location.reload();

            if (isSuccess) onClose();
        } catch (error) {
            toast({
                title: "Cancellation failed",
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
            <Button colorScheme="red" onClick={onOpen}>Cancel Event</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="500px">
                    <ModalHeader>Cancel Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <Text>Are you sure you like to cancel this event?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleRegister} isLoading={isSubmitting}>
                            Yes
                        </Button>
                        <Button colorScheme="blue" onClick={onClose} ml={3}>
                            No
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CancelModal;