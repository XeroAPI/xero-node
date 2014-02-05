var should = require('should')
    , _ = require('lodash')
    , xero = require('..')
    , util = require('util')

process.on('uncaughtException', function(err)
{
    console.log('uncaught',err)
})

var currentApp;

describe('private application', function ()
{

    describe('create instance', function ()
    {
        it('init instance and set options', function ()
        {
            currentApp = new xero.PrivateApplication({ consumerKey: 'NPAE62F9LLFDWMB0HMJA0MERC9EJGR', consumerSecret:'BVGO4E7TQTZIGJWQPXN7DPFJJJSXLP',
                privateKeyPath:'./cert/private/privatekey.pem'});
        })
    })

    describe('organisations', function()
    {
        it.skip('get', function(done)
        {
            this.timeout(10000);
            currentApp.core.organisations.getOrganisation()
                .then(function(ret)
                {
                    console.log(ret.toObject({all:true}));
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
    })

    describe('contacts', function()
    {
        it.skip('get by id', function(done)
        {
            this.timeout(10000);
            currentApp.core.contacts.getContact('16c56769-c3c8-4dad-bd40-523f83bfe017')
                .then(function(ret)
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it.skip('get (no paging)', function(done)
        {
            this.timeout(10000);
            currentApp.core.contacts.getContacts()
                .then(function(ret)
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it.skip('get (paging)', function(done)
        {
            this.timeout(10000);
            currentApp.core.contacts.getContacts({ pager: {start:1, callback:onContacts}})
                .fail(function(err)
                {
                    done(wrapError(err));
                })

            function onContacts(err, response, cb)
            {
                cb();
                try
                {
                    response.data.length.should.equal(44,'Unexpected number of contacts returned');
                    if (response.finished)
                        done();
                }
                catch(ex)
                {
                    done(ex);
                    return;
                }

            }
        })
        it.skip('get - modifiedAfter', function(done)
        {
            this.timeout(10000);
            var modifiedAfter = new Date();
            currentApp.core.contacts.getContacts({ modifiedAfter: modifiedAfter })
                .then(function(contacts)
                {
                    _.each(contacts,  function(contact)
                    {
                        contact.UpdatedDateUTC.should.be.above(modifiedAfter);
                    })
                    done();

                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })

        })

    })

    describe('bank transactions', function()
    {
        it.skip('get by id', function(done)
        {
            this.timeout(10000);
            currentApp.core.bankTransactions.getBankTransaction('63d47b99-e1ef-4b46-84db-034f2205f8fb')
                .then(function(ret)
                {
                    console.log(util.inspect(ret.toObject(),null,null));
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it.skip('get (no paging)', function(done)
        {
            this.timeout(10000);
            currentApp.core.bankTransactions.getBankTransactions()
                .then(function(ret)
                {
                    console.log('Bank Transactions: ' + ret.length);
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })

    });

    describe('journals', function()
    {
        it('get (paging)', function(done)
        {
            this.timeout(10000);
            currentApp.core.journals.getJournals({ pager: {start:1, callback:onJournals}})
                .fail(function(err)
                {
                    done(wrapError(err));
                })

            var recordCount = 0;
            function onJournals(err, response, cb)
            {
                cb();
                recordCount += response.data.length;
                var firstRecord = _.first(response.data);
                if (firstRecord)
                    console.log(util.inspect(firstRecord.toObject(),null,null))
                try
                {

                    if (response.finished)
                    {
                        console.log('Journals record count:' + recordCount)
                        done();
                    }

                }
                catch(ex)
                {
                    done(ex);
                    return;
                }

            }
        })

    });
});

function wrapError(err)
{
    if (err instanceof Error)
        return err;
    else
        return new Error(err.statusCode);
}