var charts = (function() {
    var that = {};
    var elem = {};
    var countries = {};
    var salaries = {};
    var tableData = [];

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
                console.log(countryCode + ":" + name);
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
                        console.log(webDevData.salary_percentiles);
                    } else {
                        salaries[countryCode] = {percentile_25: 0, percentile_50: 0, percentile_75: 0};
                        console.log("no salary data available for: " + countryCode);
                    }
                    var sal = salaries[countryCode];
                    var rowData = [
                        countries[countryCode], 
                        Math.round(sal.percentile_25), 
                        Math.round(sal.percentile_50), 
                        Math.round(sal.percentile_75)
                    ];
                    tableData.push(rowData);
                    var row = elem.salaryTable.insertRow(-1); //-1 to add at end
                    for(var d = 0; d < 4; d++) {
                        var cell = row.insertCell(d);
                        cell.innerHTML = rowData[d];
                    }
                    if(rxCount >= count) {
                        console.log(JSON.stringify(tableData));
                    }
                });
            }
        });
    }

    return that;
}());