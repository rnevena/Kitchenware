<?php
      session_start();
      include("connection/connection.php");
    
    if(isset($_POST['btnlogin'])){
        
        $username = $_POST['usernameLogin'];
        $password = $_POST['passwordLogin'];

        $reUserPass = "/^[a-zA-Z0-9]{4,20}$/";

        $greske=[];

        if(!preg_match($reUserPass, $username)) {
            array_push($greske, "Username must contain between 4 and 20 characters");
        }
        if(!preg_match($reUserPass, $password)) {
            array_push($greske, "Username must contain between 4 and 20 characters");
        }

        if(count($greske)){
            $url="register.php";
            echo "<script>location.href='$url'</script>";
        }
        else{
            $md5pass=md5($password);
            $query = "SELECT * FROM user WHERE username = :username AND pass = :pass";
            $stmt = $konekcija->prepare($query);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':pass', $md5pass);
            $rezultat = $stmt->execute();
            if($rezultat){
                if($stmt->rowCount()==1){
                    $dohvati = $stmt->fetch();
                    $_SESSION['user']=$dohvati;
                    unset($_SESSION['errors']);
                    $url="index.php";
                    echo "<script>location.href='$url'</script>";
                }
                else {
                    $_SESSION['errors'] = "Wrong username or password";
                    unset($_SESSION['user']);
                    $url="register.php";
                    echo "<script>location.href='$url'</script>";
                }
            }  
        }
    }
?>