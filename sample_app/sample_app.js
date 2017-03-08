var express = require('express'),
    xero = require('..'),
    exphbs = require('express-handlebars'),
    LRU = require('lru-cache'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    publicConfigFile = "../public_app_config.json";

function getXeroApp(session) {
    var config = {
        authorizeCallbackUrl: 'http://localhost:3100/access'
    };

    if (session) {
        if (session.oauthAccessToken && session.oauthAccessSecret) {
            config.accessToken = session.oauthAccessToken;
            config.accessSecret = session.oauthAccessSecret;
        }
    }

    return new xero.PublicApplication(publicConfigFile, config);
}

var app = express();

var exphbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: [
        __dirname + '/views/partials/'
    ],
    helpers: {
        ifCond: function(v1, operator, v2, options) {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }
    }
});

app.engine('handlebars', exphbs.engine);

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: '123456' }));
app.use(express.static(__dirname + '/assets'));
// app.use(express.cookieSession({ secret: 'sfsdfsdfsdfsdf234234234fd', cookie: { maxAge: 123467654456 } }));

function authorizeRedirect(req, res, returnTo) {
    var xeroApp = getXeroApp(null, returnTo);
    xeroApp.getRequestToken(function(err, token, secret) {
        if (!err) {
            req.session.oauthRequestToken = token;
            req.session.oauthRequestSecret = secret;
            req.session.returnto = returnTo;

            //Note: only include this scope if payroll is required for your application.
            var PayrollScope = 'payroll.employees,payroll.payitems,payroll.timesheets';
            var AccountingScope = '';

            var authoriseUrl = xeroApp.buildAuthorizeUrl(token, {
                scope: PayrollScope
            });
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
    res.render('index', {
        active: {
            overview: true
        }
    });
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

app.get('/organisations', function(req, res) {
    authorizedOperation(req, res, '/organisations', function(xeroApp) {
        xeroApp.core.organisations.getOrganisations()
            .then(function(organisations) {
                res.render('organisations', {
                    organisations: organisations,
                    active: {
                        organisations: true
                    }
                });
            })
    })
});

app.get('/employees', function(req, res) {
    authorizedOperation(req, res, '/employees', function(xeroApp) {
        xeroApp.payroll.employees.getEmployees()
            .then(function(employees) {
                res.render('employees', {
                    employees: employees,
                    active: {
                        employees: true
                    }
                });
            })
            .catch(function(err) {
                console.log(err)
                res.render('employees', {
                    error: err,
                    active: {
                        employees: true
                    }
                })
            })
    })
});

app.get('/error', function(req, res) {
    console.log(req.query.error);
    res.render('index', { error: req.query.error });
})

app.get('/contacts', function(req, res) {
    authorizedOperation(req, res, '/contacts', function(xeroApp) {
        var contacts = [];
        xeroApp.core.contacts.getContacts({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('contacts', {
                    contacts: contacts,
                    active: {
                        contacts: true
                    }
                });
            })

        function pagerCallback(err, response, cb) {
            contacts.push.apply(contacts, response.data);
            cb()
        }
    })
});

app.get('/banktransactions', function(req, res) {
    authorizedOperation(req, res, '/banktransactions', function(xeroApp) {
        var bankTransactions = [];
        xeroApp.core.bankTransactions.getBankTransactions({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('banktransactions', {
                    bankTransactions: bankTransactions,
                    active: {
                        banktransactions: true
                    }
                });
            })

        function pagerCallback(err, response, cb) {
            bankTransactions.push.apply(bankTransactions, response.data);
            cb()
        }
    })
});

app.get('/journals', function(req, res) {
    authorizedOperation(req, res, '/journals', function(xeroApp) {
        var journals = [];
        xeroApp.core.journals.getJournals({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('journals', {
                    journals: journals,
                    active: {
                        journals: true
                    }
                });
            })

        function pagerCallback(err, response, cb) {
            journals.push.apply(journals, response.data);
            cb()
        }
    })
});

app.get('/banktransfers', function(req, res) {
    authorizedOperation(req, res, '/banktransfers', function(xeroApp) {
        var bankTransfers = [];
        xeroApp.core.bankTransfers.getBankTransfers({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('banktransfers', {
                    bankTransfers: bankTransfers,
                    active: {
                        banktransfers: true
                    }
                });
            })

        function pagerCallback(err, response, cb) {
            bankTransfers.push.apply(bankTransfers, response.data);
            cb()
        }
    })
});

app.get('/payments', function(req, res) {
    authorizedOperation(req, res, '/payments', function(xeroApp) {
        xeroApp.core.payments.getPayments()
            .then(function(payments) {
                res.render('payments', {
                    payments: payments,
                    active: {
                        payments: true
                    }
                });
            })
    })
});

app.get('/trackingcategories', function(req, res) {
    authorizedOperation(req, res, '/trackingcategories', function(xeroApp) {
        xeroApp.core.trackingCategories.getTrackingCategories()
            .then(function(trackingcategories) {
                res.render('trackingcategories', {
                    trackingcategories: trackingcategories,
                    active: {
                        trackingcategories: true
                    }
                });
            })
    })
});

app.get('/accounts', function(req, res) {
    authorizedOperation(req, res, '/accounts', function(xeroApp) {
        xeroApp.core.accounts.getAccounts()
            .then(function(accounts) {
                res.render('accounts', {
                    accounts: accounts,
                    active: {
                        accounts: true
                    }
                });
            })
    })
});


app.get('/timesheets', function(req, res) {
    authorizedOperation(req, res, '/timesheets', function(xeroApp) {
        xeroApp.payroll.timesheets.getTimesheets()
            .then(function(timesheets) {
                res.render('timesheets', {
                    timesheets: timesheets,
                    active: {
                        timesheets: true
                    }
                });
            })
            .catch(function(err) {
                console.log(err)
                res.render('timesheets', {
                    error: err,
                    active: {
                        timesheets: true
                    }
                })
            })
    })
});

app.use('/createtimesheet', function(req, res) {
    if (req.method == 'GET') {
        return res.render('createtimesheet');
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
                    res.render('createtimesheet', { timesheets: ret.entities })
                })
                .catch(function(err) {
                    res.render('createtimesheet', { err: err })
                })

        })
    }
});


app.get('/invoices', function(req, res) {
    authorizedOperation(req, res, '/invoices', function(xeroApp) {
        xeroApp.core.invoices.getInvoices()
            .then(function(invoices) {
                res.render('invoices', {
                    invoices: invoices,
                    active: {
                        invoices: true
                    }
                });
            })

    })
});

app.get('/items', function(req, res) {
    authorizedOperation(req, res, '/items', function(xeroApp) {
        xeroApp.core.items.getItems()
            .then(function(items) {
                res.render('items', {
                    items: items,
                    active: {
                        items: true
                    }
                });
            })

    })
});

app.use('/createinvoice', function(req, res) {
    if (req.method == 'GET') {
        return res.render('createinvoice');
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
                    res.render('createinvoice', { outcome: 'Invoice created', id: ret.entities[0].InvoiceID })
                })
                .catch(function(err) {
                    res.render('createinvoice', { outcome: 'Error', err: err })
                })

        })
    }
});

app.use('/emailinvoice', function(req, res) {
    if (req.method == 'GET' && !req.query.a) {
        res.render('emailinvoice', { id: req.query.id });
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
                        res.render('emailinvoice', { outcome: 'Error', err: err, id: req.query.id });
                    else
                        res.render('emailinvoice', { outcome: 'Email sent', id: req.query.id });
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