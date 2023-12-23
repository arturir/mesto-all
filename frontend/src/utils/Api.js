class Api {
    constructor(url, token, id) {
        this._url = url;
        this._token = token;
        this._id = id
    }
    
    _getResponseData(response) {
        if (!response.ok) {
            return Promise.reject(`Ошибочка вышла: ${response.status}`); 
        }
        console.log(this._token);
        return response.json();
    } 

    editAvatar(avatar) {
        return fetch(`${this._url}${this._id}/users/me/avatar `, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar.avatar
            })
        })
        .then(response => this._getResponseData(response))
    }

    editProfile(name, about) {
        return fetch(`${this._url}${this._id}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name:  name,
              about: about
            })
        })
        .then(response => this._getResponseData(response))
    }
    getUserInfo() {
        return fetch(`${this._url}${this._id}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(response => this._getResponseData(response))   
    }

    getCards() {
        return fetch(`${this._url}${this._id}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(response => this._getResponseData(response))
    }
    addNewCard(name, link) {
        return fetch(`${this._url}${this._id}/cards`, {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name:  name,
              link: link
            })
        })
        .then(response => {return response.json()})
    }
    deleteCard(cardId) {
        return fetch(`${this._url}${this._id}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(response => this._getResponseData(response))
    }
    
    addLikeCard(cardId) {
        return fetch(`${this._url}${this._id}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(response => this._getResponseData(response))
    }
    deleteLikeCard(cardId) {
        return fetch(`${this._url}${this._id}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(response => this._getResponseData(response))
    }
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {return this.deleteLikeCard(cardId)} else {return this.addLikeCard(cardId)}
    }

    

}
const api = new Api('http://localhost:3000', localStorage.getItem('jwt') ? `Bearer ${localStorage.getItem('jwt')}`: '', '');
export default api;