import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const StatisticBox = ({ Title, Content }) => {
	const bgColor = useColorModeValue("gray.100", "gray.600");
	const textColor = useColorModeValue("gray.600", "gray.300");
	const numberColor = useColorModeValue("teal.500", "teal.200");

	return (
		<Box
			backgroundColor={bgColor}
			borderRadius="md"
			boxShadow="md"
			padding="30px"
			textAlign="center"
			width="225px"
			height="200px"
			display="flex"
			flexDirection="column"
			justifyContent="center"
		>
			<Text fontSize="3xl" fontWeight="bold" color={numberColor}>
				{Content}
			</Text>
			
			<Text fontSize="md" color={textColor}>
				{Title}
			</Text>
		</Box>
	);
};

export default StatisticBox;
