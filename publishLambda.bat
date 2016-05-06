del SQSlambda.zip 
7z a -r SQSlambda.zip index.js
aws lambda update-function-code --function-name mySQSTest --zip-file fileb://SQSlambda.zip
