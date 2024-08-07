import React from 'react';
import { useUser } from '../UserContext';

export default function Username() {
    const { user } = useUser();
    const fullName = user ? user.name : ''; 
    const first_name = fullName.split(" ").map((item , index)=>{
       if(index ===0 ) return item;
    })
    return <h2 className="welcome-user">
        Welcome Back, {first_name }
    </h2>;
}


