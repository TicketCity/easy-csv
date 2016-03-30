'use strict';
const Promise = require('bluebird');

class CSV {
    constructor(){};
    
    /* ------------------------------------------------
    / @toJSON
    / @param {object} data - Object to be converted to CSV
    / @param {object} options - Optional settings for CSV conversion
    / @param {function} callback - Optional callback function
    / -----------------------------------------------*/
    static toCSV(data, options, callback) {
        return new Promise((resolve, reject) => {
            let useCallback = false;
            let opt = {};
            
            // figure out if there is a callback, and/or options being used
            if(isFunction(callback)) { useCallback = true; }    //if there is a callback function
            else if(!callback && isFunction(options)) {         //if there are no options and callback was passed as 2nd arg 
                callback = options;
                useCallback = true; 
            }
            
                
            let delimiter, endline, fields, fieldNames, settings;

            //if options exist, figure out what they are and set them accordingly
            (options && options.delimiter) ? delimiter = options.delimiter : delimiter = ",";
            (options && options.endline) ? endline = options.endline : endline = "\n";
            (options && options.fields) ? fields = options.fields : fields = Object.keys(data[0]);
            (options && options.fieldNames) ? fieldNames = options.fieldNames : fieldNames = fields;
            
            
            settings = {delimiter, endline, fields, fieldNames};
            
            //call recursive csv string builder
            convertRows(data, settings)
                .then(csv => {
                    if(useCallback){ resolve(callback(null, csv)); } //return via callback
                    else{ resolve(csv); } //resolve via promise
                })
                .catch(err => {
                    if(useCallback){ reject(callback(err)); } //return via callback
                    else{ reject(err); } //resolve via promise
                });            
        });
    }; //end toJSON
    
}; //end class
module.exports = CSV;

// -----------------------------------------------------------
// PRIVATE FUNCTIONS
// -----------------------------------------------------------
 
 /* ---------------------------------------------------
 / @isfunction
 / @param {object} object - should be the callback function, if one exists
 / --------------------------------------------------*/
 const isFunction = function(object) {
    let classCheck = {}.toString;
    return object && classCheck.call(object).toString() == '[object Function]';
 }; // end isFunction
 
  /* ---------------------------------------------------
 / @isArray
 / @param {object} object - should be the field names, if one exists
 / --------------------------------------------------*/
 const isArray = function(object) {
     let classCheck = {}.toString;
     return object && classCheck.call(object).toString() == '[object Array]';
 }; // end isFunction
 
 /* ---------------------------------------------------
 / @convertRows
 / @param {object} row - init recursive json object to convert to csv row
 / ---------------------------------------------------*/
 const convertRows = function(data, settings) {
     let csv;
     if(settings.fieldNames && isArray(settings.fieldNames)){ csv = settings.fieldNames.join(settings.delimiter) + settings.endline; }
     
     return new Promise((resolve, reject) => {
        recurseRows(csv, data, settings, (err, csv) => {
            if(err) { reject(err); }
            else { resolve(csv); }
        });
     });
 }; //end makeRows
 
 /* ---------------------------------------------------
 / @recurseRows
 / @param {object} row - init recursive json object to convert to csv row
 / ---------------------------------------------------*/
 const recurseRows = function(csv, data, settings, callback) {
    let obj = data.shift();
    let row;
    let count = settings.fields.length;

    for(let x = 0; x < count ; x++) {
        let field = settings.fields[x];
        if(x === 0) { row = obj[field] }
        else { 
            if( obj[field] === null || obj[field] === undefined ) {row = row + settings.delimiter + "";}
            else if( isNaN(1 * obj[field]) ) {row = row + settings.delimiter + "\"" + obj[field] + "\"";} //text in row
            else{ row = row + settings.delimiter + obj[field]; }
        }
        
        if(x === count - 1) {
            row = row + settings.endline;
            csv = csv + row;
            data.length > 0 ? recurseRows(csv, data, settings, callback) : callback(null, csv);
        }
    };
 } //end recurse rows