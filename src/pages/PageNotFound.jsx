import { Text, Box, Center } from "@chakra-ui/react";

const PageNotFound = () => {

    return(
        <Center w="full" h="50vh">
            <Box textAlign="center" mt="10" p="5">
                <Text fontSize="4xl" fontWeight="bold">
                    404 Page not found 😔
                </Text>
            </Box>
        </Center>
    )
}
export default PageNotFound;