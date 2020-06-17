# REACT Developer Recruitment

We are hiring REACT developers. To apply, please develop a basic version of the Document Template Utility. Please read the README document in detail. For questions, please submit as issues in the repo.

# Milestone 1

A basic REACT app. When the app renders, it should read the HelpingHandContactTemplate.pdf file.
It should then replace {{doc.firstname}} with "Joe". At this point, hard coding is fine.
The app should generate a new PDF and  trigger a download to the user's computer.

The goal of milestone 1 is to make sure the contractor has basic understanding of how to manipulate PDF files.

# Document Template Utility

The goal of the document Template Utility is to take a MS-Word or PDF as a template and fill in data from a JSON document, and generate a new PDF document.

The document template utility should be a REACT application. 
All required libraries must be able to run natively on web browsers.

### Examples:

See `HelpingHandContactTemplate.docx` and `HelpingHandContactTemplate.pdf` 

The template contains handle-bar style fields for data to be filled in from the JSON document.

```
{
	"doc":
	{
	"firstname": "Joe",
	"lastname": "Gen",
	"email": "jg@hand.com",
	"phone": "123-123-1234",
...
```


For sample: {{doc.firstname}} should be filled in with “Joe”

### Output:
The basic goal of the utility is to generate a new PDF document with data from the JSON document.
User should be able to download the generated PDF file.

## Contribution
Interseted parties should clone the reposity and submit pull-request

Follow this guide for the basics:
[https://github.com/firstcontributions/first-contributions]



