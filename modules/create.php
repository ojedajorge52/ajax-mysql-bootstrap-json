<?php

function peticion_ajax(){
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}
$nombre = htmlspecialchars($_POST['nombre']);
$precio = htmlspecialchars($_POST['precio']);

try{
    require_once('conexion_db.php');
    $sql = "INSERT INTO `productos` VALUES ('', '{$nombre}', '{$precio}')";
    $resultado = $conn->query($sql);  
    if(peticion_ajax()){
        echo json_encode(array(
            'respuesta' => $resultado
        ));
    }else{
        exit;
    }
}catch(Exception $e){
    $error = $e->getMessage();
}
$conn ->close();