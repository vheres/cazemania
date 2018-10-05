const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');

var app = express();
const port = 1994;
var url = bodyParser.urlencoded({extended:false})
const cors = require('cors');
app.use(cors())

app.set('view engine' , 'ejs');
app.use(url)
app.use(bodyParser.json())

const conn = mysql.createConnection({
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'bde441d3eff40c',
    password : '7d59e0bc',
    database : 'heroku_a67561992c3e45d',
    port: 3306
    });

//Get list of bestsellers from catalogue, sorted by sales, limit TO
app.get('/bestsellers', function(req,res){
    var sql = 'SELECT * FROM catalogue ORDER BY sales ASC LIMIT 10'
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send({bestsellers: results})
    })
})

//Get list of catalogue, sorted by ID
app.get('/catalogue', function(req,res){
    var sql = 'SELECT * FROM catalogue ORDER BY id DESC'
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send({catalogue: results})
    })
})

//Get data needed for Catalogue item page
app.get('/catalogue/:id', function(req,res){
    var sql = `SELECT * FROM catalogue where id=${req.params.id}`
    var sql1 = `SELECT * FROM brands ORDER BY name`
    var sql2 = `SELECT * FROM type ORDER BY name`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        conn.query(sql1, (err,results1)=>{
            if(err) throw err;
            console.log(results1)
            conn.query(sql2, (err,results2)=>{
                if(err) throw err;
                console.log(results2)
                res.send({item: results, brands: results1, type: results2})
            })
        })
    })
})

//Get for admin purposes
app.get('/admin/:table', function(req,res){
    function tableselect(){
        return(
            {
            catalogue: () => {
                return(
                    sql = `SELECT * FROM catalogue ORDER BY id DESC` )
                },
            cases: () => {
                return(
                    sql = `SELECT b.name as brands, b.id as brand_id, t.id as type_id,
                    t.name as case_name, soft, hard FROM brands b JOIN type t ON b.id = t.brand_id ` )
                }
            }
        )
    }
    sql1 = `SELECT * FROM brands ORDER BY name`
    sql2 = `SELECT * FROM type ORDER BY name`
    conn.query(tableselect()[req.params.table](), (err,results)=>{
        if(err) throw err;
        console.log(results)
        conn.query(sql1, (err,results1)=>{
            conn.query(sql2, (err,results2)=>{
                res.send({items:results, brands: results1, type: results2})
            })
        })
    })
})

app.get('/item/:id', function(req,res){
    sql  = `SELECT * FROM catalogue WHERE id=${req.params.id}`
    sql1 = `SELECT * FROM brands ORDER BY name`
    sql2 = `SELECT * FROM type ORDER BY name`
    sql3 = `SELECT * FROM price`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        conn.query(sql1, (err,results1)=>{
            conn.query(sql2, (err,results2)=>{
                conn.query(sql3, (err,results3) => {
                    res.send({item:results, brands: results1, type: results2, price: results3})
                })
            })
        })
    })
})

app.get('/cart/:id', function(req,res){
    sql  = `SELECT car.id, cat.code, cat.name, cat.image,  car.brand_id, car.model_id, car.case_type, car.amount, br.name as brand_name, ty.name as model_name, pr.price as price FROM catalogue cat JOIN cart car ON cat.id=car.catalogue_id JOIN brands br ON br.id = car.brand_id 
    JOIN type ty ON ty.id = car.model_id JOIN price pr ON pr.case_type = car.case_type WHERE car.user_id=${req.params.id}`

    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        
    })
})
app.post('/transaction', function(req,res){

    data = {
        user_id: req.body.id,
        date: req.body.date,
        time: req.body.time,
        total_price: req.body.total_price,
        account_holder: req.body.account_holder,
        source_bank: req.body.source_bank,
        target_bank: req.body.target_bank
    }

    sql = `INSERT INTO transactions SET ?`
    sql1 = `SELECT id FROM transactions WHERE user_id = ${data.user_id}`
    sql2 = `INSERT INTO transaction_details (transaction_id, catalogue_id, case_type, price) VALUES`
    

    conn.query(sql, (err,results)=>{
        conn.query(sql1, (err,results1)=>{
            for(var index in array){
                sql1 += `(${results1[0]}, ${array[index].catalogue.id}, )` 
            }

            conn.query(sql2, (err,results1)=>{
                res.send({results1})
            })
        })
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));