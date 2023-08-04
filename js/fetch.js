const Urls = {
  GET: 'https://29.javascript.pages.academy/keksobooking/data',
  POST: 'https://28.javascript.pages.academy/keksobooking/',
};

const makeRequest = (onSuccess, onError, method = 'GET', body = null) => fetch(Urls[method], {method, body}).then((response) => {
  if (!response.ok) {
    throw new Promise.reject();
  }
  return response.json();
})
  .then((data) => onSuccess(data))
  .catch(onError);

export { makeRequest };
