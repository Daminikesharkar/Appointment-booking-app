const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Appointments = sequelize.define('appointments',{
    id:{
        type:Sequelize.INTEGER,
        allownull:false,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allownull:false,
    },
    email:{
        type:Sequelize.STRING,
        allownull:false,
    },
    description:{
        type:Sequelize.STRING,
        allownull:false,
    }
});

module.exports = Appointments;