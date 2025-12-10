-- ==========================================
-- INSERT ROLES
-- ==========================================
INSERT INTO roles (role) VALUES
                             ('ROLE_USER_CREATE'),
                             ('ROLE_USER_READ'),
                             ('ROLE_USER_UPDATE'),
                             ('ROLE_USER_DELETE'),
                             ('ROLE_USER_LISTALL');

-- ==========================================
-- INSERT USER GROUP (admin)
-- ==========================================
INSERT INTO users_group (name)
VALUES ('admin');

-- ==========================================
-- LINK USER GROUP TO ROLES
-- ==========================================
INSERT INTO users_group_role (user_group_id, role_id)
SELECT 1 AS user_group_id, r.id AS role_id
FROM roles r;

-- ==========================================
-- INSERT ADMIN USER
-- ==========================================
INSERT INTO users (
    name, login, password, email, user_group_id, enabled
) VALUES (
             'Administrador',
             'teste@gmail.com',
             '$2y$10$1MgdNcIduZBhvlTym.PKje0nDX54UVS28jTa2U3lB3JvrqAj4fAdq',
             'teste@gmail.com',
             1,
             TRUE
         );
