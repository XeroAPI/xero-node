Partner Applications have the ability to refresh Access Tokens.

This is achieved two ways.

1. Explicitly using `refreshAccessToken`
2. The SDK will also automatically refresh expired tokens

For both of these methods you will need to store the result. This will allow you to reinitialize the SDK with the appropriate options.

To know when it happens automatically you will need to subscribe to the `xeroTokenUpdate` event. Below is an example of how to do that.

```
let eventReceiver = xeroClient.eventEmitter;

eventReceiver.on('xeroTokenUpdate', function(data) {
   //Store the data that was received from the xeroTokenRefresh event
});
```

