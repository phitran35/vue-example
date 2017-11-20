import Vue from 'vue';
import {
  SET_SPINNER_LOADING
} from '../store/modules/common/constants';
import commonStore from '../store/modules/common';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON (response) {
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus (response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
  throw response;
}

/**
 * Add set timeout for api call,
 * if time is exceeded then throwing error timeout
 * regardless request is still calling in background
 *
 * @param  {promise function} fetchPromise Promise function
 * @param  {integer} ms                    Timeout in ms
 * @return {promise}                       The response
 */
function promiseNoAction (fetchPromise) {
  return new Promise((resolve, reject) => {
    fetchPromise
      .then(
        (res) => {
          const response = res;
          response.doubleClick = true;
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
  });
}

function fetchWithTimeout (fetchPromise, ms, dispatch) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error('Time out')), ms);
    fetchPromise
      .then(
        (res) => {
          dispatch(SET_SPINNER_LOADING, false);
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          dispatch(SET_SPINNER_LOADING, false);
          clearTimeout(timeoutId);
          reject(err);
        }
      );
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function makeCall (url, options, dispatch) {
  if (commonStore.state.isLoading) {
    return promiseNoAction(Vue.axios(url, options));
  }
  dispatch(SET_SPINNER_LOADING, true);
  return fetchWithTimeout(Vue.axios(url, options), 20000, dispatch)
    .then(checkStatus)
    .then(parseJSON);
}
