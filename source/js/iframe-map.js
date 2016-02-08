console.log('BBC Custom JS');

require(['jquery'], function ($) {

    var getParameterByName = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var iframeId = getParameterByName('iframeid');
    var shouldHideHeader = getParameterByName('hideheader') === 'true';
    var headerOffset = shouldHideHeader ? 30 : 0;

    var sendHeightPostMessage = function (height) {
        var message = {
            height: height,
            iframeid: iframeId
        }
        window.parent.postMessage(JSON.stringify(message), '*');
    };

    var lastSentHeight;
    var sendHeightToParent = function () {
        var contentHeight = $('#map').height() + headerOffset;

        if (contentHeight !== lastSentHeight) {
            lastSentHeight = contentHeight;
            sendHeightPostMessage(contentHeight);
        }
        
    }
    sendHeightToParent();
    setInterval(sendHeightToParent, 30);


    if (shouldHideHeader) {
        $('#ap-container-nav').hide();
    } else {
        $('#ap-container-nav').css({
            'bottom': '0',
            'top': 'initial'
        });
        $('#timestamp').hide();
    }
});
