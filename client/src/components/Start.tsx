import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Box } from '@chakra-ui/react'
import { Link } from "react-router-dom";

export const Start: React.FC = () => {
    return (
        <div>
            <Heading color='#ececec' fontSize={100} margin={3} marginLeft={10}>
                Start Page
            </Heading>
            <Box margin={10}>
                <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardHeader>
                            <Heading size='md'> 出席確認</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>View Calendar</Text>
                        </CardBody>
                        <CardFooter>
                            <Button as={Link} to={'/SelectTime'}>SelectTime</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Heading size='md'> 学生情報</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>View Students</Text>
                        </CardBody>
                        <CardFooter>
                            <Button as={Link} to={'/StudentData'}>View here</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Heading size='md'> 時間割</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>View Time Tabel</Text>
                        </CardBody>
                        <CardFooter>
                            <Button>View here</Button>
                        </CardFooter>
                    </Card>
                </SimpleGrid>
            </Box>
        </div>

    );
};

export default Start;