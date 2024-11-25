import {Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Text} from "@chakra-ui/react";
import AcceptInviteModal from "./AcceptInviteModal.jsx";
import DeclineInviteModal from "./DeclineInviteModal.jsx";


const InviteCard = ({ invites }) => {
    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex="1" gap="4" alignItems="center">
                        <Avatar src='https://avatar.iran.liara.run/public'/>
                        <Box>
                            <Heading size='sm'>{invites.event_name}</Heading>
                        </Box>
                    </Flex>
                    <Flex direction="column" width="125px" gap={2}>

                        {invites.accepted === null && (
                            <>
                                <AcceptInviteModal invites={invites} />
                                <DeclineInviteModal invites={invites} />
                            </>
                        )}

                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    Invitation sent at {invites.sent_at}
                </Text>
            </CardBody>
        </Card>
    );
};
export default InviteCard