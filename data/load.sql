CREATE TABLE public.temp_users
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL
);
\copy temp_users from 'data/users.csv' with delimiter ',' CSV HEADER;
insert into users (id, name, email, created_at, updated_at) select distinct id, name, email, now(), now() from temp_users on conflict do nothing;

CREATE TABLE public.temp_assignees
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    dept character varying(255) COLLATE pg_catalog."default",
    manager character varying(255) COLLATE pg_catalog."default" NOT NULL
);
\copy temp_assignees from 'data/assignees.csv' with delimiter ',' CSV HEADER;
insert into assignees (id, dept, manager, created_at, updated_at) select distinct id, dept, manager, now(), now() from temp_assignees on conflict do nothing;

CREATE TABLE public.temp_tickets
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    subject character varying(255) COLLATE pg_catalog."default" NOT NULL,
    text character varying(2048) COLLATE pg_catalog."default" NOT NULL,
    priority integer DEFAULT '4',
    state character varying(255) COLLATE pg_catalog."default" DEFAULT 'open'::character varying,
    assignee_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    category integer
);
\copy temp_tickets from 'data/tickets.csv' with delimiter ',' CSV HEADER;
insert into tickets (user_id, subject, text, priority, state, category, created_at, updated_at, assignee_id)
  select distinct user_id, subject, substring(text for 255), priority, state, category, created_at, updated_at, assignee_id
  from temp_tickets
  on conflict do nothing
;

-- Drop the temporary table when done
DROP TABLE public.temp_users, public.temp_assignees, public.temp_tickets;
