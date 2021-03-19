const db = require('../db/db-connection');

class Dealer {
	createDealer = (newDealer) => {
		return new Promise((resolve, reject) => {
			const sql = 'INSERT INTO Dealers SET ?';
			db.query(sql, [newDealer], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				return resolve(rows);
			});
		});
	};

	getAll = () => {
		return new Promise((resolve, reject) => {
			const sql = `select id, name from Dealers`;

			db.query(sql, (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				return resolve(rows);
			});
		});
	};

	getDealerByUserId = (userId) => {
		return new Promise((resolve, reject) => {
			const sql = `select id, name from Dealers where userId = ?`;

			db.query(sql, [userId], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				return resolve(rows);
			});
		});
	};

	getDealerById = (id) => {
		return new Promise((resolve, reject) => {
			const sql = `select * from Dealers d 
						where id = ?`;
			db.query(sql, [id], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				return resolve(rows[0]);
			});
		});
	};

	getDealerByName = (name) => {
		return new Promise((resolve, reject) => {
			const sql = `select id, name from Dealers d 
						where name like '%${name}%'`;
			db.query(sql, (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				return resolve(rows[0]);
			});
		});
	};

	updateDealer = (id, dealer) => {
		return new Promise((resolve, reject) => {
			const keys = [];
			const values = [];
			const arr = Object.entries(dealer);

			arr.forEach(([key, value]) => {
				if (value) {
					keys.push(key);
					values.push(value);
				}
			});

			const columnSet = keys.map((key) => `${key} = ?`).join(', ');

			if (columnSet.length > 0) {
				const sql = `
					UPDATE Dealers
					SET ${columnSet}
					WHERE id = ?`;
				return db.query(sql, [values, id], (err, rows) => {
					if (err) {
						reject(err);
						throw err;
					}

					return resolve(rows);
				});
			} else return reject('No values provided');
		});
	};

	deleteDealer = (id) => {
		return new Promise((resolve, reject) => {
			const sql = 'DELETE FROM Dealers WHERE id = ?';
			return db.query(sql, [id], (err, rows) => {
				if (err) {
					reject(err);
					throw err;
				}
				return resolve(rows);
			});
		});
	};
}

module.exports = new Dealer();
