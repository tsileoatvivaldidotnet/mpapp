// api customer router
// base route is 'customer/'
var express = require('express');
var customerService = require('../services/customer');

const router = express.Router();
var jsonParser = express.json();
var error = null;
router.get('/', (req, res) => {
    res.send('all customers');
});

// retrieve customer by id
router.get('/:customerid', async (req, res) =>  {
    try {
        const customerId = req.params["customerid"].toString();
        const id = parseInt(customerId);
        if (isNaN(id)) {
            res.status(400).send(`Invalid customer id: ${customerId}`);
        }
        else {
            const cust = await customerService.getCustomerById(id);
            if (cust == null) res.status(404).send(null);
            else res.status(200).send(cust);
        }
    }
    catch(e) {
        res.status(500).send('Internal Server Error');
    }
});

// create a customer
router.post('/', async(req, res) => {
    try {
        let custJson = req.body;
        const cust = await customerService.createCustomer(custJson, error);
        if (!cust.dup) {
            res.status(200).send(cust);
        }
        else {
            res.status(409).send(cust);
        }

    }
    catch (e) {
        if (e.name === 'ValidationError') {
            const errors = [];
            for (const key in e.errors) {
                errors.push(e.errors[key].message);
            }
            res.status(400).send(errors);
        }
        else {
            res.status(500).send('Internal Server Error');
        }
    }
});

// update a customer
router.patch('/update', async(req, res) => {
    try {
        let custJson = req.body;
        const updateSuccess = await customerService.updateCustomer(custJson);
        if (!updateSuccess) {
            res.status(404).send('Customer does not exist');
        }
        else {
            res.status(200).send('Update successful');
        }
    }
    catch (e) {
        if (e.name === 'ValidationError') {
            const errors = [];
            for (const key in e.errors) {
                errors.push(e.errors[key].message);
            }
            res.status(400).send(errors);
        }
        else {
            res.status(500).send('Internal Server Error');
        }   
    }
});

// search for customers
router.post('/search', async(req, res) => {
    try {
        let custSearchJson = req.body;
        const custs = await customerService.searchCustomers(custSearchJson);
        res.status(200).send(custs);
    }
    catch (e) {
        res.status(500).send('Internal Server Error');
    }

})

module.exports = router;