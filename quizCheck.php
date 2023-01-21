<?php
    if(isset($_POST['submitquiz'])){
        session_start();
        include("connection/connection.php");

            $query = "INSERT INTO quiz_user (id_u) VALUES (:id_u)";
            $stmt = $konekcija->prepare($query);
            $stmt->bindParam(':id_u',  $_SESSION['user']->id_u);
            $rezultat = $stmt->execute();

            $url="index.php";
            echo "<script>location.href='$url'</script>";
    }
?>