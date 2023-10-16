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