import {useEffect, useState} from "react";
import axios from "axios";
import {Container, Flex, Grid, Spinner, Text} from "@chakra-ui/react";
import InviteCard from "../components/InviteCard";

const InvitationGrid = () => {
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token');
        const fetchInvites = async () => {
            try {
                const response = await axios.get("http://localhost:5000/events/invitations", {
                   headers: {
                       'Authorization': `Bearer ${token}`,
                       'Content-Type': "application/json",
                   }
                });

                const invite = response.data.filter(invite => invite.accepted === null);
                
                setInvites(invite);

            } catch (err) {
                setError("Error loading invites.");
            } finally {
                setLoading(false);
            }
        };

        fetchInvites();
    }, []);

    if (loading) {
          return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Container maxW={"1200px"} my={4}>
            {invites.length === 0 ? (
                <Flex justify = "center" align="center" height="50vh">
                    <Text fontSize="xl" color="gray.500">
                        No Invites Found 🙁
                    </Text>
                </Flex>
            ) : (
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={4}
            >
                {invites.map((invite) => (
                    <InviteCard key={invite.id}  invites={invite}/>
                ))}
            </Grid>
            )}
        </Container>
    );
};
export default InvitationGrid