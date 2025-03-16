package sg.edu.nus.iss.server.service;

import java.io.StringReader;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.server.repository.PostRepository;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;

    public Document getPostById(String postId) {
        return postRepository.getPostById(postId);
    }

    public JsonArray getPostsByPlaceId(String placeId) {
        List<Document> posts = postRepository.getPostsByPlaceId(placeId);
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        for(Document d: posts) {
            JsonObject jObject = Json.createReader(new StringReader(d.toJson())).readObject();
            jArrayBuilder.add(jObject);
        }

        return jArrayBuilder.build();
    }

    public void createPost(String postId) {
        Document d = new Document();
        
    }

    // TODO update

    public long deletePostById(String postId) {
        return postRepository.deletePostById(postId);
    }
}
