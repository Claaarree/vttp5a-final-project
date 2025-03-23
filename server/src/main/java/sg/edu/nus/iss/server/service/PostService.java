package sg.edu.nus.iss.server.service;

import java.io.StringReader;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.firebase.auth.FirebaseAuthException;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import sg.edu.nus.iss.server.components.AuthenticatedUserIdProvider;
import sg.edu.nus.iss.server.model.Place;
import sg.edu.nus.iss.server.model.Post;
import sg.edu.nus.iss.server.repository.MongoPostRepository;
import sg.edu.nus.iss.server.repository.MySQLPlaceRepository;
import sg.edu.nus.iss.server.repository.MySQLPostRepository;

@Service
public class PostService {
    
    @Autowired
    private MongoPostRepository mongoPostRepository;

    @Autowired
    private MySQLPostRepository sqlPostRepository;

    @Autowired
    private MySQLPlaceRepository sqlPlaceRepository;

    @Autowired
    private AuthenticatedUserIdProvider authenticatedUserIdProvider;

    @Autowired
    private UserService userService;

    // private String userId = authenticatedUserIdProvider.getUserId();

    public JsonObject getPostById(String postId) {
        Optional<SqlRowSet> opt = sqlPostRepository.getPostById(postId);
        
        JsonObject jsonObject = null;
        if(opt.isEmpty()){
            jsonObject = Json.createObjectBuilder()
                .add("error", "unable to retrieve post")
                .build();
        } else {
            jsonObject = rsToJson(opt.get());
        }
        return jsonObject;
    }

    // public JsonArray getPostsByPlaceId(String placeId) {
    //     List<Document> posts = mongoPostRepository.getPostsByPlaceId(placeId);
    //     JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
    //     for(Document d: posts) {
    //         JsonObject jObject = Json.createReader(new StringReader(d.toJson())).readObject();
    //         jArrayBuilder.add(jObject);
    //     }

    //     return jArrayBuilder.build();
    // }

    @Transactional
    public void createPost(String postId, 
        String post, String place, List<String> endpointUrls) 
        throws DataAccessException, FirebaseAuthException{
        // TODO change this back
        // String dsplayName = userService.getDisplayName();
        Post p = Post.jsonToPost(post, "test", "testing",  postId, endpointUrls);
        Place pl = Place.jsonToPlace(place);

        if(!sqlPlaceRepository.placeExists(pl.getPlaceId())){
            sqlPlaceRepository.createPlace(pl);
        } else {
            sqlPlaceRepository.incrementPostCount(pl.getPlaceId());
        }
        sqlPostRepository.createPost(p);

        // TODO change this back!! don't need this anymore i think....
        // mongoPostRepository.newPost(postId, "test");
    }

    public int updatePostById(String postId, String payload) {
        JsonObject jObject = Json.createReader(new StringReader(payload)).readObject();
        return sqlPostRepository.updatePost(postId, 
                jObject.getInt("rating"), 
                jObject.getString("review"));
                
    }

    @Transactional
    public boolean deletePostById(String postId, String placeId) throws DataAccessException{
        int rowUpdated = sqlPostRepository.deletePostById(postId);
        int placeUpdated = sqlPlaceRepository.incrementPostCount(placeId);
        // TODO remove post id from mongo
        // long modifiedCount = mongoPostRepository.deletePostById(postId, "test");

        if(rowUpdated == 1 && placeUpdated == 1) {
            return true;
        }
        return false;
    }

    public JsonObject rsToJson(SqlRowSet rs) {
        String imageChain = rs.getString("images").substring(1);

        JsonObject jObject = Json.createObjectBuilder()
                .add("userId", rs.getString("user_id"))
                .add("displayName", rs.getString("display_name"))
                .add("rating", rs.getInt("rating"))
                .add("review", rs.getString("review"))
                .add("images", imageChain)
                .add("placeId", rs.getString("place_id"))
                .add("name", rs.getString("name"))
                .add("address", rs.getString("address"))
                .add("area", rs.getString("area"))
                .add("lat", rs.getBigDecimal("lat"))
                .add("lng", rs.getBigDecimal("lng"))
                .build();

        return jObject;
    }
}
