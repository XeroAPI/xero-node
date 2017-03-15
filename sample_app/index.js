var express = require('express'),
    xero = require('..'),
    exphbs = require('express-handlebars'),
    LRU = require('lru-cache'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    metaConfig = require('./config/config.json');

var xeroClient;
var eventReceiver;

function getXeroClient(session) {

    if (!xeroClient) {
        var APPTYPE = metaConfig.APPTYPE;
        var config = metaConfig[APPTYPE.toLowerCase()];

        if (session) {
            if (session.oauthAccessToken && session.oauthAccessSecret) {
                config.accessToken = session.oauthAccessToken;
                config.accessSecret = session.oauthAccessSecret;
            }
        }

        if (config.privateKeyPath && !config.privateKey) config.privateKey = fs.readFileSync(config.privateKeyPath);

        switch (APPTYPE) {
            case "PUBLIC":
                xeroClient = new xero.PublicApplication(config);
                break;
            case "PARTNER":
                xeroClient = new xero.PartnerApplication(config);
                eventReceiver = xeroClient.eventEmitter;
                eventReceiver.on('xeroTokenUpdate', function(data) {
                    //Store the data that was received from the xeroTokenRefresh event
                    console.log("Received xero token refresh: ", data);
                });
                break;
            default:
                throw "No App Type Set!!"
        }
    }

    return xeroClient;
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
    var xeroClient = getXeroClient(null, returnTo);
    xeroClient.getRequestToken(function(err, token, secret) {
        if (!err) {
            req.session.oauthRequestToken = token;
            req.session.oauthRequestSecret = secret;
            req.session.returnto = returnTo;

            //Note: only include this scope if payroll is required for your application.
            var PayrollScope = 'payroll.employees,payroll.payitems,payroll.timesheets';
            var AccountingScope = '';

            var authoriseUrl = xeroClient.buildAuthorizeUrl(token, {
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
    if (xeroClient) {
        callback(xeroClient);
    } else {
        authorizeRedirect(req, res, returnTo);
    }
}

function handleErr(err, req, res, returnTo) {
    console.log(err);
    if (err.data && err.data.oauth_problem && err.data.oauth_problem == "token_rejected") {
        authorizeRedirect(req, res, returnTo);
    } else {
        res.redirect('error');
    }
}

app.get('/error', function(req, res) {
    console.log(req.query.error);
    res.render('index', { error: req.query.error });
})

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
    var xeroClient = getXeroClient();

    if (req.query.oauth_verifier && req.query.oauth_token == req.session.oauthRequestToken) {
        xeroClient.setAccessToken(req.session.oauthRequestToken, req.session.oauthRequestSecret, req.query.oauth_verifier)
            .then(function() {
                var returnTo = req.session.returnto;
                res.redirect(returnTo || '/');
            })
            .catch(function(err) {
                handleErr(err, req, res, 'error');
            })
    }
});

app.get('/organisations', function(req, res) {
    authorizedOperation(req, res, '/organisations', function(xeroClient) {
        xeroClient.core.organisations.getOrganisations()
            .then(function(organisations) {
                res.render('organisations', {
                    organisations: organisations,
                    active: {
                        organisations: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'organisations');
            })
    })
});

app.get('/taxrates', function(req, res) {
    authorizedOperation(req, res, '/taxrates', function(xeroClient) {
        xeroClient.core.taxrates.getTaxRates()
            .then(function(taxrates) {
                res.render('taxrates', {
                    taxrates: taxrates,
                    active: {
                        taxrates: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'taxrates');
            })
    })
});

app.get('/users', function(req, res) {
    authorizedOperation(req, res, '/users', function(xeroClient) {
        xeroClient.core.users.getUsers()
            .then(function(users) {
                res.render('users', {
                    users: users,
                    active: {
                        users: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'users');
            })
    })
});

app.get('/employees', function(req, res) {
    authorizedOperation(req, res, '/employees', function(xeroClient) {
        xeroClient.payroll.employees.getEmployees()
            .then(function(employees) {
                res.render('employees', {
                    employees: employees,
                    active: {
                        employees: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'employees');
            })
    })
});

app.get('/contacts', function(req, res) {
    authorizedOperation(req, res, '/contacts', function(xeroClient) {
        var contacts = [];
        xeroClient.core.contacts.getContacts({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('contacts', {
                    contacts: contacts,
                    active: {
                        contacts: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'contacts');
            })

        function pagerCallback(err, response, cb) {
            contacts.push.apply(contacts, response.data);
            cb()
        }
    })
});

app.get('/banktransactions', function(req, res) {
    authorizedOperation(req, res, '/banktransactions', function(xeroClient) {
        var bankTransactions = [];
        xeroClient.core.bankTransactions.getBankTransactions({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('banktransactions', {
                    bankTransactions: bankTransactions,
                    active: {
                        banktransactions: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'banktransactions');
            })

        function pagerCallback(err, response, cb) {
            bankTransactions.push.apply(bankTransactions, response.data);
            cb()
        }
    })
});

app.get('/journals', function(req, res) {
    authorizedOperation(req, res, '/journals', function(xeroClient) {
        var journals = [];
        xeroClient.core.journals.getJournals({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('journals', {
                    journals: journals,
                    active: {
                        journals: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'journals');
            })

        function pagerCallback(err, response, cb) {
            journals.push.apply(journals, response.data);
            cb()
        }
    })
});

app.get('/banktransfers', function(req, res) {
    authorizedOperation(req, res, '/banktransfers', function(xeroClient) {
        var bankTransfers = [];
        xeroClient.core.bankTransfers.getBankTransfers({ pager: { callback: pagerCallback } })
            .then(function() {
                res.render('banktransfers', {
                    bankTransfers: bankTransfers,
                    active: {
                        banktransfers: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'banktransfers');
            })

        function pagerCallback(err, response, cb) {
            bankTransfers.push.apply(bankTransfers, response.data);
            cb()
        }
    })
});

app.get('/payments', function(req, res) {
    authorizedOperation(req, res, '/payments', function(xeroClient) {
        xeroClient.core.payments.getPayments()
            .then(function(payments) {
                res.render('payments', {
                    payments: payments,
                    active: {
                        payments: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'payments');
            })
    })
});

app.get('/trackingcategories', function(req, res) {
    authorizedOperation(req, res, '/trackingcategories', function(xeroClient) {
        xeroClient.core.trackingCategories.getTrackingCategories()
            .then(function(trackingcategories) {
                res.render('trackingcategories', {
                    trackingcategories: trackingcategories,
                    active: {
                        trackingcategories: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'trackingcategories');
            })
    })
});

app.get('/accounts', function(req, res) {
    authorizedOperation(req, res, '/accounts', function(xeroClient) {
        xeroClient.core.accounts.getAccounts()
            .then(function(accounts) {
                res.render('accounts', {
                    accounts: accounts,
                    active: {
                        accounts: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'accounts');
            })
    })
});


app.get('/timesheets', function(req, res) {
    authorizedOperation(req, res, '/timesheets', function(xeroClient) {
        xeroClient.payroll.timesheets.getTimesheets()
            .then(function(timesheets) {
                res.render('timesheets', {
                    timesheets: timesheets,
                    active: {
                        timesheets: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'timesheets');
            })
    })
});




app.get('/invoices', function(req, res) {
    authorizedOperation(req, res, '/invoices', function(xeroClient) {
        xeroClient.core.invoices.getInvoices()
            .then(function(invoices) {
                console.log(invoices[0].Payments[0]);
                res.render('invoices', {
                    invoices: invoices,
                    active: {
                        invoices: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'invoices');
            })

    })
});

app.get('/items', function(req, res) {
    authorizedOperation(req, res, '/items', function(xeroClient) {
        xeroClient.core.items.getItems()
            .then(function(items) {
                res.render('items', {
                    items: items,
                    active: {
                        items: true
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'items');
            })

    })
});

app.get('/reports', function(req, res) {
    authorizedOperation(req, res, '/reports', function(xeroClient) {

        var reportkeys = {
            '1': 'BalanceSheet',
            '2': 'TrialBalance',
            '3': 'ProfitAndLoss',
            '4': 'BankStatement',
            '5': 'BudgetSummary',
            '6': 'ExecutiveSummary',
            '7': 'BankSummary',
            '8': 'AgedReceivablesByContact',
            '9': 'AgedPayablesByContact'
        };

        var report = req.query ? req.query.r : null;

        if (reportkeys[report]) {
            var selectedReport = reportkeys[report];

            var data = {
                active: {}
            };

            data.active[selectedReport.toLowerCase()] = true;

            xeroClient.core.reports.generateReport({
                    id: selectedReport
                })
                .then(function(report) {
                    console.log(report);
                    data.report = report;
                    res.render('reports', data);
                })
                .catch(function(err) {
                    handleErr(err, req, res, 'reports');
                })


        } else {
            res.render('index', {
                error: {
                    message: "Report not found"
                },
                active: {
                    overview: true
                }
            });
        }
    })
});

app.use('/createinvoice', function(req, res) {
    if (req.method == 'GET') {
        return res.render('createinvoice');
    } else if (req.method == 'POST') {
        authorizedOperation(req, res, '/createinvoice', function(xeroClient) {
            var invoice = xeroClient.core.invoices.newInvoice({
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

app.use('/createtimesheet', function(req, res) {
    if (req.method == 'GET') {
        return res.render('createtimesheet');
    } else if (req.method == 'POST') {
        authorizedOperation(req, res, '/createtimesheet', function(xeroClient) {
            var timesheet = xeroClient.payroll.timesheets.newTimesheet({
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

app.use('/emailinvoice', function(req, res) {
    if (req.method == 'GET' && !req.query.a) {
        res.render('emailinvoice', { id: req.query.id });
    } else {
        authorizedOperation(req, res, '/emailinvoice?id=' + req.query.id + '&a=1&email=' + encodeURIComponent(req.body.Email), function(xeroClient) {
            var file = fs.createWriteStream(__dirname + '/invoice.pdf', { encoding: 'binary' });
            xeroClient.core.invoices.streamInvoice(req.query.id, 'pdf', file);
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