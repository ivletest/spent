INSERT INTO app_user (
    user_name,
    password_hash,
    created_on,
    updated_on,
    deleted_on) 
VALUES ($1, $2, NOW(), NULL, NULL)
RETURNING *