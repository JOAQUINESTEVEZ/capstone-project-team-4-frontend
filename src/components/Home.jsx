import {Box, Heading, Button, Text, Link} from "@chakra-ui/react";

const Home = () => {

    return (
        <Box maxW = '32rem'>
            <Heading mb = {4}>Event Master</Heading>
            <Text fontSize = 'x1'>
                Event Master helps organize events
            </Text>
            <Link href="/src/components/SignUpModal" _hover={{ textDecoration: "none" }}>
                <Button variant="link" size = 'lg' colorScheme = 'blue' mt = '24px'>Sign Up</Button>
            </Link>
        </Box>
    );
}
export default Home