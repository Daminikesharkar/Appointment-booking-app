const path = require('path');
const indexFilePath = path.join(__dirname, '../views/index.html');

const Appointments = require('../models/appointment');
const e = require('express');

exports.getIndex = (req, res) => {
    res.sendFile(indexFilePath);
};

exports.getAppointments = (req,res)=>{
    Appointments.findAll()
        .then((appointments)=>{
            res.json({appointment: appointments});
        })  
        .catch((err)=>{
            console.log(err);
        })
};

exports.postAppointment = (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const discription = req.body.discription;

    Appointments.create({
        username:username,
        email:email,
        description:discription
    }).then((createdAppointment)=>{
        res.status(201).json({
            message: 'Appointment created successfully',
            appointment: createdAppointment
        });
        // res.redirect('/appointments')
    })
    .catch((err)=>{
        console.log(err);
    })
};

exports.deleteAppointment = (req,res)=>{
    console.log("delete",req.params.id)
    Appointments.findByPk(req.params.id)
        .then((appointment)=>{
            return appointment.destroy();
        })
        .then(()=>{
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })
};

exports.editAppointment = (req,res)=>{
    console.log("edit",req.params.id)
    Appointments.findByPk(req.params.id)
        .then((appointment)=>{
            console.log("find==>",appointment.username);
            res.send(appointment);
        })
        .catch((err)=>{
            console.log(err);
        })
};
