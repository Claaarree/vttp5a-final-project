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
}
