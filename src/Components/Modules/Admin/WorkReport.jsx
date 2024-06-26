import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../UserDashbord/Sidebar';

const WorkReport = () => {
    return (
        <div>
            <Sidebar>
                <nav >
                    <Link className='text-white bg-warning px-4 py-1 rounded'>RM</Link>
                    <Link className='text-white '>Tele Caller</Link>
                    <Link className='text-white '>Field Staff</Link>
                </nav>
            </Sidebar>

        </div>
    );
}

export default WorkReport;
