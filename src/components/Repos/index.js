function Repos ({details, loading}) {
    if (loading) {
        return (
            <h1 className="loader">Loading....</h1>
        )
    }
    
    return (
        <div className="repo-details-container">
            <div className="details-row">
                <label className="label">Name:</label>
                <span className="value">{details.name}</span>
            </div>
            <div className="details-row">
                <label className="label">Forks:</label>
                <span className="value">{details.forks}</span>
            </div>
            <div className="details-row">
                <label className="label">Main Language:</label>
                <span className="value">{details.language}</span>
            </div>
            <div className="details-row">
                <label className="label">Stars:</label>
                <span className="value">{details.stargazers_count}</span>
            </div>
            <div className="details-row">
                <label className="label">Issues:</label>
                <span className="value">{details.open_issues_count}</span>
            </div>
            <div className="details-row">
            <a href={details.clone_url}>
                  <button>VIEW REPO</button>
            </a>
            </div>
        </div>
    )
}

export default Repos;
