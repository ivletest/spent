require('dotenv').config();

var debugConnectionString = require('../app-config/debug-settings')
	.settings
	.connectionStrings
	.psql;

const { Pool } = require('pg');

module.exports = {
	isProduction: process.env.NODE_ENV = 'production',

	instance: () => {
		return new Pool({
			connectionString: isProduction 
				? process.env.DATABASE_URL
				: debugConnectionString,
			ssl: isProduction});
	}
}