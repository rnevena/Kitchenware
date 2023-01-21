<?php
    if(isset($_POST['update_p'])){
        
        include("connection/connection.php");
        header("Content-type:application/json");

        $prodid = ($_POST['id']);
        $name = $_POST['name'];
        $desc = $_POST['desc'];
        $price = $_POST['price'];

        $rePrice = "/^([0-9]*[.])?[0-9]+$/";

        $greske = [];
        $code=null;
        $data=[];

        if(!preg_match($rePrice,$price)) {
            array_push($greske, "Polje za cenu nije u dobrom formatu");
        }

        if(count($greske)){
            $code=422;
            $data=$greske;
        }
        else{
                try{
                        $query2 = "UPDATE product SET name = :name, description = :desc, price = :price WHERE id_p = :id_p";
                        $stmt2 = $konekcija->prepare($query2);
                        $stmt2->bindParam(':name', $name);
                        $stmt2->bindParam(':desc', $desc);
                        $stmt2->bindParam(':price', $price);
                        $stmt2->bindParam(':id_p', $prodid);
                        try{
                            $code = $stmt2->execute() ? 201 : 500;
                            $data[]=["uspesno"];
                        }
                        catch(PDOException $e){
                            $code = 500;
                            $data = $e;
                        }
                    }
                catch(PDOException $e){
                    $code=409;
                }
            }
        http_response_code($code);
        echo json_encode($data);
    }
?>