BEGIN;

DROP TABLE IF EXISTS users, issues, comments CASCADE;

CREATE TABLE users (
  id            SERIAL         PRIMARY KEY,
  username      VARCHAR(300)   NOT NULL,
  avatar        VARCHAR(20),     
  alias         VARCHAR(20)    NOT NULL
);

CREATE TABLE issues (
  id            SERIAL                        PRIMARY KEY,
  alias_id      INTEGER REFERENCES users(id)  ON UPDATE CASCADE,
  issue_title   VARCHAR(100)                  NOT NULL,
  issue_body    TEXT                          NOT NULL,
  issue_label   VARCHAR(30),
  issue_date    DATE                          NOT NULL
);

CREATE TABLE comments (
  id            SERIAL                        PRIMARY KEY,
  alias_id      INTEGER REFERENCES users(id)  ON UPDATE CASCADE,  
  issue_id      INTEGER REFERENCES issues(id) ON UPDATE CASCADE,
  comment_body  TEXT                          NOT NULL,
  comment_date  DATE                          NOT NULL
);

INSERT INTO users(username, avatar, alias) VALUES
  ('astroash', 'dick.jpg', 'rudeboi69'),
  ('ameliejyc', 'dick.jpg', 'rudegal69');

INSERT INTO issues(alias_id, issue_title, issue_body, issue_label, issue_date) VALUES
  ('1', 'This thing happened', 'It sucked', null, '15/01/2017'),
  ('1', 'ANOTHER thing happened', 'It sucked even more', null, '13/01/2017');

INSERT INTO comments(alias_id, issue_id, comment_body, comment_date) VALUES
  ('2', '1', 'Oh no!', '16/01/2017'),
  ('2', '2', 'That sucks', '16/01/2017');

COMMIT;