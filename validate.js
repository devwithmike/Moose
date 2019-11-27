const valid = (schema, data) => {
	let ret = {};
	for (var key in schema) {
		let flag = false;
		if (schema.hasOwnProperty(key)) {
			var obj = schema[key];
			for (var k in obj) {
				if (obj.hasOwnProperty(k)) {
					if (k == 'required') {
						if (data.hasOwnProperty(key)) {
							if (!data[key]) {
								ret['error'] = {
									state: true,
									[key]: 'is required'
								};
								flag = true;
							}
						} else {
							ret['error'] = {
								state: true,
								[key]: 'is required'
							};
							flag = true;
						}
					}
					if (k == 'length') {
						if (data.hasOwnProperty(key)) {
							if (data[key].length < obj['length']) {
								ret['error'] = {
									state: true,
									[key]: `needs to be greater or equal to ${obj['length']}`
								};
								flag = true;
							}
						}
					}
					if (k == 'max-length') {
						if (data.hasOwnProperty(key)) {
							if (data[key].length > obj['max-length']) {
								ret['error'] = {
									state: true,
									[key]: `needs to be less than or equal to ${obj['max-length']}`
								};
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
	return ret;
};

module.exports = { valid };
