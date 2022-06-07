<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);
// Данная строка нужна ,чтбы забирать какие-то данные ,превращать их в строку и показывать на клиенте(response)