var express = require('express'),
    xero = require('..'),
    swig = require('swig');


function getXeroApp(session)
{
    var config={ authorizeCallbackUrl: 'http://localhost:3100/access',
                 consumerKey: 'RPUOKBYW6KZGS37GE7S4ULR72W58B1', 
                 consumerSecret: 'Q4XQU3S7TNBKREMUTOFCI3LESYBGZT' };
    if (session)
    {
        if (session.oauthAccessToken && session.oauthAccessSecret)
        {
            config.accessToken=session.oauthAccessToken;
            config.accessSecret=session.oauthAccessSecret;
        }
        else 
            return false;
    }
    return new xero.PublicApplication(config);
} 

var app = express();

//set up swig templating
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/../views');

app.set('view cache', false);
swig.setDefaults({ cache: false });


app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: 'sfsdfsdfsdfsdf234234234fd', cookie: { maxAge: 123467654456 } }));
// Home Page
app.get('/', function (req, res)
{
    if (!req.session.authorized) {
        res.redirect("/request");
    }
    else {
        res.render('index',{});
    }
});

// Request an OAuth Request Token, and redirects the user to authorize it
app.get('/request', function (req, res)
{
    var xeroApp = getXeroApp();
    xeroApp.getRequestToken(function (err, token, secret)
    {
        if (!err) {
            req.session.oauthRequestToken = token;
            req.session.oauthRequestSecret = secret;
            var authoriseUrl = xeroApp.buildAuthorizeUrl(token);
            res.redirect(authoriseUrl);
        }
        else {

        }
    })

});

app.get('/access', function (req, res)
{
    var xeroApp = getXeroApp();

    if (req.query.oauth_verifier && req.query.oauth_token == req.session.oauthRequestToken) {
        xeroApp.getAccessToken(req.session.oauthRequestToken, req.session.oauthRequestSecret, req.query.oauth_verifier,
            function (err, accessToken, accessSecret, results)
            {
                req.session.oauthAccessToken = accessToken;
                req.session.oauthAccessSecret = accessSecret;
                res.redirect('/organisations');
            }
        )
    }
});

// Callback for the authorization page
app.get('/organisations', function (req, res)
{
    var xeroApp = getXeroApp(req.session);
    if (xeroApp)
    {
        console.log(xeroApp);
        res.end();
    }
    else
        res.redirect('/request');
});

app.use('/employees', function (req, res)
{
    var xeroApp = getXeroApp(req.session);
    if (xeroApp)
    {
        res.render('employees',{});
    }
    else
        res.redirect('/request');
});

app.use('/customers', function (req, res)
{
   var xeroApp = getXeroApp(req.session);
    if (xeroApp)
    {
        res.render('customers',{});
    }
    else
        res.redirect('/request');
});

app.get('/customer_test', function (req, res)
{
    var xeroApp = getXeroApp(req.session);
    var contacts = [];
    for (var i=1;i<=50;i++)
    {
        contacts.push(xeroApp.core.contacts.newContact({ ContactID: i,Name: 'user' + Math.floor(Math.random()*100+1),FirstName:'Joe',LastName:'Smith'}));
    }
    res.render('customers',{contacts:contacts});
});

app.use('/timesheets', function (req, res)
{
    var xeroApp = getXeroApp(req.session);
    if (xeroApp)
    {
        res.render('timesheets',{});
    }
    else
        res.redirect('/request');
});

app.use('/invoices', function (req, res)
{
    var xeroApp = getXeroApp(req.session);
    if (xeroApp)
    {
        res.render('invoices',{});
    }
    else
        res.redirect('/request');
});

app.use('/send_invoice', function (req, res)
{
    var xeroApp = getXeroApp(req.session);
    if (xeroApp)
    {
        res.render('send_invoice',{});
    }
    else
        res.redirect('/request');
});

app.listen(3100);
console.log("listening on http://localhost:3100");