controllers.loginController = (function () {
    function loadPage(ctx) {
        ctx.loggedIn = authorization.loggedIn();
        ctx.loadPartials({
            'header': 'templates/common/header.hbs',
            'footer': 'templates/common/footer.hbs',
            'nav': 'templates/common/navigation.hbs',
        }).then(function () {
            this.partial('templates/login/login-page.hbs')
        })
    }

    function loginUser(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        authorization.login(username, password)
            .then((user) => {
                authorization.saveSession(user);
                ctx.redirect('#/feed');
                notifications.showInfo('Login successful.')
            }).catch(notifications.handleError);
    }

    return {loginUser,loadPage};
}());