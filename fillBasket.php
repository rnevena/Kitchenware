<?php

    include("connection/connection.php");
    header('Content-Type:application/json');

    $query = "SELECT * FROM product p INNER JOIN img i ON p.id_i=i.id_i";  
    $stmt = $konekcija->prepare($query);
    $rezultat = $stmt->execute();
    $dohvati = $stmt->fetchAll(PDO::FETCH_OBJ);

    $status=200;
    echo json_encode($dohvati);

?>