import EventCard from "../components/EventCard.jsx";
import {Container, Flex, Grid, Spinner, Text} from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

const getUserFromToken = (token) => {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return { user_id: decoded.sub };
    } catch (error) {
        console.log(error);
        return null;
    }
};
const ManageEventGrid = () => {
    const sessionToken = sessionStorage.getItem('sessionToken');
    const currentUser = getUserFromToken(sessionToken);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events from the backend
    useEffect(() => {

        const token = sessionStorage.getItem('sessionToken');
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/events/", {
                   headers: {
                       'Authorization': `Bearer ${token}`,
                       'Content-Type': "application/json",
                   }
                });

                const userEvents = response.data.filter(event => event.host_id === currentUser.user_id);
                setEvents(userEvents);

            } catch (err) {
                setError("Error loading events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
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
            {events.length === 0 ? (
                <Flex justify="center" align="center" height="50vh">
                    <Text fontSize="xl" color="gray.500">
                        No events found 🙁
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
                    {events.map((event) => (
                        <EventCard key={event.id} hostToken={sessionToken} event={event} user={currentUser.user_id} />
                    ))}
                </Grid>
            )}
        </Container>
    );
};
export default ManageEventGrid