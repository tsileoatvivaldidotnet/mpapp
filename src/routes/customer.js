// jade web application routes
// base path is '/customer'
var express = require('express');
var createError = require('http-errors');
const router = express.Router();
const axios = require('axios');
const { apiGatewayUrl } = require('../config/config');

router.get('/search', function(req, res) {
    res.render('customer/search', { title: 'search' });
});

router.post('/search', async function(req, res, next) {
  try {
    let searchResults = await axios.post(`${apiGatewayUrl}/customer/search`, req.body);
    res.render('customer/search', { title: 'results', search: req.body, results: searchResults.data });
  } catch (err) {
    next(err);
  }
});

router.get('/edit/:id', async function(req, res, next){
  try {
    let customerId = req.params.id;
    let customer = null;
    if (Number(customerId) !== 0) {
        customer = await axios.get(`${apiGatewayUrl}/customer/${customerId}`);
    }
    res.render('customer/edit', { customerId: customerId, results: customer ? customer.data : null });
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return next(createError(404, 'Customer not found'));
    }
    next(err);
  }
});

module.exports = router;
