import {Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Text} from "@chakra-ui/react";
import InviteModal from "./InviteModal.jsx";
import JoinModal from "./JoinModal.jsx";
import CancelModal from "./CancelModal.jsx";
import ManageModal from "./ManageModal";

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

                        {/* cancel modal */}
                        {user === event.host_id && (
                            <ManageModal key={event.id} event={event} user={user.user_id}/>
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
