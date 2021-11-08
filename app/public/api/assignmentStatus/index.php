<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM ASSIGN_STATUS';
$vars = [];

if (isset($_GET['status'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM ASSIGN_STATUS WHERE status_ID = ?';

 
  $vars = [ $_GET['status'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$status = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($status, JSON_PRETTY_PRINT);


// Step 4: Output
header('Content-Type: application/json');
echo $json;