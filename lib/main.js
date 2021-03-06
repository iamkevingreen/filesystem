orion.filesystem = {}

/**
 * Public upload function 
 * 
 * This function handles all uploads in orion,
 * it also register the file so we can view it 
 * in the admin panel.
 */
orion.filesystem.upload = function(options, callback) {
	orion.filesystem.providerUpload(options, function(url, meta) {
		var file = orion.filesystem.files.register({
			isPrivate: !!options.isPrivate,
			canRemove: !!options.canRemove,
			url: url,
			name: options.name,
			folder: options.folder,
			meta: meta
		});
		callback(file);
	}, function(error) {
		callback(null, error);
	})
}

/**
 * Public remove function 
 * 
 * This function handles all removes in orion,
 * it also removes the file in the admin panel.
 */
orion.filesystem.remove = function(selector, callback) {
	var file = orion.filesystem.files.get(selector);
	orion.filesystem.providerRemove(file, function() {
		orion.filesystem.files.remove(selector);
		if (callback) {
			callback();
		}
	}, function(error) {
		if (callback) {
			callback(error);
		}
	})
}

/**
 * Provider upload function 
 * 
 * Please replace this function with the 
 * provider you prefer.
 *
 * If success, call success(publicUrl);
 * you can pass data and it will be saved in file.meta
 * Ej: success(publicUrl, {local_path: '/user/path/to/file'})
 *
 * If it fails, call failure(error).
 */
orion.filesystem.providerUpload = function(options, success, failure) {
	throw 'Please define a upload function';
}

/**
 * Provider remove function 
 * 
 * Please replace this function with the 
 * provider you prefer.
 *
 * If success, call success();
 * If it fails, call failure(error).
 */
orion.filesystem.providerRemove = function(file, success, failure) {
	throw 'Please define a remove function';
}