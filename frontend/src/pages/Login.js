import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
/**
 * Passando uma propriedade x pelo componente:
 * 
 * export default function Login(props) {
 *      props.x // Recuperando a propriedade
 * 
 * // Realiza o processo de desestruturação e recupera apenas a propriedade
 * export default function Login({ x }) {
 * 
 * Compoentes que são rotas herdam uma propriedade chamada
 * history, utilizada para fazer navegação.
*/

export default function Login({ history }) {
    const [ username, setUsername ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username, // Short sintax do ES6
        });

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};