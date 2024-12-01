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

  const bg = useColorModeValue("white", "gray.800"); 
  const linkColor = useColorModeValue("black", "white");

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

              <Flex gap={3} alignItems="center">
                <Button onClick={toggleColorMode} variant="ghost">
                  {colorMode === "light" ? "🌙" : "☀️"}
                </Button>

                <SignUpModal />
                <SignInModal />
              </Flex>
            </Flex>
          </Box>
        </Container>

        <Box height="1px" bg="gray.400" />
      </Box>

      <Box pt="72px">
        <Container maxW="900px">
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
