var fs = require('fs');

function contact(contactArray) {
	this.firstName = contactArray[0];
	this.lastName = contactArray[1];
	this.numMonthsSinceContact = contactArray[2];
	this.emailAddress = contactArray[3];
}

function csvParse(nameOfFile){
	var csvFile = fs.readFileSync(nameOfFile,"utf8");
	//create array with each line from file as element
	var fileArr = csvFile.split("\n");
	var csvData = [];
	//create contact object for each contact and add to csvData
	for (var i = 1; i < fileArr.length; i++) {
		var contactArr = fileArr[i].split(",");
		if (contactArr[0] !== "") {
			var newContact = new contact(contactArr);
			csvData.push(newContact);
		}
		
	}
	return csvData;

}

console.log(csvParse("friend_list.csv"));