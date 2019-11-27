const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const validate = require('./validate');

const url = 'mongodb://localhost:27017';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

class Model {
	constructor(collection, schema) {
		this.collection = collection;
		this.schema = schema;
	}

	getPrimaryKey = _id => {
		return ObjectID(_id);
	};

	// * =================
	// * Find Functions
	// * =================

	findAll = cb => {
		let valid = validate.valid(this.schema, {
			test: 'dodsfg',
			other: 'other'
		});
		// console.log(valid);
		cb(valid);
		// db.collection(this.collection)
		// 	.find({})
		// 	.toArray((err, docs) => {
		// 		if (err) console.log(err);
		// 		else cb(docs);
		// 	});
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

	insert = (data, cb) => {
		db.collection(this.collection).insert(data, (err, result) => {
			if (err) console.log(err);
			else cb(result);
		});
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
