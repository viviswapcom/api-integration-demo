require('dotenv').config()
const ApiToken = require('./api-token.util');
const axios = require('axios');

module.exports = class ApiClient {

    static get API_URL () {
        return process.env.API_ENVIRONMENT !== 'production' 
            ? 'https://api-service-dev.viviswap.com'
            : 'https://api-service.viviswap.com';
    }

    _createHeaders (requestBody = {}, requestQueries = {}) {
        return {
            'Content-Type': 'application/json',
            'X-API-TOKEN': ApiToken.createToken(requestBody, requestQueries),
        }
    }

    _prepareRequestQueries (requestQueries = {}) {
        const stringifiedQueries = Object.keys(requestQueries).map(key => `${key}=${requestQueries[key]}`).join('&');
        if (stringifiedQueries.length > 0) {
            return `?${stringifiedQueries}`;
        }
        return '';
    }

    async get (path, requestQueries = {}) {
        const headers = this._createHeaders({}, requestQueries);
        const queryString = this._prepareRequestQueries(requestQueries);
        return axios.get(`${ApiClient.API_URL}${path}${queryString}`, { headers });
    }

    async post (path, requestBody = {}, requestQueries = {}) {
        const headers = this._createHeaders(requestBody, requestQueries);
        const queryString = this._prepareRequestQueries(requestQueries);
        return axios.post(`${ApiClient.API_URL}${path}${queryString}`, requestBody, { headers });
    }

    async patch (path, requestBody = {}, requestQueries = {}) {
        const headers = this._createHeaders(requestBody, requestQueries);
        const queryString = this._prepareRequestQueries(requestQueries);
        return axios.patch(`${ApiClient.API_URL}${path}${queryString}`, requestBody, { headers });
    }

    async delete (path, requestBody = {}, requestQueries = {}) {
        const headers = this._createHeaders(requestBody, requestQueries);
        const queryString = this._prepareRequestQueries(requestQueries);
        return axios.delete(`${ApiClient.API_URL}${path}${queryString}`, { headers });
    }

}