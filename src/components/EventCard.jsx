import {Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text} from "@chakra-ui/react";
const EventCard = ( {event} ) => {
    return <Card>
        <CardHeader>
            <Flex gap={4}>
                <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                    <Avatar src = 'https://avatar.iran.liara.run/public' />
                    <Box>
                        <Heading size = 'sm'>{event.name}</Heading>
                        <Text>{event.location}</Text>
                        <Text>{event.date}</Text>
                    </Box>
                </Flex>

                <Flex>
                </Flex>
            </Flex>
        </CardHeader>
        <CardBody>
            <Text>
                {event.description || 'No description available.'}
            </Text>
        </CardBody>
    </Card>
};
export default EventCard;