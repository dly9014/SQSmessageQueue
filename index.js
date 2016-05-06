var QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/431311541923/TestQueue';
var AWS = require('aws-sdk');
var sqs = new AWS.SQS();

exports.handler = function(event, context) {
	// event is the input JSON
	console.log('starting function');
	var params = {
		MessageBody: JSON.stringify(event),
		QueueUrl: QUEUE_URL
	};
  
 
	sqs.sendMessage(params, function(err,data){
		if(err) {
			console.log('error:',"Fail Send Message" + err);
			context.done('error', "ERROR Put SQS");  // ERROR with message
		} else {
			console.log('data:',data.MessageId);
			//context.done(null,'');  // SUCCESS 
		};
	});


  
	sqs.receiveMessage({
		QueueUrl: QUEUE_URL,
		MaxNumberOfMessages: 3, // how many messages do we wanna retrieve?
		VisibilityTimeout: 20, // seconds - how long we want a lock on this job
		WaitTimeSeconds: 3 // seconds - how long should we wait for a message?
	}, function(err, data) {
		// If there are any messages to get
		if (data.Messages) {
			console.log('data.Messages = ' + JSON.stringify(data.Messages));
			// Get the first message (should be the only one since we said to only get one above)
			console.log('data.Messages[0] = ' + JSON.stringify(data.Messages[0]));
			var message = data.Messages[0];
			var body = JSON.parse(message.Body);
			// Now this is where you'd do something with this message
			console.log('message body = ' + JSON.stringify(body));  // whatever you wanna do
			// Clean up after yourself... delete this message from the queue, so it's not executed again
			//removeFromQueue(message);  // We'll do this in a second
		};
	});
  
};