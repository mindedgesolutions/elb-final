File upload
Filter > sub-category not selected - /products/all

Admin:
update post
view post
view seller profile

Single product page :
Search for a better slider
With thumbnail display

Changes in elb_reviews:
review_by bigint
rating smallint
created_at timestamp without time zone
updated_at timestamp without time zone

CONSTRAINT post_id FOREIGN KEY (post_id)
REFERENCES public.elb_product (id) MATCH SIMPLE
ON UPDATE SET NULL
ON DELETE SET NULL
NOT VALID

-- Table: public.elb_reviews

-- DROP TABLE IF EXISTS public.elb_reviews;

CREATE TABLE IF NOT EXISTS public.elb_reviews
(
id integer NOT NULL DEFAULT nextval('elb_reviews_id_seq'::regclass),
post_id bigint,
review_by bigint,
rating smallint,
message text COLLATE pg_catalog."default",
created_at timestamp without time zone NOT NULL DEFAULT now(),
updated_at timestamp without time zone,
is_publish integer,
is_active boolean,
CONSTRAINT elb_reviews_pkey PRIMARY KEY (id),
CONSTRAINT post_id FOREIGN KEY (post_id)
REFERENCES public.elb_product (id) MATCH SIMPLE
ON UPDATE SET NULL
ON DELETE SET NULL
NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.elb_reviews
OWNER to postgres;
