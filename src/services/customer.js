const Customer = require('../models/customer');
const CustomerId = require('../models/customerid');
const db = require('../db/index');

async function getCustomerById(id) {
    const cust = await Customer.findOne({id:id});
    return cust;
}

async function searchCustomers(search) {
    for (const prop in search) {
        let val = search[prop];
        if (val == null || val == '') delete search[prop];
    }
    const customers = await Customer.find(search);
    return customers;
}

function getAllCustomers() {
    return Customer.find({});
}

async function createCustomer(oCust) {
    try {
        oCust.id = -1; // need to set id to a fake value for validation
        await Customer.validate(oCust); // validate incoming customer against schema

        // search for a dup customer by phone
        //phone should be 'standardized' before search
        let customers = await this.searchCustomers({phone: oCust.phone});
        if (customers.length > 0) {
            customers[0].dup = true;
            return customers[0];
        }
                
        const oNewCustId = await CustomerId.findOneAndUpdate({id:{$gt:0}},{$inc:{id: 1}},{new: true}); // get new customer id
        oCust.id = oNewCustId.id;
        await Customer.create(oCust); // create customer
        return oCust;
    }
    catch(e) {
        throw(e);
    }
}

async function updateCustomer(oCust) {
    try {
        const id = oCust.id;
        if (!id) return false;
        const oExistingCust = Customer.findOne({id: id});
        if (oExistingCust == null) {
            return false;
        }
        else {
            delete oCust.id;
            await oExistingCust.updateOne({id: id}, oCust);
            return true;
        }
    }
    catch(e) {
        throw(e);
    }
}

async function deleteCustomer(oCust) {
    try {
        const id = oCust.id;
        if (!id) return false;
        const oExistingCust = Customer.findOne({id: id});
        if (oExistingCust == null) {
            return false;
        }
        else {
            delete oCust.id;
            oCust.deleted = true;
            await oExistingCust.updateOne({id: id}, oCust);
            return true;
        }
    }
    catch(e) {
        throw(e);
    }
}

module.exports = {getCustomerById, getAllCustomers, createCustomer, searchCustomers, updateCustomer, deleteCustomer}