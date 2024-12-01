import {
    Button, Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure, useToast, Text
} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";

const DeclineInviteModal = ({ invites }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async () => {
        setIsSubmitting(true);
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.post(
                `https://eventmaster-backend-1hao.onrender.com/events/${invites.event_id}/rsvp?invitation_id=${invites.id}&answer=no`,
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
                title: isSuccess ? "Responded to the invitation" : "Response failed",
                description: message,
                status: isSuccess ? "success" : "error",
                duration: 4000,
                isClosable: true,
                position: "top",
            });

            if (isSuccess) onClose();
        } catch (error) {
            toast({
                title: "Response failed",
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
            <Button colorScheme="red" onClick={onOpen}>Decline</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="500px">
                    <ModalHeader>Invitation for {invites.event_name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <Text>Would you like to decline this invite?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleRegister} isLoading={isSubmitting}>
                            Yes, I cannot make it
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

export default DeclineInviteModal;