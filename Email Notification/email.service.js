const config = require('config.json');
const db = require('_helpers/db');
const Sequelize=require('sequelize')
const Op = Sequelize.Op;
const moment =require('moment')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config.sendgrid)

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getScheduledEmails
};



async function getAll(filter) {
    console.log(filter)
    let query={where:{status:{ [Op.ne]: 'deleted'}}}
     if (filter=='all'){
        query={where:{status:{ [Op.ne]: 'deleted'}}}
     }else if(filter=='failed'){
        query={  where:{ status:'failed'}}
     }else if(filter=='unsent'){
        query={  where:{ status:'pending'}}
     }

     return await db.Email.findAll(query);
   
}



async function getById(id) {
    return await getEmail(id);
}

async function create(params) {
    let email=params
    email.status='pending'
    email.scheduled_at=getDateTimeFormat(email.scheduled_at)
    email.from=config.sendgrid_from
    let result=await db.Email.create(params);
    
    if(email.scheduled_at==getDateTimeFormat(moment())){
        SendMailandUpdate([result['dataValues']])
    }
   
}

async function update(id, params) {
    console.log(id)
    const Email = await getEmail(id);
    Object.assign(Email, params);
    await Email.save();
    return Email.get();
}

async function _delete(id) {
    const Email = await getEmail(id);
    // await Email.destroy();
    Email.status='deleted'
    update(id,Email)
}

// helper functions

async function getEmail(id) {
    const Email = await db.Email.findByPk(id);
    if (!Email) throw 'Email not found';
    return Email;
}

async function getScheduledEmails() {
    console.log(moment())
    const date=getDateTimeFormat(moment())
    console.log(date)
    const emails= await db.Email.findAll({where:{
        [Op.and]: [{scheduled_at: date}, {status:'pending'} ]
    }
    })
    
   if(emails.length>0){
     SendMailandUpdate(emails)
   }
    
}



async function SendMailandUpdate(emails) {
    if(emails.length>0){
       await  emails.forEach(emailOptions => {
            let  msg = {
                to: emailOptions.to, // Change to your recipient
                from: config.sendgrid_from, // Change to your verified sender
                subject: emailOptions.subject,
                text: emailOptions.body
              }
              console.log(msg)
              sgMail.send(msg).then(() => {
                update(emailOptions.id,{status:"completed"})
              })
              .catch((error) => {
                console.error(error)
                update(emailOptions.id,{status:"failed"})
              })
        });

    }
    
}

 function getDateTimeFormat(date1) {
    const date =  moment(date1).format("YYYY-MM-DD HH:mm");
    // console.log(date)
    return date;
}


