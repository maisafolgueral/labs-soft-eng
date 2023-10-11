import { 
    BrowserRouter, 
    Routes, 
    Route 
} from 'react-router-dom';
import RequestAccess from '@/pages/RequestAccess';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Global from '@/pages/Global';
import Timeline from '@/pages/Timeline';


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/request-access' element={<RequestAccess />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/' element={<Home />}/>
                <Route path="/h" element={<Global />}>
                    <Route path="timeline" element={<Timeline />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}