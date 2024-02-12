import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateCondominiumPage from "./pages/CreateCondominiumPage";
import EditCondominiumPage from "./pages/EditCondominiumPage";
import CondominiumPage from "./pages/CondominiumsPage";
import GetSoloCondominium from "./pages/GetSoloCondominium";
import EditApartment from "./pages/EditApartmentPage";
import GetSoloApartment from "./pages/GetSoloApartment";
import RequestsSection from "./pages/RequestsSection";
import PrivNoticesPage from "./pages/PrivNotices";
function App() {
  return (
   
   
    
    <BrowserRouter>
      <Routes>
        <Route path = "/register" element = {<RegisterPage/>}/>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path = "/" element = {<Layout/>}>
        <Route path = "/create" element = {<CreateCondominiumPage/>}/>
        <Route path = "condominiums/edit/:id" element = {<EditCondominiumPage/>}/>
        <Route path = "condominiums/:id/apartments/:sId" element = {<EditApartment/>}/>
        <Route path = "condominiums/:id" element = {<GetSoloCondominium/>}/>
        <Route path = "condominiums/:id/:sId" element = {<GetSoloApartment/>}/>
        <Route path = "condominiums/:id/:sId/priv_notices" element = {<PrivNoticesPage/>}/>
        <Route path = "/requests" element = {<RequestsSection/>}/>
        <Route path = "/condominiums" element = {<CondominiumPage/>}/>
        <Route index element = {<HomePage />} />
        </Route>
      </Routes>
   </BrowserRouter>
  );  
}
export default App