import github from 'app/api/github';

export const LOAD_README = 'LOAD_README';
export const README_LOADED = 'README_LOADED';
export const README_ERROR = 'README_ERROR';

export function getReadme(projectId) {
	return function (dispatch) {
		dispatch({ type: LOAD_README });

		github.getReadme()
				 	.then((repoInfo) => {
				 		let readme = new Buffer(repoInfo.content, 'base64');

						dispatch({ type: README_LOADED, payload: readme.toString() });
					})
					.catch((error) => {
						dispatch({ type: README_ERROR, payload: error });
					});
	}
}