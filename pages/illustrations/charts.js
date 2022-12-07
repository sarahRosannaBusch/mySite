var charts = (function() {
    var that = {};
    var elem = {};
    var countries = {};
    var salaries = {};
    var tableData = [];
    var sortMask = [1,1,1,1];

    that.init = function() {
        elem.salaryTable = f.html.getElem("#webDevSalaries");
        var file = "https://api.teleport.org/api/countries/";
        f.ajax.get(file, function(res) {
            res = JSON.parse(res);
            //console.log(res);
            var count = res.count;
            var rxCount = 0;
            for(var i = 0; i < count; i++) {
                var name = res._links["country:items"][i].name;
                var countryCode = res._links["country:items"][i].href.slice(-3, -1);
                countries[countryCode] = name;
                //console.log(countryCode + ":" + name);
                var salaryAPI = `https://api.teleport.org/api/countries/iso_alpha2:${countryCode}/salaries/`;
                f.ajax.get(salaryAPI, (salaryData) => {
                    rxCount++;
                    salaryData = JSON.parse(salaryData);
                    //console.log(salaryData);
                    var webDevIdx = salaryData.salaries.length - 1;
                    var webDevData = salaryData.salaries[webDevIdx];
                    var countryCode = salaryData._links.self.href.slice(-12, -10);
                    if(webDevData?.job?.id === "WEB-DEVELOPER") {
                        salaries[countryCode] = webDevData.salary_percentiles;
                        //console.log(webDevData.salary_percentiles);                        
                        var sal = salaries[countryCode];
                        var rowData = [
                            countries[countryCode], 
                            Math.round(sal.percentile_25), 
                            Math.round(sal.percentile_50), 
                            Math.round(sal.percentile_75)
                        ];
                        tableData.push(rowData);
                        _addRows(rowData);
                    } else {
                        //salaries[countryCode] = {percentile_25: 0, percentile_50: 0, percentile_75: 0};
                        //console.log("no salary data available for: " + countryCode);
                    }
                    if(rxCount >= count) {
                        //we have all the data now
                        //console.log(JSON.stringify(tableData));
                        var sortIds = ["country", "low", "med", "high"];
                        var numCols = sortIds.length;
                        for(var c = 0; c < numCols; c++) {
                            var buttonId = sortIds[c];
                            elem["sort_" + buttonId] = f.html.getElem("#" + buttonId);
                            elem["sort_" + buttonId].onclick = function() {
                                console.log("sort by " + this.id);
                                f.html.empty(elem.salaryTable);
                                var col = sortIds.indexOf(this.id);
                                var ascending = (sortMask[col] > 0) ? true : false;
                                tableData.sort(function(a, b) {
                                    //sort function derived from https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
                                    if (a[col] === b[col]) {
                                        return 0;
                                    } else {
                                        if(ascending) {
                                            return (a[col] < b[col]) ? -1 : 1;
                                        } else {               
                                            return (a[col] > b[col]) ? -1 : 1;  
                                        }
                                    }
                                });
                                sortMask[col] *= -1;
                                //console.log(JSON.stringify(tableData));
                                var len = tableData.length;
                                for(var n = 0; n < len; n++) {
                                    var rowData = tableData[n];
                                    _addRows(rowData);
                                }
                            }
                        }
                    }
                });
            }
        });
        function _addRows(rowData) {
            var row = elem.salaryTable.insertRow(-1); //-1 to add at end
            for(var d = 0; d < 4; d++) {
                var cell = row.insertCell(d);
                cell.innerHTML = rowData[d];
            }
        }
    }

    return that;
}());