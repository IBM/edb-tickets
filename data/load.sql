CREATE TABLE public.loading_tickets
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    ticket_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    subject character varying(255) COLLATE pg_catalog."default" NOT NULL,
    text character varying(2048) COLLATE pg_catalog."default" NOT NULL,
    priority integer DEFAULT '4',
    state character varying(255) COLLATE pg_catalog."default" DEFAULT 'open'::character varying,
    assignee_name character varying(255) COLLATE pg_catalog."default",
    assignee_email character varying(255) COLLATE pg_catalog."default",
    user_messages_count integer,
    agent_messages_count integer,
    last_message_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    category integer
);

\copy loading_tickets from 'data/new_tickets.csv' with delimiter ',' CSV HEADER;

-- First make the user emails exist in the users table
insert into users (name, email, created_at, updated_at) select distinct name, email, now(), now() from loading_tickets on conflict do nothing;

-- Then load the tickets
insert into tickets (subject, text, state, category, priority, created_at, updated_at, user_id)
  select subject, substring(text for 255), state, category, priority, t.created_at, t.updated_at, u.id as user_id
  from loading_tickets t, users u
  where t.email = u.email
  on conflict do nothing
;

-- Drop the temporary table when done
DROP TABLE public.loading_tickets
