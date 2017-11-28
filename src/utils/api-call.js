import constants from '@/_consts';

const defaultMethod = 'GET';
/**
 * Build options
 */
export function buildOptions (method = defaultMethod, body, customHeaders) {
  const token = localStorage.getItem(constants.LOCAL_STORE.token);
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
  return process.env.CLIENTCENTER_API_SERVER_HOST;
}

/**
 * Build endpoints
 */
export function getEndPoints () {
  return {
    employer: {
      main: buildApiServer() + '/api/employers',
      detail: buildApiServer() + '/api/employers/:id'
    },
    users: {
      login: buildApiServer() + '/api/login'
    }
  };
}
