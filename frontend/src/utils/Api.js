class Api {
    constructor(url) {
        this._url = url;
    }
    
    refreshToken(){
        return localStorage.getItem('jwt') ? `Bearer ${localStorage.getItem('jwt')}`: ''
    }

    _getResponseData(response) {
        if (!response.ok) {
            return Promise.reject(`Ошибочка вышла: ${response.status}`); 
        }
        return response.json();
    } 

    editAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar `, {
            method: 'PATCH',
            headers: {
              authorization: this.refreshToken(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar.avatar
            })
        })
        .then(response => this._getResponseData(response))
    }

    editProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this.refreshToken(),
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
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => this._getResponseData(response))   
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => this._getResponseData(response))
    }
    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
              authorization: this.refreshToken(),
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
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.refreshToken()
            }
        })
        .then(response => this._getResponseData(response))
    }
    
    addLikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this.refreshToken()
            }
        })
        .then(response => this._getResponseData(response))
    }
    deleteLikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this.refreshToken()
            }
        })
        .then(response => this._getResponseData(response))
    }
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {return this.deleteLikeCard(cardId)} else {return this.addLikeCard(cardId)}
    }

    

}
const api = new Api('http://localhost:3000');
export default api;