<?php
    if(isset($_POST['update'])){
        
        include("connection/connection.php");
        header("Content-type:application/json");

        $userid = ($_POST['id']);
        $fullname = $_POST['fullname'];
        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $roleid = ($_POST['role']);

        $reFullName ="/^([A-Z][a-z]{2,15})(\s[A-Z][a-z]{2,15})+$/";
        $reEmail = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/";
        $reUserPass = "/^[a-zA-Z0-9]{4,20}$/";

        $greske = [];
        $code=null;
        $data=[];

        if(!preg_match($reFullName, $fullname)) {
            array_push($greske, "Polje za ime nije u dobrom formatu");
        }
        if(!preg_match($reEmail,$email)) {
            array_push($greske, "Polje za email nije u dobrom formatu");
        }
        if(!preg_match($reUserPass, $username)) {
            array_push($greske, "Korisnicko ime mora imati barem 4 karaktera");
        }
        if(!preg_match($reUserPass, $password)) {
            array_push($greske, "Lozinka mora imati barem 4 karaktera");
        }

        if(count($greske)){
            $code=422;
            $data=$greske;
        }
        else{
                try{
                    $query = "SELECT * FROM user WHERE username = :username OR email = :email";
                    $stmt = $konekcija->prepare($query);
                    $stmt->bindParam(':username', $username);
                    $stmt->bindParam(':email', $email);
                    $rezultat = $stmt->execute();
                    $dohvati = $stmt-> fetchAll();
                    if($dohvati){
                        $code=409;
                    }
                    else{
                        $md5pass=md5($password);
                        $query2 = "UPDATE user SET fullname = :fullname, email = :email, username = :username, pass = :pass, id_r = :id_r WHERE id_u = :id_u";
                        $stmt2 = $konekcija->prepare($query2);
                        $stmt2->bindParam(':fullname', $fullname);
                        $stmt2->bindParam(':email', $email);
                        $stmt2->bindParam(':username', $username);
                        $stmt2->bindParam(':pass', $md5pass);
                        $stmt2->bindParam(':id_r', $roleid);
                        $stmt2->bindParam(':id_u', $userid);
                        try{
                            $code = $stmt2->execute() ? 201 : 500;
                            $data[]=["uspesno"];
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