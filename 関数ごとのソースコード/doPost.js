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