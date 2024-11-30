import {
Container,
Box,
Flex,
Heading,
Text,
Button,
Stack,
Grid,
GridItem,
Link,
} from "@chakra-ui/react";
import SignUpModal from "/src/components/SignUpModal.jsx";
import bg from '../assets/bg.jpg'

const Home = () => {
	return (
		<>
			<Box
				minH="100vh"
				bgImage={`url(${bg})`}
				bgSize="cover"
				bgPosition="center"
				bgRepeat="no-repeat"
				color="white"
			>
				<Flex
				direction="column"
				align="center"
				justify="center"
				textAlign="center"
				minH="100vh"
				bg="rgba(0, 0, 0, 0.7)" 
				>
					<Heading size="4xl" mb={6} fontWeight="bold">
						Welcome to Event Master
					</Heading>
					
					<Text fontSize="2xl" maxW="800px" mb={8} lineHeight="1.8">
						Effortlessly manage your events with automatic waiting lists, QR code access, and real-time event insights.
					</Text>
					
					<Stack direction="row" spacing={8}>
						<Link href="/about" _hover={{ textDecoration: "none" }}>
							<Button colorScheme="teal" size="lg" px={10} py={6}  borderColor="white" >
								Learn More
							</Button>
						</Link>
					</Stack>
				</Flex>
			</Box>

			<Box py={20}>
				<Container maxW="1200px">
					<Heading size="2xl" mb={8} textAlign="center">
						Why Choose Event Master?
					</Heading>
					
					<Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={10}>
						<GridItem>
							<Heading size="lg" mb={4}>
								Automatic Waiting Lists
							</Heading>
							<Text fontSize="lg">
								Never worry about overbooking. Our system automatically manages waiting lists when events reach capacity.
							</Text>
						</GridItem>
						
						<GridItem>
							<Heading size="lg" mb={4}>
								QR Code Access
							</Heading>
							<Text fontSize="lg">
								Generate unique QR codes for attendees to streamline check-ins and ensure smooth entry.
							</Text>
						</GridItem>
						
						<GridItem>
							<Heading size="lg" mb={4}>
								Real-Time Statistics
							</Heading>
							<Text fontSize="lg">
								Get detailed insights and analytics in real-time to optimize and improve future events.
							</Text>
						</GridItem>
					</Grid>
				</Container>
			</Box>

			<Box bg="gray.800" color="white" py={10}>
				<Container maxW="1200px">
					<Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }}>
						<Text fontSize="lg" mb={{ base: 4, md: 0 }}>
							2024 Event Master
						</Text>
						
						<Stack direction="row" spacing={6}>
							<Link href="#" _hover={{ textDecoration: "underline" }}>
								Contact Us
							</Link>
							<Link href="#" _hover={{ textDecoration: "underline" }}>
								Privacy Policy
							</Link>
							<Link href="#" _hover={{ textDecoration: "underline" }}>
								Terms of Service
							</Link>
						</Stack>
					</Flex>
				</Container>
			</Box>
		</>
	);
};

export default Home;
