var receivePostMessage = function (event) {
    var message = JSON.parse(event.data);

    if (message.height && message.iframeid) {
       var el = document.getElementById('newsspec_13489--ap-iframe__' + message.iframeid); 
       if (el) {
           el.setAttribute('style', 'height:' + message.height + 'px');
       }
    }
};

window.addEventListener('message', receivePostMessage);
