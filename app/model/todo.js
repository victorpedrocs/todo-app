var mongoose = require('mongoose');

modulo.exports = mongoose.model('Todo', {
	text : String,
	done : Boolean
});