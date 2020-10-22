const http = require('http');
let fs = require('fs');
let json = JSON.parse(fs.readFileSync('mock-db.json'));
console.log(json);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader("Access-Control-Allow-Origin", "*");

  if(req.method === 'POST'){
    console.log("POST")
    var body = ''
    req.on('data', function(data) {
      let newUser = JSON.parse(data);
      if(newUser.name === '' || newUser.email === '' || newUser.password === ''){
        console.log("Error missing information to create new user")
      }
      else{
        console.log(newUser);
        json.users.push(newUser);
        fs.writeFile('mock-db.json', JSON.stringify(json), finished)
        function finished(err) {
          console.log('new user has been added to json file')
        }
      }
    })
  }
  res.end(JSON.stringify(json));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
