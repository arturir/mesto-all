const BASE_URL = 'http://localhost:3000';

const getResponseData = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(err => {throw err.error || err.message})
    }
}
const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(response => getResponseData(response))
};

const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then(response => getResponseData(response))
  }; 

  const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => getResponseData(response))
  }

  export {authorize, register, checkToken}