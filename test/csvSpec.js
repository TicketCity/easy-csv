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
            let expected = fs.readFileSync('./test/docs/promise.csv');
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
        
        it("Should handle large Obj array.", (done) => {
            let expected = fs.readFileSync('./test/docs/large.csv');
            let test = require('./docs/test.json');
            let fields = ["venueId", "venueName", "setupId", "setupName", "sectionId", "name", "row", "prestigeScore", "viewScore", "comfortScore", "rowScore", 
                        "prestigeWeight", "viewWeight", "comfortWeight", "seatScore", "latitude", "longitude", "elevation", "geographic", "sun", 
                        "homeOrVisitor", "closestEntry", "concessions", "SseatType", "parking", "notes"];
            let fieldNames =     ["Venue_ID", "VenueName", "Setup_ID", "SetupName", "Section_ID", "Name", "Row", "Prestige_Score", "View_Score", "Comfort_Score", "Row_Score", "Prestige_Weight", 
                        "View_Weight", "Comfort_Weight", "Seat_Score", "Latitude",	"Longitude", "Elevation", "Geographic position", "Position relative to sun", 
                        "Relative to home/visitor/stage", "Closest entry/exit game", "Concessions closest accessible", "Seat Type", "Closest Parking", "Notes"];
            
            CSV.toCSV(test, {fields, fieldNames})
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