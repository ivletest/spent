CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE app_user (
    _id SERIAL UNIQUE PRIMARY KEY,
    uid UUid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_on DATE NOT NULL,
	updated_on DATE,
    deleted_on DATE
);

CREATE TABLE account (
	_id SERIAL UNIQUE PRIMARY KEY,
	uid UUid DEFAULT uuid_generate_v4(),
	is_private BOOLEAN NOT NULL,
	parent_account_FK INTEGER REFERENCES account(_id),
	created_on DATE NOT NULL,
	updated_on DATE,
    deleted_on DATE
);

CREATE TABLE app_user_account (
	_id SERIAL UNIQUE PRIMARY KEY,
	account_FK INTEGER REFERENCES account(_id),
	user_FK INTEGER NOT NULL REFERENCES app_user(_id),
	created_on DATE NOT NULL,
	updated_on DATE,
    deleted_on DATE
);

CREATE TABLE product_category (
	_id SERIAL UNIQUE PRIMARY KEY,
	product_name VARCHAR(255),
	parent_category_FK INTEGER REFERENCES product_category(_id),
	display_order INTEGER,
	created_on DATE NOT NULL,
	updated_on DATE,
    deleted_on DATE
);

CREATE TABLE income (
	_id SERIAL UNIQUE PRIMARY KEY,
	uid UUid DEFAULT uuid_generate_v4(),
	amount DECIMAL NOT NULL,
	account_FK INTEGER NOT NULL REFERENCES account(_id),
	created_on DATE NOT NULL,
	updated_on DATE,
    deleted_on DATE
);

CREATE TABLE expense (
	_id SERIAL UNIQUE PRIMARY KEY,
	uid UUid DEFAULT uuid_generate_v4(),
	amount DECIMAL NOT NULL,
	product_category_FK INTEGER REFERENCES product_category(_id),
	account_FK INTEGER NOT NULL REFERENCES account(_id),
	created_on DATE NOT NULL,
	updated_on DATE,
    deleted_on DATE
);
