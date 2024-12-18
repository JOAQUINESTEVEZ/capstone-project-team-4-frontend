import {
	Button, Flex, Modal, ModalBody, Grid, useToast,
	ModalCloseButton, ModalContent, ModalFooter,
	ModalHeader, ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import CancelModal from "./CancelModal.jsx";
import StatCard from "./StatCard.jsx";
import StatisticBox from "./GraphCard.jsx"
import { VictoryPie } from 'victory';
import React, { useState } from "react";
import QrScanner from 'react-qr-scanner';
import jsQR from 'jsqr';


const ManageModal = ({ hostToken, event, user}) => {
	const [scan, setScan] = useState(false); // Toggles the camera
	const [result, setResult] = useState(null); // Stores QR scan result


	const token = sessionStorage.getItem('token');

	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const date = new Date(event.date).toLocaleDateString(undefined, options);


	const total = event.capacity;
	const progress =event.roles.length;
	const waitlist = event.waitlist.length;
	const toast = useToast();
	const name = event.name;
	const percentage = (progress / total) * 100;
	
	const data = [
		{ x: 'Progress', y: percentage },
		{ x: 'Remaining', y: 100 - percentage },
	];
	
	const invitations = event.invitations;
	const acceptedCount = invitations.filter(invite => invite.accepted).length;
	const deniedCount = invitations.filter(invite => !invite.accepted).length;
	const sentInvites = event.invitations.length;
	var accepted = (acceptedCount / sentInvites) * 100;
	const denied = (deniedCount / sentInvites) * 100;
	
	if(sentInvites === 0){
		accepted = 0;
	}
	
	const dataInvites = [
		{ x: 'Progress', y: accepted },
		{ x: 'Remaining', y: 100 - accepted },
	]
	
	const handleScan = (data) => {
		if (data) {
			handleQRVerification(data.text);
			setScan(false);
		}
	};

	const handleError = (err) => {
		console.error('QR Scan Error:', err);
	};

	const handleQRVerification = async (url) => {
		const urlPatternTest = /^http:\/\/.+\/events\/\d+\/verify_qrcode\?attendee_id=\d+$/;
		const urlPattern = /^https:\/\/[^/]+\/events\/[^/]+\/verify_qrcode\?attendee_id=[^&]+$/;

		if (!urlPattern.test(url) && !urlPatternTest.test(url)) {
			toast({
				title: "Invalid QR Code",
				description: "The scanned QR code does not match the expected format.",
				status: "error",
				duration: 4000,
				isClosable: true,
				position: "top",
			});
			return;
		}

		try {
			
			const response = await fetch(url, {
				method: 'GET',
				headers: {
				  'Authorization': `Bearer ${token}`,
				  'Content-Type': 'application/json',
				},
			  });

			const responseData = await response.json();

			toast({
				title: response.ok ? "Success" : "Error",
				description: response.ok 
					? 'QR scan successful' 
					: responseData.message || 'QR scan failed',
				status: response.ok ? "success" : "error",
				duration: 4000,
				isClosable: true,
				position: "top",
			});
		} catch (error) {
			console.error('Verification Error:', error);
			toast({
				title: "Error",
				description: "An error occurred during verification.",
				status: "error",
				duration: 4000,
				isClosable: true,
				position: "top",
			});
		}
	};


	const previewStyle = {
		height: 240,
		width: 320,
	};

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		
		if (file) {
			const image = new Image();
			const reader = new FileReader();

			reader.onload = (e) => {
				image.onload = () => {
					const canvas = document.createElement('canvas');
					const context = canvas.getContext('2d');
					canvas.width = image.width;
					canvas.height = image.height;
					context.drawImage(image, 0, 0, image.width, image.height);

					const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
					const code = jsQR(imageData.data, canvas.width, canvas.height);

					if (code) {
						handleQRVerification(code.data);
					} else {
						console.error('No QR code found in the uploaded image.');
					}
				};
				image.src = e.target.result;
			};

			reader.readAsDataURL(file);
		}
	};


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
								lg: "repeat(1, 1fr)",
							}}
							gap={5}
							justifyContent="center"  
							alignItems="center"    
							mx="auto"   
						>	
							<Grid
								templateColumns={{
									base: "1fr",
									md: "repeat(3, 1fr)",
									lg: "repeat(4, 1fr)",
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
								
								
								
							</Grid>
							<Grid
								templateColumns={{
									base: "2fr",
									md: "repeat(2, 2fr)",
									lg: "repeat(2, 2fr)",
								}}
								gap={5}
								justifyContent="center"  
								alignItems="center"    
								mx="auto"   
								
							>
							
								<StatisticBox 
									Title="Attendees" 
									data={data} 
									progress={progress} 
									total={total} 
								/>
								
								<StatisticBox 
									Title="Acepted Invites / Total Invites" 
									data={dataInvites} 
									progress={acceptedCount} 
									total={sentInvites} 
								/>
							</Grid>
						</Grid>
						



						
					</ModalBody>
					  
					<ModalFooter >
						{/* Send and Close buttons to the right */}
						<Flex ml="auto">
							{/* Cancel Event button */}
							<Button colorScheme="red" mr={3}>
								<CancelModal event={event} />
							</Button>
							
							<div >
							{scan ? (
					<div style={{ position: 'relative' }}>
						<QrScanner
							delay={300}
							onError={handleError}
							onScan={handleScan}
							style={{ width: '100%', maxWidth: '320px', height: '240px' }}
						/>
						<Button
							colorScheme="red"
							onClick={() => setScan(false)}
							style={{
								position: 'absolute',
								top: '5px',
								right: '5px',
								zIndex: 2,
							}}
						>
							Stop Scan
						</Button>
					</div>
				) : (
					<Button
						colorScheme="blue"
						onClick={() => setScan(true)}
						mr={3}
					>
						Scan QR
					</Button>
				)}
							</div>
							
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
