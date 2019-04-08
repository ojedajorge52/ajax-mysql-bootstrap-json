<?php
$conn  = new mysqli('localhost', 'root', '', 'materialize');
if($conn->connect_error){
    echo $error->$conn->connect_error;
}

?>