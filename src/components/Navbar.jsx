import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import SignUpModal from "./SignUpModal.jsx";
import SignInModal from "./SignInModal.jsx";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  // Theme-based colors for background and text
  const bg = useColorModeValue("black.100", "gray.800"); 
  const linkColor = useColorModeValue("black", "white"); // Dynamically set link color

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

                <Link href="/about" _hover={{ textDecoration: "none" }}>
                  <Button variant="link" color={linkColor}>
                    About
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

                {/* Sign-up and Sign-in Modals */}
                <SignUpModal />
                <SignInModal />
              </Flex>
            </Flex>
          </Box>
        </Container>

        {/* Gray Line under Navbar */}
        <Box height="1px" bg="gray.400" />
      </Box>

      {/* Page Content */}
      <Box pt="72px">
        <Container maxW="900px">
          {/* Page content goes here */}
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
