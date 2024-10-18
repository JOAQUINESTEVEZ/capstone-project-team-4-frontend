import EventCard from "./EventCard";
import {Container, Grid, Spinner, Text} from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState} from "react";

const EventGrid = () => {

    const [events, setEvents] = useState([]);  // State to hold events
    const [loading, setLoading] = useState(true);  // State for loading spinner
    const [error, setError] = useState(null);  // State for handling errors

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

                setEvents(response.data); // Assuming events data is in the response

            } catch (err) {
                setError("Error loading events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array means this runs once when the component mounts

    if (loading) {
        return <Spinner size="xl" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Container maxW={"1200px"} my={4}>
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={4}
            >
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </Grid>
        </Container>
    );
};
export default EventGrid