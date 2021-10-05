Create database if not exists ref;
use ref;

create table if not exists REFREE (
 ref_ID varchar(8),
 first_name varchar(20),
 last_name varchar(20),
 date_of_birth date,
 ref_rate int,
 primary key (ref_ID)
);
 
 
 create table if not exists ASSIGNMENT (
 assign_ID varchar(8),
 game_ID varchar(8) references game(game_id), 
 ref_ID varchar(8) references referee(ref_id),
 assign_status varchar(15),
 primary key (assign_id)
 );
 
 Create table if not exists GAME (
 game_ID varchar(8),
 game_level varchar(25),
 game_date date,
 primary key (game_ID)
 );
