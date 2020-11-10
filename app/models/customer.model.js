//const sql = require("./db_mysql.js");
const sql = require("./db_postgre.js");

// constructor
const Customer = function(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
  };
  
  Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers (email, name, active) VALUES ($1, $2, $3)"
    , [newCustomer.email, newCustomer.name, newCustomer.active]
    , (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
  };
  
  Customer.findById = (customerId, result) => {
    sql.query("SELECT * FROM customers WHERE id = $1"
    , [customerId]
    , (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found customer: ", res.rows);
          result(null, res.rows);
          return;
        }
    
        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
  };
  
  Customer.getAll = result => {
    sql.query("SELECT * FROM customers"
    , (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("customers: ", res.rows);
        result(null, res.rows);
    });
  };
  
  Customer.updateById = (id, customer, result) => {
    sql.query("UPDATE customers SET email = $1, name = $2, active = $3 WHERE id = $4"
    , [customer.email, customer.name, customer.active, id]
    , (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  };
  
  Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = $1"
    , [id]
    , (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        console.log("deleted customer with id: ", id);
        result(null, res);
    });
  };
  
  Customer.removeAll = result => {
    sql.query("DELETE FROM customers"
    , (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };
  
  module.exports = Customer;