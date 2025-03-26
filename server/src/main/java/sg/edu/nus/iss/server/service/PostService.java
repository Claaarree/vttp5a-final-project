package sg.edu.nus.iss.server.service;

import java.io.StringReader;
import java.util.List;
import java.util.Optional;

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
import sg.edu.nus.iss.server.components.AuthenticatedUserIdProvider;
import sg.edu.nus.iss.server.model.NotificationMessage;
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

    @Autowired
    private FirebaseMessagingService firebaseMessagingService;

    

    public JsonObject getPostById(String postId) throws DataAccessException{
        Optional<SqlRowSet> opt = sqlPostRepository.getPostById(postId);
        
        JsonObject jsonObject = null;
        if(opt.isEmpty()){
            jsonObject = Json.createObjectBuilder()
                .add("error", "Unable to retrieve post")
                .build();
        } else {
            jsonObject = rsToJson(opt.get());
        }
        return jsonObject;
    }

    public JsonArray getPostsByPlaceId(String placeId) throws DataAccessException {
        SqlRowSet rs = sqlPostRepository.getPostsByPlaceId(placeId);
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        
        while(rs.next()){
            jArrayBuilder.add(rsToJson(rs));
        }

        return jArrayBuilder.build();
    }

    public JsonArray getAllPostsByUserId(String userId) throws DataAccessException {
        SqlRowSet rs = sqlPostRepository.getAllPostsByUserId(userId);
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        while (rs.next()) {
            JsonObject jObject = rsToJson(rs);
            jArrayBuilder.add(jObject);
        }

        return jArrayBuilder.build();
    }

    public JsonArray getRecentPosts() {
        String userId = authenticatedUserIdProvider.getUserId();
        Optional<List<String>> followed = mongoPostRepository.getFollowed(userId);
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        if(followed.isPresent()){
            for(String s: followed.get()) {
                SqlRowSet rs = sqlPostRepository.getRecentPostsByUserId(s);
                while(rs.next()) {
                    JsonObject jObject = rsToJson(rs);
                    jArrayBuilder.add(jObject);
                }
            } 
        }
        return jArrayBuilder.build();
    }

    public JsonArray getSaved() {
        String userId = authenticatedUserIdProvider.getUserId();
        List<String> saved = mongoPostRepository.getSaved(userId);
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        if(saved != null){
            for(String s: saved) {               
                Optional<SqlRowSet> opt = sqlPostRepository.getPostById(s);
                if(opt.isPresent()){
                    SqlRowSet rs = opt.get();               
                    JsonObject jObject = rsToJson(rs);
                    jArrayBuilder.add(jObject);
                }
            } 
        }
        return jArrayBuilder.build();
    }

    public JsonArray getFollowed() {
        String userId = authenticatedUserIdProvider.getUserId();
        Optional<List<String>> followed = mongoPostRepository.getFollowed(userId);
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        if(followed.isPresent()){
            for(String s: followed.get()) {
                JsonObject name = sqlPostRepository.getDisplayName(s);
                System.out.println(name);
                jArrayBuilder.add(name);
            } 
        }
        return jArrayBuilder.build();

    }

    @Transactional
    public void createPost(String postId, 
        String post, String place, List<String> endpointUrls) 
        throws DataAccessException, FirebaseAuthException{
        // TODO change this back
        String userId = authenticatedUserIdProvider.getUserId();
        String displayName = userService.getDisplayName();
        Post p = Post.jsonToPost(post, userId, displayName,  postId, endpointUrls);
        Place pl = Place.jsonToPlace(place);
        Boolean placeExists = sqlPlaceRepository.placeExists(pl.getPlaceId());
            
        if(!placeExists){
            sqlPlaceRepository.createPlace(pl);
        } else {
            sqlPlaceRepository.incrementPostCount(pl.getPlaceId());
        }
        sqlPostRepository.createPost(p);
    }

    public int updatePostById(String postId, String payload) throws DataAccessException{
        JsonObject jObject = Json.createReader(new StringReader(payload)).readObject();
        return sqlPostRepository.updatePost(postId, 
                jObject.getInt("rating"), 
                jObject.getString("review"));
                
    }

    @Transactional
    public boolean deletePostById(String postId, String placeId) throws DataAccessException{
        int rowUpdated = sqlPostRepository.deletePostById(postId);
        int placeUpdated = sqlPlaceRepository.incrementPostCount(placeId);

        if(rowUpdated == 1 && placeUpdated == 1) {
            return true;
        }
        return false;
    }

    public void savePost(String post) throws FirebaseAuthException {
        JsonObject jObject = Json.createReader(new StringReader(post)).readObject();
        String postId = jObject.getString("postId");
        // save to mongo
        String userId = authenticatedUserIdProvider.getUserId();
        this.mongoPostRepository.savePost(userId, postId);
        
        // send notification to recipient
        String displayName = userService.getDisplayName();
        NotificationMessage notif = new NotificationMessage();
        notif.setTitle("You have received a like");
        notif.setBody("@%s has saved your post on %s".formatted(displayName, jObject.getString("name")));
        notif.setRecipient(jObject.getString("userId"));
        firebaseMessagingService.sendNotification(notif);
        
    }

    public void unsavePost(String postId) {
        // remove from mongo
        String userId = authenticatedUserIdProvider.getUserId();
        this.mongoPostRepository.unsavePost(userId, postId);
    }

    public void followUser(String recipient) throws FirebaseAuthException {
        String userId = authenticatedUserIdProvider.getUserId();
        mongoPostRepository.follow(userId, recipient);

        String displayName = userService.getDisplayName();
        NotificationMessage notif = new NotificationMessage();
        notif.setTitle("You have a new follow!");
        notif.setBody("@%s has started following you!".formatted(displayName));
        notif.setRecipient(recipient);
        firebaseMessagingService.sendNotification(notif);
    }

    public void unfollowUser(String recipient) {
        String userId = authenticatedUserIdProvider.getUserId();
        mongoPostRepository.unfollow(userId, recipient);
    }

    public static JsonObject rsToJson(SqlRowSet rs) {
        String imageChain = rs.getString("images").substring(1);

        JsonObject jObject = Json.createObjectBuilder()
                .add("postId", rs.getString("post_id"))
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
                .add("postDate", rs.getDate("post_date").getTime())
                .build();

        return jObject;
    }

}
