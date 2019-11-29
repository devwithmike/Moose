const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const validate = require('./validate');

const url = 'mongodb://localhost:27017';
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
	// * Find Functions
	// * =================

	// ! TESTING PURPOSES ONLY FOR NOW
	test = cb => {
		if (this.validate) {
			let valid = validate.valid(this.schema, {
				title: 'dog'
			});
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

	// * REAL FUNCTION

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

	findByAny = (options, cb) => {
		db.collection(this.collection)
			.find(options)
			.toArray((err, docs) => {
				if (err) console.log(err);
				else cb(docs);
			});
	};

	findOneByAny = (options, cb) => {
		db.collection(this.collection).findOne(options, (err, result) => {
			if (err) console.log(err);
			else cb(result);
		});
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

const connect = (dbName, cb) => {
	if (db) cb();
	else {
		MongoClient.connect(url, mongoOptions, (err, client) => {
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
