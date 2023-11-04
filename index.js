const bodyParser = require('body-parser');
const express=require('express');
const connection=require('./connection');

const port = 3000;

const app=express();
app.set('view engine','ejs');


const bodyparser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/register.html")
})

app.post('/',(req,res)=>{
    var name= req.body.email;
    var password= req.body.password;

        var sql="INSERT INTO loginuser(user_name,user_pass)VALUES('"+name+"','"+password+"')";
        connection.query(sql,function(error,result){
            if(error)throw error;

                res.redirect('/user');
        });

});
app.get('/user',function(req,res){
   
        var sql='select * from loginuser';
        connection.query(sql,function(error,user){
            if(error)throw error;
            
            res.render(__dirname+"/user",{user:user});
           
        })
   
});
app.get('/delete-user',(req,res)=>{
    var sql="delete from loginuser where userid=?";
    var id=req.query.id;
   
    connection.query(sql,[id],function(error,result){
        if(error) throw error;
        res.redirect("/user");
    })
});

app.get('/update-user',(req,res)=>{
    var sql="select * from loginuser where userid=?";
    var id=req.query.id;
    connection.query(sql,[id],function(error,user){
        if(error) throw error;
        res.render(__dirname+"/update-user",{user:user});
    })
})

app.post('/update-user',(req,res)=>{
    var name= req.body.email;
    var password= req.body.password;
    var id=req.body.id;
    var sql ='UPDATE loginuser SET user_name=?,user_pass=? where userid=?';

    connection.query(sql,[name,password,id],function(error,result){
        if(error) console.log(error);
        res.redirect('/user');
    });

})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });