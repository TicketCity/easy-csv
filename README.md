# Easy-CSV

Easy-CSV is a simple JSON-to-CSV node module. You can use customer delimiters, endline chars, field names, fields, or just use the out-of-the-box defaults. Only one method, .toCSV, accepts a valid JSON array as input.

**Will only Node v4.0 and greater.**

### To get started:
```sh
$npm install easy-csv
```

Then use the module either using Node conventional err first callbacks, or using bluebird.js promises:
```js
//using callbacks
let CSV = require('easy-csv');
let data = [{some: "data", number: 1}];
CSV.toJSON(data, function(err, csv) {
    if(err) { //do something with any errors }
    else{ console.log(csv) } // some,number
                             // data,1
});

//using promises
let CSV = require('easy-csv');
let data = [{some: "data", number: 1}];
CSV.toCSV(data)
    .then(csv => {
        //some, number
        //data, 1
    })
    .catch(err => {
        //do something with the error
    });
```

### Options
The available options are easy to use and should be fairly straight-forward
* delimiter: <String> The character that will be inserted between JSON values in a CSV row. Default: ','.
* endline: <String> The character(s) that will be inserted to denote the end of the CSV row. Default: '\n' .
* fields: <Array: String> The Object keys used that pertain to the JSON values. Default: The object keys from the first index.
* fieldNames: <Array: String> The header names to be used in the first CSV row. Default: Same as the fields array.


Options example:
```js
let options = {
    delimiter: '|', //will use pipes between values within CSV row
    endline: '\n\r', //will end all CSV rows (except last) with \n\r instead of \n 
    fields: ['some', 'number'], //will only insert values matching to attributes 'some' and 'number'
    fieldNames: ['First', 'Second'] //will make CSV headers be 'First,Second'
};
```


### Testing
A handful of tests exist for 'happy path' uses. They can be run from the command line by navigating to the module directory and running:
```sh
$ npm run test
```

Thanks in advance for reporting any issues or bugs!
[TicketCity](ticketcity.com)