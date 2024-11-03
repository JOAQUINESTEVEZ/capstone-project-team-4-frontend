import { Box, Button, Container, Flex, Link, Spacer, useColorMode, useColorModeValue, useToast, } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const UserNavbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const bg = useColorModeValue("black.100", "gray.800"); 
	const linkColor = useColorModeValue("black", "white"); // Dynamically set link color
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
		<>
			{/* Navbar */}
			<Box
				position="fixed"
				top="0"
				width="100%"
				bg={bg}
				zIndex="1000"
				boxShadow="sm"
			>
			
				<Container maxW="1800px">
					<Box px={4} py={2}>
						<Flex h="16" alignItems="center">
							{/* Left Side Links */}
							<Flex alignItems="center" gap={3} display={{ base: "none", sm: "flex" }}>
								<h1>Event Master</h1>
								<Link href="/" _hover={{ textDecoration: "none" }}>
									<Button variant="link" color={linkColor}>
										Home
									</Button>
								</Link>

								<Link href="/create-event" _hover={{ textDecoration: "none" }}>
									<Button variant="link" color={linkColor}>
										Create
									</Button>
								</Link>

								<Link href="/manage-event" _hover={{ textDecoration: "none" }}>
									<Button variant="link" color={linkColor}>
										Manage
									</Button>
								</Link>
							</Flex>

							<Spacer />

							{/* Right Side Elements */}
							<Flex gap={3} alignItems="center">
								{/* Theme Toggle Button */}
								<Button onClick={toggleColorMode} variant="ghost">
									{colorMode === "light" ? "🌙" : "☀️"}
								</Button>

								<Button onClick={handleSignOut}>Sign out</Button>
							</Flex>
						</Flex>
					</Box>
				</Container>

				{/* Gray Line under Navbar */}
				<Box height="1px" bg="gray.400" />
			</Box>

			<Box pt="72px">
			<Container maxW="900px">
			</Container>
			</Box>
		</>
	)
}
export default UserNavbar
