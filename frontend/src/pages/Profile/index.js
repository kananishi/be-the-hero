import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi'

import api from '../../services/api';

import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongID = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');
    

    useEffect(() => {
        api.get('profile',{
            headers: {
                authorization: ongID,
            }
        }).then(response => {
            setIncidents(response.data);
        } );
    }, [ongID]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incident/${id}`, {
                headers:{
                    authorization: ongID
                }
            });
            setIncidents(incidents.filter(i => i.id != id));
        } catch (error) {
            console.log(error);
            alert('Erro ao deletar caso');
        }
    }

    async function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descricao</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format( incident.value)}
                        </p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}