Create database if not exists ref;
use ref;

create table if not exists Referee (
 ref_ID varchar(8),
 first_name varchar(20),
 last_name varchar(20),
 date_of_birth date,
 ref_rate int
);
 
 
 create table if not exists Assignment (
 assign_ID varchar(8),
 game_ID varchar(8), 
 ref_ID varchar(8),
 assign_status varchar(15));
 
 Create table if not exists Game(
 game_ID varchar(8),
 game_level varchar(25),
 game_date date);
