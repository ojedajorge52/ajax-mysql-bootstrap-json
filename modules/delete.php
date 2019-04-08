<?php

function peticion_ajax(){
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}
$id = htmlspecialchars($_POST['id']);

try{
    require_once('conexion_db.php');
      
    if(peticion_ajax()){
        $sql = "DELETE FROM productos WHERE id=$id";
        $resultado = $conn->query($sql);
        if($resultado){
            echo json_encode(array(
                'respuesta' => $resultado
            ));
        }
    }else{
        exit;
    }
}catch(Exception $e){
    $error = $e->getMessage();
}
$conn ->close();