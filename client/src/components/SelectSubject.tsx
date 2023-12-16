// SelectSubject.tsx
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Button, SimpleGrid, Flex, Box, HStack } from '@chakra-ui/react'
import Axios from 'axios';
import { Link } from "react-router-dom";
import { SideBar } from './SideBar';

interface Category {
    SubjectName: string;
    SubjectName2: string;
    ID: number;
    Format: string;
    Unit: number;
    Start: number;
    Time: number;
}

const SelectSubject: React.FC = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const { week = '', day = '' } = useParams<{ week?: string; day?: string }>();

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

    useEffect(() => {
        Axios.get<Category[]>(`http://localhost:3001/api/get/subjects/${week}/${day}`)
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
            });
    }, [week, day]);

    const data = categoryList.map((val, index) => {
        const subn = '/Teacher/' + val.SubjectName2;
        const subn2 = '/Student/' + val.SubjectName2
        return (

            <Card marginTop={10} key={index} p={3}>
                <CardHeader margin={5} marginBottom={-3}>
                    <Heading fontSize='25px'>{val.SubjectName}</Heading>
                    <Heading fontSize='15px' color='#ececec'>{val.SubjectName2}</Heading>
                </CardHeader>

                <CardBody marginLeft={5}>
                    <HStack marginBottom={1}>
                        <Heading size='s' color='#6c6c6c'>開始: </Heading>
                        <Heading size='s' color='#1B254A'>{val.Start}限</Heading>
                    </HStack>
                    <HStack marginBottom={1}>
                        <Heading size='s' color='#6c6c6c'>時間: </Heading>
                        <Heading size='s' color='#1B254A'>{val.Time}時間</Heading>
                    </HStack>
                    <HStack marginBottom={1}>
                        <Heading size='s' color='#6c6c6c'>形式: </Heading>
                        <Heading size='s' color='#1B254A'>{val.Format}</Heading>
                    </HStack>
                    <HStack>
                        <Heading size='s' color='#6c6c6c'>単位: </Heading>
                        <Heading size='s' color='#1B254A'>{val.Unit}単位</Heading>
                    </HStack>
                </CardBody>

                <CardFooter>
                    <Button marginRight={1} marginLeft={1} flex='1' variant='outline' as={Link} to={subn}>Teacher</Button>
                    <Button marginRight={1} marginLeft={1} flex='1' variant='outline' as={Link} to={subn2}>Student</Button>
                </CardFooter>
            </Card>
        );
    });

    return (
        <Flex>
            <SideBar />
            <Box ml="250px" p={10} flex="1">
                <Box margin={10}>
                  <Heading color='#1B254A' fontSize={50} mb={10}>
                    Week&Day
                </Heading>
                <Card maxW='250px' align='center'>
                    <CardBody>
                        <Heading margin={2} fontSize='25px' color='#1B254A'>第{week}週, {dayJPN(day)}曜日</Heading>
                    </CardBody>
                </Card>
                
                <SimpleGrid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' gap={10}>
                    {data}
                </SimpleGrid>  
                </Box>
                
            </Box>
        </Flex>
    );
};

export default SelectSubject;
