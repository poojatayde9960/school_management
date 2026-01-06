import React from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './componants/Navbar'
import Home from './pages/Home'
import Classes from './pages/Classes'
import Admission from './pages/Admission'
import About from './pages/About'
import Departments from './pages/Departments'
import Events from './pages/Events'
import AdminPannel from './admin/AdminPannel'
import StudentPanel from './admin/StudentPanel'
import TeacherPanel from './admin/TeacherPanel'
import DepartmentPanel from './admin/DepartmentPannel'
import FacilitiesPanel from './admin/FacilitiesPanel'
import ClarkPannel from './clark/ClarkPannel'
import ClassOverview from './clark/ClassOverview'
import AdminLayout from './admin/AdminLayout'
import Register from './admin/Register'
import Login from './admin/Login'
import AdminLogin from './admin/AdminLogin'
import { ToastContainer } from "react-toastify"
import AdminProtected from './share/adminProtected'
import ClarkLogin from './clark/ClarkLogin'
import EventPannel from './admin/EventPannel'
import ApplicationPanel from './admin/ApplicationPanel'
import EventDetails from './pages/EventDetails'
import ExploreDepartment from './pages/ExploreDepartment'

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/register', '/login', '/adminLogin', '/clarkLogin'];
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname === route) || location.pathname.startsWith('/adminPanel') || location.pathname.startsWith('/clarkPannel');

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/departments' element={<Departments />} />
        <Route path='/classses' element={<Classes />} />
        <Route path='/about' element={<About />} />
        <Route path='/admission' element={<Admission />} />
        <Route path='/events' element={<Events />} />
        <Route path='/eventsDetails/:id' element={<EventDetails />} />
        <Route path="/exploreDepartment/:id" element={<ExploreDepartment />} />

        <Route path='/clarkPannel' element={<ClarkPannel />} />
        <Route path='/classOverview' element={<ClassOverview />} />

        <Route path='/register' element={<Register />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/clarkLogin' element={<ClarkLogin />} />

        <Route path='/adminPanel' element={<AdminProtected compo={<AdminLayout />} />}>
          <Route path='studentPanel' element={<StudentPanel />} />
          <Route index element={<AdminPannel />} />
          <Route path='teacherPanel' element={<TeacherPanel />} />
          <Route path='departmentPanel' element={<DepartmentPanel />} />
          <Route path='eventPannel' element={<EventPannel />} />
          <Route path='applicationPanel' element={<ApplicationPanel />} />
          <Route path='facilitiesPanel' element={<FacilitiesPanel />} />
        </Route>

        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
