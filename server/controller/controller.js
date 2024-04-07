const User = require('../model/model');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

exports.signin = async (req, res) => {   
    const messages = await req.flash("info");
    res.render('signin', {messages});
}

exports.signup = async (req, res) => {   
    res.render('signup');
}

exports.authUser = async (req, res) => {   
    try {
        const admin = new ObjectId('661292d6d4942a9e46094983');
        const users = await User.aggregate([{ $sort: { createdAt: -1 } }]);
        const user = await User.findOne({username: req.body.username});
        if(user){
            if(user.password == req.body.password){
                if(user._id.equals(admin)){
                    res.render('adminDashboard', {users})
                }
                else{
                    res.render('dashboard', {user});
                }
            }
            else{
                res.status(500).send('Internal Server Error');
            }
        }
        else{
            res.redirect('/signin');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.addUser = async (req, res) => {
    console.log(req.body);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try{
        if(user.username !== 'admin'){
         await User.create(user);
         res.redirect('/');
        }
        else{
            res.status(500).send('The given username is not allowed');
        }
    }
    catch(error){
        console.log(error);
    }
    
}

exports.dashboard = async (req, res) => {   
    res.render('dashboard');
}