package sg.edu.nus.iss.server.repository;

import static sg.edu.nus.iss.server.utils.MySqlQueries.CHECK_PLACE_EXIST;
import static sg.edu.nus.iss.server.utils.MySqlQueries.DECREMENT_POST_COUNT;
import static sg.edu.nus.iss.server.utils.MySqlQueries.DELETE_PLACE_BY_PLACE_ID;
import static sg.edu.nus.iss.server.utils.MySqlQueries.GET_PLACES;
import static sg.edu.nus.iss.server.utils.MySqlQueries.GET_PLACE_BY_PLACE_ID;
import static sg.edu.nus.iss.server.utils.MySqlQueries.INCREMENT_POST_COUNT;
import static sg.edu.nus.iss.server.utils.MySqlQueries.INSERT_PLACE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import sg.edu.nus.iss.server.model.Place;

@Repository
public class MySQLPlaceRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public SqlRowSet getTopPlaces(int offset) throws DataAccessException{
        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_PLACES, offset);
        return rs;
    }

    public SqlRowSet getPlaceByPlaceId(String placeId) throws DataAccessException{
        return jdbcTemplate.queryForRowSet(GET_PLACE_BY_PLACE_ID, placeId);
    }

    public void createPlace(Place place) throws DataAccessException{
        jdbcTemplate.update(INSERT_PLACE, 
                place.getPlaceId(), 
                place.getName(), 
                place.getAddress(), 
                place.getArea(),
                place.getLat(), 
                place.getLng(),
                1);
    }

    public Boolean placeExists(String placeId) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(CHECK_PLACE_EXIST, placeId);
        return rs.next();
    }

    public int incrementPostCount(String placeId) {
        return jdbcTemplate.update(INCREMENT_POST_COUNT, placeId);
    }

    public void decrementPostCount(String placeId) {
        int rowsAffected = jdbcTemplate.update(DECREMENT_POST_COUNT, placeId);
        if(rowsAffected == 0) {
            jdbcTemplate.update(DELETE_PLACE_BY_PLACE_ID, placeId);
        }
    }
}
