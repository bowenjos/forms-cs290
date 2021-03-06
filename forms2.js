var express = require('express');
var router = express.Router();

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(router);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
   res.render('nerd');
});

router.get('/form',function(req,res){
   var qParams = [];
   for(var p in req.query){
     qParams.push({'name':p,'value':req.query[p]})
   }
   var context = {};
   context.dataList = qParams;
   res.render('form-get', context);
});

router.post('/form',function(req,res){
   var qParams = [];
   for (var p in req.body){
     qParams.push({'name':p,'value':req.body[p]})
   }
   console.log(qParams);
   console.log(req.body);
   var context = {};
   context.dataList = qParams;
   res.render('form-post', context);
});

app.use(function(req,res){
   res.status(404);
   res.render('404page');
});

app.listen(app.get('port'), function(){
   console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});
