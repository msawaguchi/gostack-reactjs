/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-quotes */
import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Projeto Aleatório ${Date.now()}`,
      url: 'https://github.com/msawaguchi/gostack-reactjs',
      techs: ['ReactJs', 'Node.js'],
    });

    const newRepository = response.data;

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <h1 className='title'>Adicione ou remova repositórios</h1>
      <div className='main_section'>
        <div>
          <h3 className='subtitle'>Repositórios cadastrados</h3>
          <div className='content_block'>
            <ul data-testid='repository-list'>
              {repositories.map((repository) => (
                <li key={repository.id}>
                  <div className='card_repository'>
                    <strong>{repository.title}</strong>
                    <div className='tech_list'>
                      {repository.techs.map((tech) => (
                        <p className='tech' key={tech}>
                          {tech}
                        </p>
                      ))}
                    </div>
                    <small className='likes'>
                      Curtidas: {repository.likes}
                    </small>
                    <div className='buttons'>
                      <button
                        className='access'
                        onClick={() => handleRemoveRepository(repository.id)}
                      >
                        Acessar
                      </button>
                      <button
                        onClick={() => handleRemoveRepository(repository.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className='subtitle'>Adicione um novo repositório</h3>
          <div className='content_block columnright'>
            <div className='content_right'>
              <strong>
                Clique no botão abaixo para criar um repositório aleatório
              </strong>
              <button onClick={handleAddRepository}>Criar repositório</button>
            </div>
            {/* <h3 className='subtitle'>Ou</h3>
            <div className='content_right content_form'>
              <strong>
                Utilize o formulário abaixo para cadastrar um novo.
              </strong>
              <form className='form_repo'>
                <input className='inputs' placeholder='Nome do repositório' />
                <input className='inputs' placeholder='Link' />
                <input
                  className='inputs'
                  placeholder='Tecnologias, separe por vírgula'
                />
                <button onClick={handleAddRepository}>Criar repositório</button>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
