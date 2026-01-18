// jade web application routes
// base path is 'app/'
var express = require('express');
var customerService = require('../services/customer');
const router = express.Router();
const axios = require('axios');
const API_GATEWAY_URL = process.env.API_GATEWAY_URL;

router.get('/customer/menu', function(req, res, next) {
    res.render('customer/menu', { title: 'Express' });
  });

router.get('/customer/search', function(req, res, next) {
    res.render('customer/search', { title: 'search' });
  });

  router.post('/customer/search', async function(req, res, next) {
    let searchResults = await axios.post(`${API_GATEWAY_URL}/customer/search`, req.body);
    //let searchResults = await customerService.searchCustomers(req.body);
    res.render('customer/search', { title: 'results', search: req.body, results: searchResults.data });
  });

  router.post('/customer/edit', async function(req, res, next){
    let customerId = req.body.customerId;
    let customer = null;
    if (customerId != 0) {
        customer = await customerService.getCustomerById(customerId);
    }
    res.render('customer/edit', { customerId: customerId, results: customer });
  });

module.exports = router;  