const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = function(mysql){
  const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '141078',
    database : 'nalu'
  });
  db.connect(function(err) {
    if(err){
      throw err;
    };
    console.log("MySQL is Connected!");
  });
  return db;
}
