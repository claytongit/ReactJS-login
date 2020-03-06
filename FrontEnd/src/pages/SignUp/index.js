import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

function SignUp({ history }){

    const [ user, setUser ] = useState("");

    const [ email, setEmail ] = useState("");

    const [ password, setPassword ] = useState("");



    async function handleSigUp(event){
        
        event.preventDefault();

        if(!user || !email || !password){

            alert("preencha todos os dados");

        }else{

            try {

                await api.post('/register', { user, email, password });

                history.push("/");

            } catch (err) {

                alert("Erro ao cadastrar, email já cadastrado");

            }

        }
    }


    

    return(
        <form onSubmit={ handleSigUp }>
            <input
                type="text"
                placeholder="informe seu nome de usuario"
                value={ user }
                onChange={ event => setUser(event.target.value) }
            />

            <input
                type="email"
                placeholder="informe seu melhor email"
                value={ email }
                onChange={ event => setEmail(event.target.value) }
            />

            <input
                type="password"
                placeholder="informe sua senha"
                value={ password }
                onChange={ event => setPassword(event.target.value) }
            />

            <button type="submit">Cadastrar grátis</button>
            <hr />
            <Link to="/">Fazer login</Link>
        </form>
    );
}

export default withRouter(SignUp);