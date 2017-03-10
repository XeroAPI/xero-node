const request = require('request');

function trackEvent(cid, entity, method, label, value, cb) {

    //Tracking can be disabled by setting the 'sendAnonymousUsageData' property to false in the app config
    //If this field is false, the cid is null so this method doesn't do anything.
    if (!cid) {
        return;
    }

    const data = {
        v: '1', // API Version.
        tid: 'UA-93438304-1', // Xero SDK Tracking ID
        ds: 'app',
        cid: cid,
        t: 'event',
        ec: entity,
        ea: method
    };

    request.post(
        'http://www.google-analytics.com/collect', {
            form: data
        },
        (err, response) => {
            if (err) {
                cb && cb(err);
                return;
            }
            if (response.statusCode !== 200) {
                cb && cb(new Error('GA Tracking failed'));
                return;
            }
            cb && cb();
        }
    );
}

module.exports.trackEvent = trackEvent;