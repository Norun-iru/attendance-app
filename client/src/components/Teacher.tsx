import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { SideBar } from './SideBar';

interface Category {
  ID: number;
  Number: number;
  Name: string;
  Status: boolean;
}

const Teacher: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudentData, setNewStudentData] = useState({ Number: 20, Name: '' });
  const { id } = useParams();

  const setStatus = (subject: string | undefined, categoryId: number) => {
    // Japaneseのテーブルに対してPUTリクエストを送信
    const updatedCategoryList = categoryList.map((category) =>
      category.ID === categoryId ? { ...category, Status: !category.Status } : category
    );

    Axios.put(`http://localhost:3001/api/update/category/${subject}/${categoryId}`, {
      newStatus: updatedCategoryList.find((category) => category.ID === categoryId)?.Status
        ? 1
        : 0,
    })
      .then((response) => {
        console.log(response.data);
        // 更新が成功したらクライアントのステートを更新
        setCategoryList(updatedCategoryList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudentData({
      ...newStudentData,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = () => {
    // Send a POST request to add a new student
    Axios.post(`http://localhost:3001/api/add/student/${id}`, newStudentData)
      .then((response) => {
        console.log(response.data);
        // Close the modal and refresh the data
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchData = useCallback(() => {
    Axios.get<Category[]>(`http://localhost:3001/api/get/category/${id}`).then(
      (response) => {
        setCategoryList(response.data);
      }
    );
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);


  const data2 = categoryList.map((val, index) => {
    return (
      <Tbody key={index}>
        <Tr>
          <Td>{val.ID}</Td>
          <Td>{val.Number}</Td>
          <Td>{val.Name}</Td>
          <Td>{val.Status ? '出席' : '欠席'}</Td>
          <Td>
            <Button variant='outline' onClick={() => id && setStatus(id, val.ID)}>
              Status
            </Button>
          </Td>
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
            {id}
          </Heading>

          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Number</Th>
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              {data2}
            </Table>
          </TableContainer>
          <Button variant='outline' marginTop={10} onClick={openModal}>
            学生追加
          </Button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>学生追加</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>学籍番号</FormLabel>
                  <Input
                    type='number'
                    name='Number'
                    value={newStudentData.Number}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>名前</FormLabel>
                  <Input
                    type='text'
                    name='Name'
                    value={newStudentData.Name}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={addStudent}>
                  保存
                </Button>
                <Button onClick={closeModal}>閉じる</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Flex>
  );
};

export default Teacher;
