<?php
    if(isset($_POST['update_s'])){
        
        include("connection/connection.php");
        header("Content-type:application/json");

        $id = ($_POST['id']);
        $title = $_POST['title'];
        $text = $_POST['text'];

        $greske = [];
        $code=null;
        $data=[];

        $query = "UPDATE slider SET title = :title, caption = :caption WHERE id_s = :id_s";
        $stmt = $konekcija->prepare($query);
        $stmt->bindParam(':id_s', $id);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':caption', $text);
        try{
            $code = $stmt->execute() ? 201 : 500;
            $data[]=["uspesno"];
        }
        catch(PDOException $e){
            $code = 500;
            $data = $e;
        }
    
        http_response_code($code);
        echo json_encode($data);
    }
?>