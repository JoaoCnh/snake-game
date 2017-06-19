import { config } from 'app/api/config';

const githubHost = 'https://api.github.com';
const gitlabRoutes = {
  readme: `${githubHost}/repos/${config.owner}/${config.repo}/readme`,
};

function getReadme() {
  return fetch(gitlabRoutes.readme)
          .then((response) => {
            return response.json();
          })
          .catch((error) => {
            return error;
          });
}

export default {
  getReadme,
};
