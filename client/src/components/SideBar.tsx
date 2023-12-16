import { Box, Heading, Stack } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';

export const SideBar = () => {
    return (
        <Box w="250px" bg="white" p={4} position="fixed" height="100%">
            <Box margin={5} marginTop={10} marginBottom={10}>
                <Heading as={Link} to="/" fontSize='30px' color="#1B254A">Attendance</Heading>
            </Box>
            
            <Divider />
            <Stack marginTop={5} marginLeft={5}>
                <Box margin={3}>
                    <EventSeatIcon style={{ verticalAlign: 'middle' }} />
                    <Heading as={Link} to="/SelectTime" size='sm' color="#1B254A" verticalAlign='middle' marginLeft={2}>
                        出席確認
                    </Heading>
                </Box>

                <Box margin={3}>
                    <PersonIcon style={{ verticalAlign: 'middle' }} />
                    <Heading as={Link} to="/StudentData" size='sm' color="#1B254A" verticalAlign='middle' marginLeft={2}>
                        学生情報
                    </Heading>
                </Box>

                <Box margin={3}>
                    <EventNoteIcon style={{ verticalAlign: 'middle' }} />
                    <Heading as={Link} to="/TimeTable" size='sm' color="#1B254A" verticalAlign='middle' marginLeft={2}>
                        時間割
                    </Heading>
                </Box>

            </Stack>

        </Box>
    );
};