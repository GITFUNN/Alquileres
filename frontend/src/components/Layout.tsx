import { Outlet } from "react-router-dom";
import { Toaster} from 'react-hot-toast';
import Header from './Header';


const Layout = () =>{
    return(
        <div>
            <Toaster/>
            <Header/>
            <div className = "min-h-[1000px] bg-white dark:bg-gray-900">
            <Outlet/>
            </div>
        </div>
    )
}
export default Layout
