define(function(require) {

	var Backbone = require('backbone');
	var Adapt = require('coreJS/adapt');

	var ScormDataView = Backbone.View.extend({

		className: "courseinfo",

		initialize: function() {
			this.listenTo(Adapt, 'remove', this.remove);
			this.render();
		},

		render: function() {
			this.model.populateFromScormWrapper();
	        var scormModel = this.model.toJSON();
	        var template = Handlebars.templates["scormDataInfo"];
	        this.$el.html(template({
	        		scormModel: scormModel
	        	}));
	        return this;
		},

		postRender: function() {
			this.listenTo(Adapt, 'drawer:triggerCustomView', this.remove);
		},

		
	});

	return ScormDataView;
})
	