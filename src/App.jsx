// import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { SideNav } from './components/nav/sideNav';
import  Main  from './pages/main';
import  Table  from './pages/table';
import { AddItem } from './pages/addItem';
import { EditItem } from './pages/editItem';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Settings } from './pages/settings';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <BrowserRouter>
      <SideNav/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board/table" element={<Table />} />
          <Route path="/board/add-item" element={<AddItem />} />
          <Route path="/board/edit-item" element={<EditItem />} />
          <Route path="/sign/login" element={<Login />} />
          <Route path="/sign/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
    </>
  )
}

export default App
