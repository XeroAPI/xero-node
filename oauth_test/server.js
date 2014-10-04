var express = require('express'),
    xero = require('..')

// Setup the Express.js server
var app = express();
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
        res.redirect("/organisations");
    }
});

// Request an OAuth Request Token, and redirects the user to authorize it
app.get('/request', function (req, res)
{
    var xeroApp = new xero.PublicApplication({ authorizeCallbackUrl: 'http://localhost:3100/access',
        consumerKey: 'XPKXXEIXBO4PSYDEWB9GEKCKTOJGOC', consumerSecret: 'LHAFA1V6FW9NTRVKUW8OVMGKWI4N2K'})
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
    var xeroApp = new xero.PublicApplication({ authorizeCallbackUrl: 'http://localhost:3100/access',
        consumerKey: 'RPUOKBYW6KZGS37GE7S4ULR72W58B1', consumerSecret: 'Q4XQU3S7TNBKREMUTOFCI3LESYBGZT'})

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
    if (req.session.oauthAccessToken) {
        var xeroApp = new xero.PublicApplication({ authorizeCallbackUrl: 'http://localhost:3100/access',
            consumerKey: 'XPKXXEIXBO4PSYDEWB9GEKCKTOJGOC', consumerSecret: 'LHAFA1V6FW9NTRVKUW8OVMGKWI4N2K',
            accessToken: req.session.oauthAccessToken, accessSecret: req.session.oauthAccessSecret});
        xeroApp.core.organisations.getOrganisation()
            .then(function(organisation)
            {
                console.log(organisation);
                res.end();
            })

    }
    else
        res.redirect('/request');
});


app.listen(3100);
console.log("listening on http://localhost:3100");