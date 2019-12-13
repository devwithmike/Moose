const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const validate = require('./validate');

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

class Model {
	constructor(collection, schema = null) {
		this.collection = collection;
		if (schema) {
			this.schema = schema;
			this.validate = true;
		} else {
			this.validate = false;
		}
	}

	getPrimaryKey = _id => {
		return ObjectID(_id);
	};

	// * =================
	// * Test Functions
	// * =================

	// ! TESTING PURPOSES ONLY FOR NOW
	test = (data, cb) => {
		if (this.validate) {
			let valid = validate.valid(this.schema, data);
			console.log(valid);
			cb(valid);
		} else {
			db.collection(this.collection)
				.find({})
				.toArray((err, docs) => {
					if (err) console.log(err);
					else cb(docs);
				});
		}
	};

	// * =================
	// * Find Functions
	// * =================

	findAll = cb => {
		db.collection(this.collection)
			.find({})
			.toArray((err, docs) => {
				if (err) console.log(err);
				else cb(docs);
			});
	};

	findById = (id, cb) => {
		db.collection(this.collection)
			.find({ _id: this.getPrimaryKey(id) })
			.toArray((err, docs) => {
				if (err) console.log(err);
				else cb(docs);
			});
	};

	findOneById = (id, cb) => {
		db.collection(this.collection).findOne(
			{ _id: this.getPrimaryKey(id) },
			(err, result) => {
				if (err) console.log(err);
				else cb(result);
			}
		);
	};

	findByAny = (options, strict = true, cb) => {
		let col = db.collection(this.collection);
		if (strict) {
			if (typeof options == 'object') {
				col.find(options).toArray((err, docs) => {
					if (err) console.log(err);
					else cb(docs);
				});
			} else {
				cb({ error: 'incorrect input given, object expected' });
			}
		} else {
			if (Array.isArray(options)) {
				col.find({
					$or: options
				}).toArray((err, docs) => {
					if (err) console.log(err);
					else cb(docs);
				});
			} else {
				cb({ error: 'incorrect input given, array expected' });
			}
		}
	};

	findOneByAny = (options, strict = true, cb) => {
		let col = db.collection(this.collection);
		if (strict) {
			if (typeof options == 'object') {
				col.findOne(options, (err, result) => {
					if (err) console.log(err);
					else cb(result);
				});
			} else {
				cb({ error: 'incorrect input given, object expected' });
			}
		} else {
			if (Array.isArray(options)) {
				col.findOne(
					{
						$or: options
					},
					(err, result) => {
						if (err) console.log(err);
						else cb(result);
					}
				);
			} else {
				cb({ error: 'incorrect input given, array expected' });
			}
		}
	};

	// * =================
	// * Insert Functions
	// * =================

	insertOne = (data, cb) => {
		try {
			if (this.validate) {
				let valid = validate.valid(this.schema, data);
				if (valid['errors']['state']) {
					cb({ errors: valid['errors'] });
				} else {
					delete valid.errors;
					db.collection(this.collection).insertOne(valid);
					cb(valid);
				}
			} else {
				db.collection(this.collection).insertOne(data);
				cb(data);
			}
		} catch (e) {
			cb({ errors: { state: true, messages: ['could not insert'] } });
		}
	};

	// * =================
	// * Update Functions
	// * =================

	updateById = (id, data, cb) => {
		db.collection(this.collection).updateOne(
			{ _id: this.getPrimaryKey(id) },
			{ $set: data },
			(err, result) => {
				if (err) console.log(err);
				else cb(result);
			}
		);
	};

	updateManyById = (id, data, cb) => {
		db.collection(this.collection).updateMany(
			{ _id: this.getPrimaryKey(id) },
			{ $set: data },
			(err, result) => {
				if (err) console.log(err);
				else cb(result);
			}
		);
	};

	// * =================
	// * Delete Functions
	// * =================

	deleteAll = (options, cb) => {
		cb(db.collection(this.collection).deleteMany(options));
	};

	deleteOne = (id, cb) => {
		db.collection(this.collection).deleteOne(
			{ _id: this.getPrimaryKey(id) },
			(err, result) => {
				if (err) console.log(err);
				else cb(result);
			}
		);
	};
}

let db = null;

// * =================
// * General Functions
// * =================

const connect = (url, dbName, cb) => {
	if (db) cb();
	else {
		MongoClient.connect(url + '/' + dbName, mongoOptions, (err, client) => {
			if (err) cb(err);
			else {
				db = client.db(dbName);
				cb();
			}
		});
	}
};

// * =================
// * Exports
// * =================

module.exports = {
	connect,
	Model
};
