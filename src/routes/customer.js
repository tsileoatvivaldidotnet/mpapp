// jade web application routes
// base path is 'app/'
var express = require('express');
const router = express.Router();
const axios = require('axios');
const API_GATEWAY_URL = process.env.API_GATEWAY_URL;

router.get('/search', function(req, res, next) {
    res.render('customer/search', { title: 'search' });
  });

  
router.post('/search', async function(req, res, next) {
  let searchResults = await axios.post(`${API_GATEWAY_URL}/customer/search`, req.body);
  //let searchResults = await customerService.searchCustomers(req.body);
  res.render('customer/search', { title: 'results', search: req.body, results: searchResults.data });
});

router.post('/edit', async function(req, res, next){
  let customerId = req.body.customerId;
  let customer = null;
  if (customerId != 0) {
      customer = await customerService.getCustomerById(customerId);
  }
  res.render('customer/edit', { customerId: customerId, results: customer });
});

module.exports = router;  