import {Box, Button, Container, Flex, Link, Spacer} from "@chakra-ui/react";
import SignUpModal from "./SignUpModal.jsx"
import SignInModal from "./SignInModal.jsx";

const Navbar = () => {
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

                        <Link href="/about" _hover={{ textDecoration: "none" }}>
                            <Button variant="link" colorScheme="blue">About</Button>
                        </Link>
                    </Flex>

                    <Spacer/>

                    {/* Right side */}
                    <Flex gap={3} alignItems={"center"}>

                        <SignUpModal />
                        <SignInModal />
                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}
export default Navbar