import {
	Button, Flex, Modal, ModalBody, Grid,
	ModalCloseButton, ModalContent, ModalFooter,
	ModalHeader, ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import CancelModal from "./CancelModal.jsx";
import StatCard from "./StatCard.jsx";
import StatisticBox from "./GraphCard.jsx"
import { VictoryPie } from 'victory';
import React from "react";


const ManageModal = ({ event, user}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const date = new Date(event.date).toLocaleDateString(undefined, options);


	const total = event.capacity;
	const progress =event.roles.length;
	const waitlist = event.waitlist.length;
	const sentInvites = event.invitations.length;
	
	
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
				<ModalContent maxW="1015px"  justifyContent="center" 
							alignItems="center">
						<ModalHeader>Manage Event</ModalHeader>
					<ModalCloseButton />
					
					<ModalBody pb={5}>

							
						<Grid
							templateColumns={{
								base: "1fr",
								md: "repeat(3, 1fr)",
								lg: "repeat(3, 1fr)",
							}}
							gap={5}
							justifyContent="center"  
							alignItems="center"    
							mx="auto"   
						>
							<StatCard Title="Event Name" Content={name}/>
							
							<StatCard Title="Event Date" Content={date}/>
							<StatCard Title="Location" Content={event.location}/>
							
							<StatCard Title="People In Waitlist" Content={waitlist}/>
							
							<StatisticBox 
								Title="Attendees" 
								data={data} 
								progress={progress} 
								total={total} 
							/>
							
							<StatCard Title="Unaccepted Invites" Content={sentInvites}/>
							
							
						</Grid>
							
						
					</ModalBody>
					  
					<ModalFooter >
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
