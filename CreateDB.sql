CREATE TABLE task ( 
    task_id integer NOT NULL PRIMARY KEY , 
    state varchar(10) DEFAULT 'INCOMPLETE' CHECK(state = 'COMPLETE' OR state = 'INCOMPLETE') , 
    description varchar(50) , 
    dateAdded datetime DEFAULT CURRENT_TIMESTAMP
);