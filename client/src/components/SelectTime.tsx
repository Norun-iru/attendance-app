import React, { useState } from 'react';
import { FormControl, FormLabel, HStack, Button, Box, Heading } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

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
        <div>
            <Heading color='#ececec' fontSize={100} margin={3} marginLeft={10}>
                日時
            </Heading>
            <Box margin={5} marginLeft={10}>

                <FormControl>
                    <FormLabel>週</FormLabel>
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

                <FormControl mt={4}>
                    <FormLabel>曜日</FormLabel>
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

                <HStack mt={6}>
                    <Button colorScheme="blue" onClick={handleNext}>
                        Next
                    </Button>
                </HStack>
            </Box>
        </div>
    );
};

export default SelectTime;
