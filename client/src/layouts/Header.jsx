import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
const Header = () => {
    const { user } = useContext(UserContext);
    //console.log(user);
    return (
        <div className='w-full h-20 flex items-center justify-between px-12'>
            <Link to='/'>
                <div className=''>
                    <img height={100} width={100} alt="Example Image" src="https://w7.pngwing.com/pngs/42/36/png-transparent-airbnb-logo-san-francisco-travel-hotel-airbnb-logo-text-trademark-logo.png" />
                </div>
            </Link>
            <div className=' h-2/3 shadow-md shadow-gray-300  gap-10 bg-white rounded-3xl px-6 flex'>
                <button>AnyWhere</button>
                <button>Any week</button>
                <button className='flex items-center h-full '>
                    <h1>Add guests</h1>
                    <img height={30} width={30} alt="Example Image" src="https://www.clipartmax.com/png/middle/148-1488621_home-red-search-icon-png.png" />
                </button>

            </div>
            <Link to={user ? '/account' : '/login'}>
                <button className='flex items-center h-full '>
                    <img height={30} width={30} alt="Example Image" src="https://static.vecteezy.com/system/resources/previews/002/292/406/original/hamburger-menu-line-icon-free-vector.jpg" />
                    <img height={30} width={30} alt="Example Image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIpAQ9NSmUfE7PVnBAC0fYsfBm2jYQvO1QPlCxpNOFY6Bu1iFqSoQEpHvD62RmF1Hxlg&usqp=CAU" />
                    <h1>{user}</h1>
                </button>
            </Link>

        </div>
    )
}

export default Header