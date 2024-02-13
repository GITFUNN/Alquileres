import { Outlet } from "react-router-dom";
import { Toaster} from 'react-hot-toast';
import Header from './Header';





const Layout = () =>{
    return(
        
        <div className="">
            <Toaster/>
            <Header/>
            <div className = "min-h-[1000px] ">
            <Outlet/>
            </div>
        </div>
  
    )
}
export default Layout
