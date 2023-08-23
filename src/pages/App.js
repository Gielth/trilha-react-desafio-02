import gitLogo from '../assets/github-mark/github-mark/github-mark-white.svg'
import { Container } from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { useState } from 'react';
import { api } from '../services/api'

function App() {
  const [ currentRepo, setCurrentRepo ] = useState('');
  const [ repos, setRepos ] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`/repos/${currentRepo}`);

    
    if(data.id) {
      const isExist = repos.find(repo => repo.id === data.id);
      
      if(!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      }
    }

    alert('Repositorio não encontrado.');
  }

  const handleRemoveRepo = (id) => {
    setRepos(repos.filter(repo => repo.id !== id));
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="Github Logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}></Input>
      <Button onClick={handleSearchRepo}></Button>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}></ItemRepo>)}
    </Container>
  );
}

export default App;
