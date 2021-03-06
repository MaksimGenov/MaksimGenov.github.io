controllers.logoutController = (function () {

    function logoutUser(ctx) {
        authorization.logout();
        sessionStorage.clear();
        ctx.redirect("/");
        notifications.showInfo('Logout successful.');
    }

    return {logoutUser};
}());
