var express = require('express'),
    xero = require('..'),
    swig = require('swig'),
    LRU = require('lru-cache'),
    fs = require('fs'),
    nodemailer = require('nodemailer')


function getXeroApp(session) {
    var config = {
        authorizeCallbackUrl: 'http://localhost:3100/access',
        consumerKey: 'XPKXXEIXBO4PSYDEWB9GEKCKTOJGOC',
        consumerSecret: 'LHAFA1V6FW9NTRVKUW8OVMGKWI4N2K'
    };


    if (session) {
        if (session.oauthAccessToken && session.oauthAccessSecret) {
            config.accessToken = session.oauthAccessToken;
            config.accessSecret = session.oauthAccessSecret;
        }
    }
    return new xero.PublicApplication(config);
}

var app = express();

//set up swig templating
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);
swig.setDefaults({ cache: false });


app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: '123456' }));
// app.use(express.cookieSession({ secret: 'sfsdfsdfsdfsdf234234234fd', cookie: { maxAge: 123467654456 } }));

function authorizeRedirect(req, res, returnTo) {
    var xeroApp = getXeroApp(null, returnTo);
    xeroApp.getRequestToken(function(err, token, secret) {
        if (!err) {
            req.session.oauthRequestToken = token;
            req.session.oauthRequestSecret = secret;
            req.session.returnto = returnTo;
            var authoriseUrl = xeroApp.buildAuthorizeUrl(token, { scope: 'payroll.employees,payroll.payitems,payroll.timesheets' });
            res.redirect(authoriseUrl);
        } else {
            res.redirect('/error');
        }
    })

}

var cache = LRU();

function authorizedOperation(req, res, returnTo, callback) {
    if (req.session.oauthAccessToken) {
        var xeroApp = getXeroApp(req.session);
        callback(xeroApp);
    } else
        authorizeRedirect(req, res, returnTo);
}

// Home Page
app.get('/', function(req, res) {
    res.render('index.html');
});

// Redirected from xero with oauth results
app.get('/access', function(req, res) {
    var xeroApp = getXeroApp();

    if (req.query.oauth_verifier && req.query.oauth_token == req.session.oauthRequestToken) {
        xeroApp.getAccessToken(req.session.oauthRequestToken, req.session.oauthRequestSecret, req.query.oauth_verifier,
            function(err, accessToken, accessSecret, results) {
                req.session.oauthAccessToken = accessToken;
                req.session.oauthAccessSecret = accessSecret;
                var returnTo = req.session.returnto;
                res.redirect(returnTo || '/');
            }
        )
    }
});

app.get('/employees', function(req, res) {
    authorizedOperation(req, res, '/employees', function(xeroApp) {
        var employees = [];
        xeroApp.payroll.employees.getEmployees({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('employees.html', { employees: employees });
            })
            .fail(function(err) {
                console.log(err);
                res.render('employees.html', { error: err });
            })

        function pagerCallback(err, response, cb) {
            employees.push.apply(employees, response.data);
            cb()
        }
    })
});

app.get('/error', function(req, res) {
    res.render('error.html', { error: req.query.error });
})

app.get('/contacts', function(req, res) {
    authorizedOperation(req, res, '/contacts', function(xeroApp) {
        var contacts = [];
        xeroApp.core.contacts.getContacts({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('contacts.html', { contacts: contacts });
            })

        function pagerCallback(err, response, cb) {
            contacts.push.apply(contacts, response.data);
            cb()
        }
    })
});


app.get('/timesheets', function(req, res) {
    authorizedOperation(req, res, '/timesheets', function(xeroApp) {
        xeroApp.payroll.timesheets.getTimesheets()
            .then(function(timesheets) {
                res.render('timesheets.html', { timesheets: timesheets });
            })
    })
});

app.use('/createtimesheet', function(req, res) {
    if (req.method == 'GET') {
        return res.render('createtimesheet.html');
    } else if (req.method == 'POST') {
        authorizedOperation(req, res, '/createtimesheet', function(xeroApp) {
            var timesheet = xeroApp.payroll.timesheets.newTimesheet({
                EmployeeID: '065a115c-ba9c-4c03-b8e3-44c551ed8f21',
                StartDate: new Date(2014, 8, 23),
                EndDate: new Date(2014, 8, 29),
                Status: 'Draft',
                TimesheetLines: [{
                    EarningsTypeID: 'a9ab82bf-c421-4840-b245-1df307c2127a',
                    NumberOfUnits: [5, 0, 0, 0, 0, 0, 0]
                }]
            });
            timesheet.save()
                .then(function(ret) {
                    res.render('createtimesheet.html', { timesheets: ret.entities })
                })
                .fail(function(err) {
                    res.render('createtimesheet.html', { err: err })
                })

        })
    }
});


app.get('/invoices', function(req, res) {
    authorizedOperation(req, res, '/invoices', function(xeroApp) {
        xeroApp.core.invoices.getInvoices()
            .then(function(invoices) {
                res.render('invoices.html', { invoices: invoices });
            })

    })
});

app.get('/items', function(req, res) {
    authorizedOperation(req, res, '/items', function(xeroApp) {
        xeroApp.core.items.getItems()
            .then(function(items) {
                res.render('items.html', { items: items });
            })

    })
});

app.use('/createinvoice', function(req, res) {
    if (req.method == 'GET') {
        return res.render('createinvoice.html');
    } else if (req.method == 'POST') {
        authorizedOperation(req, res, '/createinvoice', function(xeroApp) {
            var invoice = xeroApp.core.invoices.newInvoice({
                Type: req.body.Type,
                Contact: {
                    Name: req.body.Contact
                },
                DueDate: '2014-10-01',
                LineItems: [{
                    Description: req.body.Description,
                    Quantity: req.body.Quantity,
                    UnitAmount: req.body.Amount,
                    AccountCode: 400,
                    ItemCode: 'ABC123'
                }],
                Status: 'DRAFT'
            });
            invoice.save()
                .then(function(ret) {
                    res.render('createinvoice.html', { outcome: 'Invoice created', id: ret.entities[0].InvoiceID })
                })
                .fail(function(err) {
                    res.render('createinvoice.html', { outcome: 'Error', err: err })
                })

        })
    }
});

app.use('/emailinvoice', function(req, res) {
    if (req.method == 'GET' && !req.query.a) {
        res.render('emailinvoice.html', { id: req.query.id });
    } else {
        authorizedOperation(req, res, '/emailinvoice?id=' + req.query.id + '&a=1&email=' + encodeURIComponent(req.body.Email), function(xeroApp) {
            var file = fs.createWriteStream(__dirname + '/invoice.pdf', { encoding: 'binary' });
            xeroApp.core.invoices.streamInvoice(req.query.id, 'pdf', file);
            file.on('finish', function() {
                var transporter = nodemailer.createTransport(); // Direct
                var mailOptions = {
                    from: 'test@gmail.com',
                    to: req.body.Email || req.query.email,
                    subject: 'Test email',
                    text: 'Email text',
                    html: 'This is a xero invoice',
                    attachments: [
                        { filename: 'invoice.pdf', path: __dirname + '/invoice.pdf' }
                    ]
                };
                transporter.sendMail(mailOptions, function(err, info) {
                    if (err)
                        res.render('emailinvoice.html', { outcome: 'Error', err: err, id: req.query.id });
                    else
                        res.render('emailinvoice.html', { outcome: 'Email sent', id: req.query.id });
                })

            })

        })
    }
});

app.use(function(req, res, next) {
    if (req.session)
        delete req.session.returnto;
})
app.listen(3100);
console.log("listening on http://localhost:3100");