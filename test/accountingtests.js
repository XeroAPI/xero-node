var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    sinon = require('sinon'),
    _ = require('lodash'),
    xero = require('..'),
    util = require('util'),
    Browser = require('zombie'),
    uuid = require('uuid'),
    fs = require('fs'),
    metaConfig = require('./config/testing_config.json');

process.on('uncaughtException', function(err) {
    console.log('uncaught', err)
})

var currentApp;
var eventReceiver;
var organisationCountry = '';

var APPTYPE = metaConfig.APPTYPE;
var config = metaConfig[APPTYPE.toLowerCase()];

if (config.privateKeyPath && !config.privateKey) config.privateKey = fs.readFileSync(config.privateKeyPath);

before('init instance and set options', function(done) {
    switch (APPTYPE) {
        case "PRIVATE":
            currentApp = new xero.PrivateApplication(config);
            break;
        case "PUBLIC":
            currentApp = new xero.PublicApplication(config);
            break;
        case "PARTNER":
            currentApp = new xero.PartnerApplication(config);
            break;
        default:
            throw "No App Type Set!!"
    }

    eventReceiver = currentApp.eventEmitter;

    done();
})

describe('get access for public or partner application', function() {
    beforeEach(function() {
        if (APPTYPE === "PRIVATE") {
            this.skip();
        }
    });

    describe('Get tokens', function() {
        var authoriseUrl = "";
        var requestToken = "";
        var requestSecret = "";
        var verifier = "";

        var accessToken = "";
        var accessSecret = "";

        //This function is used by the event emitter to receive the event when the token
        //is automatically refreshed.  We use the 'spy' function so that we can include 
        //some checks within the tests.
        var spy = sinon.spy(function() {
            console.log("Event Received. Creating new Partner App");

            //Create a new application object when we receive new tokens
            currentApp = new xero.PartnerApplication(config);
            currentApp.setOptions(arguments[0]);
            //Reset the event receiver so the listener stack is shared correctly.
            eventReceiver = currentApp.eventEmitter;
            eventReceiver.on('xeroTokenUpdate', function(data) { console.log("Event Received: ", data); });

            console.log("Partner app recreated");
        });

        it('adds the event listener', function(done) {
            eventReceiver.on('xeroTokenUpdate', spy);
            done();
        });

        it('user gets a token and builds the url', function() {
            return currentApp.getRequestToken()
                .then(function(res) {
                    requestToken = res.token;
                    requestSecret = res.secret;
                    authoriseUrl = currentApp.buildAuthorizeUrl(requestToken);
                    console.log("URL: " + authoriseUrl);
                    console.log("token: " + requestToken);
                    console.log("secret: " + requestSecret);
                });
        });

        describe('gets the request token from the url', function() {
            var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7';
            const browser = new Browser({
                userAgent: user_agent,
                waitFor: 20000,
                runScripts: false
            });

            //browser.debug();

            before(function(done) {
                if (APPTYPE === "PRIVATE") {
                    this.skip();
                }

                browser.visit(authoriseUrl, done);
            });

            describe('submits form', function() {
                var options = {
                    XeroUsername: config.xeroUsername,
                    XeroPassword: config.xeroPassword
                };

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

                    if (APPTYPE === "PUBLIC") {
                        browser.pressButton("Allow access for 30 mins");
                    } else {
                        //It must be a partner app
                        browser.pressButton("Allow access");
                    }

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
            it('calls the access token method and sets the options', function(done) {
                currentApp.setAccessToken(requestToken, requestSecret, verifier)
                    .then(function() {
                        expect(currentApp.options.accessToken).to.not.equal(undefined);
                        expect(currentApp.options.accessToken).to.not.equal("");
                        expect(currentApp.options.accessSecret).to.not.equal(undefined);
                        expect(currentApp.options.accessSecret).to.not.equal("");

                        if (APPTYPE === "PARTNER") {
                            expect(currentApp.options.sessionHandle).to.not.equal(undefined);
                            expect(currentApp.options.sessionHandle).to.not.equal("");
                        }

                        done();
                    }).catch(function(err) {
                        done(wrapError(err));
                    });
            });

            it('refreshes the token', function(done) {
                if (APPTYPE !== "PARTNER") {
                    this.skip();
                }

                //Only supported for Partner integrations
                currentApp.refreshAccessToken()
                    .then(function() {
                        expect(currentApp.options.accessToken).to.not.equal(undefined);
                        expect(currentApp.options.accessToken).to.not.equal("");
                        expect(currentApp.options.accessSecret).to.not.equal(undefined);
                        expect(currentApp.options.accessSecret).to.not.equal("");
                        expect(currentApp.options.sessionHandle).to.not.equal(undefined);
                        expect(currentApp.options.sessionHandle).to.not.equal("");

                        expect(spy.called).to.equal(true);
                        done();
                    }).catch(function(err) {
                        done(wrapError(err));
                    });
            });
        });
    });
});


describe('reporting tests', function() {
    this.timeout(10000);
    it('Generates a Balance Sheet Report', function(done) {
        currentApp.core.reports.generateReport({ id: 'BalanceSheet' })
            .then(function(report) {
                expect(report.ReportType).to.equal('BalanceSheet');
                expect(report.ReportName).to.equal('Balance Sheet');

                validateRows(report.Rows);

                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    it('Generates a Bank Statement Report', function(done) {
        currentApp.core.reports.generateReport({
                id: 'BankStatement',
                params: {
                    bankAccountID: '13918178-849a-4823-9a31-57b7eac713d7'
                }
            })
            .then(function(report) {
                expect(report.ReportType).to.equal('BankStatement');
                expect(report.ReportName).to.equal('Bank Statement');

                validateRows(report.Rows);

                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    it('Generates a Trial Balance Report', function(done) {
        currentApp.core.reports.generateReport({
                id: 'TrialBalance'
            })
            .then(function(report) {
                expect(report.ReportType).to.equal('TrialBalance');
                expect(report.ReportName).to.equal('Trial Balance');
                validateRows(report.Rows);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    it('Generates a Profit and Loss Report', function(done) {
        currentApp.core.reports.generateReport({
                id: 'ProfitAndLoss'
            })
            .then(function(report) {
                expect(report.ReportType).to.equal('ProfitAndLoss');
                expect(report.ReportName).to.equal('Profit and Loss');
                validateRows(report.Rows);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    it('Generates a Budget Summary Report', function(done) {
        currentApp.core.reports.generateReport({
                id: 'BudgetSummary'
            })
            .then(function(report) {
                expect(report.ReportType).to.equal('BudgetSummary');
                expect(report.ReportName).to.equal('Budget Summary');
                validateRows(report.Rows);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    it('Generates an Executive Summary Report', function(done) {
        currentApp.core.reports.generateReport({
                id: 'ExecutiveSummary'
            })
            .then(function(report) {
                expect(report.ReportType).to.equal('ExecutiveSummary');
                expect(report.ReportName).to.equal('Executive Summary');
                validateRows(report.Rows);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    it('Generates a Bank Summary Report', function(done) {
        currentApp.core.reports.generateReport({
                id: 'BankSummary'
            })
            .then(function(report) {
                expect(report.ReportType).to.equal('BankSummary');
                expect(report.ReportName).to.equal('Bank Summary');
                validateRows(report.Rows);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    it('Generates an Aged Receivables Report', function(done) {
        currentApp.core.reports.generateReport({
                id: 'AgedReceivablesByContact',
                params: {
                    contactId: '58697449-85ef-46ae-83fc-6a9446f037fb'
                }
            })
            .then(function(report) {
                expect(report.ReportType).to.equal('AgedReceivablesByContact');
                expect(report.ReportName).to.equal('Aged Receivables By Contact');
                validateRows(report.Rows);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    it('Generates an Aged Payables Report', function(done) {
        currentApp.core.reports.generateReport({
                id: 'AgedPayablesByContact',
                params: {
                    contactId: '58697449-85ef-46ae-83fc-6a9446f037fb'
                }
            })
            .then(function(report) {
                expect(report.ReportType).to.equal('AgedPayablesByContact');
                expect(report.ReportName).to.equal('Aged Payables By Contact');
                validateRows(report.Rows);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done(wrapError(err));
            })

    });

    function validateRows(rows) {
        expect(rows).to.have.length.greaterThan(0);
        rows.forEach(function(row) {
            expect(row.RowType).to.be.oneOf(['Header', 'Section', 'Row', 'SummaryRow']);

            //Each row can have some cells, each cell should have some data.
            if (row.Cells) {
                validateCells(row);
            }

            if (row.Rows && row.Rows.length > 0) {
                row.Rows.forEach(function(thisRow) {
                    validateCells(thisRow);
                })
            }

            function validateCells(row) {
                expect(row.Cells).to.have.length.greaterThan(0);
                row.Cells.forEach(function(cell) {
                    //each cell can either be a string or an object
                    expect(cell).to.not.equal(undefined);
                    expect(cell).to.satisfy(function(c) { return typeof c === "string" || typeof c === "object" });
                });
            }

        });
    }

})

describe('regression tests', function() {
    var InvoiceID = "";
    var PaymentID = "";

    var bankAccounts = [];

    before('create a bank account', function() {
        const randomString = uuid.v4();

        var testAccountData = {
            Code: randomString.replace(/-/g, '').substring(0, 10),
            Name: 'Test account from Node SDK ' + randomString,
            Type: 'BANK',
            BankAccountNumber: '062-021-0000000',
        };

        var account = currentApp.core.accounts.newAccount(testAccountData);

        return account.save()
            .then(function(response) {
                var account = response.entities[0];
                bankAccounts.push({
                    account: account,
                    id: account.AccountID
                });
            });
    });

    before('create another bank account', function() {
        const randomString = uuid.v4();

        var testAccountData = {
            Code: randomString.replace(/-/g, '').substring(0, 10),
            Name: 'Test account from Node SDK ' + randomString,
            Type: 'BANK',
            BankAccountNumber: '062-021-0000000',
        };

        var account = currentApp.core.accounts.newAccount(testAccountData);

        return account.save()
            .then(function(response) {
                var account = response.entities[0];
                bankAccounts.push({
                    account: account,
                    id: account.AccountID
                });
            });
    });

    // There appears to be no way to archive a bank account via the API so deleting instead
    after('delete the test accounts', function() {

        bankAccounts.forEach(function(account) {

            currentApp.core.accounts.deleteAccount(account.id)
                .then(function(response) {
                    expect(response.Status).to.equal("OK");
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

    });

    describe('organisations', function() {
        it('get', function(done) {
            currentApp.core.organisations.getOrganisation()
                .then(function(ret) {

                    var orgVersions = ["AU", "NZ", "GLOBAL", "UK", "US"];
                    expect(ret.Name).to.not.equal("");
                    expect(ret.Version).to.not.equal("");
                    expect(ret.Version).to.be.oneOf(orgVersions);

                    organisationCountry = ret.Version;

                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    done(wrapError(err));
                })
        })
    })

    describe('branding themes', function() {

        var brandingThemeID = "";

        it('get', function(done) {
            currentApp.core.brandingThemes.getBrandingThemes()
                .then(function(brandingThemes) {
                    expect(brandingThemes).to.have.length.greaterThan(0);
                    brandingThemes.forEach(function(brandingTheme) {
                        expect(brandingTheme.BrandingThemeID).to.not.equal(undefined);
                        expect(brandingTheme.BrandingThemeID).to.not.equal("");
                        expect(brandingTheme.Name).to.not.equal(undefined);
                        expect(brandingTheme.Name).to.not.equal("");

                        brandingThemeID = brandingTheme.BrandingThemeID;
                    });
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    done(wrapError(err));
                })
        });

        it('get by ID', function(done) {
            currentApp.core.brandingThemes.getBrandingTheme(brandingThemeID)
                .then(function(brandingTheme) {

                    expect(brandingTheme.BrandingThemeID).to.not.equal(undefined);
                    expect(brandingTheme.BrandingThemeID).to.not.equal("");
                    expect(brandingTheme.Name).to.not.equal(undefined);
                    expect(brandingTheme.Name).to.not.equal("");

                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    done(wrapError(err));
                })
        })
    })

    describe('taxRates', function() {

        var createdTaxRate;

        it('gets tax rates', function(done) {
            currentApp.core.taxRates.getTaxRates()
                .then(function(taxRates) {
                    // This test requires that some tax rates are set up in the targeted company
                    expect(taxRates).to.have.length.greaterThan(0);
                    _.each(taxRates, function(taxRate) {
                        expect(taxRate.Name).to.not.equal("");
                        expect(taxRate.Name).to.not.equal(undefined);
                        expect(taxRate.TaxType).to.not.equal("");
                        expect(taxRate.TaxType).to.not.equal(undefined);
                        expect(taxRate.CanApplyToAssets).to.be.oneOf([true, false]);
                        expect(taxRate.CanApplyToEquity).to.be.oneOf([true, false]);
                        expect(taxRate.CanApplyToExpenses).to.be.oneOf([true, false]);
                        expect(taxRate.CanApplyToLiabilities).to.be.oneOf([true, false]);
                        expect(taxRate.CanApplyToRevenue).to.be.oneOf([true, false]);
                        expect(taxRate.DisplayTaxRate).to.be.a('Number');
                        expect(taxRate.Status).to.be.oneOf(['ACTIVE', 'DELETED', 'ARCHIVED']);
                        expect(taxRate.TaxComponents).to.have.length.greaterThan(0);

                        _.each(taxRate.TaxComponents, function(taxComponent) {
                            expect(taxComponent.Name).to.not.equal("");
                            expect(taxComponent.Name).to.not.equal(undefined);
                            expect(taxComponent.Rate).to.be.a('String');
                            //Hacked to a string as the framework doesn't recursively translate nested objects
                            expect(taxComponent.IsCompound).to.be.oneOf(["true", "false"]);
                        });
                    });
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    done(wrapError(err));
                })
        });

        it('creates a new tax rate', function(done) {
            var taxrate = {
                Name: '20% GST on Expenses',
                TaxComponents: [{
                    Name: 'GST',
                    Rate: 20.1234,
                    IsCompound: false
                }],
                ReportTaxType: 'INPUT'
            }

            var taxRate = currentApp.core.taxRates.newTaxRate(taxrate);

            taxRate.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    createdTaxRate = response.entities[0];

                    expect(createdTaxRate.Name).to.equal(taxrate.Name);
                    expect(createdTaxRate.TaxType).to.match(/TAX[0-9]{3}/);
                    expect(createdTaxRate.CanApplyToAssets).to.be.oneOf([true, false]);
                    expect(createdTaxRate.CanApplyToEquity).to.be.oneOf([true, false]);
                    expect(createdTaxRate.CanApplyToExpenses).to.be.oneOf([true, false]);
                    expect(createdTaxRate.CanApplyToLiabilities).to.be.oneOf([true, false]);
                    expect(createdTaxRate.CanApplyToRevenue).to.be.oneOf([true, false]);
                    expect(createdTaxRate.DisplayTaxRate).to.equal(taxrate.TaxComponents[0].Rate);
                    expect(createdTaxRate.EffectiveRate).to.equal(taxrate.TaxComponents[0].Rate);
                    expect(createdTaxRate.Status).to.equal('ACTIVE');
                    expect(createdTaxRate.ReportTaxType).to.equal(taxrate.ReportTaxType);

                    createdTaxRate.TaxComponents.forEach(function(taxComponent) {
                        expect(taxComponent.Name).to.equal(taxrate.TaxComponents[0].Name);

                        //This is hacked toString() because of: https://github.com/jordanwalsh23/xero-node/issues/13
                        expect(taxComponent.Rate).to.equal(taxrate.TaxComponents[0].Rate.toString());
                        expect(taxComponent.IsCompound).to.equal(taxrate.TaxComponents[0].IsCompound.toString());
                    });
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    done(wrapError(err));
                })
        });

        it('updates the taxrate to DELETED', function(done) {

            createdTaxRate.delete()
                .then(function(response) {
                    expect(response.entities).to.have.lengthOf(1);
                    expect(response.entities[0].Status).to.equal("DELETED");
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    done(wrapError(err));
                })

        });

    });

    describe('accounts', function() {

        //Accounts supporting data
        var accountClasses = ["ASSET", "EQUITY", "EXPENSE", "LIABILITY", "REVENUE"];
        var accountTypes = ["BANK", "CURRENT", "CURRLIAB", "DEPRECIATN", "DIRECTCOSTS", "EQUITY", "EXPENSE", "FIXED", "INVENTORY", "LIABILITY", "NONCURRENT", "OTHERINCOME", "OVERHEADS", "PREPAYMENT", "REVENUE", "SALES", "TERMLIAB", "PAYGLIABILITY", "SUPERANNUATIONEXPENSE", "SUPERANNUATIONLIABILITY", "WAGESEXPENSE", "WAGESPAYABLELIABILITY"];
        var accountStatusCodes = ["ACTIVE", "ARCHIVED"];
        var bankAccountTypes = ["BANK", "CREDITCARD", "PAYPAL"];

        it('GET ALL', function(done) {
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        //Create a new account
        //Get it, Update it, then delete it

        const randomString = uuid.v4();

        var testAccountId = "";
        var testAccountData = {
            Code: randomString.replace(/-/g, '').substring(0, 10),
            Name: 'Test account from Node SDK ' + randomString,
            Type: 'EXPENSE'
        };

        it('CREATE ONE', function(done) {
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('GET ONE', function(done) {
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });

        });

        it('UPDATE ONE', function(done) {
            currentApp.core.accounts.getAccount(testAccountId)
                .then(function(account) {
                    testAccountData.Name = "Updated from the SDK " + uuid.v4();
                    account.Name = testAccountData.Name;

                    account.save()
                        .then(function(response) {
                            var thisAccount = response.entities[0];
                            expect(thisAccount.Name).to.equal(testAccountData.Name);
                            done();
                        })
                        .catch(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        });
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('DELETE ONE', function(done) {
            currentApp.core.accounts.deleteAccount(testAccountId)
                .then(function(response) {
                    expect(response.Status).to.equal("OK");
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

    });

    describe('invoices', function() {
        it('create invoice', function(done) {
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })

        it('get invoices', function(done) {
            currentApp.core.invoices.getInvoices()
                .then(function(invoices) {
                    expect(invoices).to.have.length.greaterThan(0);

                    invoices.forEach(function(invoice) {
                        expect(invoice.InvoiceID).to.not.equal("");
                        expect(invoice.InvoiceID).to.not.equal(undefined);
                    });

                    done();
                })
                .catch(function(err) {
                    done(wrapError(err));
                })
        })
        it('get invoice', function(done) {
            currentApp.core.invoices.getInvoice(InvoiceID)
                .then(function(invoice) {
                    expect(invoice.InvoiceID).to.not.equal("");
                    expect(invoice.InvoiceID).to.not.equal(undefined);
                    done();
                })
                .catch(function(err) {
                    done(wrapError(err));
                })
        })
        it('update invoice', function(done) {
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
                        .catch(function(err) {
                            done(wrapError(err));
                        })
                })
                .catch(function(err) {
                    done(wrapError(err));
                })
        });

        it('saves multiple invoices', function(done) {
            var invoices = [];

            for (var i = 0; i < 10; i++) {
                invoices.push(currentApp.core.invoices.newInvoice({
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
                }));
            }

            currentApp.core.invoices.saveInvoices(invoices)
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(9);
                    done();
                })
                .catch(function(err) {
                    done(wrapError(err));
                })

        });
    });

    describe('payments', function() {
        /* Please note that this test pays an invoice created in the previous tests */

        var testAccountId;
        var testAccountCode;
        var testAccount;

        before('create an account to pay into', function() {
            const randomString = uuid.v4();

            var testAccountData = {
                Code: randomString.replace(/-/g, '').substring(0, 10),
                Name: 'Test account from Node SDK ' + randomString,
                Type: 'SALES',
                EnablePaymentsToAccount: true
            };

            testAccountCode = testAccountData.Code;

            var account = currentApp.core.accounts.newAccount(testAccountData);

            return account.save()
                .then(function(response) {
                    var account = response.entities[0];
                    testAccountId = account.AccountID;
                    testAccount = account;
                });
        });

        after('archive the test account', function() {
            testAccount.Status = 'ARCHIVED';
            return testAccount.save();
        });

        it('Create Payment', function(done) {

            var payment = currentApp.core.payments.createPayment({
                Invoice: {
                    InvoiceID: InvoiceID
                },
                Account: {
                    Code: testAccountCode
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
                .catch(function(err) {
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
                .catch(function(err) {
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
                .catch(function(err) {
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
                .catch(function(err) {
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
                    AccountID: bankAccounts[0].id
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get (no paging)', function(done) {
            currentApp.core.bankTransactions.getBankTransactions()
                .then(function(bankTransactions) {
                    expect(bankTransactions).to.have.length.greaterThan(0);
                    bankTransactions.forEach(function(bankTransaction) {
                        expect(bankTransaction.BankTransactionID).to.not.equal("");
                        expect(bankTransaction.BankTransactionID).to.not.equal(undefined);
                    });
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get by id', function(done) {
            currentApp.core.bankTransactions.getBankTransaction(sharedTransaction)
                .then(function(bankTransaction) {
                    expect(bankTransaction.BankTransactionID).to.not.equal("");
                    expect(bankTransaction.BankTransactionID).to.not.equal(undefined);
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });
    });

    describe('bank transfers', function() {
        var sampleTransferID = "";

        it('create sample bank transfer', function(done) {
            var transfer = currentApp.core.bankTransfers.newBankTransfer({
                FromBankAccount: {
                    Code: bankAccounts[0].account.Code,
                },
                ToBankAccount: {
                    Code: bankAccounts[1].account.Code,
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get (no paging)', function(done) {
            currentApp.core.bankTransfers.getBankTransfers()
                .then(function(bankTransfers) {
                    _.each(bankTransfers, function(bankTransfer) {
                        expect(bankTransfer.BankTransferID).to.not.equal("");
                        expect(bankTransfer.BankTransferID).to.not.equal(undefined);
                    });
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get single bank transfer', function(done) {
            currentApp.core.bankTransfers.getBankTransfer(sampleTransferID)
                .then(function(bankTransfer) {
                    expect(bankTransfer.BankTransferID).to.not.equal("");
                    expect(bankTransfer.BankTransferID).to.not.equal(undefined);
                    expect(bankTransfer.BankTransferID).to.equal(sampleTransferID);
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

    });

    describe('tracking categories', function() {
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
                .catch(function(err) {
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
                .catch(function(err) {
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
                        .catch(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                })
                .catch(function(err) {
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('Uses a tracking category on an invoice - REGION', function() {
            // TODO refactor this setup and teardown into hooks
            // Create the tracking category

            var trackingCategory = currentApp.core.trackingCategories.newTrackingCategory({
                Name: uuid.v4()
            });

            var trackingCategoryName;
            var trackingCategoryID;

            return trackingCategory.save()
                .then(function(response) {
                    trackingCategoryName = response.entities[0].Name;
                    trackingCategoryID = response.entities[0].TrackingCategoryID;
                    return response.entities[0].saveTrackingOptions([
                        { Name: "North" },
                        { Name: "South" },
                    ])
                })
                .then(function(response) {
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
                                    Name: trackingCategoryName,
                                    Option: 'North'
                                }
                            }]
                        }]
                    });
                    return invoice.save()
                        .then(function(response) {

                            expect(response.entities).to.have.length.greaterThan(0);
                            expect(response.entities[0].InvoiceID).to.not.equal(undefined);
                            expect(response.entities[0].InvoiceID).to.not.equal("");

                            response.entities[0].LineItems.forEach(function(lineItem) {
                                //expect(lineItem.Tracking).to.have.length.greaterThan(0);
                                _.each(lineItem.Tracking, function(trackingCategory) {
                                    expect(trackingCategory.TrackingCategoryID).to.not.equal(undefined);
                                    expect(trackingCategory.TrackingCategoryID).to.not.equal("");
                                    expect(trackingCategory.TrackingOptionID).to.not.equal(undefined);
                                    expect(trackingCategory.TrackingOptionID).to.not.equal("");
                                    expect(trackingCategory.Name).to.equal(trackingCategory.Name);
                                    expect(trackingCategory.Option).to.equal('North');
                                });
                            });
                            return currentApp.core.trackingCategories.deleteTrackingCategory(trackingCategoryID)
                        })
                        .catch(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                });
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });
    });

    describe('items', function() {
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
            var item = currentApp.core.items.newItem(sampleItem);

            item.save()
                .then(function(response) {
                    expect(response.entities).to.have.length.greaterThan(0);
                    expect(response.entities[0].ItemID).to.not.equal("");
                    expect(response.entities[0].ItemID).to.not.equal(undefined);
                    sampleItem.ItemID = response.entities[0].ItemID;
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('retrieves some items (no paging)', function(done) {
            currentApp.core.items.getItems()
                .then(function(items) {
                    _.each(items, function(item) {
                        expect(item.ItemID).to.not.equal("");
                        expect(item.ItemID).to.not.equal(undefined);
                    });
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('retrieves an item by ID', function(done) {
            currentApp.core.items.getItem(sampleItem.ItemID)
                .then(function(item) {
                    expect(item.ItemID).to.equal(sampleItem.ItemID);
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('updates an item by ID', function(done) {
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
                        .catch(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });

        it('deletes an item', function(done) {
            currentApp.core.items.deleteItem(sampleItem.ItemID)
                .then(function() {
                    done();
                })
                .catch(function(err) {
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
                .catch(function(err) {
                    console.log(err)
                    done(wrapError(err));
                })
        })

        it('get (no paging)', function(done) {
            currentApp.core.contacts.getContacts()
                .then(function(contacts) {
                    _.each(contacts, function(contact) {
                        expect(contact.ContactID).to.not.equal("");
                        expect(contact.ContactID).to.not.equal(undefined);
                    });
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })
        it('get (paging)', function(done) {
            currentApp.core.contacts.getContacts({ pager: { start: 1, callback: onContacts } })
                .catch(function(err) {
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
            currentApp.core.contacts.getContact(sampleContact.ContactID)
                .then(function(contact) {
                    expect(contact.ContactID).to.equal(sampleContact.ContactID);
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })
        it('get - modifiedAfter', function(done) {
            var modifiedAfter = new Date();
            currentApp.core.contacts.getContacts({ modifiedAfter: modifiedAfter })
                .then(function(contacts) {
                    _.each(contacts, function(contact) {
                        expect(contact.UpdatedDateUTC).to.not.equal("");
                        expect(contact.UpdatedDateUTC).to.not.equal(undefined);
                    })
                    done();

                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })

        })

        it('create multiple contacts', function(done) {
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
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })

        it('update contact', function(done) {
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
                        .catch(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        })
        it('get attachments for contacts', function(done) {
            currentApp.core.contacts.getContact(sampleContact.ContactID)
                .then(function(contact) {
                    expect(contact.ContactID).to.equal(sampleContact.ContactID);
                    contact.getAttachments()
                        .then(function(attachments) {
                            console.log(attachments);
                            done();
                        })
                        .catch(function(err) {
                            console.log(util.inspect(err, null, null));
                            done(wrapError(err));
                        })
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                });
        });
    })

    describe('journals', function() {
        var sampleJournalId = "";

        it('get (paging with callback)', function(done) {
            currentApp.core.journals.getJournals({ pager: { start: 1, callback: onJournals } })
                .catch(function(err) {
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
            currentApp.core.journals.getJournals({ pager: { start: 1, callback: undefined } })
                .then(function(journals) {
                    expect(journals).to.not.equal(undefined);
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get (no paging)', function(done) {
            currentApp.core.journals.getJournals()
                .then(function(journals) {
                    expect(journals).to.not.equal(undefined);
                    expect(journals).to.be.an('Array');
                    expect(journals).to.have.length.greaterThan(0);

                    sampleJournalId = _.first(journals).JournalID;
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });

        it('get single journal', function(done) {
            currentApp.core.journals.getJournal(sampleJournalId)
                .then(function(journal) {
                    expect(journal).to.be.an('Object');
                    expect(journal.JournalID).to.equal(sampleJournalId);
                    done();
                })
                .catch(function(err) {
                    console.log(util.inspect(err, null, null));
                    done(wrapError(err));
                })
        });
    });

    describe('users', function() {
        it('retrieves a list of users', function(done) {

            currentApp.core.users.getUsers()
                .then(function(users) {
                    done();
                })
                .catch(function(err) {
                    console.log(err)
                    done(wrapError(err));
                });
        });
    });

    //These tests aren't currently working.  Attachments are not yet supported.
    describe.skip('attachments', function() {
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
                        .catch(function(err) {
                            console.log(err)
                            done(wrapError(err));
                        })

                    done();
                })
                .catch(function(err) {
                    console.log(err)
                    done(wrapError(err));
                })



        });
    });


});

function wrapError(err) {
    if (err instanceof Error)
        return err;
    else if (err.statusCode) {
        var msg = err.data;
        if (err.exception && err.exception.Message) {
            msg = err.exception.Message;
        }
        return new Error(err.statusCode + ': ' + msg);
    }
}