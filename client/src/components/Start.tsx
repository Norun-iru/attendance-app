import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { SideBar } from './SideBar';

export const Start: React.FC = () => {
    return (
        <Flex >
            {/* Side Bar */}
            <SideBar />

            {/* Content Area */}
            <Box ml="250px" p={10} flex="1">
                <Box margin={10}>
                    <Heading color='#1B254A' fontSize={50} mb={10}>
                    Start Page
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                </SimpleGrid>
                </Box>
                
            </Box>
        </Flex>
    );
};

export default Start;
