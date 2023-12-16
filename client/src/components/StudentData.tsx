import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Flex,
  Box,
} from '@chakra-ui/react';
import Axios from 'axios';
import { SideBar } from './SideBar';

interface Category {
  Number: number;
  Name: string;
  Grade: number;
  Class: string;
}

const StudentData: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    Axios.get<Category[]>("http://localhost:3001/api/get/category/Students").then((response) => {
      setCategoryList(response.data);
    });
  }, []);


  const data2 = categoryList.map((val, index) => {
    return (
      <Tbody key={index}>
        <Tr>
          <Td>{val.Number}</Td>
          <Td>{val.Name}</Td>
          <Td>{val.Grade}</Td>
          <Td>{val.Class}</Td>
        </Tr>
      </Tbody>
    );
  });

  return (
    <Flex>
      <SideBar />

      <Box ml="250px" p={10} flex="1">

        <Box margin={10}>
          <Heading color='#1B254A' fontSize={50} mb={10}>
            Students
          </Heading>

          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Number</Th>
                  <Th>Name</Th>
                  <Th>Grade</Th>
                  <Th>Class</Th>
                </Tr>
              </Thead>
              {data2}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Flex>
  );
};

export default StudentData;
