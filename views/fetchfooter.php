<?php
    include("connection/connection.php");
    $stmt = $konekcija->prepare("SELECT * FROM `footer`");
    $rezultat = $stmt->execute();
    $ispis = "";
    foreach($stmt as $s){
        $ispis .= "<a href='$s->href'><i class='$s->class'></i></a> ";
    }
    echo $ispis;
?>
