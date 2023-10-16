// LINE Notifyのアクセストークン
var LINE_ACCESS_TOKEN = "LINEアクセストークン"
//ラインのグループidを記載する場所
var LineId ="ラインのグループid";

// 活動報告されているのか確認する関数
function CheckAndNotify() {
  // スプレッドシートを取得
  var sheet = SpreadsheetApp.openById("スプレットシートのid").getSheetByName('sheet_01');

  // 検索する範囲のデータを取得
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(1, 6, lastRow);
  var values = range.getValues();
 

  //検索する文字列のリスト
  var searchStrings = ["第10回クリーンアップ大作戦","第10回防犯パトロール","第11回防犯パトロール","第11回クリーンアップ大作戦","エコキャップ大作戦",]; 
  
  // 見つからなかった文字列のリスト
  var notFoundStrings = [];

  //全探索をしている
  for (var i = 0; i < searchStrings.length; i++) {

    var searchString = searchStrings[i];
    var found = false;

    for (var j = 0; j < values.length; j++) {
      if (values[j][0] == searchString) {

        found = true;

        break;
      }
    }

    if (found==false) {

      notFoundStrings.push(searchString);

    }
  }

  // 見つからなかった文字列がある場合、メッセージを送信
  if (notFoundStrings.length > 0) {
    
    var message = "以下の活動が現在報告されていません！\n" 
                  + notFoundStrings.join("\n")
                  +"\nすでに活動していて報告していない方は下のリンクから報告お願いします\n"
                  +"";

    SendLineMessage(message);

  }
}

//活動ごとのコメントと写真を集めるためのLINEBOT
function acCommentCheck(){
  var sheet = SpreadsheetApp.openById("スプレットシートのid").getSheetByName("シート1");
  // 検索する範囲のデータを取得
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(1, 4, lastRow);
  var values = range.getValues();
  console.log(values)
  var searchStrings = [

                       "エコキャップアート","クリーンアップ大作戦","天白区クリーンウォーキング","環境問題カードゲーム",
                       "南砺市見学","あけびの会総会","重度訪問介護研修","ツクイ天白レクリエーション","わらしべ交換会",
                       "子ども食堂「すまいるぺんぎん」","ボウリング大会","なないろマーケット","矢田川あそび","新入生勧誘ブース",
                       "新入生勧誘各部門説明会","活動報告会","モルック体験会","スポーツ大会","大学祭","天白区民祭り",
                       "御幸山中学校防災授業補助ボランティア","オープンキャンパス2023","役員説明会&合同部門説明会",
                       "新規会員・役員交流会","ボッチャ交流会","HP完成" 

                       ]; // 検索する文字列のリスト
  var notFoundStrings = []; // 見つからなかった文字列のリスト
  //全探索をしている
  for (var i = 0; i < searchStrings.length; i++) {

    var searchString = searchStrings[i];
    var found = false;

    for (var j = 0; j < values.length; j++) {
      if (values[j][0] == searchString) {

        found = true;

        break;
      }
    }

    if (found==false) {

      notFoundStrings.push(searchString);

    }
  }

  // 見つからなかった文字列がある場合、メッセージを送信
  if (notFoundStrings.length > 0) {
    
    var message = "以下の活動がコメントと写真を投稿していません！\n" 
                  + notFoundStrings.join("\n")
                  +"\n投稿していない活動の担当者は下のリンクから報告お願いします\n"
                  +"提出期限:10/28\n"
                  +"グーグルフォームのリンク";

    SendLineMessage(message);

  }

  

}


