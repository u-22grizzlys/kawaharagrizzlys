// This is a JavaScript file

/**
 * Created by kbc16a21 on 2017/07/13.
 */
// This is a JavaScript file

var Name="";
var Profile="";
var id;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    window.alert("Create a database and display the content");

}



function executeQuery(tx) {
    //tx.executeSql("update TestTable set id=" + this.id + " where Name='" + this.Name + "'", errorCB);
    tx.executeSql('update TestTable set name = ? where id = ?', [this.Name, this.id])
    
}
function queryDB(tx) {
    tx.executeSql('SELECT * FROM TestTable', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var len = results.rows.length;
    var a="";
    var name="";
    var profile="";
    window.alert("There are " + len + " rows of records in the database.");
    for (var i=0; i<len; i++){
        
        a+="row = " + i + " ID = " + results.rows.item(i).id 
        + " Name = " + results.rows.item(i).Name
        + " profile = " + results.rows.item(i).profile+"<br/>";
    
        
    }
    document.getElementById('answer').innerHTML = a;
    
       
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
function changeDB(){
if(document.form1.Name.value==""){
    window.alert("名前を入力してください");
}else if(document.form1.ID.value==""){
    window.alert("IDを入力してください");
}else{
    var db = window.openDatabase("Database", "1.0", "TestDatabase2", 200000);
    this.Name=document.form1.Name.value;
    this.id=Number(document.form1.ID.value);
    db.transaction(executeQuery, errorCB, successCB);
}
    
    return false;

}



