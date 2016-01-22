var ElementResizer = function (options) {

    var el = options.el,
        elementQueries = options.elementQueries;

    var currentElementHeight; // Stored to prevent hitting DOM when not needed
        
    function getHeightFromElementWidth(elementWidth) {
        for (var i = 0; i < elementQueries.length; i++) {
            var elementQuery = elementQueries[i]; 
            if (elementWidth >= elementQuery['min-width']) {
                heightOfElement = elementQuery.height;
            } else {
                break;
            }
        }

        return heightOfElement;
    }

    function setElementHeight(height) {
        el.setAttribute('style', 'height:' + height + 'px');
        currentElementHeight = height;
    }

    function resizeElement() {
        var elementWidth = el.offsetWidth;
        var elementNeededHeight = getHeightFromElementWidth(elementWidth); 

        if (currentElementHeight !== elementNeededHeight) {
            console.log('Setting height: ' + elementNeededHeight);
            setElementHeight(elementNeededHeight);
        }
    }

    setInterval(resizeElement, 30);
    resizeElement();
};
