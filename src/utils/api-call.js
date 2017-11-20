import localStorageKeys from '../store/local-storage-keys';

const defaultMethod = 'GET';
/**
 * Build options
 */
export function buildOptions (method = defaultMethod, body, customHeaders) {
  const token = localStorage.getItem(localStorageKeys.TOKEN);
  return {
    method,
    headers: { ...{
      'Content-Type': 'application/json',
      'Authorization': token
    },
      ...customHeaders
    },
    data: body,
    params: body && body.params ? body.params : null
  };
}

/**
 * Build api server
 */
export function buildApiServer () {
  return process.env.HEARTBEAT_API_SERVER_HOST;
}

/**
 * Build endpoints
 */
export function getEndPoints () {
  return {
    embers: {
      legendPaths: buildApiServer() + '/api/ember/paths/legends',
      paths: buildApiServer() + '/api/ember/paths',
      practices: buildApiServer() + '/api/ember/practices'
    },
    general: {
      types: {
        questiontypes: buildApiServer() + '/api/general/types/questiontypes',
        transformatives: buildApiServer() + '/api/general/types/transformatives'
      }
    },
    question: {
      main: buildApiServer() + '/api/survey-questions',
      detail: buildApiServer() + '/api/survey-questions/{surveyQuestionId}'
    },
    survey: {
      main: buildApiServer() + '/api/surveys',
      detail: buildApiServer() + '/api/surveys/:id',
      types: buildApiServer() + '/api/surveys/types',
      map: buildApiServer() + '/api/surveys/map'
    },
    users: {
      login: buildApiServer() + '/api/login'
    }
  };
}
