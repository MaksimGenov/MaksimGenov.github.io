const notifications = (function () {

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        let span = $(infoBox.find('span')).text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        let span = $(errorBox.find('span')).text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    function showHideLoadingBox() {
        let loadingBox = $('#loadingBox');
        let timer = 0;
        $(document).ajaxStart(() => {
            if (timer < 0)
                loadingBox.fadeIn();
            timer++;
        });
        $(document).ajaxStop(() => {
            setTimeout(() => {
                timer--;
                if (timer < 0)
                    loadingBox.fadeOut();
            }, 500)
        });
    }

    return {handleError, showInfo, showError, showHideLoadingBox};
}());