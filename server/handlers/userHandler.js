const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const User = require('./../models/userModel');
const tokenHandler = require('./tokenHandler.js');


// get list of all users in the platform except for moderators
router.get('/', async (req, res) => {
    // only moderators can access the users list
    if (req.loggedUser.type != "moderator"){
        return res
            .status(403)
            .json({
                success: false,
                message: "Solo i moderatori possono accedere alla lista degli utenti"
            })
    }
    // find all users in the platform, except for moderators
    let users = await User.find({ userType: {$ne: 'moderator'} }).exec();
    // if no users were found in the database
    if (!users || users.length == 0){
        return res
            .status(204)
            .send()
    }
    users = users.map( (user) => {
        return {
            id: user._id,
            username: user.username,
            avatar: user.avatar,
            email: user.email
        }
    })
    // return needed information to show list of users
    return res
        .status(200)
        .json({
            success: true,
            message: "Sono stati trovati utenti",
            users: users
        })
})

// get list of users who asked to be upgraded to mentor
router.get('/pending', async (req, res) => {
    // only moderators can access the pending users list
    if (req.loggedUser.type != "moderator"){
        return res
            .status(403)
            .json({
                success: false,
                message: "Solo i moderatori possono accedere alla lista degli utenti in attesa di diventare mentor"
            })
    }
    // find all users that have asked to be upgraded to mentors
    let users = await User.find({ userType: "pending" }).exec();
    // if no users were found in the database
    if (!users || users.length == 0){
        return res
            .status(204)
            .send()
    }
    // if users were found, extract needed information to return
    users = users.map( (user)=>{
        return {
            id: user._id,
            username: user.username,
            avatar: user.avatar,
            email: user.email
        }
    })
    // return needed information to show list of pending users
    return res
        .status(200)
        .json({
            success: true,
            message: "Sono stati trovati utenti in attesa di diventare mentor",
            users: users
        })
})

// get list of mentors in the platform
router.get('/mentors', async (req, res) => {
    // only moderators can access the pending users list
    if (req.loggedUser.type != "moderator"){
        return res
            .status(403)
            .json({
                success: false,
                message: "Solo i moderatori possono accedere alla lista dei mentor"
            })
    }
    // find all mentors in the platform
    let users = await User.find({ userType: "mentor" }).exec();
    // if no users were found in the database
    if (!users || users.length == 0){
        return res
            .status(204)
            .send()
    }
    // if users were found, extract needed information to return
    users = users.map( (user)=>{
        return {
            id: user._id,
            username: user.username,
            avatar: user.avatar,
            email: user.email
        }
    })
    // return needed information to show list of mentors
    return res
        .status(200)
        .json({
            success: true,
            message: "Sono stati trovati mentor",
            users: users
        })
})

// get user information by id (only username and account avatar are needed here)
router.get('/:id', async (req, res) => {
    // check id length and id string format (must be hex)
    if(req.params.id.length != 24 || req.params.id.match(/(?![a-f0-9])\w+/)){
        return res
            .status(400)
            .json({
                success: false,
                message: "l'ID dell'utente non è valido",
            })
    }
    // check for user existence in database
    let user = await User.findById(req.params.id).exec();
    if (!user){
        return res
            .status(404)
            .json({
                success: false,
                message: "L'utente non esiste nei database"
            })
    }
    // return username and avatar of user
    return res
        .status(200)
        .json({
            success: true,
            username: user.username,
            avatar: user.avatar,
            email: user.email
        })
})

// user request to be upgraded to mentor
router.patch('/userToMentor', async (req, res) => {
    // check for user existence in database
    let user = await User.findById(req.loggedUser.id).exec();
    if (!user){
        return res
            .status(404)
            .json({
                success: false,
                message: "L'utente non esiste nei database"
            })
    }
    // only let users require to become mentors
    if (user.userType != "user"){
        return res
            .status(403)
            .json({
                success: false,
                message: "Solo gli utenti possono richiedere di diventare mentor"
            })
    }
    // user is authorized to make request
    user.userType = 'pending'
    user.save()
        .then ( () => {
            return res
                .status(200)
                .json({ 
                    success: true,
                    message: "La richiesta di diventare mentor è stata inoltrata con successo"
                });
        })
        .catch( (error) => {
            return res
                .status(400)
                .json({ 
                    success: true,
                    message: error.message 
                });
        })
})

// upgrade user status (from simple user to mentor which can upload documents)
router.patch('/:id/upgrade', async (req, res) => {
    // check id length and id string format (must be hex)
    if(req.params.id.length != 24 || req.params.id.match(/(?![a-f0-9])\w+/)){
        return res
            .status(400)
            .json({
                success: false,
                message: "l'ID dell'utente non è valido",
            })
    }
    // check for user existence in database
    let user = await User.findById(req.params.id).exec();
    if (!user){
        return res
            .status(404)
            .json({
                success: false,
                message: "L'utente non esiste nei database"
            })
    }
    // only let moderators upgrade users to mentors
    if (req.loggedUser.type != "moderator"){
        return res
            .status(403)
            .json({
                success: false,
                message: "Solo i moderatori sono autorizzati a promuovere gli utenti a mentor"
            })
    }
    // if user to upgrade is not a simple user, he/she cannot be upgraded
    if (user.userType != 'pending'){ 
        return res
            .status(400)
            .json({
                success: false,
                message: "L'utente non può essere promosso a mentor"
            })
    };
    // change user status and save changes to database
    user.userType = 'mentor';
    user.save()
        .then ( () => {
            return res
                .status(200)
                .json({ 
                    success: true,
                    message: "L'utente è stato promosso con successo a mentor"
                });
        })
        .catch( (error) => {
            return res
                .status(400)
                .json({ 
                    success: true,
                    message: error.message 
                });
        })
})

