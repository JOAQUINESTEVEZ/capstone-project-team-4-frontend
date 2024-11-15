import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { VictoryPie } from "victory";

const StatisticBox = ({ Title, data, progress, total }) => {

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
			width="300px"
			height="300px"// Increased height to fit content better
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
		>

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="180px"
				position="relative"
			>
				<VictoryPie
					data={data}
					innerRadius={120}  // Adjusted inner radius for better visual
					padding={50}
					style={{
						data: {
							fill: ({ datum }) => (datum.x === 'Progress' ? '#4caf50' : '#d3d3d3'),
						},
					}}
					labelComponent={null} 
					animate={{ duration: 500 }}
				/>

				{/* Centered progress indicator */}
				<Box
					position="absolute"
					fontSize="24px"
					fontWeight="bold"
					color={numberColor}
				>
					{progress}/{total}
				</Box>
			</Box>

			<Text fontSize="md" color={textColor} marginTop="10px">
				{Title}
			</Text>
		</Box>
	);
};

export default StatisticBox;
