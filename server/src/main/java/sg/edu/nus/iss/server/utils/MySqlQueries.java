package sg.edu.nus.iss.server.utils;

public class MySqlQueries {
    public static final String GET_POST_BY_POST_ID = """
        select * from posts p
        join places pl on 
            p.place_id = pl.place_id
        where p.post_id = ?;
        """;

    public static final String INSERT_POST = """
        insert into posts (post_id, user_id, display_name, rating, review, images, place_id, post_date)
            values(?, ?, ?, ?, ?, ?, ?, ?);
        """;

    public static final String INSERT_PLACE = """
        insert into places (place_id, name, address, area, lat, lng, post_count)
            values(?, ?, ?, ?, ?, ?, ?);
        """;

    public static final String GET_PLACE_BY_PLACE_ID = """
        select
            pl.place_id,pl.name,
            pl.address, pl.area,
            pl.lat, pl.lng,
            pl.post_count,
            AVG(p.rating) AS average_rating
        from places pl
        join posts p ON pl.place_id = p.place_id
        where pl.place_id = ?
        """;

    public static final String INCREMENT_POST_COUNT = """
        update places set 
            post_count = post_count + 1
        where place_id = ?
        """;

    public static final String DECREMENT_POST_COUNT = """
        update places set
            post_count = post_count - 1
        where place_id = ? and post_count > 1
        """;

    public static final String DELETE_PLACE_BY_PLACE_ID ="""
        delete from places where place_id = ?
        """;

    public static final String UPDATE_POST_BY_ID ="""
        update posts set
            rating = ?,
            review = ?, 
            post_date = ?
        where post_id = ?
        """;

    public static final String DELETE_POST_BY_ID = """
        delete from posts where post_id = ?
        """;

    public static final String GET_POSTS_BY_USER_ID = """
        select * from posts p
        join places pl on 
            p.place_id = pl.place_id
        where p.user_id like ?
            and p.post_date = ?
        """;

    public static final String GET_PLACES = """
        select
            pl.place_id,pl.name,
            pl.address, pl.area,
            pl.lat, pl.lng,
            pl.post_count,
            AVG(p.rating) AS average_rating
        from places pl
        join posts p ON pl.place_id = p.place_id
        group by
            pl.place_id
        order by average_rating desc, name asc
        limit 50
        offset ?
        """;

    public static final String GET_POSTS_BY_PLACE_ID = """
        select * from posts p
        join places pl on 
            p.place_id = pl.place_id
		where p.place_id = ?
        """;
}
