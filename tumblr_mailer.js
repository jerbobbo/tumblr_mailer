var fs = require('fs');

function contact(contactArray) {
	this.firstName = contactArray[0];
	this.lastName = contactArray[1];
	this.numMonthsSinceContact = contactArray[2];
	this.emailAddress = contactArray[3];
}

function custEmail(contactArr) {
	for(var i = 0; i < contactArr.length; i++) {
		var custEmail = fs.readFileSync("./email_template.html","utf8");
		custEmail = custEmail.replace("FIRST_NAME", contactArr[i].firstName);
		custEmail = custEmail.replace("NUM_MONTHS_SINCE_CONTACT", contactArr[i].numMonthsSinceContact);
		console.log(custEmail);
	}
	
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

custEmail(csvParse("friend_list.csv"));
