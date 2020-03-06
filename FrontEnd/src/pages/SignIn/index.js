import React,{ useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
import { login } from '../../services/auth';

import './style.css';

function SignIn({ history }){

    const [ email, setEmail ] = useState("");

    const [ password, setPassword ] = useState("");




    async function handleSignIn(event){

        event.preventDefault();

        if(!email || !password){

            alert("Preencha todos os campos");

        }else{            
            const response = await api.post('/', { email, password });

            login(response.data.token);

            history.push('/home');
        }
    }


    
    
    return(
        <form onSubmit={ handleSignIn  }>
            <input
                type="email"
                placeholder="email"
                value={ email }
                onChange={ event => setEmail(event.target.value) }
            />

            <input 
                type="password"
                placeholder="informe a sua senha"
                value={ password }
                onChange={ event => setPassword(event.target.value) }
            />

            <button type="submit">Entrar</button>

            <hr />

            <Link to="/signup">Criar conta gratis</Link>
        </form>
    );
}

export default withRouter(SignIn);