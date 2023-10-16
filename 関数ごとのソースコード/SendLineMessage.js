//メッセージを送信するための処理
function SendLineMessage(message) {
    var payload = {
      "to": LineId,  // ここにユーザーまたはグループのIDを指定してください
      "messages": [
        {
          "type": "text",
          "text": message
        }
      ]
    };
  
    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "headers": {
        "Authorization": "Bearer " + LINE_ACCESS_TOKEN
      },
      "muteHttpExceptions": true
    };
  
    var url = "https://api.line.me/v2/bot/message/push";
  
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
  }