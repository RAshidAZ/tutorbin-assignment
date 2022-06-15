/**
 * Database config and initialization
 */
 const mongoose = require('mongoose');
 
 const connstring = process.env.MONGODB_CON_STRING;
 console.log("connstring:", connstring);
 
 const connectWithRetry = function () {
     return mongoose.connect(connstring, function (err) {
         if (err) {
             console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
             setTimeout(connectWithRetry, 5000);
         } else {
             console.log("mongodb connected");
         }
     });
 };
 connectWithRetry();
 
 module.exports = mongoose;
 