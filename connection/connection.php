<?php
    $dbname = "kitchenware";
    $servername = "localhost";
    $user = "root";
    $pass = "";
    $konekcija = new PDO("mysql:host=$servername;dbname=$dbname;", $user,
    $pass);
    $konekcija->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $konekcija->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    // if($konekcija){
    //     echo "success";
    // }
    // else {
    //     echo "no success";
    // }
?>
