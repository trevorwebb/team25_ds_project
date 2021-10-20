DROP database ref;
Create database if not exists ref;
use ref;

create table if not exists REFEREES (
 ref_ID varchar(8),
 first_name varchar(20) NOT NULL,
 last_name varchar(20) NOT NULL,
 date_of_birth date NOT NULL,
 ref_rating int,
 primary key (ref_ID)
);

 Create table if not exists GAME (
 game_ID varchar(8),
 game_level varchar(25) NOT NULL,
 game_date date NOT NULL,
 primary key (game_ID)
 );
 
 
 create table if not exists ASSIGNMENT (
 assign_ID varchar(8),
 game_ID varchar(8) references game(game_id), 
 ref_ID varchar(8) references referees(ref_id),
 position varchar(20) NOT NULL,
 assign_status varchar(15) NOT NULL,
 primary key (assign_id)
 );
 


insert into REFEREES values
   ('001','Bipin','Prabhakar','1990-08-17',99),
   ('002','Tom','Gregory','1995-04-23',87),
   ('003','Alan','Dennis','1988-06-15',79);
   
insert into GAME values
   ('101','1','2021-12-23'),
   ('102','3','2022-01-15');
   
insert into ASSIGNMENT values
   ('1000','101','001','Head','Assigned'),
   ('2000','102','002','Head','Tentative'),
   ('2001','102','003','Assistant','Unassigned'),
   ('2002','102','001','Assistant','Tentative');