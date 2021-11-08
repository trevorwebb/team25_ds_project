<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM POSITIONS';
$vars = [];

if (isset($_GET['positions'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM POSITIONS WHERE position_ID = ?';

 
  $vars = [ $_GET['positions'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$positions = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($positions, JSON_PRETTY_PRINT);


// Step 4: Output
header('Content-Type: application/json');
echo $json;