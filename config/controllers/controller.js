// const bodyParser = require('body-parser');
// const urlencodeParser = bodyParser.urlencoded({extended: false});
module.exports = function(app, db, passport){
  // reading data
  app.get('/', function(req,res){
    console.log('Get request successful');
    //let sql='SELECT * FROM todoItems';
    res.render('home');

  });

  app.get('/home2', isLoggedIn, function(req,res){
    console.log('Get request successful');
    //let sql='SELECT * FROM todoItems';
    console.log(req.user);
    let sql = 'SELECT * FROM users WHERE id =' + req.user.id + ';';
    db.query(sql, (err, results) => {
      if (err) throw err;
      // console.log(results);
      res.render('home2', {surf: results, user: req.user} );
    });
  });


  app.get('/post/:id', isLoggedIn, function(req,res){
    console.log('Get request successful here');
    //let sql='SELECT * FROM todoItems';
    // console.log(req.user);
    // console.log(req.params.id);
    let sql ='SELECT * FROM surfspot WHERE id = ' + req.params.id + ';';
    let sql2 = 'SELECT * FROM reviews where surfspotID = ' + req.params.id + ';';

    db.query(sql, (err, result) => {

      if (err) throw err;
      db.query(sql2, (err, results) => {
        if (err) throw err;

          res.render('posts2', {surf: result, review: results, user: req.user} );


      })


    })
  });

  app.get('/postunlogged/:id', function(req,res){
    console.log('Get request successful');
    //let sql='SELECT * FROM todoItems';
    console.log(req.params.id);
    let sql ='SELECT * FROM surfspot WHERE id = ' + req.params.id + ';';
    let sql2 = 'SELECT * FROM reviews where surfspotID = ' + req.params.id + ';';
    db.query(sql, (err, result) => {

      if (err) throw err;
      db.query(sql2, (err, results) => {
        if (err) throw err;

        res.render('posts', {surf: result, review: results, user: req.user} );
      })


    })
  });



  //posting info
  app.post('/post/:id', isLoggedIn, function(req,res){
    console.log('post request successful');

    var dateCreated = new Date() ;
    var dd = dateCreated.getDate();
    var mm = dateCreated.getMonth()+1; //January is 0!
    var yyyy = dateCreated.getFullYear();
    var today = mm + '/' + dd + '/' + yyyy;

    console.log(req.body);

    let item = req.body;
    item['userID'] = req.user.id;
    item['surfspotID'] = req.params.id;
    item['createdAt'] = today;
    item['author']= req.user.username;
    console.log(item);
    let sql = 'INSERT INTO reviews SET ?';
    let query = db.query(sql, item, (err, results) => {
      if (err) throw err;
      // console.log(result);
      let sql1 ='SELECT * FROM surfspot WHERE id = ' + req.params.id + ';';
      let sql2 = 'SELECT * FROM reviews where surfspotID = ' + req.params.id + ';';

      db.query(sql1, (err, result) => {
        if (err) throw err;
        db.query(sql2, (err, results) => {
          if (err) throw err;
          if (results.length != 0)
            reviews = results;
              res.render('posts2', {surf: result, review: reviews, user: req.user} );
        })

      })
    });

  });

  //displaying sign in
  app.get('/signin', function(req,res){
    res.render('signin', {message: req.flash('loginMessage')});
  });

  //handling sign in forms
  app.post('/signin', passport.authenticate('local-signin',  {
     successRedirect: '/home2',
     failureRedirect: '/signin'}
    )
  );


  //display sign up
  app.get('/signup', function(req,res){
    res.render('signup');
  });


  //handling sign up forms
  app.post('/signup', passport.authenticate('local-signup',  {
     successRedirect: '/home2',
     failureRedirect: '/signup'}
    )
  );

  //destroying session
  app.get('/logout', function(req,res){
    req.session.destroy(function(err) {
        res.redirect('/signin');
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
  }



  //
  //
  // //posting data
  // app.post('/todo', urlencodeParser, function(req,res){
  //   console.log('Post request successful');
  //   let item = req.body;
  //
  //   //console.log(item);
  //   let sql = 'INSERT INTO todoItems SET ?';
  //   let query = db.query(sql, item, function(err, result){
  //     if(err) throw err;
  //     console.log(result);
  //     res.json(result);
  //   });
  //
  //
  // });
  //
  //
  // //destroying data
  // app.delete('/todo/:id',function(req,res){
  //   console.log('Delete request successful');
  //   console.log(req.params.id);
  //   let sql=`DELETE FROM todoItems WHERE id =  ${req.params.id};`;
  //   db.query(sql, (err,result)=>{
  //     if(err) throw err;
  //     console.log(result);
  //     res.json(result);
  //
  //   });

  // });
}
