import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Heading, Button, SimpleGrid } from '@chakra-ui/react'
import { Link } from "react-router-dom";

interface Category {
  SubjectName: string;
  SubjectName2: string;
  Format: string;
  Unit: string;
}

export const Select: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    Axios.get<Category[]>("http://localhost:3001/api/get/category").then((response) => {
      setCategoryList(response.data);
    });
  }, []);

  const data = categoryList.map((val, index) => {
    const subn = '/Teacher/'+ val.SubjectName2;
    const subn2 = '/Student/'+ val.SubjectName2
    return (
      <Card margin={5} key={index}>
        <CardHeader marginLeft={5} marginTop={3}>
          <Heading size='md'>{val.SubjectName}</Heading>
          <Heading size='md' color='#ececec'>{val.SubjectName2}</Heading>
        </CardHeader>
        <CardBody marginLeft={5}>
          <Heading size='s'>形式:  {val.Format}</Heading>
          <Heading size='s'>単位:  {val.Unit}</Heading>
        </CardBody>
        <CardFooter>
            <Button margin={1} flex='1' variant='outline' as={Link} to={subn}>Teacher</Button>
            <Button margin={1} flex='1' variant='outline' as={Link} to={subn2}>Student</Button> 
        </CardFooter>
      </Card>
    );
  });

  return (
    <div className="App">
      <Heading color='#ececec' fontSize={80} margin={3} marginLeft={10} >講義一覧</Heading>
      <SimpleGrid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' margin={5}>
        {data}
      </SimpleGrid>
    </div>
  );
};

export default Select;