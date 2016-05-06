del SQSlambda.zip 
7z a -r SQSlambda.zip * 
aws lambda update-function-code --function-name mySQSTest --zip-file fileb://SQSlambda.zip
