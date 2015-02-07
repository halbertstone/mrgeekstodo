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

server.route({
  method: 'GET',
  path: '/todo/{id}',
  handler: function (request, reply) {
    if (request.params.id) {
      console.log(todos.length);
      if (todos.length < request.params.id) {
        return reply('No item found.').code(404);
      }
      return reply(todos[request.params.id-1]);
    }
    reply(todos);
  }
});

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


//====================================================//
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



//=============================================================================//
server.start(  
	function() {
  console.log('Server running at :', server.info.uri);
	}
);

