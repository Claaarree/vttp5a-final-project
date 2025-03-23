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
        select * from places where place_id = ?
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
}
