var should = require('should'),
    _ = require('lodash'),
    xero = require('..');

process.on('uncaughtException', function(err)
{
})

describe('private application', function ()
{

    var privateApp;

    describe('create instance', function ()
    {
        it('init instance and set options', function ()
        {
            privateApp = new xero.PrivateApplication({ consumerKey: 'NPAE62F9LLFDWMB0HMJA0MERC9EJGR', consumerSecret:'BVGO4E7TQTZIGJWQPXN7DPFJJJSXLP',
                privateKeyPath:'./cert/private/privatekey.pem'});
        })

        it('get entity', function(done)
        {
            this.timeout(10000);
            privateApp.get('Organisation')
                .then(function(response)
                {
                    done();
                })
                .fail(function(err)
                {
                    throw new Error(err.statusCode);
                    done(err);
                })
        })

        it('get organisation', function(done)
        {
            privateApp.core.organisations.getOrganisation()
                .then(function(ret)
                {
                    console.log(ret.toObject({all:true}));
                    done();
                })
                .fail(function(err)
                {
                    done(err);
                })

        })
    })

});
