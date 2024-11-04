import {Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Text} from "@chakra-ui/react";
import InviteModal from "./InviteModal";
import JoinModal from "./JoinModal";

const EventCard = ({ event, user}) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(event.date).toLocaleDateString(undefined, options);

    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex="1" gap="4" alignItems="center">
                        <Avatar src='https://avatar.iran.liara.run/public' />
                        <Box>
                            <Heading size='sm'>{event.name}</Heading>
                            <Text>{event.location}</Text>
                            <Text>{formattedDate}</Text>
                        </Box>
                    </Flex>
                    <Flex direction="column" width="125px" gap={2}>

                        {/* join modal */}
                        {user !== event.host_id && (
                            <JoinModal event={event} />
                        )}

                        {/* invite modal */}
                        {user === event.host_id && (
                            <InviteModal event={event} />
                        )}
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {event.description || 'No description available.'}
                </Text>
            </CardBody>
        </Card>
    );
};
export default EventCard;
