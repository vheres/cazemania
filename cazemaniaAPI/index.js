const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

var app = express();
const port = 1994;
var url = bodyParser.urlencoded({extended:false})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'cazemania.official@gmail.com',
           pass: 'Tambunbekasi123'
       },
    tls: {
        rejectUnauthorized: false
    }
});

app.use(cors())
app.set('view engine' , 'ejs');
app.use(url)
app.use(bodyParser.json())

//Connect to MySQL database
const conn = mysql.createConnection({
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'bde441d3eff40c',
    password : '7d59e0bc',
    database : 'heroku_a67561992c3e45d',
    port: 3306
    });

//Get list of bestsellers from catalogue, sorted by sales, limit TO 10
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
    var sql = `SELECT * FROM catalogue 
                WHERE code LIKE "%${req.query.code}%"
                ORDER BY id DESC  limit ${req.query.pagination[0]}, ${req.query.pagination[1]}`
    var sql1 = `SELECT count(*) as count FROM catalogue
                WHERE code LIKE "%${req.query.code}%"`
                console.log(sql)
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        // console.log(results)
        conn.query(sql1, (err,results1) => {
            if(err) throw err;
            res.send({catalogue: results, pagecount: results1})
        })     
    })
})

//Get data needed for Catalogue item page
app.get('/product/:id', function(req,res){
    var sql = `SELECT * FROM catalogue where id=${req.params.id}`
    var sql1 = `SELECT * FROM brands ORDER BY name`
    var sql2 = `SELECT * FROM type ORDER BY name`   
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        // console.log(results)
        conn.query(sql1, (err,results1)=>{
            if(err) throw err;
            // console.log(results1)
            conn.query(sql2, (err,results2)=>{
                if(err) throw err;
                // console.log(results2)
                res.send({item: results, brands: results1, type: results2 })
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

app.post('/cart', function(req,res){


    sql  = `INSERT INTO cart SET ?`

    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        
    })
})

app.post('/transaction', function(req,res){
    data = {
        user_id : req.body.id,
        date : req.body.date,
        time : req.body.time,
        total_price : req.body.total_price,
        account_holder : req.body.account_holder,
        source_bank : req.body.source_bank,
        target_bank : req.body.target_bank
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

app.post('/spam' , function(req,res){
    const mailOptions = {
        from: 'cazemania.official@gmail.com', // sender address
        to: 'william.gunawan@live.com', // list of receivers
        subject: 'PREPARE FOR SPAM', // Subject line
        html: '<p>PLEASE BUY ME STUFF</p>'// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     })
})

var secret = "아이즈원"

app.get('/users', function(req,res){
    const cipher = crypto.createHmac("sha256", secret)
    .update(req.query.password)
    .digest("hex");

    sql = `SELECT id, firstname, email FROM users WHERE email = "${req.query.email}" AND password = "${cipher}"`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

app.get('/keeplogin', function(req,res){
    sql = `SELECT id, firstname, email FROM users WHERE email = "${req.query.email}"`
    conn.query(sql, (err,results)=>{
        console.log(results)
        res.send(results)
    })
})

app.post('/users', function(req,res){
    const cipher = crypto.createHmac("sha256", secret)
    .update(req.body.password)
    .digest("hex");

    var data = {
        email : req.body.email,
        password : cipher,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address
    }

    sql = `SELECT * FROM users WHERE email = '${data.email}'`
    sql1 = `INSERT INTO users SET ?`
    
    conn.query(sql, (err,results)=>{
        console.log(results.length)
        if(results.length == 0){
            conn.query(sql1, data, (err1,results1)=>{

                conn.query(sql, (err2,results2)=>{
                    if(err2) throw err2;
                    console.log(results2)
                    res.send({id: results2[0].id, firstname:results2[0].firstname, email: results2[0].email, error:0})
                })
            })
        }
        else{
            res.send({error:1})
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));