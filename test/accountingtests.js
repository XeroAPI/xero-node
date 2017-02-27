var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    _ = require('lodash'),
    xero = require('..'),
    util = require('util'),
    Browser = require('zombie');

process.on('uncaughtException', function(err) {
    console.log('uncaught', err)
})

var currentApp;
var organisationCountry = "";

var APPTYPE = "PUBLIC";
var privateConfigFile = "/Users/jordan.walsh/.xero/private_app_config.json";
var publicConfigFile = "/Users/jordan.walsh/.xero/public_app_config.json";
var configFile = "";

switch (APPTYPE) {
    case "PUBLIC":
        configFile = publicConfigFile;
        break;

    case "PRIVATE":
        configFile = privateConfigFile;
        break;

    default:
        throw "No Config File Selected!!"
}

describe('create application', function() {
    describe('create instance', function() {
        it('init instance and set options', function(done) {
            //This constructor looks in ~/.xero/config.json for settings

            switch (APPTYPE) {
                case "PUBLIC":
                    currentApp = new xero.PublicApplication(configFile);
                    break;
                case "PRIVATE":
                    currentApp = new xero.PrivateApplication(configFile);
                    break;
                default:
                    throw "No App Type Set!!"
            }

            done();
        })
    });
});

describe('get access for public application', function() {

    beforeEach(function() {
        if (APPTYPE !== "PUBLIC") {
            this.skip();
        }
    });

    describe('create instance', function() {
        it('init instance and set options', function(done) {
            //This constructor looks in ~/.xero/config.json for settings
            currentApp = new xero.PublicApplication(configFile);
            done();
        })
    });

    describe('Get tokens', function() {

        var authoriseUrl = "";
        var requestToken = "";
        var requestSecret = "";
        var verifier = "";

        var accessToken = "";
        var accessSecret = "";


        it('user gets a token and builds the url', function(done) {
            currentApp.getRequestToken(function(err, token, secret) {
                    if (!err) {
                        authoriseUrl = currentApp.buildAuthorizeUrl(token);
                        requestToken = token;
                        requestSecret = secret;
                        console.log("URL: " + authoriseUrl);
                        console.log("token: " + requestToken);
                        console.log("secret: " + requestSecret);
                    } else {
                        throw err;
                    }
                })
                .then(function() {
                    done();
                }).fail(function(err) {
                    done(wrapError(err));
                });
        });

        describe('gets the request token from the url', function() {
            this.timeout(20000);
            var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7';
            const browser = new Browser({
                userAgent: user_agent,
                waitFor: 20000,
                runScripts: false
            });

            //browser.debug();

            before(function(done) {
                if (APPTYPE === "PUBLIC")
                    browser.visit(authoriseUrl, done);
                else
                    this.skip();
            });

            describe('submits form', function() {
                this.timeout(20000);

                var options = {};

                before(function(done) {
                    if (APPTYPE !== "PUBLIC") {
                        this.skip();
                    } else {
                        try {
                            console.log('configFile: ' + configFile);

                            var config = require(configFile);
                            options["XeroUsername"] = config.XeroUsername;
                            options["XeroPassword"] = config.XeroPassword;
                            done();
                        } catch (e) {
                            var err = 'Couldn\'t read config.json from [' + configFile + ']. Exiting...';
                            console.log(err);
                            throw e;
                        }
                    }
                });

                it('should login', function(done) {
                    browser
                        .fill('userName', options.XeroUsername)
                        .fill('password', options.XeroPassword)
                        .pressButton('Login', done);
                });

                it('should be successful', function(done) {
                    browser.assert.success();
                    done();
                });

                it('should see noscript page', function(done) {
                    browser.assert.text('title', 'Working...');
                    browser.document.forms[0].submit();
                    browser.wait().then(function() {
                        // just dump some debug data to see if we're on the right page
                        //console.log(browser.dump());
                        done();
                    });

                });

                it('should see application auth page', function(done) {
                    //console.log(browser.document.documentElement.innerHTML);
                    browser.assert.text('title', 'Xero | Authorise Application');
                    browser.select('select', 'MWE5NzdkMDItZTAyNC00NGJkLTlmMGQtNjFiOGI4OWY2YTI4-ecmd9rxRfsM=');
                    browser.pressButton("Allow access for 30 mins");
                    browser.wait().then(function() {
                        // just dump some debug data to see if we're on the right page
                        //console.log(browser.document.documentElement.innerHTML);
                        done();
                    });
                });

                it('should get a code to enter', function(done) {
                    browser.assert.text('title', 'Xero | Authorise Application');
                    verifier = browser.field('#pin-input').value;

                    expect(verifier).to.not.equal("");
                    expect(verifier).to.be.a('String');
                    done();
                });

            });
        });

        describe('swaps the request token for an access token', function() {
            this.timeout(20000);
            it('calls the access token method and sets the options', function(done) {
                currentApp.getAccessToken(requestToken, requestSecret, verifier, function(err, accessToken, accessSecret, results) {

                        if (!err) {
                            currentApp.setOptions({ accessToken: accessToken, accessSecret: accessSecret });
                        } else {
                            throw err;
                        }
                    })
                    .then(function() {
                        done();
                    }).fail(function(err) {
                        done(wrapError(err));
                    });
            });
        });
    });
});

