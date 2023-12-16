import { useState } from 'react';
import { BarCode } from './BarCode';
import { Box, Card, Input, CardBody, CardFooter, Heading, useToast } from '@chakra-ui/react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const Student: React.FC = () => {
  const [codes, setCodes] = useState<string[]>([]);
  const { subject } = useParams<{ subject: string }>();
  const toast = useToast(); // Initialize the useToast hook

  const handleReadCode = (result: any) => {
    const scannedNumber = result.getText();
    setCodes((prevCodes) => Array.from(new Set([...prevCodes, scannedNumber])));

    // Send a request to update the student's status
    Axios.put(`http://localhost:3001/api/update/studentStatus`, {
      Number: scannedNumber,
      subject: subject,
    })
      .then((response) => {
        console.log(response.data);
        toast({
          title: '出席',
          description: `学籍番号 ${scannedNumber} の学生を出席にしました．`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Error',
          description: '学生の出席情報を更新できませんでした．',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box margin={10}>
      <Heading color='#1B254A' fontSize={50} mb={10}>
            Barcode Reader
          </Heading>
      <Box >
        <Card maxW='50%'>
          <CardBody>
            <BarCode onReadCode={handleReadCode} />
          </CardBody>
          <CardFooter>
            <Input flex='1' placeholder='学籍番号' value={codes.join('\n')} />
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
};

export default Student;
