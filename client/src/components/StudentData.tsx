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
} from '@chakra-ui/react';
import Axios from 'axios';

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
    <div>
      <Heading color='#ececec' fontSize={100} margin={3} marginLeft={10}>
        学生一覧
      </Heading>

      <TableContainer marginLeft={10} marginRight={10}>
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
    </div>
  );
};

export default StudentData;
