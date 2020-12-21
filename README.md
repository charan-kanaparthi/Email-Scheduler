git clone repository

run "npm install"

please change db credentials in config.json file 

run "npm start"

Routes 


GET /emails: will return the list of emails in our system
GET /emails:?filter=unsent return the list of unsent emails in our system
GET /emails:?filter=failed return the list of failed in our system

POST /emails: will create a new email in our system

sample raw request  
{
"to":"kvenkatcharan@gmail.com",
"subject":"test",
"body":"schedule",
"scheduled_at":"2020-12-22 00:55"
}

GET /emails/[id]: will return the email  with the given id

PUT /emails/[id]: will update the data for the email  with the given id

sample put:
{
"scheduled_at":"2020-12-22 01:13",
"status":"pending",
"subject": "hello",
"body": "schedule"
}

DELETE /emails/[id]: will delete the email  with the given id  ( soft delete  updating status)