import githublogo from './githublogo.png'
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Repos from './Repos'

function App() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([])
  const [details, setDetails] = useState({})
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setRepos([]);
    setDetails({});
    setError(null)
  }, [username]);

  function handleSubmit(e) {
    e.preventDefault();
    searchRepos();
  }

  async function searchRepos() {
    setLoading(true);
    try {
      await axios({
        method: "get",
        url: `https://api.github.com/users/${username}/repos`,
      }).then (res => {
        setLoading(false);
        setRepos(res.data);
      })
        } catch (error) {
          setLoading(false);
          setError(error);
        }
  }

  function renderRepo(repo) {
    return (
      <div className='row' onClick={() => getDetails(repo.name)} key={repo.id}>
        <h2 className='repo-name'>
          {repo.name}
        </h2>
      </div>
    );
  }

  function getDetails(repoName) {
    setDetailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/repos/${username}/${repoName}`,
    }).then (res => {
      setDetailsLoading(false);
      setDetails(res.data);
    })
  }

  return (
    <div className="page">
      <div className='landing-page-container'>
        <div className='left-side'>
          <form className='form'>
            <input className='input' value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <button className='button' onClick={handleSubmit}>{loading ? "Searching..." : "Search"} </button>
          </form>
          <div className='results-container'>
          {error ? <p > User not found</p> : repos.map(renderRepo)}
          </div>
        </div>
        <div className = "right-side">
        <img src={githublogo}/>
        <Repos details = {details} loading = {detailsLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