//代表,副代表のコメントを集めるためのLINEBOT
function commentCheck(){
  // スプレッドシートを取得
  var sheet = SpreadsheetApp.openById("1reodBpbyv1yhxD2t1v6ybE6s1EDNgPTSbRD0-HxifsI").getSheetByName("シート1");

  // 検索する範囲のデータを取得
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(1, 6, lastRow);
  var values = range.getValues();
  console.log(values);
    // 特定の文字列をチェック
  var searchStrings = []; // 検索する文字列のリスト
  var notFoundStrings = []; // 見つからなかった文字列のリスト
  //全探索をしている
  for (var i = 0; i < searchStrings.length; i++) {
    var searchString = searchStrings[i];
    var found = false;

    for (var j = 0; j < values.length; j++) {
      if (values[j][0] == searchString) {

        found = true;

        break;
      }
    }

    if (found==false) {

      notFoundStrings.push(searchString);

    }
  }

  // 見つからなかった文字列がある場合、メッセージを送信
  if (notFoundStrings.length > 0) {
    
    var message = "以下の代表,副代表の方がコメントと顔写真を投稿していません！\n" 
                  + notFoundStrings.join("\n")
                  +"\n投稿していない方は下のリンクから報告お願いします\n"
                  +"提出期限:10/21\n"
                  +"";

    SendLineMessage(message);

  }
//グーグルフォームで収集した写真を活動名ごとのファイルに分別する処理
function moveUploadedPhotos() {
  // スプレッドシートのアクティブなシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 最後の行を取得
  var lastRow = sheet.getLastRow();
  
  // 写真のURLとフォルダ名を取得（ここでは2列目と3列目にそれぞれデータがあると仮定）
  var photoUrl = sheet.getRange(lastRow, 2).getValue();
  var folderName = sheet.getRange(lastRow, 3).getValue();
  
  // 写真のファイルを取得
  var fileId = photoUrl.match(/[-\w]{25,}/);
  var file = DriveApp.getFileById(fileId[0]);
  
  // 指定のフォルダ名でフォルダを検索
  var folders = DriveApp.getFoldersByName(folderName);
  var targetFolder;
  
  // フォルダが存在しない場合、新しいフォルダを作成
  if (!folders.hasNext()) {
    targetFolder = DriveApp.createFolder(folderName);
  } else {
    targetFolder = folders.next();
  }
  
  // 写真を指定のフォルダに移動
  file.moveTo(targetFolder);
}

}





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

function ReComment(){
  var ReComment = "役員挨拶文&顔写真用\n"
                  +"＜挨拶文規定＞\n"
                  +"会長・副会長：４５０字"
                  +"各部門代表・部長：６００字\n"
                  +"各部門副代表・副部長：３００字\n"
                  +"＜顔写真＞\n"
                  +"胸より上の写真で正面を向いているもの\n"
                  +"下のグーグルフォームから\nご提出お願いいたします！\n"
                  +"グーグルフォームのリンク\n"
                  +"＜提出期限＞\n"
                  +"10月21日\n"
  SendLineMessage(ReComment);
}

