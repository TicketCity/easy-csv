'use strict';
const should = require('should');
const CSV    = require('../easy-csv');
const fs     = require('fs');

describe("#CSV Tests", () => {
    
    describe("+ Test with valid object", () => {
        
        it("Should work with no settings, callback.", (done) => {
            let expected = fs.readFileSync('./test/docs/test.csv');
            let test = [{ name: "chevy", make: "silverado", year: 2016 },
                        { name: "ford",  make: "f-150", year: 2016 }];

            CSV.toCSV(test, (err, csv) => {
                should.not.exist(err);
                should.exist(csv);
                should.equal(csv, expected);
                done();
            });
        }); //end happy path, callback
        
        it("Should work with delimiter settings, callback.", (done) => {
            let expected = fs.readFileSync('./test/docs/delimited.csv');
            let test = [{ name: "chevy", make: "silverado", year: 2016 },
                        { name: "ford",  make: "f-150", year: 2016 }];

            CSV.toCSV(test, {delimiter: "|"}, (err, csv) => {
                should.not.exist(err);
                should.exist(csv);
                should.equal(csv, expected);
                done();
            });
        }); //end delimited path, callback
        
        it("Should work with no settings, promise.", (done) => {
            let expected = fs.readFileSync('./test/docs/test.csv');
            let test = [{ name: "chevy", make: "silverado", year: 2016 },
                        { name: "ford",  make: "f-150", year: 2016 }];

            CSV.toCSV(test)
                .then(csv => {
                    should.exist(csv);
                    should.equal(csv, expected);
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        
        it("Should work with fieldNames, promise.", (done) => {
            let expected = fs.readFileSync('./test/docs/fieldNames.csv');
            let test = [{ name: "chevy", make: "silverado", year: 2016 },
                        { name: "ford",  make: "f-150", year: 2016 }];
            let fieldNames = ["Make", "Model", "Year"];
            
            CSV.toCSV(test, {fieldNames})
                .then(csv => {
                    should.exist(csv);
                    should.equal(csv, expected);
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        
    }); //end test with valid objects
   
    
});