describe('regression tests', function() {

    var InvoiceID = "";
    var PaymentID = "";

    describe('organisations', function() {
        it('get', function(done) {
            this.timeout(10000);
            currentApp.core.organisations.getOrganisation()
                .then(function(ret) {

                    var orgVersions = ["AU", "NZ", "GLOBAL", "UK", "US"];
                    expect(ret.Name).to.not.equal("");
                    expect(ret.Version).to.not.equal("");
                    expect(ret.Version).to.be.oneOf(orgVersions);

                    organisationCountry = ret.Version;

                    done();
                })
                .fail(function(err) {
                    done(wrapError(err));
                })
        })
    })

    describe('accounts', function() {

        //Accounts supporting data
        var accountClasses = ["ASSET", "EQUITY", "EXPENSE", "LIABILITY", "REVENUE"];
        var accountTypes = ["BANK", "CURRENT", "CURRLIAB", "DEPRECIATN", "DIRECTCOSTS", "EQUITY", "EXPENSE", "FIXED", "INVENTORY", "LIABILITY", "NONCURRENT", "OTHERINCOME", "OVERHEADS", "PREPAYMENT", "REVENUE", "SALES", "TERMLIAB", "PAYGLIABILITY", "SUPERANNUATIONEXPENSE", "SUPERANNUATIONLIABILITY", "WAGESEXPENSE", "WAGESPAYABLELIABILITY"];
        var accountStatusCodes = ["ACTIVE", "ARCHIVED"];
        var bankAccountTypes = ["BANK", "CREDITCARD", "PAYPAL"];

        it('GET ALL', function(done) {
            this.timeout(10000);
            currentApp.core.accounts.getAccounts()
                .then(function(accounts) {

                    accounts.forEach(function(account) {

                        //Fields required for POST / PUT

                        expect(account.Code).to.be.a('string');
                        expect(account.Code).to.have.length.below(11);

                        expect(account.Name).to.not.equal("");
                        expect(account.Name).to.be.a('string');

                        expect(account.Type).to.not.equal("");
                        expect(account.Type).to.be.oneOf(accountTypes);

                        if (account.Type === "BANK") {
                            expect(account.BankAccountType).to.be.a('string');
                            expect(account.BankAccountType).to.be.oneOf(bankAccountTypes);

                            expect(account.BankAccountNumber).to.be.a('string');
                            expect(account.BankAccountNumber).to.not.equal("");

                            if (account.CurrencyCode) {
                                expect(account.CurrencyCode).to.be.a('string');
                                expect(account.CurrencyCode).to.not.equal("");
                            }
                        }

                        expect(account.Status).to.be.a('string');
                        expect(account.Status).to.be.oneOf(accountStatusCodes);

                        //Description is an optional field, when not provided it should be undefined.
                        if (account.Description) {
                            expect(account.Description).to.be.a('string');
                            expect(account.Description).to.have.length.below(4001);
                        } else {
                            expect(account.Description).to.be.undefined;
                        }

                        expect(account.TaxType).to.be.a('string');
                        expect(account.TaxType).to.not.equal("");

                        expect(account.EnablePaymentsToAccount).to.be.a('boolean');
                        expect(account.EnablePaymentsToAccount).to.not.be.undefined;

                        expect(account.ShowInExpenseClaims).to.be.a('boolean');
                        expect(account.ShowInExpenseClaims).to.not.be.undefined;

                        //Fields returned in the GET
                        expect(account.AccountID).to.not.equal("");
                        expect(account.Class).to.be.oneOf(accountClasses);

                        if (account.SystemAccount) {
                            expect(account.SystemAccount).to.not.equal("");
                            expect(account.SystemAccount).to.be.a('string');
                        }

                        if (account.ReportingCode) {
                            expect(account.ReportingCode).to.not.equal("");
                            expect(account.ReportingCode).to.be.a('string');
                        }

                        if (account.ReportingCodeName) {
                            expect(account.ReportingCodeName).to.not.equal("");
                            expect(account.ReportingCodeName).to.be.a('string');
                        }

                        expect(account.HasAttachments).to.be.a('boolean');
                        expect(account.HasAttachments).to.not.be.undefined;

                        expect(account.UpdatedDateUTC).to.not.equal("");
                        expect(account.UpdatedDateUTC).to.be.a('string');
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        //Create a new account
        //Get it, Update it, then delete it

        var testAccountId = "";
        var testAccountData = {
            Code: 'TEST',
            Name: 'Test account from Node SDK',
            Type: 'EXPENSE'
        };

        it('CREATE ONE', function(done) {
            this.timeout(10000);
            var account = currentApp.core.accounts.newAccount(testAccountData);

            account.save()
                .then(function(response) {
                    var thisAccount = response.entities[0];
                    expect(thisAccount.Code).to.equal(testAccountData.Code);
                    expect(thisAccount.Name).to.equal(testAccountData.Name);
                    expect(thisAccount.Type).to.equal(testAccountData.Type);
                    expect(thisAccount.BankAccountNumber).to.equal(testAccountData.BankAccountNumber);
                    //expect(thisAccount.Status).to.equal(testAccountData.Status);
                    //expect(thisAccount.Description).to.equal(testAccountData.Description);
                    expect(thisAccount.BankAccountType).to.equal(testAccountData.BankAccountType);
                    //expect(thisAccount.CurrencyCode).to.equal(testAccountData.CurrencyCode);
                    //expect(thisAccount.TaxType).to.equal(testAccountData.TaxType);
                    //expect(thisAccount.EnablePaymentsToAccount).to.equal(testAccountData.EnablePaymentsToAccount);
                    //expect(thisAccount.ShowInExpenseClaims).to.equal(testAccountData.ShowInExpenseClaims);

                    expect(thisAccount.AccountID).to.not.equal("");
                    testAccountId = thisAccount.AccountID;

                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('GET ONE', function(done) {
            this.timeout(10000);
            currentApp.core.accounts.getAccount(testAccountId)
                .then(function(account) {
                    expect(account.Code).to.equal(testAccountData.Code);
                    expect(account.Name).to.equal(testAccountData.Name);
                    expect(account.Type).to.equal(testAccountData.Type);
                    expect(account.BankAccountNumber).to.equal(testAccountData.BankAccountNumber);
                    //expect(account.Status).to.equal(testAccountData.Status);
                    //expect(account.Description).to.equal(testAccountData.Description);
                    expect(account.BankAccountType).to.equal(testAccountData.BankAccountType);
                    //expect(account.CurrencyCode).to.equal(testAccountData.CurrencyCode);
                    //expect(account.TaxType).to.equal(testAccountData.TaxType);
                    //expect(account.EnablePaymentsToAccount).to.equal(testAccountData.EnablePaymentsToAccount);
                    //expect(account.ShowInExpenseClaims).to.equal(testAccountData.ShowInExpenseClaims);

                    expect(account.AccountID).to.not.equal("");
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });

        });

        it('UPDATE ONE', function(done) {
            this.timeout(10000);
            currentApp.core.accounts.getAccount(testAccountId)
                .then(function(account) {
                    testAccountData.Name = "Updated from the SDK";
                    account.Name = testAccountData.Name;

                    account.save()
                        .then(function(response) {
                            var thisAccount = response.entities[0];
                            expect(thisAccount.Name).to.equal(testAccountData.Name);
                            done();
                        })
                        .fail(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        });
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('DELETE ONE', function(done) {
            this.timeout(10000);
            currentApp.core.accounts.deleteAccount(testAccountId)
                .then(function(response) {
                    expect(response.Status).to.equal("OK");
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

    });

    describe('invoices', function() {

        it('create invoice', function(done) {
            this.timeout(10000);
            var invoice = currentApp.core.invoices.newInvoice({
                Type: 'ACCREC',
                Contact: {
                    Name: 'Department of Testing'
                },
                DueDate: new Date().toISOString().split("T")[0],
                LineItems: [{
                    Description: 'Services',
                    Quantity: 2,
                    UnitAmount: 230,
                    AccountCode: '400'
                }]
            });
            invoice.save({ unitdp: 4 })
                .then(function(response) {

                    expect(response.entities).to.have.length.greaterThan(0);

                    var invoice = response.entities[0];
                    InvoiceID = invoice.InvoiceID;

                    expect(response.entities[0].InvoiceID).to.not.equal(undefined);
                    expect(response.entities[0].InvoiceID).to.not.equal("");

                    invoice.LineItems.forEach(function(lineItem) {
                        expect(lineItem.UnitAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
                    });

                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })

        it('get invoices', function(done) {
            this.timeout(10000);
            currentApp.core.invoices.getInvoices()
                .then(function(invoices) {
                    expect(invoices).to.have.length.greaterThan(0);

                    invoices.forEach(function(invoice) {
                        expect(invoice.InvoiceID).to.not.equal("");
                        expect(invoice.InvoiceID).to.not.equal(undefined);
                    });

                    done();
                })
                .fail(function(err) {
                    done(wrapError(err));
                })
        })
        it('get invoice', function(done) {
            this.timeout(10000);
            currentApp.core.invoices.getInvoice(InvoiceID)
                .then(function(invoice) {
                    expect(invoice.InvoiceID).to.not.equal("");
                    expect(invoice.InvoiceID).to.not.equal(undefined);
                    done();
                })
                .fail(function(err) {
                    done(wrapError(err));
                })
        })
        it('update invoice', function(done) {
            this.timeout(10000);
            currentApp.core.invoices.getInvoice(InvoiceID)
                .then(function(invoice) {
                    invoice.LineItems.push({
                        Description: 'Test',
                        Quantity: 1,
                        UnitAmount: 200,
                        AccountCode: '400'
                    })
                    invoice.Status = 'AUTHORISED'
                    invoice.save()
                        .then(function(response) {
                            expect(response.entities).to.have.length.greaterThan(0);

                            response.entities.forEach(function(invoice) {
                                expect(invoice.InvoiceID).to.not.equal("");
                                expect(invoice.InvoiceID).to.not.equal(undefined);
                            });
                            done();
                        })
                        .fail(function(err) {
                            done(wrapError(err));
                        })
                })
                .fail(function(err) {
                    done(wrapError(err));
                })
        })
    });

    describe('payments', function() {
        /* Please note that this test pays an invoice created in the previous tests */
        this.timeout(10000);
        it('Create Payment', function(done) {

            var payment = currentApp.core.payments.createPayment({
                Invoice: {
                    InvoiceID: InvoiceID
                },
                Account: {
                    Code: '090'
                },
                Date: new Date().toISOString().split("T")[0],
                Amount: '660'
            });

            payment.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);

                    PaymentID = response.entities[0].PaymentID;
                    expect(PaymentID).to.not.equal("");
                    expect(PaymentID).to.not.equal(undefined);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('Retrieve Payments', function(done) {
            currentApp.core.payments.getPayments()
                .then(function(payments) {
                    expect(payments).to.have.length.greaterThan(0);
                    payments.forEach(function(payment) {
                        expect(payment.PaymentID).to.not.equal(undefined);
                        expect(payment.PaymentID).to.not.equal("");
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('Retrieve Single Payment', function(done) {

            currentApp.core.payments.getPayment(PaymentID)
                .then(function(payment) {
                    expect(payment.PaymentID).to.not.equal("");
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('Update Payment', function(done) {

            var paymentToDelete = currentApp.core.payments.createPayment({
                PaymentID: PaymentID,
                Status: "DELETED"
            });

            paymentToDelete.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].Status).to.equal("DELETED");
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })

        });

        it('Delete Payment', function(done) {
            //NOT CURRENTLY SUPPORTED.
            //Use update Payment with Payment.Status = DELETED.
            this.skip();
        });

    });

    describe('bank transactions', function() {

        var sharedTransaction;

        it('creates a new transaction', function(done) {
            this.timeout(10000);
            var transaction = currentApp.core.bankTransactions.newBankTransaction({
                Type: "SPEND",
                Contact: {
                    Name: "Johnny McGibbons"
                },
                LineItems: [{
                    Description: 'Annual Bank Account Fee',
                    UnitAmount: 250,
                    AccountCode: '404'
                }],
                BankAccount: {
                    AccountID: "13918178-849A-4823-9A31-57B7EAC713D7"
                }
            });

            transaction.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].BankTransactionID).to.not.equal("");
                    expect(response.entities[0].BankTransactionID).to.not.equal(undefined);
                    sharedTransaction = response.entities[0].BankTransactionID;
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get (no paging)', function(done) {
            this.timeout(10000);
            currentApp.core.bankTransactions.getBankTransactions()
                .then(function(bankTransactions) {
                    expect(bankTransactions).to.have.length.greaterThan(0);
                    bankTransactions.forEach(function(bankTransaction) {
                        expect(bankTransaction.BankTransactionID).to.not.equal("");
                        expect(bankTransaction.BankTransactionID).to.not.equal(undefined);
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get by id', function(done) {
            this.timeout(10000);
            currentApp.core.bankTransactions.getBankTransaction(sharedTransaction)
                .then(function(bankTransaction) {
                    expect(bankTransaction.BankTransactionID).to.not.equal("");
                    expect(bankTransaction.BankTransactionID).to.not.equal(undefined);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });
    });

    describe('bank transfers', function() {

        this.timeout(20000);

        var sampleTransferID = "";

        it('create sample bank transfer', function(done) {
            this.timeout(10000);
            var transfer = currentApp.core.bankTransfers.newBankTransfer({
                FromBankAccount: {
                    Code: '090'
                },
                ToBankAccount: {
                    Code: '091'
                },
                Amount: '20.00'
            });
            transfer.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].BankTransferID).to.not.equal("");
                    expect(response.entities[0].BankTransferID).to.not.equal(undefined);

                    sampleTransferID = response.entities[0].BankTransferID;
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get (no paging)', function(done) {
            this.timeout(10000);
            currentApp.core.bankTransfers.getBankTransfers()
                .then(function(bankTransfers) {
                    _.each(bankTransfers, function(bankTransfer) {
                        expect(bankTransfer.BankTransferID).to.not.equal("");
                        expect(bankTransfer.BankTransferID).to.not.equal(undefined);
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get single bank transfer', function(done) {
            this.timeout(10000);
            currentApp.core.bankTransfers.getBankTransfer(sampleTransferID)
                .then(function(bankTransfer) {
                    expect(bankTransfer.BankTransferID).to.not.equal("");
                    expect(bankTransfer.BankTransferID).to.not.equal(undefined);
                    expect(bankTransfer.BankTransferID).to.equal(sampleTransferID);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

    });

    describe('tracking categories', function() {
        this.timeout(20000);

        var sampleTrackingCategory = {
            Name: "My First Category"
        };

        it('creates a tracking category', function(done) {

            var myTrackingCategory = currentApp.core.trackingCategories.newTrackingCategory(sampleTrackingCategory);

            myTrackingCategory.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].TrackingCategoryID).to.not.equal("");
                    expect(response.entities[0].TrackingCategoryID).to.not.equal(undefined);
                    expect(response.entities[0].Name).to.equal(sampleTrackingCategory.Name);
                    sampleTrackingCategory = response.entities[0];
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('creates some options for the tracking category', function(done) {

            var TrackingOptions = [{
                Name: "up"
            }, {
                Name: "down"
            }];

            sampleTrackingCategory.saveTrackingOptions(TrackingOptions)
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);

                    _.each(response.entities, function(trackingOption) {
                        expect(trackingOption.Name).to.not.equal("");
                        expect(trackingOption.Name).to.not.equal(undefined);
                        expect(trackingOption.Status).to.equal("ACTIVE")
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('updates one of the options for the tracking category', function(done) {

            var TrackingOptions = {
                Name: "left"
            };

            currentApp.core.trackingCategories.getTrackingCategory(sampleTrackingCategory.TrackingCategoryID)
                .then(function(trackingCategory) {
                    //console.log(response.Options[0].TrackingOptionID)

                    var optionIDtoUpdate = trackingCategory.Options[0].TrackingOptionID;

                    trackingCategory.saveTrackingOptions(TrackingOptions, optionIDtoUpdate)
                        .then(function(response) {
                            expect(response.entities).to.have.length.greaterThan(0);
                            expect(response.entities[0].Name).to.equal("left");
                            done();
                        })
                        .fail(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('deletes the tracking category', function(done) {
            currentApp.core.trackingCategories.deleteTrackingCategory(sampleTrackingCategory.TrackingCategoryID)
                .then(function(response) {
                    //console.log(response);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('Uses a tracking category on an invoice - REGION', function(done) {
            //Create an invoice with the sample tracking category attached to the line item on the invoice.
            var invoice = currentApp.core.invoices.newInvoice({
                Type: 'ACCREC',
                Contact: {
                    Name: 'Department of Testing'
                },
                DueDate: new Date().toISOString().split("T")[0],
                LineItems: [{
                    Description: 'Services',
                    Quantity: 2,
                    UnitAmount: 230,
                    AccountCode: '400',
                    Tracking: [{
                        TrackingCategory: {
                            Name: 'Region',
                            Option: 'North'
                        }
                    }]
                }]
            });
            invoice.save()
                .then(function(response) {

                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].InvoiceID).to.not.equal(undefined);
                    expect(response.entities[0].InvoiceID).to.not.equal("");

                    response.entities[0].LineItems.forEach(function(lineItem) {
                        expect(lineItem.Tracking).to.have.length.greaterThan(0);
                        _.each(lineItem.Tracking, function(trackingCategory) {
                            expect(trackingCategory.TrackingCategoryID).to.not.equal(undefined);
                            expect(trackingCategory.TrackingCategoryID).to.not.equal("");
                            expect(trackingCategory.TrackingOptionID).to.not.equal(undefined);
                            expect(trackingCategory.TrackingOptionID).to.not.equal("");
                            expect(trackingCategory.Name).to.equal('Region');
                            expect(trackingCategory.Option).to.equal('North');
                        });
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        //unfortunately this will only work on tracking categories that have been used.
        it.skip('archives a tracking category', function(done) {
            sampleTrackingCategory.Status = "ARCHIVED";

            sampleTrackingCategory.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].TrackingCategoryID).to.not.equal("");
                    expect(response.entities[0].TrackingCategoryID).to.not.equal(undefined);
                    expect(response.entities[0].Name).to.equal(sampleTrackingCategory.Name);
                    expect(response.entities[0].Status).to.equal(sampleTrackingCategory.Status);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });
    });

    describe('items', function() {
        this.timeout(10000);

        var sampleItem = {
            Code: 'Item-' + Math.random(),
            Name: 'Fully Tracked Item',
            Description: '2014 Merino Sweater',
            PurchaseDescription: '2014 Merino Sweater',
            PurchaseDetails: {
                UnitPrice: 149.00,
                AccountCode: '200'
            },
            SalesDetails: {
                UnitPrice: 299.00,
                AccountCode: '200'
            }
        };

        it('creates an item', function(done) {
            this.timeout(10000);

            var item = currentApp.core.items.newItem(sampleItem);

            item.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].ItemID).to.not.equal("");
                    expect(response.entities[0].ItemID).to.not.equal(undefined);
                    sampleItem.ItemID = response.entities[0].ItemID;
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('retrieves some items (no paging)', function(done) {
            this.timeout(10000);
            currentApp.core.items.getItems()
                .then(function(items) {
                    _.each(items, function(item) {
                        expect(item.ItemID).to.not.equal("");
                        expect(item.ItemID).to.not.equal(undefined);
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('retrieves an item by ID', function(done) {
            this.timeout(10000);

            currentApp.core.items.getItem(sampleItem.ItemID)
                .then(function(item) {
                    expect(item.ItemID).to.equal(sampleItem.ItemID);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('updates an item by ID', function(done) {
            this.timeout(10000);

            currentApp.core.items.getItem(sampleItem.ItemID)
                .then(function(item) {
                    expect(item.ItemID).to.equal(sampleItem.ItemID);

                    var randomName = "Updated " + Math.random();

                    item.Name = randomName;

                    item.save()
                        .then(function(response) {
                            expect(response.entities).to.have.length.greaterThan(0);
                            expect(response.entities[0].Name).to.equal(randomName);
                            done();
                        })
                        .fail(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('deletes an item', function(done) {
            this.timeout(10000);

            currentApp.core.items.deleteItem(sampleItem.ItemID)
                .then(function() {
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });
    });

    describe('contacts', function() {
        var sampleContact = {
            Name: 'Johnnies Coffee' + Math.random(),
            FirstName: 'John',
            LastName: 'Smith'
        };

        it('create single contact', function(done) {
            this.timeout(10000);
            var contact = currentApp.core.contacts.newContact(sampleContact);
            contact.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].ContactID).to.not.equal("");
                    expect(response.entities[0].ContactID).to.not.equal(undefined);
                    expect(response.entities[0].Name).to.equal(sampleContact.Name);
                    expect(response.entities[0].FirstName).to.equal(sampleContact.FirstName);
                    expect(response.entities[0].LastName).to.equal(sampleContact.LastName);

                    sampleContact = response.entities[0];

                    done();
                })
                .fail(function(err) {
                    console.log(err)
                    done(wrapError(err));
                })
        })

        it('get (no paging)', function(done) {
            this.timeout(10000);
            currentApp.core.contacts.getContacts()
                .then(function(contacts) {
                    _.each(contacts, function(contact) {
                        expect(contact.ContactID).to.not.equal("");
                        expect(contact.ContactID).to.not.equal(undefined);
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })
        it('get (paging)', function(done) {
            this.timeout(10000);
            currentApp.core.contacts.getContacts({ pager: { start: 1, callback: onContacts } })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })

            function onContacts(err, response, cb) {
                cb();
                try {
                    _.each(response.data, function(contact) {
                        expect(contact.ContactID).to.not.equal("");
                        expect(contact.ContactID).to.not.equal(undefined);
                    });

                    if (response.finished)
                        done();
                } catch (ex) {
                    console.log(util.inspect(err, null, null));
                    done(ex);
                    return;
                }

            }
        });

        it('get by id', function(done) {
            this.timeout(10000);
            currentApp.core.contacts.getContact(sampleContact.ContactID)
                .then(function(contact) {
                    expect(contact.ContactID).to.equal(sampleContact.ContactID);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })
        it('get - modifiedAfter', function(done) {
            this.timeout(100000);
            var modifiedAfter = new Date();
            currentApp.core.contacts.getContacts({ modifiedAfter: modifiedAfter })
                .then(function(contacts) {
                    _.each(contacts, function(contact) {
                        expect(contact.UpdatedDateUTC).to.not.equal("");
                        expect(contact.UpdatedDateUTC).to.not.equal(undefined);
                    })
                    done();

                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })

        })

        it('create multiple contacts', function(done) {
            this.timeout(10000);
            var contacts = [];
            contacts.push(currentApp.core.contacts.newContact({ Name: 'Johnnies Coffee' + Math.random(), FirstName: 'John' + Math.random(), LastName: 'Smith' }));
            contacts.push(currentApp.core.contacts.newContact({ Name: 'Johnnies Coffee' + Math.random(), FirstName: 'John' + Math.random(), LastName: 'Smith' }));
            currentApp.core.contacts.saveContacts(contacts)
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    _.each(response.entities, function(contact) {
                        expect(contact.ContactID).to.not.equal("");
                        expect(contact.ContactID).to.not.equal(undefined);
                    });
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })

        it('update contact', function(done) {
            this.timeout(10000);

            currentApp.core.contacts.getContact(sampleContact.ContactID)
                .then(function(contact) {
                    expect(contact.ContactID).to.equal(sampleContact.ContactID);

                    var newName = "Updated" + Math.random();

                    contact.Name = newName;
                    contact.EmailAddress = contact.FirstName + "." + contact.LastName + "@gmail.com";
                    contact.ContactPersons = [{
                        FirstName: "Johnny",
                        LastName: "Scribgibbons",
                        EmailAddress: "j.scribgib@gribbons.com",
                        IncludeInEmails: true
                    }];
                    contact.Addresses = [{
                        AddressLine1: "15 Scriby Street",
                        AddressLine2: "Preston",
                        AddressLine3: "Prestonville",
                        AddressLine4: "Scribeystanistan",
                        City: "Melbourne",
                        Region: "Victoria",
                        PostalCode: "3000",
                        Country: "Australia",
                        AttentionTo: "Johnny",
                        AddressType: "STREET"
                    }];
                    contact.save()
                        .then(function(updatedContact) {
                            expect(updatedContact.response.Contacts.Contact.Name).to.equal(newName);
                            done();
                        })
                        .fail(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })
        it('get attachments for contacts', function(done) {
            this.timeout(100000);

            currentApp.core.contacts.getContact(sampleContact.ContactID)
                .then(function(contact) {
                    expect(contact.ContactID).to.equal(sampleContact.ContactID);
                    contact.getAttachments()
                        .then(function(attachments) {
                            console.log(attachments);
                            done();
                        })
                        .fail(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });
    })

    describe('journals', function() {
        this.timeout(10000);

        var sampleJournalId = "";

        it('get (paging with callback)', function(done) {
            this.timeout(20000);
            currentApp.core.journals.getJournals({ pager: { start: 1, callback: onJournals } })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })

            var recordCount = 0;

            function onJournals(err, ret, cb) {
                cb();
                recordCount += ret.data.length;
                _.each(ret.data, function(journal) {
                    expect(journal.JournalID).to.not.equal("");
                    expect(journal.JournalID).to.not.equal(undefined);
                    expect(journal.JournalLines).to.have.length.greaterThan(0);
                });

                try {
                    if (ret.finished) {
                        console.log('Journals record count:' + recordCount)
                        done();
                    }
                } catch (ex) {
                    console.log(util.inspect(ex, null, null));
                    done(ex);
                    return;
                }
            }
        });

        it('get (paging no callback)', function(done) {
            this.timeout(20000);
            currentApp.core.journals.getJournals({ pager: { start: 1, callback: undefined } })
                .then(function(journals) {
                    expect(journals).to.not.equal(undefined);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get (no paging)', function(done) {
            this.timeout(20000);
            currentApp.core.journals.getJournals()
                .then(function(journals) {
                    expect(journals).to.not.equal(undefined);
                    expect(journals).to.be.an('Array');
                    expect(journals).to.have.length.greaterThan(0);

                    sampleJournalId = _.first(journals).JournalID;
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get single journal', function(done) {
            this.timeout(20000);
            currentApp.core.journals.getJournal(sampleJournalId)
                .then(function(journal) {
                    expect(journal).to.be.an('Object');
                    expect(journal.JournalID).to.equal(sampleJournalId);
                    done();
                })
                .fail(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });
    });

    describe('users', function() {
        this.timeout(20000);

        it('retrieves a list of users', function(done) {

            currentApp.core.users.getUsers()
                .then(function(users) {
                    done();
                })
                .fail(function(err) {
                    console.log(err)
                    done(wrapError(err));
                });
        });
    });

    //These tests aren't currently working.  Attachments are not yet supported.
    describe.skip('attachments', function() {
        this.timeout(20000);

        it('creates an attachment on an invoice', function(done) {

            /**
             * Attachments should work on the following endpoints:
             *  Invoices
             *  Receipts
             *  Credit Notes
             *  Repeating Invoices
             *  Bank Transactions
             *  Bank Transfers
             *  Contacts
             *  Accounts
             *  Manual Journals
             */

            var attachmentData = {
                FileName: "myimage.png",
                MimeType: "application/png"
            };

            var rawDataFile = __dirname + "/testdata/test-attachment.png";

            var attachmentPlaceholder = currentApp.core.attachments.newAttachment(attachmentData);

            currentApp.core.bankTransactions.getBankTransactions()
                .then(function(bankTransactions) {

                    expect(bankTransactions).to.have.length.greaterThan(0);

                    var sampleTransaction = bankTransactions[0];

                    attachmentPlaceholder.save("banktransactions/" + sampleTransaction.BankTransactionID, rawDataFile)
                        .then(function(response) {
                            console.log(response);
                            done();
                        })
                        .fail(function(err) {
                            console.log(err)
                            done(wrapError(err));
                        })

                    done();
                })
                .fail(function(err) {
                    console.log(err)
                    done(wrapError(err));
                })



        });
    });
});

function wrapError(err) {
    if (err instanceof Error)
        return err;
    else if (err.statusCode)
        return new Error(err.statusCode + ': ' + err.exception.Message);
}