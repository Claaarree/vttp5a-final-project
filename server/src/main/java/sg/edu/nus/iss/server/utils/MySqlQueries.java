package sg.edu.nus.iss.server.utils;

public class MySqlQueries {
    public static final String GET_POST_BY_ID = """
        select * from posts p
            join places pl on 
            p.place_id = pl.place_id
            where p.post_id = ?;
        """;

    public static final String INSERT_POST = """
        insert into posts (post_id, rating, review, images, place_id, post_date)
            values(?, ?, ?, ?, ?, ?);
        """;

    public static final String INSERT_PLACE = """
        insert into places (place_id, name, address, area, lat, lng)
            values(?, ?, ?, ?, ?, ?);
        """;

    public static final String GET_PLACE_BY_PLACE_ID = """
        select * from places where place_id = ?
        """;

    public static final String UPDATE_POST_BY_ID ="""
        udpate posts set
            rating = ?,
            review = ?,
            where post_id = ?
        """;

    public static final String DELETE_POST_BY_ID = """
        delete from posts where post_id = ?
        """;
}
