CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now()
);

INSERT INTO users (email, name, password)
VALUES ('teste@exemplo.com', 'Usuário Teste', '$2b$10$jtDOBJgI4co905A2pJD9n.g5wyA.box/UP8tF2iyi6pZs3i3HrHmq');
