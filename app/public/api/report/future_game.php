<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
game_date,
game_location,
assign_status
FROM ASSIGNMENT 
INNER JOIN GAMES ON ASSIGNMENT.game_id = GAMES.game_id
Where
assign_status = "Unassigned"
AND
GAMES.game_date >= (SELECT CURDATE() as today FROM DUAL)';
$vars = [];

if (isset($_GET['futureAssignments'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT 
  game_date,
  game_location,
  assign_status
FROM ASSIGNMENT 
INNER JOIN GAMES ON ASSIGNMENT.game_id = GAMES.game_id
Where
assign_status = "Unassigned"
AND
GAMES.game_date >= (SELECT CURDATE() as today FROM DUAL)';

 
  $vars = [ $_GET['futureAssignments'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$futureAssignments = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($futureAssignments, JSON_PRETTY_PRINT);


// Step 4: Output
header('Content-Type: application/json');
echo $json;
