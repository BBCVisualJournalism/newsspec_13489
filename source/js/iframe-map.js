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
    var headerOffset = shouldHideHeader ? 0 : 30;

    var sendHeightPostMessage = function (height) {
        var message = {
            height: height,
            iframeid: iframeId
        }
        window.parent.postMessage(JSON.stringify(message), '*');
    };

    var getTooltipHeightOffset = function () {
        var $tooltip = $('#tooltip-county-results');
        if ($tooltip.is(':visible')) {
            return $tooltip.prop('scrollHeight') + $tooltip.height();
        } else {
            return 0;
        }
    };

    var lastSentHeight;
    var sendHeightToParent = function () {
        var mapHeight = $('#map').height(),
            tooltipHeight = getTooltipHeightOffset();

        var contentHeight = Math.max(mapHeight, tooltipHeight) + headerOffset;

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
        $('body').addClass('hide-timestamp');
    }
});
