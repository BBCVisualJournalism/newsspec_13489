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
            setElementHeight(elementNeededHeight);
        }
    }

    // Ensures the resize event is only called once every 30 miliseconds
    function throttledResize(event) {
        var isRunning = false;

        return function () {
            if (!isRunning) {
                event();
                console.log('Calling')

                isRunning = true;
                setTimeout(function (){
                    isRunning = false
                }, 30);
            }
        }
    }

    var init = function() {
        resizeElement();
        window.addEventListener('resize', throttledResize(resizeElement));
    }();
};