// downgrade mentor status (from mentor to simple user)
router.patch('/:id/downgrade', async (req, res) => {
    // check id length and id string format (must be hex)
    if(req.params.id.length != 24 || req.params.id.match(/(?![a-f0-9])\w+/)){
        return res
            .status(400)
            .json({
                success: false,
                message: "l'ID dell'utente non è valido",
            })
    }
    // check for user existence in database
    let user = await User.findById(req.params.id).exec();
    if (!user){
        return res
            .status(404)
            .json({
                success: false,
                message: "L'utente non esiste nei database"
            })
    }
    // only let moderators upgrade users to mentors
    if (req.loggedUser.type != "moderator"){
        return res
            .status(403)
            .json({
                success: false,
                message: "Solo i moderatori sono autorizzati a riportare i mentor allo stato di utenti"
            })
    }
    // if user is still pending, reject upgrade request
    // if user is mentor, downgrade to normal user
    if (!(user.userType == 'pending' || user.userType == 'mentor')){ 
        return res
            .status(400)
            .json({
                success: false,
                message: "Il mentor non può essere riportato a utente"
            })
    }
    user.userType = 'user'
    user.save()
        .then ( () => {
            return res
                .status(200)
                .json({ 
                    success: true,
                    message: "Il downgrade è stato effettuato con successo"
                });
        })
        .catch( (error) => {
            return res
                .status(400)
                .json({ 
                    success: true,
                    message: error.message
                });
        })
})

// replace user password with a new one
router.patch('/changePassword', async (request, result) => {
    // check if old passwords and new passwords were provided
    if ( !(request.body.oldPassword && request.body.newPassword)){
        result.status(400).json({ success: false, message: 'La richiesta non è in un formato valido'});
        return;
    }
    // retrieve information of currently logged in user 
    let usr = await User.findById(request.loggedUser.id);
    // generate password digest with the old password to check validity
    let hash = crypto.createHash('sha256').update(request.body.oldPassword + usr.passwordSalt).digest('hex');
    if (hash != usr.passwordHash){
        result.status(400).json({ success: false, message: 'La password attuale risulta scorretta'});
        return;
    }
    // if provided old password was correct, generate digest of new password and set it to the new user password
    hash = crypto.createHash('sha256').update(request.body.newPassword + usr.passwordSalt).digest('hex');
    usr.passwordHash = hash;
    await usr.save();
    result.status(200).json({ success: true, message: 'La tua password è stata aggiornata con successo'});
})

// change current subscription plan for logged in user
router.patch('/changeSubscription', async (req, result) => {
    // if subscription information provided isn't valid, return error
    if ( !(req.body.subscriptionType == 'studenti' || req.body.subscriptionType == 'nerd' || req.body.subscriptionType == 'matricole') ||
          (req.body.subscriptionType == "studenti" && (!req.body.subscriptionArea)) ){
        result.status(400).json({ success: false, message: 'La richiesta non è in un formato valido'});
        return;
    }
    // retrieve information of currently logged in user 
    var user = await User.findById(req.loggedUser.id).exec();
    // cereate new subscription plan
    sub = {
        subType: req.body.subscriptionType,
        area: req.body.subscriptionArea,
        creationDate: new Date,
        lastPayment: new Date
    };
    // replace old subscription plan with the new one and store change in the database
    user.subscription = sub;
    await user.save();   
    result.status(200).json({ success: true, message: 'Ecco il tuo token!',
                token: tokenHandler.createToken(user) });
    return;
});

// delete a user by id
router.delete('/:id', async (req, res) => {
    // check id length and id string format (must be hex)
    if(req.params.id.length != 24 || req.params.id.match(/(?![a-f0-9])\w+/)){
        return res
            .status(400)
            .json({
                success: false,
                message: "l'ID dell'utente non è valido",
            })
    }
    // check for user existence in database
    let user = await User.findById(req.params.id).exec();
    if (!user){
        return res
            .status(404)
            .json({
                success: false,
                message: "L'utente non esiste nei database"
            })
    }
    // only moderators or account owners can delete their account
    if (req.loggedUser.type != "moderator" && req.loggedUser.id != req.params.id){
        return res
            .status(403)
            .json({
                success: false,
                message: "Solo il proprietario dell'account o un moderatore può eliminare il proprio account"
            })
    }
    // delete user from database
    user.deleteOne()
        .then( () => {
            console.log('-> user deleted successfully')
            return res
                .status(200)
                .json({
                    success: true,
                    message: "L'utente è stato eliminato con successo"
                })
        })
        .catch( (error) => {
            // document deletion failed
            console.log('-> user deletion failed')
            return res
                .status(400)
                .json({
                    success: false,
                    message: error.message
                })
        })
})

module.exports = router
