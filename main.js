//Instance of PubNub 
var pubnub;

//Keys to PubNub Block
var pubkey = 'pub-c-ac884c47-32a8-4c45-b4b3-b99ff74d3c70';
var subkey = 'sub-c-3bcd7f26-fe2e-11e6-9349-0619f8945a4f';

//Name of the user used to publush
var userName;

window.onload = function(){
    init();
}

function init() {
    pubnub = new PubNub ({
        publishKey: pubkey,
        subscribeKey: subkey
    });
    
    pubnub.addListener({
        message: function(Object) {
            var text = Object.message.text;
            var name = Object.message.userName;
            console.log(text);
            
            var element = '<span>'+name + ': '+text+'</span><br>';
            console.log(element);
            $('#chat-box-area').append(element);
            $('#chat-box-area').trigger('refresh');
        }
    });
    
    pubnub.subscribe({
        channels: ['chat-channel']
    })
}

$('#btn-userName').on("click",function(){
    userName = $('#username').val();
    alert("now using userName: '"+userName + "'");
});

$("#btn-chat").on("click",function(){
    var messageText = $('#btn-input').val();
    publishText(messageText);
});

function publishText(messageText) {
    var userNameLocal;
    userNameLocal = (userName === undefined) ? "guest" : userName;
    pubnub.publish({
        channel: "chat-channel",
        message: {
            "text":messageText,
            "userName": userNameLocal
        }
    });
}
