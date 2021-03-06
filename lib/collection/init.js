orion.filesystem.files = {};

orion.filesystem.files.collection = new Meteor.Collection('files');
orion.filesystem.files.collection.allow({
	'insert': function(userId, doc) {
		return userId;
	},
	'update': function(userId, doc, fields, modifier) {
		return userId;
	},
	'remove': function(userId, doc) {
		return userId;
	}
});

orion.filesystem.files.schema = new SimpleSchema({
	url: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
	},
	isPrivate: {
		type: Boolean
	},
	canRemove: {
		type: Boolean
	},
	name: {
		type: String
	},
	folder: {
		type: String,
		optional: true,
		regEx: /^[a-zA-Z0-9-_]+[a-zA-Z0-9-_\/]*[a-zA-Z0-9-_]+$/,
	},
	meta: {
		type: Object,
        optional: true,
        blackbox: true
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date};
			} else {
				this.unset();
			}
		}
	},
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true
	},
})

orion.filesystem.files.collection.attachSchema(orion.filesystem.files.schema);