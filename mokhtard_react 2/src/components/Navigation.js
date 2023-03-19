import React from 'react';
import { Link } from "react-router-dom";


const Navigation = () => (
    <div>
        <nav className='buttonStyle' >
            <Link to="/">Home</Link>
         </nav>
        <nav className='buttonStyle' >
            <Link to="/add-exercise">Add</Link>
        </nav>
</div>
);
export default Navigation;