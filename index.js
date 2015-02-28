var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require("boom");

var server = new Hapi.Server();
server.connection({port: 8080});
/*
function Jump_handler() {
return ("Jump your crazies out")
};
*/
// Adding Routes
//
server.route(
    {
      method: 'GET',
      path: '/',
      handler: function (request, reply){
        reply("Hello world!");
      }
    }
);
server.route(
    {
      method: 'GET',
      path: '/test',
      handler: function (request, reply){
        reply("TEST Hello world!");
      }
    }
);

server.route(
    {
      method: 'GET',
      path: '/{name}',
      handler: function (request, reply){
        reply("Hello, " + encodeURIComponent(request.params.name) + "!!");
      }
    }
);

server.route(
    {
      method: "GET",
      path: "/todos",
      handler: function (request, reply) {
        reply(todos);
      }
    }
);
//-------
//-- curl request to POST some new todos
// curl -X POST -H "Content-Type: application/json" -d '{"todo":"HalWasHere", "note":"theNOTE"}' -i http://localhost:8080/todos
// curl -X POST -H "Content-Type: application/json" -d '{"todo":"Build API", "note":"Hapi is is amazing"}' -i http://localhost:8080/todos
server.route (
  {
    method: 'POST',
    path:   '/todos',
    config: {
      handler:  function (request, reply) {
                   var newTodo = {
                     todo: request.payload.todo,
                     note: request.payload.note
                   };
                   todos.push(newTodo);
                  reply(todos);
                },
                validate: {
                      payload: {
                         todo: Joi.string().required(),
                         note: Joi.string().required()
                      }
                }
    }// config:
  });

// curl -X DELETE http://localhost:8080/todo/2 -i
server.route ({
  method: 'DELETE',
  path: '/todo/{index}',
  handler: function (request, reply) {
    if (todos.length < request.params.id) {
      return reply ('Not Todo found at index: '+request.params.id).code(404);
    } 
    else {
      todos.splice ((request.params.id-1), 1);
      reply(true+" Deleted Todo item "+ request.params.id +"\n"+ todos);
    }
  }
});


////====================================================//
////  Adding the ToDos as in memory object
////  Useful for testing before the MongoDB is set up
////
//var todos = [
//  {
//    todo: "take a nap",
//    note: "note for nap"
//  },
//  {
//    todo: "Buy a Book",
//    note: "Note for book"
//  },
//  {
//    todo: "Read a Blog",
//    note: "Note for Blog"
//  }
//
//];
//
////=================================================//
////  This works with the in memory todos above
//server.route({
//  method: 'GET',
//  path: '/todo/{id}',
//  handler: function (request, reply) {
//    if (request.params.id) {
//      console.log(todos.length);
//      if (todos.length < request.params.id) {
//        return reply('No item found.').code(404);
//      }
//      return reply(todos[request.params.id-1]);
//    }
//    reply(todos);
//  }
//});
//
//


//
//=========================//
// Adding DB connection Stuff
//======
// http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
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

//======
//http://hapijs.com/api#serverregisterplugins-options-callback
//======
//Register hapi-mongodb plugin as demo from README.md
//======
server.register( 
   // plugin
   {
     register:   require('hapi-mongodb')
 
        //======
        // options not allowed; validation error from joi/lib/errors.js:74:17)
        // RESULT from 'node .'
        //{ [ValidationError: single value of value fails because options is not allowed]
        //  name: 'ValidationError',
        //    details: 
        //       [ { message: 'single value of value fails because options is not allowed',
        //           path: '0',
        //           type: 'array.includesOneSingle',
        //           context: [Object] } ],
        //        _object: 
        //            { url: 'mongodb://localhost:27017/mytodos',
        //              options: { db: [Object] } },
        //        annotate: [Function] }
        //
        // /Users/halbertstone/MEAN_STUFF/mrgeekstodo/index.js:183
        //           throw err;
        //                 ^
        // ValidationError: single value of value fails because options is not allowed
        //    at Object.exports.process (/Users/halbertstone/MEAN_STUFF/mrgeekstodo/node_modules/hapi-mongodb/node_modules/joi/lib/errors.js:74:17)
        //
        //======
        // COMMENTED OUT DUE TO VALIDATION ERROR
    // , options:    dbOpts
   }
		//======
		// 
		//======
		//       options: {
		//              ^
		//  SyntaxError: Unexpected token :
		//      at Module._compile (module.js:439:25)
		//      at Object.Module._extensions..js (module.js:474:10)
		//      at Module.load (module.js:356:32)
		//      at Function.Module._load (module.js:312:12)
		//      at Function.Module.runMain (module.js:497:10)
		//      at startup (node.js:119:16)
		//      at node.js:929:3
		//~/MEAN_STUFF/mrgeekstodo/$ 
		//   , //Options
		//      options: {
		//      message: 'hello'
		//  }

   , // callback
     function(err) {
        if (err) {
          console.error(err);
          throw err;
        }
  }
);


//=============================================================================//

server.start(  
	function() {
  console.log('Server running at :', server.info.uri);
	}
);
