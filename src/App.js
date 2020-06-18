import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect( ()=> {
    api.get('repositories').then(
      response => {
        setRepositories( response.data )
      }
    )
  }, []);

  async function handleAddRepository() {
    
    const repository = {
      title : "Repositório NodeJS",
      url : "http://github.com/glayton/node",
      techs : [ "Node", "React"],
    }

    const response = await api.post('/repositories', repository );

    if( response.status === 200 ){
      setRepositories([...repositories, response.data]);
    }

  }

  async function handleRemoveRepository( id ){
    
    const response = await api.delete(`/repositories/${id}`);

    if( response.status === 204 ){
      
      const filteredRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories( filteredRepositories );

    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        { 
          repositories.map( 
            repository =>(
              <li key={repository.id} >{repository.title}
                <button onClick={() => handleRemoveRepository( repository.id )}>
                  Remover
                </button>
              </li>
            )
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
