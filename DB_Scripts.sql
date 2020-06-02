CREATE DATABASE sometimedb
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'German_Austria.1252'
    LC_CTYPE = 'German_Austria.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE public.sometimeuser
(
    userid integer NOT NULL DEFAULT nextval('user_userid_seq'::regclass),
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    role character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (userid),
    CONSTRAINT "emailUnq" UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE public.sometimeuser
    OWNER to postgres;

    
CREATE TABLE public.todoobject
(
    todoid integer NOT NULL DEFAULT nextval('todoobject_todoid_seq'::regclass),
    userid integer NOT NULL,
    title character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(2000) COLLATE pg_catalog."default",
    duedate date,
    CONSTRAINT todoobject_pkey PRIMARY KEY (todoid),
    CONSTRAINT "userAuth" FOREIGN KEY (userid)
        REFERENCES public.sometimeuser (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.todoobject
    OWNER to postgres;