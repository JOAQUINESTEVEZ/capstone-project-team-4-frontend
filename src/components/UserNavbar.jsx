import {Box, Button, Container, Flex, Link, Spacer, useToast} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
const UserNavbar = () => {

    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const toast = useToast()

    const handleSignOut = () => {

        sessionStorage.removeItem('sessionToken');
        sessionStorage.removeItem('tokenExpiration');

        toast({
            itle: "Signed out successfully",
            description: "You have been logged out.",
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "top",
        });

        setIsAuthenticated(false);
        navigate('/');
    }

    return (
        <Container maxW={"900px"}>
            <Box px={4} my={4} borderRadius={5}  bg={"gray.700"}>
                <Flex h="16"  alignItems={"center"} justifyContents={"space-between"}>

                    {/* Left side */}
                    <Flex
                        alignItems={"center"}
                        justifyContents={"center"}
                        gap={3}
                        display={{base: "none", sm:"flex"}}
                     >
                        <Link href="/" _hover={{ textDecoration: "none" }}>
                            <Button variant="link" colorScheme="blue">Home</Button>
                        </Link>

                        <Link href="/create-event" _hover={{ textDecoration: "none" }}>
                            <Button variant="link" colorScheme="blue">Create</Button>
                        </Link>

                        <Link href="/manage-event" _hover={{ textDecoration: "none" }}>
                            <Button variant="link" colorScheme="blue">Manage</Button>
                        </Link>
                    </Flex>

                    <Spacer/>

                    {/* Right side */}
                    <Flex alignItems={"center"} justifyContent={"center"} gap={3}>
                        
                        <Link href="/about" _hover={{ textDecoration: "none" }}>
                            <Button variant="link" colorScheme="blue" gap={3}>About</Button>
                        </Link>

                        <Button onClick={handleSignOut}>Sign out</Button>
                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}
export default UserNavbar