function AcComment(){
  var acComment =  "環境ボランティア部門\n"
                  +"・エコキャップアート\n"
                  +"・クリーンアップ大作戦\n"
                  +"・天白区クリーンウォーキング\n"
                  +"・環境問題カードゲーム\n"
                  +"\n"
                  +"地域安全パトロール部門\n"
                  +"・防犯パトロール\n"
                  +"・ふれあいあいさつ運動\n"
                  +"・自動車ヘルメット被り隊\n"
                  +"・大坪小学校運動会補助ボランティア\n"
                  +"・大坪小学校防犯教室\n"
                  +"・大坪小学校運動会補助ボランティア\n"
                  +"・電動キックボード講習会\n"
                  +"\n"
                  +"災害復興ボランティア部門\n"
                  +"・南砺市見学\n"
                  +""
                  +"福祉ボランティア部門\n"
                  +"・あけびの会総会\n"
                  +"・重度訪問介護研修\n"
                  +"・ツクイ天白レクリエーション\n"
                  +"・わらしべ交換会\n"
                  +"・子ども食堂「すまいるぺんぎん\n"
                  +"・ボウリング大会\n"
                  +""
                  +"子ども部門\n"
                  +"・なないろマーケット\n"
                  +"・矢田川あそび\n"
                  +""
                  +"常時外活動\n"
                  +"・新入生勧誘ブース（近藤か・小林）\n"
                  +"・新入生勧誘各部門説明会（近藤か・小林）\n"
                  +"・活動報告会（加藤）\n"
                  +"・モルック体験会（高島）\n"
                  +"・スポーツ大会（近藤か・小林）\n"
                  +"・御幸山中学校防災授業補助ボランティア（池之上）\n"
                  +"・大学祭（近藤な）\n"
                  +"・天白区民祭り（近藤か・小林）\n"
                  +"・オープンキャンパス2023（高島）\n"
                  +"・役員説明会&合同部門説明会（池之上）\n"
                  +"・新規会員・役員交流会（神野・千野）\n"
                  +"・ボッチャ交流会（水谷）\n"
                  +"・HP完成（安楽）\n"
                  +""
                  +"以上の活動の文章及び活動写真を下記Googleフォームからご提出ください。\n"
                  +"グーグルフォームのリンク\n"
                  +"活動写真は１つの活動につき３枚以上のご提出をお願いします。\n"
                  +""
                  +"提出期限\n"
                  +"＜＜10月28日（土）＞＞\n"

  SendLineMessage(acComment);

}
function SheetMessageSend(){
  var sheet_05 = SpreadsheetApp.openById("スプレットシートのid").getSheetByName('sheet_05');
  var range_05 = sheet_05.getRange("A2");
  var values_05 = range_05.getValue();
  console.log(values_05);
  SendLineMessage(values_05);

}
//--------------------------現在使っていない機能を下に記述しています-----------------------------------------------------------------------------------//
//取得したuseidをspreadsheetに追記する処理
/*
function doPost(e){
  let json = JSON.parse(e.postData.contents);
  let userId = json.events[0].source.userId;
  let groupId = json.events[0].source.groupId;
 
  const spst =  SpreadsheetApp.openById("19z3h3OFXlZtbathVQ3a-1BuHXU00aZ004QQ-gXgHMQo").getSheetByName("sheet_03");
  let row = spst.getLastRow();
 
  spst.getRange(row + 1,1).setValue(getUserName(userId));
  spst.getRange(row + 1,2).setValue(userId);
  spst.getRange(row + 1,3).setValue(groupId);
}

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
*/
//広報ボットの機能を追加するプログラム
function sendLineMessage_koho() {
  var payload = {
    "to": "グループのid",  // ここにユーザーまたはグループのIDを指定してください
    "messages": [
      {
        "type": "text",
        "text": "<<<<<<<<<<<<広報部です！>>>>>>>>>>\n"
                +"\n下のリンクから活動予定のご報告をお願いいたします！\n"
                +"ーーーーーーーーーーーーーーーーーーーーーーーーーー\n"
                +"\n\n"
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
//役員説明会のスライド資料の提出があるのか確認するプログラム
function CheckAndNotify_slide() {
  // スプレッドシートを取得
  var sheet = SpreadsheetApp.openById("スプレットシートのid").getSheetByName("sheet_05");

  // 検索する範囲のデータを取得
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(1, 3, lastRow);
  var values = range.getValues();
  console.log(values)

  // 特定の文字列をチェック
  var searchStrings = ["福祉","地域安全パトロール","子供","環境","災害","広報","財務"]; // 検索する文字列のリスト
  var notFoundStrings = []; // 見つからなかった文字列のリスト
 
  for (var i = 0; i < searchStrings.length; i++) {
    var searchString = searchStrings[i];
    var found = false;

    for (var j = 0; j < values.length; j++) {
      if (values[j][0] === searchString) {
        found = true;
        break;
      }
    }

    if (!found) {
      notFoundStrings.push(searchString);
    }
  }

  // 見つからなかった文字列がある場合、メッセージを送信
  if (notFoundStrings.length > 0) {
    var message = "以下の部門のスライド資料が現在提出されていません！\n" 
                  + notFoundStrings.join("\n")
                  +"\n8/18(金)18時までに下のリンクから提出お願いします\n"
                  +"";
    SendLineMessage(message);
  }
}