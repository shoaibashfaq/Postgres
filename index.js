const express= require ('express');
const app =express();

const {Pool}= require('pg');
const pool = new Pool({
    host: 'localhost',
    port:5432,
    database:"company",
    user: 'shoaib',
    password:""
});

app.get("/employees",(req,res)=>{

    pool.query(
    `SELECT Employees.first_name, Employees.last_name, Departments.department_name
    FROM Employees
    INNER JOIN Departments ON Employees.department_id = Departments.department_id;`,
    (error,result)=>{
        try{
            console.log(result.rows)
            res.send(result.rows);
        }catch{
            console.log(error)
        }
    });

    pool.query(
        `SELECT Employees.first_name, Employees.last_name, Departments.department_name, Positions.position_name
        FROM Employees
        INNER JOIN Departments ON Employees.department_id = Departments.department_id
        INNER JOIN Positions ON Employees.position_id = Positions.position_id;
        `,
        (error,result)=>{
            try{
                console.log(result.rows)
                res.send(result.rows);
            }catch{
                console.log(error)
            }
    });

    pool.query(
        `SELECT Employees.first_name, Employees.last_name, Departments.department_name, Positions.position_name, Salaries.salary
        FROM Employees
        INNER JOIN Departments ON Employees.department_id = Departments.department_id
        INNER JOIN Positions ON Employees.position_id = Positions.position_id
        INNER JOIN Salaries ON Employees.employee_id = Salaries.employee_id;        
        `,
        (error,result)=>{
            try{
                console.log(result.rows)
                res.send(result.rows);
            }catch{
                console.log(error)
            }
    });
});

app.get('/insert',(req,res)=>{
    pool.query(
        `INSERT INTO employees
        VALUES (6,'Shoaib','Ashfaq',2,3)`
        ,(error,result)=>{
            if(error) {
                console.log("error in insert")
            } else {
                console.log("inserted")
            }
        });
})

app.listen(8080,error=>{
    console.log("listening at 8080")
    if (error) console.log(error);

})




