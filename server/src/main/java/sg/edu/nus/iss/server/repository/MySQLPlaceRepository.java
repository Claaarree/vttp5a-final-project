package sg.edu.nus.iss.server.repository;

import static sg.edu.nus.iss.server.utils.MySqlQueries.GET_PLACE_BY_PLACE_ID;
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

    public void createPlace(Place place) throws DataAccessException{
        jdbcTemplate.update(INSERT_PLACE, 
                place.getPlaceId(), 
                place.getName(), 
                place.getAddress(), 
                place.getArea(),
                place.getLat(), 
                place.getLng());
    }

    public Boolean placeExists(String placeId) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_PLACE_BY_PLACE_ID, placeId);
        return rs.next();
    }
}
