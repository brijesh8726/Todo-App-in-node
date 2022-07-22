const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const ejs = require('ejs');
const path = require('path');
var bodyParser = require('body-parser')
const passport = require('passport');
const {model ,users} = require('./models/task');
const { initializingPassport , isauthenticated} = require('./passport');
const expressSession= require('express-session');

app.use(express.static('public')); 
app.use('/images', express.static('images'));
 
const {getAllTasks,getTask,UpdateTasks,DeleteTasks,CreateTasks} = require("./controller/tasks");

app.set('view engine', 'ejs');
initializingPassport(passport);
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(expressSession({
    secret: "secret", resave: false,saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/tasks', tasks);
app.get('/home',isauthenticated,async (req,res)=>{
    const data = await getAllTasks();
   
  
    res.render('home',{data:data})
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/addtask',isauthenticated,(req,res)=>{
    res.render('add')
})
app.get('/register',(req,res)=>{
    res.render("register");
});

app.get('/login',(req,res)=>{
    res.render("login");});

  app.get('/logout', (req, res, next)=> {
        req.logout((err)=> {
          if (err) { return next(err); }
          res.send("logout Sucessful");
        });
      });
    

app.get('/update/:id',async (req,res)=>{
    
    const task = await model.findOne({ _id: req.params.id })
    taskname = task.name
    taskid =task.id
    
    res.render('update',{name:taskname, id:taskid})
});

app.post('/register',async (req,res)=>{
    const user = await users.findOne({username: req.body.username});
    if(user) return res.status(400).send("user already exixts");
    const newUser = await users.create(req.body);
    res.status(201).send(newUser);
});
app.post('/login',passport.authenticate('local', {failureRedirect: "./login", successRedirect:"/home"}), async (req,res)=>{

});


app.listen(5003,(req,res)=>{
    console.log("server started sucessfully...");
});