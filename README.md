# Implementing tutorial from Mr. Geek: mrgeekstodo
http://www.mrgeek.me/technology/tutorials/node-js/building-a-rest-api-using-hapi-js-and-mongodb/

Had issues with the hapi-mongodb plugin registration, not sure yet exactly the root cause;
not able to get server.pack.register to work; found server.register in hapi docs
a joi validation error occurred, commented out parts till the 'node .' start did not through errors

// DB connection Stuff that finally worked
//======
// http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.
//======
//
var dbOpts = {
"url"     : "mongodb://localhost:27017/mytodos",
"options" : {
    "db" : {
        "native_parser"  : false
        }
    }
};

server.register(
    // plugin
    {
      register: require('hapi-mongodb')
    }
    , // callback
        function(err) {
            if (err) {
                console.error(err);
                throw err;
            }
    }
);



NOTES:
installed joi	

~/$ npm install joi

Learn about module.exports
http://www.sitepoint.com/understanding-module-exports-exports-node-js/
http://stackoverflow.com/questions/5311334/what-is-the-purpose-of-node-js-module-exports-and-how-do-you-use-it
http://nodejs.org/api/modules.html#modules_module_exports


Another Example 
https://github.com/geek/hapi-example
