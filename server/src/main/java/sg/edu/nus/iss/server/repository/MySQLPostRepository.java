package sg.edu.nus.iss.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.model.Post;

import static sg.edu.nus.iss.server.utils.MySqlQueries.GET_POST_BY_ID;
import static sg.edu.nus.iss.server.utils.MySqlQueries.INSERT_POST;
@Repository
public class MySQLPostRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void getPostById(String postId) {
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(GET_POST_BY_ID, postId);
    }

    public void createPost(Post p) throws DataAccessException{
        jdbcTemplate.update(INSERT_POST, 
                p.getPostId(), 
                p.getRating(), 
                p.getReview(), 
                p.getImages(),
                p.getPlaceId(), 
                p.getPostDate());
    }
}
