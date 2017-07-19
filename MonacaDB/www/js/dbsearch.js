// This is a JavaScript file

// This is a JavaScript file

/**
 * Created by kbc16a21 on 2017/07/13.
 */
// This is a JavaScript file

var id;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    window.alert("Create a database and display the content");

}



function executeQuery(tx) {
    
    
}
function queryDB(tx) {
    tx.executeSql('SELECT * FROM TestTable WHERE id = ?',[this.id], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var len = results.rows.length;
    var Name="";
    var profile="";
    window.alert("There are " + len + " rows of records in the database.");
    for (var i=0; i<len; i++){
        
        /*a+="row = " + i + " ID = " + results.rows.item(i).id 
        + " Name = " + results.rows.item(i).Name
        + " profile = " + results.rows.item(i).profile+"<br/>";*/
        
        Name=results.rows.item(i).Name;
        profile=results.rows.item(i).profile;
        
    }
    document.getElementById('answer').innerHTML = Name;
    document.getElementById('answer2').innerHTML = profile;
       
}

//Callback function when the transaction is failed.
function errorCB(err) {
    console.log("Error occured while executing SQL: "+err.code);
}

// Callback function when the transaction is success.
function successCB() {
    var db = window.openDatabase("Database", "1.0", "TestDatabase2", 200000);
    db.transaction(queryDB, errorCB);
}

function viewDB(){

    var db = window.openDatabase("Database", "1.0", "TestDatabase2", 200000);
    //db.transaction(executeQuery,errorCB, successCB);
    db.transaction(successCB,errorCB);

}
function searchDB(){
    if(document.form1.ID.value==""){
        window.alert("IDを入力してください");
    }else if(document.form1.ID.value.match(/[^0-9]+/)){
        window.alert("数字を入力してください");
    }else{
        var db = window.openDatabase("Database", "1.0", "TestDatabase2", 200000);
        this.id=Number(document.form1.ID.value);
        db.transaction(executeQuery, errorCB, successCB);
    }

    
    return false;

}


