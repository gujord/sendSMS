let AWS = require('aws-sdk');
const sns = new AWS.SNS();
exports.handler = function (event, context, callback) {

	let receiver = event['receiver'];
	let sender = event['sender'];
	let message = event['message'];

	let isPromotional = true;

	console.log("Sending message", message, "to receiver", receiver);

	sns.publish({
		Message: message,
		MessageAttributes: {
			'AWS.SNS.SMS.SMSType': {
				DataType: 'String',
				StringValue: 'Promotional'
			},
			'AWS.SNS.SMS.SenderID': {
				DataType: 'String',
				StringValue: sender
			},
		},
		PhoneNumber: receiver
	}).promise()
		.then(data => {
			// your code goes here
		})
		.catch(err => {
			// error handling goes here
		});

	callback(null, 'Successfully executed');
}