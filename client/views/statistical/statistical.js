
var pageSession = new ReactiveDict();

Template.Statistical.rendered = function() {
	
};

Template.Statistical.events({
	'click #show': function(e, t){
		var date = t.find('#date').value.trim();
		// LichAn.find({})
		var usercheckstemp = Users.find().fetch()
		pageSession.set("userchecks", usercheckstemp);
	}
});

Template.Statistical.helpers({
	getToday: function(){
        var now = new Date();
        var month = (now.getMonth() + 1);               
        var day = now.getDate();
        if(month < 10) 
            month = "0" + month;
        if(day < 10) 
            day = "0" + day;
        var today =  now.getFullYear()+ '-' +  month + '-' + day ;
        return today;
    },
    userchecks: function(){
    	return pageSession.get("userchecks");
    }
});

Template.usercheck.events({
	'click .check': function(e, t) {
		// var date = t.find('#date').value.trim();
		// alert(this._id);
		if ( $(event.target).is(':checked')) {
			 // alert("haha")
			// dishChosen.push(this._id);
			// alert(dishChosen)
		} else{
			// for(var i =0; i<dishChosen.length; i++){
			// 	if(dishChosen[i]=== this._id){
			// 		dishChosen.splice(i, 1);
			// 	}
			// }
			// alert(dishChosen)
			// alert("hehe")
		}	
	}
});