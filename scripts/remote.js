let remote = (function () {
    const URL_DB = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_S1FA7nN2z';
    const APP_SECRET = '395f8d2ed42b40198f903a8a1c13ef94';

    function makeRequest(method, module, authType, endPoint, data) {
        let requestObj = {
            method: method,
            url: URL_DB + module + '/' + APP_KEY + '/' + endPoint,
            headers: {'Authorization': generateAuth(authType)}
        };
        if (data)
            requestObj.data = data;
        return requestObj;
    }

    function generateAuth(type) {
        if (type.toLowerCase() === 'basic')
            return 'Basic ' + btoa(APP_KEY + ":" + APP_SECRET);
        else if (type.toLowerCase() === 'kinvey')
            return 'Kinvey ' + sessionStorage.getItem('authtoken');
        else
            console.log('Check your authorization Dummy!')
    }

    function get(module, authType, endPoint) {
        return $.ajax(makeRequest('GET', module, authType, endPoint));
    }

    function post(module, authType, endPoint, data) {
        return $.ajax(makeRequest('POST', module, authType, endPoint, data));
    }

    function update(module, authType, endPoint, data) {
        return $.ajax(makeRequest('PUT', module, authType, endPoint, data));
    }

    function remove(module, authType, endPoint) {
        return $.ajax(makeRequest('DELETE', module, authType, endPoint));
    }

    return {get, post, update, remove}
}());