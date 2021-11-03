<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM GAMES';
$vars = [];

if (isset($_GET['games'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM GAMES WHERE id = ?';

 
  $vars = [ $_GET['games'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);


// Step 4: Output
header('Content-Type: application/json');
echo $json;