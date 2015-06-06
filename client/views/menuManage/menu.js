var dishChosen = [];
var hahahaha = ["TxCn4GSiotAXjG5eE","fLyRTzzNjhffNHZiD","9NLC9JakrDkLqjJLS"]
// var date = "2015-05-31";

var pageSession = new ReactiveDict();
// var dishinkitchen = MonAn.find({_id: { $nin: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
// pageSession.set("alldish", dishinkitchen);
var getMonan = function(){
    	return MonAn.find({_id: { $nin: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
    }
Template.ManageMenu.rendered = function() {
	
};

Template.ManageMenu.events({
	'click #save': function(e, t){
		var date = t.find('#date').value.trim();
		var dishtemp = ThucDon.findOne({dateI : date});
		// var dishtempL = dishtemp.listDish;
		var today = new Date(date);
		var yesterday = new Date();
		var tomorrow= new Date();
		yesterday .setTime(today.getTime() - (24 * 60 * 60 * 1000));
		tomorrow.setTime(today.getTime() + (24 * 60 * 60 * 1000));
		//mon an cua ngay mai
		/// kiem tra trung lap thuc don
		var dishOfTomorrowl = [];
		var dishOfTomorrow = [];

		var yesterdayDate = (yesterday.getDate()<10)?("0"+yesterday.getDate()):yesterday.getDate();
		var yesterdayMonth = (yesterday.getMonth()+1<10)?("0"+(yesterday.getMonth()+1)):(yesterday.getMonth()+1);
		var tomorrowDate = (tomorrow.getDate()<10)?("0"+tomorrow.getDate()):tomorrow.getDate();
		var tomorrowMonth = (tomorrow.getMonth()+1<10)?("0"+(tomorrow.getMonth()+1)):(tomorrow.getMonth()+1);
		var yesterdayString = yesterday.getFullYear() + "-" + yesterdayMonth + "-" +  yesterdayDate  ;
		var tomorrowString =tomorrow.getFullYear() + "-" + tomorrowMonth + "-" + tomorrowDate;

		// var yesterdayString = yesterday.getFullYear() +"-" + (yesterday.getMonth() + 1)+"-"+yesterday.getDate();
		// var tomorrowString = tomorrow.getFullYear() +"-" + (tomorrow.getMonth() + 1)+"-"+tomorrow.getDate();
		dishOfTomorrowl = ThucDon.findOne({dateI: tomorrowString});
		if (dishOfTomorrowl!=null)
			dishOfTomorrow = dishOfTomorrowl.listDish;
		var disctemp = dishChosen.sort();
		if(dishChosen.length === dishOfTomorrow.length&& dishOfTomorrow.length!=0){

			var disotemp = dishOfTomorrow.sort();
			var checktemp = false;
			for (var i = 0; i < disotemp.length; i++) {
				if(disotemp[i] != disctemp[i]){
					checktemp = true;
				}
			};
			if(!checktemp){
				alert("Oops,you have the same menu tomorrow!!!")
				return false;	
			}
			
		}

		var dishOfYesterdayl = [];
		var dishOfYesterday = [];
		dishOfYesterdayl = ThucDon.findOne({dateI: yesterdayString});
		if(dishOfYesterdayl !=null)
			dishOfYesterday = dishOfYesterdayl.listDish;

		if(dishChosen.length === dishOfYesterday.length){
			var disotemp = dishOfYesterday.sort();
			var checktemp = false;
			for (var i = 0; i < disotemp.length; i++) {
				if(disotemp[i] != disctemp[i]){
					checktemp = true;
				}
			};
			if(!checktemp){
				alert("Oops,you have the same menu yesterday!!!")
				return false;	
			}
			
		}

		if(dishtemp==null){
			Meteor.call('updateMenu', date, dishChosen);
		}else{
			Meteor.call('updateOldMenu', date, dishChosen);
		}
	},
	'click #show' : function(e, t){
		// when click show button if it have menu with this day------------------------------------------
		//  show menu else show white page
		dishChosen.splice(0, dishChosen.length);
		var date = t.find('#date').value.trim();
		var menuday = ThucDon.findOne({dateI : date});
		if (menuday == null) {
			pageSession.set("dishChosentemp", '');
		}else{
			dishChosen = menuday.listDish;
			// alert(dishChosen);
	    	var dishinday =  MonAn.find({_id: { $in: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
	    	pageSession.set("dishChosentemp", dishinday);	
		}

		var dishinkitchen=  MonAn.find({_id: { $nin: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
		pageSession.set("alldish", dishinkitchen);
	}
});

Template.ManageMenu.helpers({
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
	hehe: function(){
		var date = t.find('#date').value.trim();
		// alert(date);
	}
});

Template.alldish.helpers({
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
	alldish: function(){
    	// return MonAn.find({_id: { $nin: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
    	return pageSession.get("alldish");
    }
});
Template.alldish.events({
	"click #show" : function(e, t){
		// dishChosen = ["c6yRCXLTnps7bWzTa"];
		// {{alldish}}
		alert("dsfg")
		// var date = t.find('#date').value.trim();
		// alert(date);
		// alert("haah")
	}
});

Template.edishChosen.events({
	"click": function(e, t){
		e.preventDefault();
		for (var i = dishChosen.length - 1; i >= 0; i--) {
			if (dishChosen[i] === this._id) {
				dishChosen.splice(i, 1);
			};
		};

		//update alldish template
		var dishinkitchen=  MonAn.find({_id: { $nin: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
		pageSession.set("alldish", dishinkitchen);

		//update dishs choosen
		var dishinday =  MonAn.find({_id: { $in: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
	    pageSession.set("dishChosentemp", dishinday);
	}
});

Template.edish.events({
	"click": function(e, t){
		e.preventDefault();
		dishChosen.push(this._id);

		//update alldish template
		var dishinkitchen=  MonAn.find({_id: { $nin: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
		pageSession.set("alldish", dishinkitchen);

		//update dishs choosen
		var dishinday =  MonAn.find({_id: { $in: dishChosen}}, {sort: { name: 1, cost: -1}}).fetch();
	    pageSession.set("dishChosentemp", dishinday);

		//alert(dishChosen)
	},


	// 'click .check': function(e, t) {
	// 	// var date = t.find('#date').value.trim();
	// 	// alert(this._id);
	// 	if ( $(event.target).is(':checked')) {
	// 		 // alert("haha")
	// 		dishChosen.push(this._id);
	// 		// alert(dishChosen)
	// 	} else{
	// 		for(var i =0; i<dishChosen.length; i++){
	// 			if(dishChosen[i]=== this._id){
	// 				dishChosen.splice(i, 1);
	// 			}
	// 		}
	// 		// alert(dishChosen)
	// 		// alert("hehe")
	// 	}	
	// }
	  
});

Template.edish.helpers({
	aaa : function(){
		alert("aaa");
	}
});

Template.dishChosen.helpers({
	dishChosentemp: function(){
		return pageSession.get("dishChosentemp");
	}
});
// ----------------------------------------------------- temp demo
Template.registerHelper("fuck",function(){
  alert("fac")
});

