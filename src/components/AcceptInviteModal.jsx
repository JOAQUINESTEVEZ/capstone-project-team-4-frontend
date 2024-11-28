import {
    Button, Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure, useToast, Text
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const AcceptInviteModal = ({ invites }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
      const navigate = useNavigate();

    const handleRegister = async () => {
        setIsSubmitting(true);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `http://localhost:5000/events/${invites.event_id}/rsvp?invitation_id=${invites.id}&answer=yes`,
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

            navigate('/invitations');

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
            <Button colorScheme="blue" onClick={onOpen}>Accept</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="500px">
                    <ModalHeader>Invitation for {invites.event_name} </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <Text>Would you like to accept this invite?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleRegister} isLoading={isSubmitting}>
                            Yes, I will attend
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

export default AcceptInviteModal;