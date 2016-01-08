var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');

// Authenticate via OAuth
var client = tumblr.createClient({
  consumer_key: 'UWT987Y6ihAzIEmmfCO4gDtVsWCnxK8vMsnLWCqjW8VZYrBioT',
  consumer_secret: 'OkacE2HKLn8PBxoeAK7fOoBUjAynCSk20kR6Vsli4wDR1GAmpN',
  token: 'owm87wgzH1AEUlaUu6hZLZGCpEIiNXmklbezz2AAkYV3ngrXMx',
  token_secret: 'N5dkILqYcgSuY4sxnk3uH3WkaQ0G8QMJB4RKacxwQibr12GNbC'
});

var latestPosts = [];
//caculate today - 7 days
var sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//add latest blog posts to latestPosts array
client.posts('jerbobbo.tumblr.com', function(err, blog){
	for(var i=0; i < blog.posts.length; i++) {
		//get date of blog post
		var blogDate = new Date(blog.posts[i].date);
		//if post is within 7 days, add post to latestPosts
		if (blogDate >= sevenDaysAgo) {
			latestPosts.push(blog.posts[i]);
		}
		
	}
	//create custom emails for each contact in csv file
	custEmail(csvParse("friend_list.csv"));
})

//Contact constructor
function Contact(contactArray) {
	this.firstName = contactArray[0];
	this.lastName = contactArray[1];
	this.numMonthsSinceContact = contactArray[2];
	this.emailAddress = contactArray[3];
	this.latestPosts = latestPosts;
}

//create custom email for each contact in array
function custEmail(contactArr) {
	//read email template
	var emailTemplate = fs.readFileSync("./email_template.ejs", "utf8");
	//iterate through contactArr and render email template using data
	//from each contact object
	for(var i = 0; i < contactArr.length; i++) {
		var customEmail = ejs.render(emailTemplate,contactArr[i]);
		//printing each email html to console instead of actual mailing 
		//emails using Mandrill
		console.log(customEmail);
	}
	
}

//parse csv file and return array of contacts
function csvParse(nameOfFile){
	//read csv file
	var csvFile = fs.readFileSync(nameOfFile,"utf8");
	//create array with each line from file as element
	var fileArr = csvFile.split("\n");
	var csvData = [];
	//create contact object for each contact and add to csvData
	for (var i = 1; i < fileArr.length; i++) {
		//create array from contact data on one line, which is delimeted 
		//by commas
		var contactArr = fileArr[i].split(",");
		//if contact name isn't blank create new contact using Contact 
		//constructor and push to csvData array
		if (contactArr[0] !== "") {
			var newContact = new Contact(contactArr);
			csvData.push(newContact);
		}
		
	}
	return csvData;

}


