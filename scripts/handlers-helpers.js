Handlebars.registerHelper('date', function (date) {
    return new Date(date)
});
Handlebars.registerHelper('checkAuth', function (author) {
    return sessionStorage.getItem('username') === author;
});

Handlebars.registerHelper('calcTime', function (dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }
);

Handlebars.registerHelper('isMyChirp', function (chirp) {
    return sessionStorage.getItem('myId') === chirp._acl.creator;
});