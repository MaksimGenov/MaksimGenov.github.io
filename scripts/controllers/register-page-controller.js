controllers.registerPageControllers = (function () {

    function loadPage(ctx) {
        ctx.loggedIn = authorization.loggedIn();
        ctx.loadPartials({
            'header': 'templates/common/header.hbs',
            'footer': 'templates/common/footer.hbs',
            'nav': 'templates/common/navigation.hbs',
        }).then(function () {
            this.partial('templates/register/register-page.hbs')
        })
    }

    function registerUser(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        let repeatPass = ctx.params.repeatPass;
        authorization.register(username,password, repeatPass)
            .then((user) => {
                authorization.saveSession(user);
                ctx.redirect('#/feed');
                notifications.showInfo('Registration successful.')
            }).catch(notifications.handleError);
    }


    return {loadPage,registerUser};
}());