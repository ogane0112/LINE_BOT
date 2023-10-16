 //useridを取得する処理
 function getUserName(userId) {
    const url = "https://api.line.me/v2/bot/profile/" + userId;
    const response = UrlFetchApp.fetch(url, {
                "headers" : {
                "Authorization" : "Bearer " +LINE_ACCESS_TOKEN
                }
    });
  
    return JSON.parse(response.getContentText()).displayName;
  
  }