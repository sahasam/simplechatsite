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

//Initialize the pubnub instance, and subscribe to main channel
function init() {
    
    //initialize pubnub instance
    pubnub = new PubNub ({
        publishKey: pubkey,
        subscribeKey: subkey
    });
    
    //listen to all updates on the block
    pubnub.addListener({
        message: function(Object) {
            //get basic test information
            var text = Object.message.text;
            var name = Object.message.userName;
            console.log(text);
            
            //make text listing
            var element = '<span>'+name + ': '+text+'</span><br>';
            console.log(element);
            
            //show the text
            $('#chat-box-area').append(element);
            $('#chat-box-area').trigger('refresh');
        }
    });
    
    //subscribe to 'chat-channel' to get all json packets published to it
    pubnub.subscribe({
        channels: ['chat-channel']
    })
}

//Set the username
$('#btn-userName').on("click",function(){
    userName = $('#username').val();
    alert("now using userName: '"+userName + "'");
});

//Send a chat
$("#btn-chat").on("click",function(){
    var messageText = $('#btn-input').val();
    publishText(messageText);
});

//Publish text to pubnub
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
