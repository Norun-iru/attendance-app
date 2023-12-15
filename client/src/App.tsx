import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Start from './components/Start'
import Select from './components/Select';
import Teacher from './components/Teacher';
import Student from './components/Student';
import SelectTime from './components/SelectTime';
import SelectSubject from './components/SelectSubject';
import StudentData from './components/StudentData';

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/SelectTime" element={<SelectTime />} />
          <Route path="/StudentData" element={<StudentData />} />
          <Route path="/SelectSubject/:week/:day" element={<SelectSubject />} />
          <Route path="/Select" element={<Select />} />
          <Route path="/Student/:subject" element={<Student />} />
          <Route path="/Teacher/:id" element={<Teacher />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
