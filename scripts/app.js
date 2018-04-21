const controllers = {};

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('/', (ctx) => ctx.redirect('#/login'));
        this.get('#/register', controllers.registerPageControllers.loadPage);
        this.post('#/register', controllers.registerPageControllers.registerUser);
        this.get('#/logout', controllers.logoutController.logoutUser);
        this.get('#/login', controllers.loginController.loadPage);
        this.post('#/login', controllers.loginController.loginUser);
        this.get('#/feed', controllers.feedPageController.loadPage);
        this.get('#/myFeed', controllers.myFeedPageController.loadPage);
        this.post('#/postChirp', controllers.chirpCreateController.postChirp);
        this.get('#/discover', controllers.discoverPageController.loadPage);
        this.get('#/user/:id', controllers.userProfilePageController.loadPage);
        this.get('#/followUser/:id', controllers.userProfilePageController.handleFollowUser);
        this.get('#/unFollowUser/:id', controllers.userProfilePageController.handleUnFollowUser);
        this.get('#/deleteChirp/:id', controllers.myFeedPageController.deleteChirp);


    });

    app.run();
    notifications.showHideLoadingBox();
});
