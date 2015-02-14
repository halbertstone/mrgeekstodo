# Implementing tutorial from Mr. Geek: mrgeekstodo
http://www.mrgeek.me/technology/tutorials/node-js/building-a-rest-api-using-hapi-js-and-mongodb/

Had issues with the hapi-mongodb plugin registration, not sure yet exactly the root cause;
not able to get server.pack.register to work; found server.register in hapi docs
a joi validation error occurred, commented out parts till the 'node .' start did not through errors


NOTES:
installed joi	

~/$ npm install joi
joi@5.1.0 node_modules/joi
|___ topo@1.0.2
|___ isemail@1.1.1
|___ hoek@2.11.0
|___ moment@2.9.0

Learn about module.exports
http://www.sitepoint.com/understanding-module-exports-exports-node-js/
http://stackoverflow.com/questions/5311334/what-is-the-purpose-of-node-js-module-exports-and-how-do-you-use-it
http://nodejs.org/api/modules.html#modules_module_exports


Another Example 
https://github.com/geek/hapi-example
