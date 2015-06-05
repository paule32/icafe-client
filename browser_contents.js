$(document).ready(function() {
    // WebSocket
    window.app = {};
    var socket = io.connect('http://localhost:9081');

    socket.on('connect',function() {
        console.log('Client has connected to the server!');
    });

    socket.on('message', function(data) {
        console.log('1234567');
        $('#content').html = 'ccccc';
    });

    socket.on('screen_off', function() {
        console.log('ancdefg');
        $('#content').html = 'ccccc';
    });

    window.socket_ = socket;

    // Nachricht senden
    window.app.senden = function(para) {
        console.log('sendung');
        window.socket_.emit('new_msg', {msg: 'hello'});
    }
    // bei einem Klick
    $('#senden1').click( function(){window.app.senden('screen_on')} );
    $('#senden2').click( function(){window.app.senden('screen_off')} );
});
