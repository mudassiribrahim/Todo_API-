const { error } = require('console');
const http = require('http');
const todo =require('./todo');
const getRequestData =require('./utils');
const { json } = require('express');
const { url } = require('inspector');
const PORT = 9000;
const server = http.createServer( async (request,response)=>{

    // get all the todo list
    if(request.url==='/api/v1/todo ' && request.method=== 'GET'){
        response.writeHead(200,{
            'content-type' : 'application/json'
        })
        response.end(JSON.stringify(todo))


    }

    // write new todo in todo list
    else if(request.url === '/api/v1/todo' && request.method === 'POST'){
        let req_body = await getRequestData(request)
        todo.push(JSON.parse(req_body))
        response.writeHead(201,{
            'content-type' : 'application/json'
        })
        response.end(JSON.stringify(JSON.parse(req_body)))

        // delete a todo form list by id
    }else if(request.url.match(/\/api\/v1\/todo\/([0-9])/)&& request.method==='Delete'){
        const id = url.split('/')[4]
        const todoId = todo.find((t)=>t.id ===parseInt(id))
        if(!todoId){
            response.writeHead(401,{
                'content-type' : 'application/json'
            })
            response.end('no todo is available with given id ')
        }else{
            const index = todo.indexOf(todoId)
            index.splice(index,1)
            response.writeHead(200,{
                'content-type' : 'application/json'
            })
            response.end('deleted tha specified todo')

        }

    }

})

server.listen(PORT,()=>{
    console.log('server is ready and running on Port',PORT)
})

server.on('error',()=>{
    if(error.code='EADRINUSE'){
        console.log('Port is already in use');
    }
})