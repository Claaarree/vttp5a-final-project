package sg.edu.nus.iss.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.model.Post;

import static sg.edu.nus.iss.server.utils.MySqlQueries.DELETE_POST_BY_ID;
import static sg.edu.nus.iss.server.utils.MySqlQueries.GET_ALL_POST_BY_USER_ID;
import static sg.edu.nus.iss.server.utils.MySqlQueries.GET_POSTS_BY_PLACE_ID;
import static sg.edu.nus.iss.server.utils.MySqlQueries.GET_RECENT_POSTS_BY_USER_ID;
import static sg.edu.nus.iss.server.utils.MySqlQueries.GET_POST_BY_POST_ID;
import static sg.edu.nus.iss.server.utils.MySqlQueries.INSERT_POST;
import static sg.edu.nus.iss.server.utils.MySqlQueries.UPDATE_POST_BY_ID;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;
@Repository
public class MySQLPostRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<SqlRowSet> getPostById(String postId) 
    throws DataAccessException{
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(GET_POST_BY_POST_ID, postId);
        if (rowSet.next()){
            return Optional.of(rowSet);
        } else {
            return Optional.empty();
        }
        
    }

    // TODO complete this
    public void getRecentPostsByUserId(String user_id) throws DataAccessException {
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_RECENT_POSTS_BY_USER_ID, user_id, yesterday);
        System.out.println(rs.next());
    }

    public SqlRowSet getAllPostsByUserId(String user_id) throws DataAccessException {
        return jdbcTemplate.queryForRowSet(GET_ALL_POST_BY_USER_ID, user_id);
    }

    public SqlRowSet getPostsByPlaceId(String placeId) 
    throws DataAccessException {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_POSTS_BY_PLACE_ID, placeId);
        return rs;
    }

    public int createPost(Post p) throws DataAccessException {
        return jdbcTemplate.update(INSERT_POST, 
                p.getPostId(), 
                p.getUserId(),
                p.getDisplayName(),
                p.getRating(), 
                p.getReview(), 
                p.getImages(),
                p.getPlaceId(), 
                p.getPostDate());
    }

    public int updatePost(String postId, int rating, String review) 
    throws DataAccessException{
        return jdbcTemplate.update(UPDATE_POST_BY_ID, rating, review, new Date(), postId);
    }

    public int deletePostById(String postId) throws DataAccessException{
        return jdbcTemplate.update(DELETE_POST_BY_ID, postId);
    }
}
