const valid = (schema, data) => {
	let ret = {};
	let errors = [];
	for (var key in schema) {
		let flag = false;
		if (schema.hasOwnProperty(key)) {
			var obj = schema[key];
			for (var k in obj) {
				if (obj.hasOwnProperty(k)) {
					if (k == 'required') {
						if (data.hasOwnProperty(key)) {
							if (!data[key]) {
								errors.push(key + ' is required');
								flag = true;
							}
						} else {
							errors.push(key + ' is required');
							flag = true;
						}
					}
					if (k == 'length') {
						if (data.hasOwnProperty(key)) {
							if (data[key].length < obj['length']) {
								errors.push(
									key +
										' needs to be greater or equal to ' +
										obj['length']
								);
								flag = true;
							}
						}
					}
					if (k == 'max-length') {
						if (data.hasOwnProperty(key)) {
							if (data[key].length > obj['max-length']) {
								errors.push(
									key +
										'needs to be less than or equal to' +
										obj['max-length']
								);
								flag = true;
							}
						}
					}
					if (k == 'strong') {
						if (data.hasOwnProperty(key)) {
							let uppercase = data[key].match('[A-Z]');
							let lowercase = data[key].match('[a-z]');
							let number = data[key].match('[0-9]');
							let special = data[key].match('[^\\w]');

							if (!uppercase) {
								errors.push(
									key +
										' needs to at least have one uppercase character'
								);
								flag = true;
							}
							if (!lowercase) {
								errors.push(
									key +
										' needs to at least have one lowercase character'
								);
								flag = true;
							}
							if (!number) {
								errors.push(
									key +
										' needs to at least have one numerical value'
								);
								flag = true;
							}
							if (!special) {
								errors.push(
									key +
										' needs to at least have one special character'
								);
								flag = true;
							}
						}
					}
					if (k == 'email') {
						if (data.hasOwnProperty(key)) {
							let valid = data[key].match(
								'^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$'
							);
							if (!valid) {
								errors.push(key + ' needs to a valid email');
								flag = true;
							}
						}
					}
				}
			}
			if (!flag) {
				ret[key] = data[key];
			}
		}
	}
	if (errors.length > 0) {
		ret['errors'] = { state: true };
		ret['errors']['messages'] = errors;
	}
	return ret;
};

module.exports = { valid };
