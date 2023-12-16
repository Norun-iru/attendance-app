import React, { useState } from 'react';
import { FormControl, FormLabel, HStack, Button, Box, Heading, Flex, Card, CardBody } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { SideBar } from './SideBar';

const SelectTime: React.FC = () => {
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const navigation = useNavigate();

    const weeks = Array.from({ length: 16 }, (_, i) => i + 1);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const handleWeekSelect = (week: number) => {
        setSelectedWeek(week);
    };

    const handleDaySelect = (day: string) => {
        setSelectedDay(day);
    };

    const dayJPN = (day: string) => {
        if (day === 'Monday') {
            return '月';
        } else if (day === 'Tuesday') {
            return '火';
        } else if (day === 'Wednesday') {
            return '水';
        } else if (day === 'Thursday') {
            return '木';
        } else if (day === 'Friday') {
            return '金';
        }
    }

    const handleNext = () => {
        if (selectedWeek !== null && selectedDay !== null) {
            // Navigate to SelectSubject with the selected week and day
            navigation(`/SelectSubject/${selectedWeek}/${selectedDay}`);
        } else {
            console.error('Please select both a week and a day.');
        }
    };

    return (
        <Flex>
            {/*Side Bar*/}
            <SideBar />

            <Box ml="250px" p={10} flex="1">

                <Box margin={10}>
                    <Heading color='#1B254A' fontSize={50} mb={10}>
                        Week&Day
                    </Heading>

                    <Card>
                        <CardBody>
                            <FormControl>
                                <FormLabel fontSize={20}>週</FormLabel>
                                <HStack>
                                    {weeks.map((week) => (
                                        <Button
                                            key={week}
                                            colorScheme={selectedWeek === week ? 'teal' : 'gray'}
                                            onClick={() => handleWeekSelect(week)}
                                        >
                                            {week}
                                        </Button>
                                    ))}
                                </HStack>
                            </FormControl>
                        </CardBody>

                    </Card>

                    <Card marginTop={10}>
                        <CardBody>
                            <FormControl>
                                <FormLabel fontSize={20}>曜日</FormLabel>
                                <HStack>
                                    {daysOfWeek.map((day) => (
                                        <Button
                                            key={day}
                                            colorScheme={selectedDay === day ? 'teal' : 'gray'}
                                            onClick={() => handleDaySelect(day)}
                                        >
                                            {dayJPN(day)}
                                        </Button>
                                    ))}
                                </HStack>
                            </FormControl>
                        </CardBody>
                    </Card>


                    <HStack mt={14}>
                        <Button colorScheme='blue' onClick={handleNext}>
                            Next
                        </Button>
                    </HStack>
                </Box>

            </Box>
        </Flex>
    );
};

export default SelectTime;
