-- ==========================================
-- TABLE: roles
-- ==========================================
CREATE TABLE roles (
                       id BIGSERIAL PRIMARY KEY,
                       role VARCHAR(255) NOT NULL
);

-- ==========================================
-- TABLE: users_group
-- ==========================================
CREATE TABLE users_group (
                             id BIGSERIAL PRIMARY KEY,
                             name VARCHAR(255) NOT NULL
);

-- ==========================================
-- TABLE: users_group_role  (Many-to-Many)
-- ==========================================
CREATE TABLE users_group_role (
                                  user_group_id BIGINT NOT NULL,
                                  role_id BIGINT NOT NULL,

                                  CONSTRAINT fk_user_group_role_user_group
                                      FOREIGN KEY (user_group_id) REFERENCES users_group(id) ON DELETE CASCADE,

                                  CONSTRAINT fk_user_group_role_role
                                      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- ==========================================
-- TABLE: users
-- ==========================================
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       login VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(255) UNIQUE,
                       user_group_id BIGINT NOT NULL,
                       enabled BOOLEAN NOT NULL,
                       api_key_evolution VARCHAR(255) UNIQUE,
                       instance_name_evolution VARCHAR(255) UNIQUE,

                       CONSTRAINT fk_users_user_group
                           FOREIGN KEY (user_group_id) REFERENCES users_group(id)
);

-- ==========================================
-- TABLE: employees
-- ==========================================
CREATE TABLE employees (
                           id BIGSERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           hire_date DATE NOT NULL,
                           salary NUMERIC(15,2) NOT NULL,
                           status VARCHAR(50) NOT NULL
);
