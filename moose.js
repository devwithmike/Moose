const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

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

const getPrimaryKey = _id => {
	return ObjectID(_id);
};

// * =================
// * Find Functions
// * =================

// TODO => Add options to find all
const findAll = (collection, cb) => {
	db.collection(collection)
		.find({})
		.toArray((err, docs) => {
			if (err) console.log(err);
			else cb(docs);
		});
};

const findById = (collection, id, cb) => {
	db.collection(collection)
		.find({ _id: getPrimaryKey(id) })
		.toArray((err, docs) => {
			if (err) console.log(err);
			else cb(docs);
		});
};

const findOneById = (collection, id, cb) => {
	db.collection(collection).findOne(
		{ _id: getPrimaryKey(id) },
		(err, result) => {
			if (err) console.log(err);
			else cb(result);
		}
	);
};

const findByAny = (collection, options, cb) => {
	db.collection(collection)
		.find(options)
		.toArray((err, docs) => {
			if (err) console.log(err);
			else cb(docs);
		});
};

const findOneByAny = (collection, options, cb) => {
	db.collection(collection).findOne(options, (err, result) => {
		if (err) console.log(err);
		else cb(result);
	});
};

// * =================
// * Insert Functions
// * =================

const insert = (collection, data, cb) => {
	db.collection(collection).insert(data, (err, result) => {
		if (err) console.log(err);
		else cb(result);
	});
};

// * =================
// * Update Functions
// * =================

const updateById = (collection, id, data, cb) => {
	db.collection(collection).updateOne(
		{ _id: getPrimaryKey(id) },
		{ $set: data },
		(err, result) => {
			if (err) console.log(err);
			else cb(result);
		}
	);
};

const updateManyById = (collection, id, data, cb) => {
	db.collection(collection).updateMany(
		{ _id: getPrimaryKey(id) },
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

const deleteAll = (collection, options, cb) => {
	cb(db.collection(collection).deleteMany(options));
};

const deleteOne = (collection, id, cb) => {
	db.collection(collection).deleteOne(
		{ _id: getPrimaryKey(id) },
		(err, result) => {
			if (err) console.log(err);
			else cb(result);
		}
	);
};

// * =================
// * Exports
// * =================

module.exports = {
	connect,
	findAll,
	findById,
	findOneById,
	findByAny,
	findOneByAny,
	insert,
	updateById,
	updateManyById,
	deleteAll,
	deleteOne
};
