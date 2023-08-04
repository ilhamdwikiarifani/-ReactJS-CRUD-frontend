import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import UpdateData from "./components/UpdateData";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<UpdateData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
