import {
	Button, Flex, Modal, ModalBody,
	ModalCloseButton, ModalContent, ModalFooter,
	ModalHeader, ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import CancelModal from "./CancelModal.jsx";
import { VictoryPie } from 'victory';
import React from "react";


const ManageModal = ({ event, user}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const date = new Date(event.date).toLocaleDateString(undefined, options);


	const total = event.capacity;
	
	
	//This is where we will put the amount of users.
	const progress = 111;
	
	//This is where will put the number of people in the waitlist!
	const waitlist = 0;
	
	
	const name = event.name;
	const percentage = (progress / total) * 100;

	const data = [
		{ x: 'Progress', y: percentage },
		{ x: 'Remaining', y: 100 - percentage },
	];

	return (
		<>
			<Button colorScheme="blue" onClick={onOpen}>
				Manage
			</Button>

			<Modal
				initialFocusRef={initialRef}
				finalRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
					<ModalContent maxW="700px">
						<ModalHeader>Manage Event</ModalHeader>
					<ModalCloseButton />
					
					<ModalBody pb={5}>

					<div>
						<ul style={{ listStyleType: 'none', padding: 0 }}>
							<li><strong>Event Name:</strong> {name}</li>
							<li><strong>Attendies:</strong>
								<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
									<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
										<VictoryPie
											data={data}
											innerRadius={120}  // Inner radius to create a "donut" chart
											padding={50}
											style={{
												data: {
													fill: ({ datum }) => (datum.x === 'Progress' ? '#4caf50' : '#d3d3d3'),
												},
											}}
										labelComponent={null} 
										animate={{ duration: 500 }}
									/>
									
										<div style={{ position: 'absolute', fontSize: '24px', fontWeight: 'bold' }}>
											{progress}/{total}
										</div>
									</div>
								</div>
							</li>
							<li><strong>People In Waitlist:</strong> {waitlist}</li>
							<li><strong>Event Date:</strong> {date}</li>
							<li><strong>Location:</strong> {event.location}</li>
							<li><strong>Description:</strong> {event.description || 'No description available.'}</li>
						</ul>
					</div>
					</ModalBody>
					  
					<ModalFooter>
						{/* Send and Close buttons to the right */}
						<Flex ml="auto">
							{/* Cancel Event button */}
							<Button colorScheme="red" mr={3}>
								<CancelModal event={event} />
							</Button>
							
							<Button colorScheme="blue" onClick={onClose}>
								Close
							</Button>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
		)
}

export default ManageModal
