define(function(require) {

	var Backbone = require('backbone');
	var Adapt = require('coreJS/adapt');
	var ScormWrapper = require('extensions/adapt-contrib-spoor/js/scormWrapper').getInstance();

	function ignoreError(callback, def) {
		try {
			var rtn = callback();
			if (rtn == "" || typeof rtn == "undefined") return def;
			return rtn;
		} catch(e) {
			console.log("adapt-scormDataInfo:"+e);
		}
		return def || null;
	}

	function convertDateToTime(date) {
		if (isNaN(date)) return "n/a";
		var dt = new Date(date);
		var hours = dt.getHours() + "";
		var mins = dt.getMinutes() + "";
		var secs = dt.getSeconds() + "";
		var milli = dt.getMilliseconds() + "";
		if (hours.length < 2) hours="0"+hours;
		if (mins.length < 2) mins="0"+mins;
		if (secs.length < 2) secs="0"+secs;
		if (milli.length < 2) milli="0"+milli;
		return hours+":"+mins+":"+secs+"."+milli;
	}

	var scormModel = Backbone.Model.extend({
		defaults: {
			connected: false,
			studentName: null,
			lessonStatus: null,
			assessmentScore: null,
			time: {
				sessionDuration: 0,
				totalDuration: 0
			}
		},

		populateFromScormWrapper: function(){
			this.set("connected", ScormWrapper.lmsConnected);
			this.set("studentName", ignoreError(function(){ScormWrapper.getStudentName()},"n/a"));
			this.set("lessonStatus", ignoreError(function(){ScormWrapper.getStatus()},"n/a"));
			this.set("assessmentScore", ignoreError(function(){ScormWrapper.getScore()},"n/a"));
			var time = this.get("time");
			time.sessionDuration = convertDateToTime((new Date())-Date.parse(ScormWrapper.startTime));
			time.totalDuration = ignoreError(function(){ScormWrapper.getValue("cmi.core.total_time")},"n/a");
		}
	});

	scormModel.instance = null;

	scormModel.getInstance = function() {
		if (this.instance === null) this.instance = new scormModel();
		return this.instance;
	};

	return scormModel;
})
	