create database chiakwhere;

use chiakwhere;

create table places (
    place_id varchar(512) not null,
    name varchar(128) not null,
    address varchar(256) not null,
    area varchar(64) not null,
    lat decimal(11, 8) not null,
    lng decimal(11, 8) not null,

    constraint pk_place_id primary key(place_id)
);

create table posts (
    post_id varchar(8) not null,
    rating int not null,
    review text not null,
    images text not null,
    place_id varchar(512) not null,
    post_date date not null,

    constraint pk_post_id primary key(post_id),
    constraint fk_place_id foreign key(place_id) 
        references places(place_id)
);

grant all privileges on chiakwhere.* to 'fred'@'%';
flush privileges;

