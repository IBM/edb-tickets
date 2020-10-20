CREATE TABLE public.temp_users
(
    name character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL
);
\copy temp_users from 'data/users.csv' with delimiter ',' CSV HEADER;
insert into users (name, email, created_at, updated_at) 
    select name, email, now(), now() 
    from temp_users t 
    on conflict do nothing;

CREATE TABLE public.temp_assignees
(
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    dept character varying(255) COLLATE pg_catalog."default",
    manager character varying(255) COLLATE pg_catalog."default" NOT NULL
);
\copy temp_assignees from 'data/assignees.csv' with delimiter ',' CSV HEADER;
insert into assignees (user_id, dept, manager, created_at, updated_at) 
    select distinct u.id as user_id, dept, manager, now(), now() 
    from temp_assignees t, users u
        where t.email = u.email
    on conflict do nothing
;

CREATE TABLE public.temp_tickets
(
    user_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    subject character varying(255) COLLATE pg_catalog."default" NOT NULL,
    text character varying(2048) COLLATE pg_catalog."default" NOT NULL,
    priority integer DEFAULT '4',
    state character varying(255) COLLATE pg_catalog."default" DEFAULT 'open'::character varying,
    assignee_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    category integer
);
\copy temp_tickets from 'data/tickets.csv' with delimiter ',' CSV HEADER;
insert into tickets (user_id, subject, text, priority, state, category, created_at, updated_at, assignee_id)
  select distinct u.id as user_id, subject, substring(text for 255), priority, state, category, now(), now(), x.id as assignee_id
  from temp_tickets t, users u, users a, assignees x
    where t.user_email = u.email and t.assignee_email = a.email and a.id = x.user_id
  on conflict do nothing
;

-- Drop the temporary table when done
DROP TABLE public.temp_users, public.temp_assignees, public.temp_tickets;
