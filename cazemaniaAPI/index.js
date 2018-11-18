const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
var http = require("https");
var qs = require("querystring")
var upload = require('express-fileupload')
var moment = require('moment')
const fs = require('fs');

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
app.use(express.static('public'))
app.use(upload())

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
    // if (req.query.code != null && req.query.name != null) {
    //     var sql = `SELECT * FROM catalogue WHERE code LIKE "%${req.query.code}%" OR name LIKE "%${req.query.name}%" ORDER BY id DESC  limit ${req.query.pagination[0]}, ${req.query.pagination[1]}`
    //     var sql1 = `SELECT count(*) as count FROM catalogue WHERE code LIKE "%${req.query.code}%" OR name LIKE "%${req.query.name}%"`
    // }
    // else if (req.query.code != null && req.query.name == null) {
    //     var sql = `SELECT * FROM catalogue WHERE code LIKE "%${req.query.code}%" ORDER BY id DESC  limit ${req.query.pagination[0]}, ${req.query.pagination[1]}`
    //     var sql1 = `SELECT count(*) as count FROM catalogue WHERE code LIKE "%${req.query.code}%"`
    // }
    // else if  (req.query.code == null && req.query.name != null) {
    //     var sql = `SELECT * FROM catalogue WHERE name LIKE "%${req.query.name}%" ORDER BY id DESC  limit ${req.query.pagination[0]}, ${req.query.pagination[1]}`
    //     var sql1 = `SELECT count(*) as count FROM catalogue WHERE name LIKE "%${req.query.name}%"`
    // }

        var sql = `SELECT * FROM catalogue WHERE (code LIKE "%${req.query.search}%" OR name LIKE "%${req.query.search}%") and category = "normal" ORDER BY id DESC  limit ${req.query.pagination[0]}, ${req.query.pagination[1]}`
        var sql1 = `SELECT count(*) as count FROM catalogue WHERE category = "normal" AND (code LIKE "%${req.query.search}%" OR name LIKE "%${req.query.search}%")`
    
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        // console.log(results)
        conn.query(sql1, (err,results1) => {
            if(err) throw err;
            res.send({catalogue: results, pagecount: results1})
        })     
    })
})

app.get('/similarproducts', function(req,res){
    var sql = `SELECT * FROM catalogue WHERE name LIKE "%${req.query.name}%" AND id !=${req.query.id} ORDER BY id LIMIT 5`
    
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        res.send(results)
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
                    sql = `SELECT * FROM catalogue WHERE id != 99 ORDER BY id DESC` )
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

app.get('/adminorders', function(req,res){
    sql= `SELECT tr.id as id, LPAD( tr.id, 8, '0') as ordernumber, tr.date as date, tr.time as time, tr.proof as proof, tr.target_bank as target_bank, tr.status as status, tr.subtotal as subtotal, tr.shipping as shipping, tr.resi as resi, u.firstname as firstname, 
    u.lastname as lastname, u.id as user_id, u.address as address, u.email as email, u.phone as phone, u.kota as kota, u.kodepos as kodepos FROM transactions tr JOIN users u ON tr.user_id = u.id ORDER BY date`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

app.get('/adminordersdetails/:id', function(req,res){
    sql= `SELECT trd.id as id, trd.transaction_id as transaction_id, trd.case_type as case_type, trd.price as price, trd.amount as amount, br.name as brand_name, ty.name as type_name, cat.code, cat.name, cat.image
    FROM transaction_details trd JOIN brands br ON trd.case_brand = br.id JOIN type ty ON trd.case_model=ty.id JOIN catalogue cat ON trd.catalogue_id = cat.id WHERE trd.transaction_id = ${req.params.id}`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

app.put('/adminorders/confirm/:id', function(req,res){
    sql= `UPDATE transactions SET ? WHERE id = ${req.params.id}`

    const mailOptions = {
        from: 'cazemania.official@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Pembayaran Telah Dikonfirmasi', // Subject line
        html: '<p>Order anda sedang dipersiapkan</p>'// plain text body
    };

    var data = {
        status: "pendingDelivery"
    }
    conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        console.log(results)
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(info);
        })
        res.send(results)
    })
})

app.put('/adminorders/addresi/:id', function(req,res){
    sql= `UPDATE transactions SET ? WHERE id = ${req.params.id}`

    const mailOptions = {
        from: 'cazemania.official@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Order anda telah dikirim', // Subject line
        html: `<p>Nomor resi order anda : ${req.body.resi}</p>`// plain text body
    };

    var data = {
        status: "complete",
        resi : req.body.resi
    }
    conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        console.log(results)
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(info);
        })
        res.send(results)
    })
})

