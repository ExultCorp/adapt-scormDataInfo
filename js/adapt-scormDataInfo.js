/*
* adapt-scormDataInfo
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var scormDataModel = require('extensions/adapt-scormDataInfo/js/scormModel');
	var ScormDataInfoView = require('extensions/adapt-scormDataInfo/js/adapt-scormDataInfo-view');


	Adapt.on('scormDataInfo:showInfo', function() {
		Adapt.drawer.triggerCustomView(new ScormDataInfoView({
					model: scormDataModel.getInstance()
				}).$el);

	});

	Adapt.once('app:dataReady', function() {

		var	scormDataInfoSettings = Adapt.course.get('_scoreDataInfo');

		var drawerObject = {
	        title: scormDataInfoSettings.title,
	        description: scormDataInfoSettings.description,
	        className: 'scormDataInfo'
	    };
	    // Syntax for adding a Drawer item
	    // Adapt.drawer.addItem([object], [callbackEvent]);
	    Adapt.drawer.addItem(drawerObject, 'scormDataInfo:showInfo');
	

	});

})