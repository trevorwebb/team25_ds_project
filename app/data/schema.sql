DROP database ref;
Create database if not exists ref;
use ref;

create table if not exists REFEREES (
 id int AUTO_INCREMENT,
 first_name varchar(20) NOT NULL,
 last_name varchar(20) NOT NULL,
 date_of_birth date NOT NULL,
 ref_rating int,
 primary key (id)
);

Create table if not exists LEVELS (
   game_level varchar(25),
   num_of_refs varchar(2)
);


 Create table if not exists GAMES (
 game_ID int AUTO_INCREMENT,
 game_level varchar(25) NOT NULL,
 game_date datetime NOT NULL,
 game_location varchar(40),
 primary key (game_ID)
 );
 
 
 create table if not exists ASSIGNMENT (
 assign_ID int AUTO_INCREMENT,
 game_ID varchar(8) references games(game_ID) NOT NULL, 
 ref_ID varchar(8) references referees(id),
 position varchar(20) NOT NULL,
 assign_status varchar(15) NOT NULL,
 primary key (assign_id)
 );
 
 create table if not exists POSITIONS (
    position_ID varchar(25),
    position_name varchar(25)
 );

 create table if not exists ASSIGN_STATUS (
    status_ID varchar(25),
    status_name varchar(25)
 );

insert into REFEREES values
   ('1','Bipin','Prabhakar','1990-08-17',7),
   ('2','Tom','Gregory','1995-04-23',9),
   ('3','Alan','Dennis','1988-06-15',5);
   
insert into GAMES values
   ('1','Low','2021-12-23 20:00:00', 'Lancaster'),
   ('2','Normal','2022-01-15 21:00:00', 'Aurora');
   
insert into ASSIGNMENT values
   ('1','1','1','Head','Assigned'),
   ('2','2','2','Head','Tentative'),
   ('3','2','','Assistant','Unassigned'),
   ('4','1','','Assistant','Unassigned'),
   ('5','2','1','Assistant','Tentative');
insert into LEVELS values
   ('Low', '1'),
   ('Normal', '3'),
   ('High', '4');

insert into POSITIONS values
   ('1','Head Referee'),
   ('2', 'Linesman 1'),
   ('3', 'Linesman 2'),
   ('4', 'Fourth Official');

insert into ASSIGN_STATUS values
   ('1','Assigned'),
   ('2','Tentative'),
   ('3','Unassigned');