app.put('/admin/:table/:id', function(req,res){
    function tableselect2(){
        return(
            {
            catalogue: () => {
                return(
                    sql = `UPDATE catalogue SET ? WHERE id = ${req.params.id}` )
                },
            cases: () => {
                return(
                    sql = `UPDATE type SET ? WHERE id = ${req.params.id}` )
                }
            }
        )
    }

    conn.query(tableselect2()[req.params.table](), req.body, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

// app.post('/admin/:table', function(req,res){
//     function tableselect2(){
//         return(
//             {
//             catalogue: () => {
//                 return(
//                     sql = `INSERT INTO catalogue SET ?` )
//                 },
//             cases: () => {
//                 return(
//                     sql = `INSERT INTO type SET ?` )
//                 }
//             }
//         )
//     }

//     conn.query(tableselect2()[req.params.table](), req.body, (err,results)=>{
//         if(err) throw err;
//         console.log(results)
//         res.send(results)
//     })
// })

app.post('/admin/addcases', function(req,res){
    sql = `INSERT INTO type SET ?`

    conn.query(sql, req.body, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

app.post('/admin/addcatalogue', function(req,res){
    var data = JSON.parse(req.body.data)
    sql = `INSERT INTO catalogue SET ?`
    
    conn.query(sql, data, (err,results)=>{
        if(err) throw err;
        var unggahFile = req.files.file
        unggahFile.mv('./public/normal/'+ data.code + ".jpg", (err)=>{
            if(err){
                console.log(err)
                res.send(err)
            } else {
                console.log('Add catalogue upload success!')
                res.send('Add catalogue upload success!')
                // res.send(file)
            }
        })
    })
})


// app.delete('/admin/:table/:id', function(req,res){
//     function tableselect(){
//         return(
//             {
//             catalogue: () => {
//                 return(
//                     sql = `DELETE FROM catalogue WHERE id=${req.params.id}` )
//                 },
//             cases: () => {
//                 return(
//                     sql = `DELETE FROM type WHERE id=${req.params.id} ` )
//                 }
//             }
//         )
//     }

//     conn.query(tableselect()[req.params.table](), (err,results)=>{
//         if(err) throw err;
//         if(req.params.table === "catalogue"){
//             console.log(req.body)
//             fs.unlink(`./public/normal/${req.body.data.image}.jpg`, (err) => {
//                 if (err) throw err;
//                 console.log('Image deleted');
//               });
//         }
//         console.log(results)
//         res.send(results)
//     })
// })

app.post('/admin/deletecases/:id', function(req,res){

    sql = `DELETE FROM type WHERE id=${req.params.id}`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

app.post('/admin/deletecatalogue/:id', function(req,res){

    sql = `DELETE FROM catalogue WHERE id=${req.params.id}`
    
    conn.beginTransaction(function(err){
        if(err) throw err;
        conn.query(sql, (err,results)=>{
            if (err){
                conn.rollback(function(){
                    console.log("Rollback Successful Query")
                    throw err
                })
            }
            fs.unlink(`./public/normal/${req.body.image}.jpg`, (err) => {
                if (err){
                    conn.rollback(function(){
                        console.log("Rollback Successful Delete Image")
                        throw err
                    })
                }
                conn.commit(function(err){
                    if (err){
                        conn.rollback(function(){
                            console.log("Rollback Succesful2")
                            throw err;
                        })
                    }
                    res.send("catalogue deleted")
                    console.log('Image deleted');
                })
            });
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

app.get('/custom', function(req,res){
    sql = `SELECT * FROM brands ORDER BY name`
    sql1 = `SELECT * FROM type ORDER BY name`
    sql2 = `SELECT * FROM price`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        conn.query(sql1, (err,results1)=>{
            conn.query(sql2, (err,results2)=>{
                res.send({brands: results, type: results1, price: results2})
            })
        })
    })
})

app.get('/cart/:id', function(req,res){
    sql  = `SELECT car.id, cat.code, cat.name, cat.image, cat.category, car.brand_id, car.model_id, car.case_type, car.amount, br.name as brand_name, ty.name as model_name, pr.price as price FROM catalogue cat JOIN cart car ON cat.id=car.catalogue_id JOIN brands br ON br.id = car.brand_id 
    JOIN type ty ON ty.id = car.model_id JOIN price pr ON pr.case_type = car.case_type WHERE car.user_id=${req.params.id}`

    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send({results})
    })
})

app.post('/cart', function(req,res){
    data = req.body
    sql  = `SELECT * FROM cart WHERE user_id = ${data.user_id} AND catalogue_id = ${data.catalogue_id}
            AND brand_id = ${data.brand_id} AND model_id = ${data.model_id} AND case_type = '${data.case_type}'`
    sql1 = `INSERT INTO cart SET ?`

    conn.query(sql, data, (err,results)=>{
        console.log(results)
        if(results.length === 0){
            conn.query(sql1, data, (err,results1)=>{
                if(err) throw err;
                console.log(results1)
                res.send({results1})
            })
        }
        else{
            var newAmount = parseInt(req.body.amount) + parseInt(results[0].amount)
            sql2 = `UPDATE cart SET amount = ${newAmount} WHERE id = ${results[0].id}`
            conn.query(sql2, (err,results2)=>{
                if(err) throw err;
                console.log(results2)
                res.send({results2})
            })
        }
    })
})

app.post('/bukti_pembayaran', function(req,res){
    var data = JSON.parse(req.body.data)
    var unggahFile = req.files.file
    var fileName = "bukti_"+ data.transaction_id
    var sql = `UPDATE transactions SET proof = '${fileName}' WHERE id = ${data.transaction_id}`
    conn.beginTransaction(function(err){
        if (err) {throw err;}
        conn.query(sql, (err, results) => {
            if (err){
                conn.rollback(function(){
                    console.log("Rollback Successful1")
                    throw err
                })
            }
            unggahFile.mv('./public/bukti/' + fileName + '.jpg', (err)=> {
                if(err) {
                    conn.rollback(function() {
                        console.log("Rollback Successful Upload")
                        throw err
                    })
                }
                conn.commit(function(err){
                    if (err){
                        conn.rollback(function(){
                            console.log("Rollback Succesful2")
                            throw err;
                        })
                    }
                    res.send({results})
                    console.log("Upload procedure completed")
                })
            })
        })
    })
})

app.post('/custom_cart', function(req,res){
    console.log(req.body)
    console.log(JSON.parse(req.body.data))
    var data = JSON.parse(req.body.data)
    var customdata = {
        code : `CSTM${data.user_id}`,
        name: "CUSTOM CASE",
        image: `CSTM${data.user_id}`,
        category: "custom"
    }
    
    sql = `INSERT INTO catalogue SET ?`
    conn.beginTransaction(function(err){
        if(err) {throw err;}
        conn.query(sql, customdata, (err, results)=>{
            console.log(results)
            if(err){
                conn.rollback(function(){
                    console.log("Rollback Succesful1")
                    throw err
                })
            }
            sql  = `INSERT INTO cart SET ?`
            cartdata = {
                user_id : data.user_id,
                catalogue_id : results.insertId,
                brand_id : data.brand_id,
                model_id : data.model_id,
                case_type : data.case_type,
                amount : data.amount
            }
            conn.query(sql, cartdata, (err1, results1) => {
                if(err1){
                    conn.rollback(function(){
                        console.log("Rollback Succesful2")
                        throw err1
                    })
                }
                sql  = `UPDATE catalogue SET code = 'CSTM${data.user_id}${results.insertId}', image = 'CSTM${data.user_id}${results.insertId}' WHERE id = ${results.insertId}`
                conn.query(sql, (err2, results2) => {
                    if(err2){
                        conn.rollback(function(){
                            console.log("Rollback Succesful2")
                            throw err2
                        })
                    }
                    var unggahFile = req.files.file
                    var fileName = `CSTM${data.user_id}${results.insertId}`
                    unggahFile.mv('./public/custom/'+ fileName +'.jpg', (err)=>{
                        if(err){
                            conn.rollback(function(){
                                console.log("Rollback Succesful Upload")
                                throw err
                            })
                        }
                        conn.commit(function(err){
                            if (err){
                                conn.rollback(function(){
                                    console.log("Rollback Succesful3")
                                    throw err;
                                })
                            }
                            res.send({results1})
                            console.log("Custom add to cart Complete")
                        })
                    })
                })
            })
        })
    }) 
})

app.delete('/cart/:user_id/:id', function(req,res){
    sql  = `DELETE FROM cart where id = ${req.params.id}`
    sql1 = `SELECT car.id, cat.code, cat.name, cat.image,  car.brand_id, car.model_id, car.case_type, car.amount, br.name as brand_name, ty.name as model_name, pr.price as price FROM catalogue cat JOIN cart car ON cat.id=car.catalogue_id JOIN brands br ON br.id = car.brand_id 
    JOIN type ty ON ty.id = car.model_id JOIN price pr ON pr.case_type = car.case_type WHERE car.user_id=${req.params.user_id}`
    console.log(req.body.user)
    console.log(typeof req.body.user)
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        conn.query(sql1, (err1,results1) => {
            if(err1) throw err1;
            res.send({results1})
        })
    })
})

app.delete('/clear_cart/:user_id', function(req,res){
    sql = `DELETE FROM cart where user_id = ${req.params.user_id}`
    conn.query(sql, (err,results)=> {
        if(err) throw err;
        res.send({results})
    })
})


app.post('/transaction', function(req,res){
    console.log(req.body)
    dateNow = moment().format("YYYY-MM-DD")
    timeNow = moment().format("HH:mm")
    data = {
        user_id : req.body.id,
        date : dateNow,
        time : timeNow,
        subtotal : req.body.subtotal,
        shipping : req.body.shipping,
        target_bank : req.body.target_bank,
        status: "pendingPayment",
        address: req.body.recipient.address,
        kota: req.body.recipient.kota,
        kodepos: req.body.recipient.kodepos
    }

    sql = `INSERT INTO transactions SET ?`
    sql1 = `INSERT INTO transaction_details (transaction_id, catalogue_id, case_brand, case_model, case_type, price, amount) VALUES ?`
    sql2 = `DELETE FROM cart where user_id = ${req.body.id}`
    
    conn.beginTransaction(function(err){
        if(err) {throw err;}
        conn.query(sql, data, (err,results)=>{
            if(err){
                conn.rollback(function(){
                    console.log("Rollback Succesful1")
                    throw err
                })
            }
            console.log(results)
            var arrDetails = new Array()
            for(var index in req.body.cart){
                arrDetails.push([results.insertId, req.body.cart[index].catalogue_id, req.body.cart[index].brand_id, req.body.cart[index].model_id, req.body.cart[index].case_type, req.body.cart[index].price, req.body.cart[index].amount])
            }

            conn.query(sql1, [arrDetails], (err,results1)=>{
                if(err){
                    conn.rollback(function() {
                        console.log("Rollback Succesful2")
                        throw err;
                    })
                }
                conn.query(sql2, (err,results2) => {
                    if(err){
                        conn.rollback(function(){
                            console.log("Rollback Succesful3")
                            throw err
                        })
                    }
                    conn.commit(function(err){
                        if (err){
                            conn.rollback(function(){
                                console.log("Rollback Succesful4")
                                throw err;
                            })
                        }
                        res.send({results1})
                        console.log("Transaction Complete")
                    })
                })
            })
        })
    })
})

app.post('/spam' , function(req,res){
    const mailOptions = {
        from: 'cazemania.official@gmail.com', // sender address
        to: 'billy_irianto@live.com', // list of receivers
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

app.get('/profile', function(req,res){
    var sql = `SELECT * from users WHERE id = ${req.query.id}`
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send({profile: result})
    })
})

app.post('/login', function(req,res){
    const cipher = crypto.createHmac("sha256", secret)
    .update(req.body.password)
    .digest("hex");
    // console.log(req.query.email)
    // console.log(req.query.password)
    // console.log(cipher)

    sql = `SELECT id, firstname, email FROM users WHERE email = "${req.body.email}" AND password = "${cipher}"`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        // console.log(results)
        res.send(results)
    })
})

app.get('/keeplogin', function(req,res){
    sql = `SELECT id, firstname, email FROM users WHERE email = "${req.query.email}"`
    console.log(sql)
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log('keeplogin')
        console.log(results)
        res.send(results)
    })
})

app.get('/checkout/:id', function(req,res){
    sql  = `SELECT car.id, car.catalogue_id, cat.code, cat.name, cat.image, cat.category,  car.brand_id, car.model_id, car.case_type, car.amount, br.name as brand_name, ty.name as model_name, pr.price as price FROM catalogue cat JOIN cart car ON cat.id=car.catalogue_id JOIN brands br ON br.id = car.brand_id 
    JOIN type ty ON ty.id = car.model_id JOIN price pr ON pr.case_type = car.case_type WHERE car.user_id=${req.params.id}`

    sql1 = `SELECT firstname, lastname, address, kota, destination_code, kodepos FROM users WHERE id = ${req.params.id}`
    sql2 = `SELECT * FROM rekening`
    conn.query(sql, (err,results)=>{
        conn.query(sql1, (err,results1)=>{
            conn.query(sql2, (err,results2)=>{
                if(err) throw err;
                // console.log({cart: results, user:results1})
                res.send({cart: results, user:results1, rekening: results2})
            })
        })
    })
})

app.get('/payment/:transaction_id', function(req,res){
    sql  = `SELECT * FROM transactions where id = ${req.params.transaction_id}`

    conn.query(sql, (err,results)=>{
        conn.query(sql1, (err,results1)=>{
            if(err) throw err;
            // console.log({cart: results, user:results1})
            res.send({cart: results, user:results1})
        })
    })
})

app.post('/users', function(req,res){

    console.log(req.body)
    const cipher = crypto.createHmac("sha256", secret)
    .update(req.body.password)
    .digest("hex");

    var data = {
        email : req.body.email,
        password : cipher,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        phone : req.body.phone,
        address: req.body.address,
        kota: req.body.kota,
        kodepos: req.body.kodepos,
        destination_code : req.body.destination_code,
        category: "customer"
    }

    sql = `SELECT * FROM users WHERE email = '${data.email}'`
    sql1 = `INSERT INTO users SET ?`
    
    conn.query(sql, (err,results)=>{
        console.log(results.length)
        if(results.length == 0){
            conn.query(sql1, data, (err1,results1)=>{

                conn.query(sql, (err2,results2)=>{
                    if(err2) throw err2;
                    console.log(results2[0])
                    res.send({id: results2[0].id, firstname:results2[0].firstname, email: results2[0].email, error:0})
                })
            })
        }
        else{
            res.send({error:1})
        }
    })
})

app.put('/users/:id', function(req,res){
    // var data = {
    //     gender: req.body.gender,
    //     phone : req.body.phone,
    //     address: req.body.address,
    //     kota: req.body.kota,
    //     kodepos: req.body.kodepos,
    //     destination_code : req.body.destination_code,
    // }

    sql = `UPDATE users SET ? WHERE id = ${req.params.id}`
    
    conn.query(sql, req.body, (err,results)=>{
        if(err) throw err
        console.log(results.length)
        res.send(results)
    })
})

app.get('/users/transactions/:id', function(req,res){
    sql= `SELECT tr.id as id, LPAD( tr.id, 8, '0') as ordernumber, tr.date as date, tr.time as time, tr.proof as proof, tr.target_bank as target_bank, tr.status as status, tr.subtotal as subtotal, tr.shipping as shipping, tr.resi as resi, u.firstname as firstname, 
    u.lastname as lastname, u.id as user_id, u.address as address, u.email as email, u.phone as phone, u.kota as kota, u.kodepos as kodepos FROM transactions tr JOIN users u ON tr.user_id = u.id WHERE user_id = ${req.params.id} ORDER BY date desc`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

app.get('/users/transactions/details/:id', function(req,res){
    sql= `SELECT trd.id as id, trd.transaction_id as transaction_id, trd.case_type as case_type, trd.price as price, trd.amount as amount, br.name as brand_name, ty.name as type_name, cat.code, cat.name, cat.image
    FROM transaction_details trd JOIN brands br ON trd.case_brand = br.id JOIN type ty ON trd.case_model=ty.id JOIN catalogue cat ON trd.catalogue_id = cat.id WHERE trd.transaction_id = ${req.params.id}`
    conn.query(sql, (err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

// app.get('/users/transactions/:id', function(req,res){
//     sql= `SELECT * FROM transactions WHERE user_id = ${req.params.id} ORDER BY date`
//     conn.query(sql, (err,results)=>{
//         if(err) throw err;
//         console.log(results)
//         res.send(results)
//     })
// })

app.get('/province', function(req,res){
    var options = {
        "method": "GET",
        "hostname": "api.sicepat.com",
        "port": null,
        "path": "/customer/origin",
        "headers": {
          "api-key": "54d16bfab958effecbfc849133dc706e",
          "content-Type": "application/json"
        }
      };
    http.request(options, function (res1) {
        var chunks = [];
      
        res1.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res1.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
          console.log(typeof body)
          res.send(body)
        });
      }).end();
})

//SICEPAT API
// app.get('/destination', function(req,res){
//     var options = {
//         "method": "GET",
//         "hostname": "api.sicepat.com",
//         "port": null,
//         "path": "/customer/destination",
//         "headers": {
//           "api-key": "54d16bfab958effecbfc849133dc706e",
//           "content-Type": "application/json"
//         }
//       };
//     http.request(options, function (res1) {
//         var chunks = [];
      
//         res1.on("data", function (chunk) {
//           chunks.push(chunk);
//         });
      
//         res1.on("end", function () {
//           var body = Buffer.concat(chunks);
//           console.log(body.toString());
//           console.log(typeof body)
//           res.send(body)
//         });
//       }).end();
// })

//LOCAL API
app.get('/destination', function(req,res){

    sql = `SELECT * FROM destination`
    
    conn.query(sql, (err,results)=>{
        if(err) throw err
        res.send(results)
    })
})

app.get('/shipping', function(req,res){
    var options = {
        "method": "GET",
        "hostname": "api.sicepat.com",
        "port": null,
        "path": `/customer/tariff/?origin=TGR&destination=${req.query.destination}&weight=${req.query.weight}`,
        "headers": {
          "api-key": "54d16bfab958effecbfc849133dc706e"
        }
      };
      
      http.request(options, function (res1) {
        var chunks = [];
      
        res1.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res1.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
          console.log(typeof body)
          res.send(body)
        });
      }).end();
})

app.post('/upload', function(req,res){
    console.log(req)
    if(req.files){
        console.log(req.files)
        var unggahFile = req.files.file
        var file = unggahFile.name
        unggahFile.mv('./public/uploads/'+ "upload1.png", (err)=>{
            if(err){
                console.log(err)
                res.send(err)
            } else {
                console.log('File sukses diupload!')
                res.send('File sukses diupload!')
                // res.send(file)
            }
        })
    }
})

app.post('/customupload', function(req,res){
    if(req.files){

        sql = `INSERT INTO cart SET ?`

        conn.query(sql, (err, results) =>{

        })

        console.log(req.files)
        var unggahFile = req.files.file
        var file = unggahFile.name
        unggahFile.mv('./public/custom/'+ file, (err)=>{
            if(err){
                console.log(err)
                res.send(err)
            } else {
                console.log('Custom case upload success!')
                res.send('Custom case upload success!')
                // res.send(file)
            }
        })
    }

})


app.get('/premiumcatalogue', function(req,res){
    sql = `SELECT * FROM premium`
    conn.query(sql, (err,results)=>{
        if(err) throw err
        res.send(results)
    })
})

app.get(`/premium/:id`, function(req,res){
    sql = `SELECT * FROM catalogue WHERE category = "premium" AND premium_id = ${req.params.id}`
    sql1 = `SELECT * FROM premium_images WHERE premium_id = ${req.params.id}`
    sql2 = `select * from type where brand_id = 1 and name in ('Iphone 6', 'Iphone 6+', 'Iphone 7', 'Iphone 7+', 'Iphone 8', 'Iphone 8+') order by name`
    conn.query(sql, (err,results)=>{
        if(err) throw err
        conn.query(sql1, (err1,results1)=>{
            if(err) throw err
            conn.query(sql2, (err2,results2)=>{
                res.send({item:results, images:results1, types:results2})
            })
        })
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));