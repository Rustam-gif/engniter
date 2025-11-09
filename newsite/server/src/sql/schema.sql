-- Postgres schema for visits and events
create table if not exists visits (
  id bigserial primary key,
  happened_at timestamptz not null default now(),
  visitor_id uuid not null,
  host text not null,
  path text not null,
  referrer text,
  query_raw text,
  user_agent text,
  remote_ip inet,
  remote_ip_anon inet,
  fbclid text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  params_received_at timestamptz,
  is_in_app_browser boolean not null default false,
  is_bot boolean not null default false
);

create index if not exists idx_visits_day on visits ((date_trunc('day', happened_at)));
create index if not exists idx_visits_visitor_time on visits (visitor_id, happened_at desc);
create index if not exists idx_visits_fbclid on visits (fbclid);
create index if not exists idx_visits_utm on visits (utm_source, utm_campaign);

create table if not exists events (
  id bigserial primary key,
  happened_at timestamptz not null default now(),
  visitor_id uuid not null,
  visit_id bigint references visits(id) on delete set null,
  type text not null,
  target_url text,
  page_path text,
  attributes jsonb
);

create index if not exists idx_events_day_type on events ((date_trunc('day', happened_at)), type);
create index if not exists idx_events_visitor_time on events (visitor_id, happened_at desc);

