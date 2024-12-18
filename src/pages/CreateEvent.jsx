import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

const CreateEvent = () => {

  const bg = useColorModeValue("black.100", "gray.800");
  const initialRef = React.useRef(null);
  const token = sessionStorage.getItem('token');
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    try{
      const response = await axios.post("https://eventmaster-backend-1hao.onrender.com/events/create", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type':  "application/json",
          
        }
      });

      const message = response.data.message;

      toast({
        title: "Create event success",
        description: message,
        status: "success",
        duration: 40000,
        isClosable: true,
        position: "top",
      })

      navigate('/manage-event');

    } catch (error) {
        toast({
          title: "Create event failed",
          description: error.response?.data?.message || "An error occurred",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
    }
  };

    return (
    
    <Container maxW="container.md" mt={10}>
      <Box boxShadow="lg" p={8} borderRadius="md" bg={bg} borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")} >
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Create New Event
        </Heading>

          <Stack spacing={5}>
            {/* CreateEvent Name */}
            <FormControl isRequired>
              <FormLabel>Event name</FormLabel>
              <Input
                  ref={initialRef}
                  name='name'
                  placeholder="Enter event name"
                  value={formData.name}
                  onChange={handleChange}
              />
            </FormControl>

            {/* CreateEvent Date */}
            <FormControl isRequired>
              <FormLabel>Event Date</FormLabel>
              <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
              />
            </FormControl>

            {/* Location */}
            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                  name="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleChange}
              />
            </FormControl>

            {/* capacity */}
            <FormControl isRequired>
              <FormLabel>Capacity</FormLabel>
              <Input
                  name="capacity"
                  type="number"
                  placeholder="Enter capacity for the event"
                  value={formData.capacity}
                  onChange={handleChange}
              />
            </FormControl>

            {/* Description */}
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                  name="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleChange}
              />
            </FormControl>

            {/* Submit Button */}
            <Button colorScheme="blue" type="submit" size="lg" onClick={handleSubmit}>
              Create Event
            </Button>
          </Stack>
      </Box>
    </Container>
  );
}
export default CreateEvent
