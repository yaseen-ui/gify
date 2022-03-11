import './App.scss';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RouterList from './routes/RouterList';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {RouterList.map(ele => {
            return <Route key={ele.id} path={ele.path} element={ele.component} />
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
