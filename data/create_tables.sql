-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial NOT NULL,
	"name" varchar(255) NULL,
	email varchar(255) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_email_key1 UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.assignees definition

-- Drop table

-- DROP TABLE public.assignees;

CREATE TABLE public.assignees (
	id serial NOT NULL,
	dept varchar(255) NULL,
	manager varchar(255) NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	user_id int4 NOT NULL,
	CONSTRAINT assignees_pkey PRIMARY KEY (id),
	CONSTRAINT assignees_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
);


-- public.tickets definition

-- Drop table

-- DROP TABLE public.tickets;

CREATE TABLE public.tickets (
	id serial NOT NULL,
	subject varchar(255) NOT NULL,
	"text" varchar(255) NOT NULL,
	state varchar(255) NULL DEFAULT 'open'::character varying,
	category varchar(255) NULL DEFAULT 'Other'::character varying,
	priority int4 NULL DEFAULT 4,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	assignee_id int4 NULL,
	user_id int4 NULL,
	CONSTRAINT tickets_pkey PRIMARY KEY (id),
	CONSTRAINT tickets_assignee_id_fkey FOREIGN KEY (assignee_id) REFERENCES assignees(id) ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT tickets_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL
);


