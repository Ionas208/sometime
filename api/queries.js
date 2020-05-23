const bcrypt = require('bcrypt');
const saltRounds = 10;
var winston = require('winston');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sometimedb',
    password: 'postgres',
    port: 5432,
});

const getAllUsers = (req, res) => {
    pool.query('SELECT * FROM sometimeuser', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows);
    })
}

const registerUser = (req, res) => {
    const name = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            winston.log("silly", err.message);
            res.status(500).send("Error registering new user!");
        }
        else {

            pool.query("INSERT INTO sometimeuser(username, email, password, role) VALUES ('{0}', '{1}', '{2}', 'user')".format(name, email, hash), (err) => {
                if (err) {
                    res.status(500).send("DB Error registering new user!");
                }
                else {
                    res.status(200).send("Successfully registered!");
                }
            });
        }
    });
}

const loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.query("SELECT password, userid FROM sometimeuser WHERE email='" + email + "'", (err, result) => {
        if (err) {
            req.status(500).send("DB Error logging in!");
        }
        else {
            if (result.rows[0] != null) {
                const dbHash = result.rows[0].password;
                const userid = result.rows[0].userid;
                bcrypt.compare(password, dbHash, function (err, result) {
                    if (err) {
                        res.sendStatus(500);
                    }
                    if (result) {
                        const user = { id: userid };
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).json({ accessToken: accessToken });
                    }
                    else {
                        res.sendStatus(400);
                    }

                })
            }
            else {
                res.sendStatus(400);
            }

        }
    });


}

const getTodosForUser = (req, res) => {
    const userid = req.user.id;
    pool.query("SELECT title, description, duedate FROM todoobject WHERE userid = " + userid, function (err, result) {
        if (err) {
            res.sendStatus(500)
        }
        else{
            res.status(200).json(result.rows);
        }
        
    })
}

const getTodosForDate = (req, res) => {
    
    const userid = req.user.id;
    const date = req.body.date;
    pool.query("SELECT title, description FROM todoobject WHERE duedate = '{0}' AND userid = {1}".format(date, userid), function (err, result) {
        if (err) {
            res.status(200).json({hasTodos: false})
        }
        else{
            res.status(200).json({hasTodos: true, data: result.rows});
        }
        
    })
}

const createTodo = (req, res) => {
    const userid = req.user.id;
    const title = req.body.title;
    const description = req.body.description;
    const duedate = req.body.duedate;
    pool.query("INSERT INTO todoobject (userid, title, description, duedate) VALUES({0}, '{1}', '{2}', '{3}')".format(userid, title, description, duedate), function (err, result){
        if(err){
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);
        }
        
    })
}

const getUserName = (req,res) =>{
    const userid = req.user.id;
    pool.query("SELECT username FROM sometimeuser WHERE userid = "+userid, function(err, result){
        if(err){
            res.sendStatus(500);
        }
        else{
            res.status(200).json(result.rows);
        }
    })
}

String.prototype.format = function () {
    var formatted = this;
    for (var arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

module.exports = { getAllUsers, registerUser, loginUser, getTodosForUser, createTodo, getUserName, getTodosForDate} 