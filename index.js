var Hapi = require('hapi');
var Joi = require('joi');

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
//===
//  Adding the ToDos 
//
var todos = [
  {
    todo: "take a nap",
    note: "note for nap"
  },
  {
    todo: "Buy a Book",
    note: "Note for book"
  },
  {
    todo: "Read a Blog",
    note: "Note for Blog"
  }

];

//
server.start(  
	function() {
  console.log('Server running at :', server.info.uri);
	}
);

