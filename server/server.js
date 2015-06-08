Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	
});

Meteor.methods({
	"delete-dish": function(idInput){
		MonAn.remove({_id: idInput});
	},
	"createUserFromAdmin":function(emailInput, passwordInput, usernameInput){

    	Accounts.createUser({email: emailInput, password : passwordInput, profile: { name: usernameInput}});
        console.log("Ok");
        //Accounts.createUser({email:email,password:password,username:username})
  	},
	"updateLichAn" : function( userIdInput, monthInput, listDayReInput){
		LichAn.update({userId: userIdInput, month: monthInput},{$set: {userId: userIdInput, month: monthInput, listDayRe: listDayReInput}},{ upsert: true });
		console.log("add LichAn 0k");
	},
	// create menu
	"updateMenu" : function(dateInput, listDishInput){
		ThucDon.insert({dateI : dateInput, listDish: listDishInput});
		console.log("addMenu ok");
	},
	// if menu exist update menu
	"updateOldMenu" : function(dateInput, listDishInput){
		// ThucDon.remove({dateI: dateInput},{justOne: false});
		// ThucDon.insert({dateI : dateInput, listDish: listDishInput});
		ThucDon.update({dateI: dateInput},{$set: { listDish: listDishInput}},{multi: false })
		// ThucDon.update({dateI: dateInput},{dateI : dateInput, listDish: listDishInput},{multi: true });
		console("update Ok")
	},
	"addDish": function(nameInput, costInput, imageInput, componentsInput){
		MonAn.insert({name : nameInput, cost: costInput, image: imageInput, components: componentsInput});
		console.log("addDish ok");
	},
	"createUserAccount": function(options) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		var userOptions = {};		
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;
		if(options.profile && options.profile.email) userOptions.email = options.profile.email;

		Accounts.createUser(userOptions);
	},
	"updateUserAccount": function(userId, options) {
		// only admin or users own profile
		if(!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		// non-admin user can change only profile
		if(!Users.isAdmin(Meteor.userId())) {
			var keys = Object.keys(options);
			if(keys.length !== 1 || !options.profile) {
				throw new Meteor.Error(403, "Access denied.");
			}
		}

		var userOptions = {};		
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;

		if(options.profile && options.profile.email) userOptions.email = options.profile.email;
		if(options.roles) userOptions.roles = options.roles;

		if(userOptions.email) {
			var email = userOptions.email;
			delete userOptions.email;
			userOptions.emails = [{ address: email }];
		}

		var password = "";
		if(userOptions.password) {
			password = userOptions.password;
			delete userOptions.password;
		}

		if(userOptions) {
			Users.update(userId, { $set: userOptions });
		}

		if(password) {
			Accounts.setPassword(userId, password);
		}
	},

	"sendMail": function(options) {
		this.unblock();

		Email.send(options);
	}
});

Accounts.onCreateUser(function (options, user) {
	user.roles = [];

	if(options.profile) {
		user.profile = options.profile;
	}

	

	return user;
});

Accounts.validateLoginAttempt(function(info) {

	// reject users with role "blocked"
	if(info.user && Users.isInRole(info.user._id, "blocked")) {
		throw new Meteor.Error(403, "Your account is blocked.");
	}

	return true;
});


Users.before.insert(function(userId, doc) {
	if(doc.emails && doc.emails[0] && doc.emails[0].address) {
		doc.profile = doc.profile || {};
		doc.profile.email = doc.emails[0].address;
	}
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
	if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
		modifier.$set.profile.email = modifier.$set.emails[0].address;
	}
});

Accounts.onLogin(function (info) {
	
});

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset_password/' + token);
};
