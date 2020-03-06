import React, { useEffect, useState } from 'react';
import { logout } from '../../services/auth';
import api from '../../services/api';

export default function Home(){

    const [ user, setUser ] = useState([]);



    useEffect(() => {

        async function load(){

            const response = await api.get('/home');            

            setUser(response.data);
        }

        load();

    }, []);




    return(
        <div>
            <h1>Private Page</h1>

            {user.map(user => (
                <div key={ user._id }>
                    <h3>Nome de usuario: { user.user }</h3>
                    <h3>Email: { user.email }</h3>
                </div>
            ))}
            
            <a href="/" onClick={ logout }>Sair</a>
        </div>
    );
}