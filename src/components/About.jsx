import {Flex, Heading, Box, Text, Spacer, Container, Highlight} from "@chakra-ui/react";

const About = () => {
    return (
        <Container maxW={"1500px"}>
            <Box py={45}>
                {/*About us header */}
                <Flex align="center" direction="column" justify="center">
                    <Heading size="3xl" textDecoration="underline" textDecorationColor= "blue.100">
                              ABOUT US
                    </Heading>
                </Flex>

                {/* Content */}
                <Box py={4} p={5}>
                    <Flex align="center" alignItems="center" justify="center">
                        <Text textAlign="justify" fontSize="xl"  mr={25}  lineHeight="1.8" maxW="900px">
                            Managing an event is a difficult task, especially when the event has hundreds of guests.
                            Our program makes it easier to sign up for and organize events. One of the ways it makes it easier is if an event is sold out,
                            this program will automatically create a waiting list. In addition, this program will provide each guest with a unique QR code,
                            which may be utilized to access an event more quickly. Another purpose of this tool is to provide real-time event statistics
                            that organizers can use to plan future events. Therefore this program could help an organizer manage large events more efficiently.
                        </Text>
                    </Flex>
                </Box>

                {/*Our goal header */}
                <Flex align="center" direction="column" justify="center" pt={55}>
                    <Heading size="3xl" textDecoration="underline" textDecorationColor= "blue.100">
                              OUR GOAL
                    </Heading>
                </Flex>

                 {/* Content */}
                 <Box py={4} p={5}>
                    <Flex align="center" alignItems="center" justify="center">
                        <Text textAlign="justify" fontSize="xl"  mr={25}  lineHeight="1.8" maxW="900px">
                            The main goal for this program is to facilitate the process of signing up for an event and to manage an event.
                            Specifically, this program will provide an automatic waiting list in case an event is full. Additionally, this
                            application will give each attendee a unique QR code, which would be used as a faster way to enter an event.
                            Another goal for this program is to offer real-time statistics of an event so the organizers can review for
                            future events. Lastly, an organizer could use this application to efficiently manage large events.
                        </Text>
                    </Flex>
                </Box>


            </Box>
        </Container>
    );
}
export default About