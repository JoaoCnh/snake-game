import { config } from 'app/api/config';

const githubHost = 'https://api.github.com';
const githubRoutes = {
  readme: `${githubHost}/repos/${config.owner}/${config.repo}/readme`,
};

function getReadme() {
  return fetch(githubRoutes.readme)
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
