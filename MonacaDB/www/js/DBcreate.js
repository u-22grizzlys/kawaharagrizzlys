// This is a JavaScript file

/**
 * Created by kbc16a21 on 2017/07/13.
 */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    window.alert("Create a database and display the content");

}


function executeQuery(tx) {
    tx.executeSql('DROP TABLE IF EXISTS TestTable');
    tx.executeSql('CREATE TABLE IF NOT EXISTS TestTable (id unique, Name, profile)');
    tx.executeSql('INSERT INTO TestTable (id, Name, profile) VALUES (1, "さとし", "さとし君")');
    tx.executeSql('INSERT INTO TestTable (id, Name, profile) VALUES (2, "FUNAMUSI", "FUNAMUSI君")');
    tx.executeSql('INSERT INTO TestTable (id, Name, profile) VALUES (3, "OGAWAK", "OGAWA君")');
    tx.executeSql('INSERT INTO TestTable (id, Name, profile) VALUES (4, "いしかわ", "いしかわ君")');
}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM TestTable', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var len = results.rows.length;
    var a="";
    //window.alert("There are " + len + " rows of records in the database.");
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

function createDB(){
    var db = window.openDatabase("Database", "1.0", "TestDatabase2", 200000);
    db.transaction(executeQuery, errorCB, successCB);

}
