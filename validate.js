const bcrypt = require('bcrypt');

function htmlEntities(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function stringed(data) {
	for (var index in data) {
		data[index] = htmlEntities(data[index]);
	}
	return data;
}

const valid = (schema, data) => {
	let ret = {};
	ret['body'] = {};
	ret['errors'] = { state: false };
	let errors = [];
	matchHash = false;
	for (var key in schema) {
		let flag = false;
		if (schema.hasOwnProperty(key)) {
			var obj = schema[key];
			for (var k in obj) {
				if (obj.hasOwnProperty(k)) {
					if (k == 'required' && obj[k]) {
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
					if (k == 'min') {
						if (data.hasOwnProperty(key)) {
							if (data[key] < obj['min']) {
								errors.push(
									key +
										' needs to be greater or equal to ' +
										obj['min']
								);
								flag = true;
							}
						}
					}
					if (k == 'max') {
						if (data.hasOwnProperty(key)) {
							if (data[key] > obj['max']) {
								errors.push(
									key +
										' needs to be less than or equal to ' +
										obj['max']
								);
								flag = true;
							}
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
					if (k == 'strong' && obj[k]) {
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
					if (k == 'email' && obj[k]) {
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
					if (k == 'matches') {
						if (data.hasOwnProperty(key)) {
							let comp = schema[key]['matches'];
							if (data.hasOwnProperty(comp)) {
								if (data[key] !== data[comp]) {
									let result = bcrypt.compareSync(
										data[comp],
										data[key]
									);
									if (result === false) {
										errors.push(
											key + ' does not match ' + comp
										);
										flag = true;
									}
								}
							} else {
								errors.push(comp + ' does not exist');
								flag = true;
							}
							delete data[comp];
							if (schema[comp].hasOwnProperty('required')) {
								delete schema[comp]['required'];
							}
						}
					}
					if (k == 'hash') {
						if (data.hasOwnProperty(key)) {
							matchHash = true;
							data[key] = bcrypt.hashSync(data[key], 10);
						}
					}
					if (k == 'default') {
						if (data.hasOwnProperty(key)) {
							if (data[key] == null) {
								data[key] = schema[key];
							}
						} else {
							data[key] = schema[key]['default'];
						}
					}
					if (k == 'enum') {
						let options = schema[key][k];
						if (!options.includes(data[key])) {
							errors.push(
								data[key] + ' is not one of the allowed options'
							);
							flag = true;
						}
					}
					if (k == 'type') {
						if (schema[key][k] == 'number') {
							if (typeof data[key] != 'number') {
								errors.push(
									key + ' needs to be a numerical value'
								);
								flag = true;
							}
						}
					}
				}
			}
			if (!flag) {
				ret['body'][key] = data[key];
			}
		}
	}
	if (errors.length > 0) {
		ret['errors'] = { state: true };
		ret['errors']['messages'] = errors;
	}
	ret['body'] = stringed(ret['body']);
	return ret;
};

module.exports = { valid };
