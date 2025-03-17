package sg.edu.nus.iss.server.service;

import java.io.StringReader;
import java.util.List;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
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

    public Document getPostById(String postId) {
        return mongoPostRepository.getImagesByPostId(postId, "test");
    }

    public JsonArray getPostsByPlaceId(String placeId) {
        List<Document> posts = mongoPostRepository.getPostsByPlaceId(placeId);
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        for(Document d: posts) {
            JsonObject jObject = Json.createReader(new StringReader(d.toJson())).readObject();
            jArrayBuilder.add(jObject);
        }

        return jArrayBuilder.build();
    }

    @Transactional
    public void createPost(String postId, 
        String post, String place, List<String> endpointUrls) 
        throws DataAccessException{
            
        Post p = Post.jsonToPost(post, postId, endpointUrls);
        Place pl = Place.jsonToPlace(place);

        sqlPlaceRepository.createPlace(pl);
        sqlPostRepository.createPost(p);

        // TODO change this back!!
        // String userId = authenticatedUserIdProvider.getUserId();
        mongoPostRepository.newPost(postId, "test");
    }

    // TODO update

    public long deletePostById(String postId) {
        return mongoPostRepository.deletePostById(postId);
    }
}
