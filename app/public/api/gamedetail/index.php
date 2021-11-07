<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM GAMES';
$vars = [];

if (isset($_GET['ref'])) {
    $sql = 'SELECT 
    *
    FROM GAMES gta
    inner join ASSIGNMENT ata on ata.game_ID=gta.game_ID
    inner join REFEREES rta on rta.id=ata.ref_ID
    WHERE rta.id = ?'

  //NOT THIS WAY
  // $sql = 'SELECT * FROM offer WHERE studentId = ' . $_GET['student'];

  $vars = [ $_GET['ref'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;