var token = "EAAXZAwMUAd2IBAL0QRrN6Vx01L5RBKHppKoEcq0LL4ZBAxSS833sb80wTwW0tVWEQ1zHbiS1LdBwSxjLwhgLXDQbc0CpZCJ8NTqOiJpqArOES7LvfyKbZAZAHlg0a6yJRyHsQg0OCyHxlVnrzd5wiADxnp0c81NxQaZBSzbO3EGQZDZD"
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.post("/webhook", function (request, response) {
  // console.log(request.body);
  messaging_events = request.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    ev = request.body.entry[0].messaging[i];
    sender = ev.sender.id;
    if (ev.message && ev.message.text) {
      text = ev.message.text;
      sendTextMessage(sender, "How may i help you sir/ma?" + text.substring(0, 200));
    }
  }
  response.sendStatus(200);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});