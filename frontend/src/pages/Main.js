import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';

/**
 * React Router DOM oferece uma propriedade chamada match,
 * que contém todos os parâmetros recebidos pela rota.
 **/
export default function Main({ match }) {
    /**
     * O valor da variável deve sempre ser sobrescrito através da funçcão respectiva.
     * Neste caso, users só podde ser alterado por setUsers. E esta sobrescreve a informação
     * do users atual pela nova.
     * A variável users nunca pode ser alterada diretamente através de métodos próprios.
     * Por exemplo, caso seja um array, não pode ser utilizado o métoddo push, splice, etc.
     */
    const [users, setUsers] = useState([]);
    /**
     * Todas as variáveis passadas, sempre que forem alteradas, essa função será
     * executada. Se for passado um array vazio, ela será executada apenas uma vez
     * dentro do componente.
     * 
     * Uma boa prática é não utilizar async e await na função passada como primeiro
     * parâmetro.
     */
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            });

            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    async function handleLike(id) {
        /**
         * No método POST, o segunddo parâmetro é o corpo da requisição. Neste caso, é
         * passado como nulo pois as informações necessárias estão no cabeçalho.
         */
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id,
            }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id,
            }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev"/>
            </Link>
                { users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <img src={user.avatar} alt={user.name}/>
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p>{user.bio}</p>
                                </footer>

                                <div className="buttons">
                                    <button type="button" onClick={() => handleDislike(user._id)}>
                                        <img src={dislike} alt="Dislike"/>
                                    </button>
                                    <button type="button" onClick={() => handleLike(user._id)}>
                                        <img src={like} alt="like"/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ): (
                    <div className="empty">Acabou :(</div>
                )}
        </div>
    );
}