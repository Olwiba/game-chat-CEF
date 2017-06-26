//Close chat tab
function closeChatTab(e) {
  var closeChatId = $(e).data('chat-id');
  $('.' + closeChatId).remove();
  defaultTab();
  $('#' + closeChatId).remove();
}

// ============= Join message =============
function joinMessage(chatName, chatId, privateMessage) {
  var htmlMessage;
  if (privateMessage) {
    htmlMessage = '<div class="chat-ln">New message from ' + chatName + '</div>';
    $('#' + chatId).append(htmlMessage);
  }
  else {
    htmlMessage = '<div class="chat-ln">You have joined ' + chatName + ' chat</div>';
    $('#' + chatId).append(htmlMessage);
  }

}

// ============= Update when tab switch =============
function switchTab(e) {
  var target = $(e).data('chat-id');
  $('#chat-input-text').data('chat-id', target);
  console.log('new target: ', $('#chat-input-text').data('chat-id'));
}

function defaultTab() {
  var defaultChat = 'general';
  $('#chat-input-text').data('chat-id', defaultChat);
  $('#' + defaultChat).addClass('active');
  $('.chat-tab-' + defaultChat).addClass('active');
}


// ============= Clean chat history =============
function cleanChat(chatId) {
  var chatLength = $('#' + chatId + ' div').length;

  if (chatLength > 13) {
    $('#' + chatId + ' div').first().remove();
  }
}

// ============= Update scroll =============
function updateScroll(chatId) {
  var scrollTop = $('#' + chatId).height();
  console.log($('#' + chatId).height());
  console.log($('#' + chatId + ' div').length);
  $('#' + chatId).stop().animate({ scrollTop: scrollTop }, 100);
}

// ============= Add chat =============
function addMessage(message, chatId) {
  var d = new Date(), hours = d.getHours(), mins = d.getMinutes();
  var timeStamp = hours + ':' + mins;
  var htmlMessage = '<div class="chat-ln"><span class="chat-ln--time">'+ timeStamp + '</span> <span class="chat-ln--clan">Clan Name</span> <span class="chat-ln--username">Username</span>: ' + message + '</div>';

  $('#' + chatId).append(htmlMessage);
  $('#chat-input-text').val('');

  cleanChat(chatId);
  updateScroll(chatId);
}

function newPrivateMessage(fromUser) {
  var chatId = 'pm-' + fromUser;
  var newChatTab = '<li class="chat-tab ' + chatId + '"><a href="#' + chatId + '" data-chat-id="' + chatId + '" data-toggle="tab">' + fromUser + ' <span onclick="closeChatTab(this)" data-chat-id="' + chatId + '"><i class="fa fa-times" data-chat-id="' + chatId + '" aria-hidden="true"></i></span></li>';
  var newChatPane = '<div class="tab-pane chat-pane" id="' + chatId + '"></div>';
  // add new tab with name
  $('.chat-tabs').append(newChatTab);
  $('.tab-content').append(newChatPane);
  eventListeners();

  joinMessage(fromUser, chatId, true);
}

//Event listeners
function eventListeners() {

  $('.chat-tab a').click(function() {
    switchTab(this);
  });
}

eventListeners();

// Key listeners
$(document).keypress(function(e) {
  //enter
  if(e.which == 13) {
    var message = $('#chat-input-text').val();
    var chatId = $('#chat-input-text').data('chat-id');
    addMessage(message, chatId);
  }
});
