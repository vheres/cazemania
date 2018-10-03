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
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        conn.query(sql1, (err,results1)=>{
            conn.query(sql2, (err,results2)=>{
                res.send({item:results, brands: results1, type: results2})
            })
        })
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));