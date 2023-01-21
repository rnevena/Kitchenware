<?php

    if(isset($_POST['contact'])){
        
        include("connection/connection.php");
        header("Content-type:application/json");

        $email = $_POST['email'];
        $message = $_POST['message'];

        $reEmail = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/";
        $reMessage = "/^.{10,255}$/";

        $greske = [];
        $code=404;
        $data=null;

        if(!filter_var($email,FILTER_VALIDATE_EMAIL)) {
            array_push($greske, "Polje za email nije u dobrom formatu");
        }
        if(!preg_match($reMessage, $message)) {
            array_push($greske, "Poruka mora imati izmedju 10 i 255 karaktera");
        }

        if(count($greske)){
            $code=422;
            $data=$greske;
        }
        else{
                try{
                    $query = "SELECT * FROM messages WHERE mail = :mail";
                    $stmt = $konekcija->prepare($query);
                    $stmt->bindParam(':mail', $email);
                    $rezultat = $stmt->execute();
                    $dohvati = $stmt-> fetch();
                    if($dohvati){
                       $code=409;
                    }
                    else{
                        $query2= "INSERT INTO messages (mail, msg) VALUES (:mail, :msg)";
                        $stmt2 = $konekcija->prepare($query2);
                        $stmt2->bindParam(':mail', $email);
                        $stmt2->bindParam(':msg', $message);

                        try{
                            $code = $stmt2->execute() ? 201 : 500;
                            $data = 'success';
                        }
                        catch(PDOException $e){
                            $code = 500;
                            $data = $e;
                        }
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