const express = require('express');
const router = express.Router();
const emailService = require('./email.service');
const util = require('util');

router.post('/',  create);
router.get('/', getAll);

router.get('/:id', getById);
router.put('/:id',  update);
router.delete('/:id', _delete);



module.exports = router;

function create(req, res, next) {
    console.log(req.body)
    emailService.create(req.body)
        .then(() => res.json({ message: ' notification created successful' }))
        .catch(next);
}    
  




function getAll(req, res, next) {
    let query=req.query
    let filter=util.isNullOrUndefined(query.filter)?'all':query.filter;

    emailService.getAll(filter)
        .then(emails => res.json(emails))
        .catch(next);
}




function getById(req, res, next) {
    emailService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}


function update(req, res, next) {
    emailService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    console.log(req.params.id)
    emailService.delete(req.params.id)
        .then(() => res.json({ message: 'email deleted successfully' }))
        .catch(next);
}