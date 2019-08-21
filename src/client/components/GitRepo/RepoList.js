import React from 'react';
import Repo from './Repo';

const RepoList = props => {

  const results = props.data;
  let repos;
  if (results.length) {
    repos = results.map(repo => <Repo name={repo.name} url={repo.html_url} description={repo.description} avatar={repo.owner.avatar_url} key={repo.id} />);
  } else {
    repos =
      <div>
        <li>
          <ul> No Repos Matched </ul>
        </li>
      </div>
  }

  return (
    <ul className="repo-list">
      {repos}
    </ul>
  );
}

export default RepoList;
