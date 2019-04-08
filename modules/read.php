<?php
try{
    require_once('conexion_db.php');
    mysqli_set_charset($conn, "utf8");
    $sql = "SELECT*FROM productos";
    $resultado = $conn->query($sql);
    $i=0;
    $rawdata = array(); 
    while ($row = $resultado->fetch_assoc()) {
        $rawdata[$i] = $row;
        $i++;
    }
    print_r (json_encode($rawdata));
     

}catch(Exception $e){
    $error = $e->getMessage();
}
$conn ->close();