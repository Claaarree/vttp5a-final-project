package sg.edu.nus.iss.server.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.server.service.PostService;
import sg.edu.nus.iss.server.service.S3Service;

@Controller
@RequestMapping("/api")
public class PostController {
    
    @Autowired
    private PostService postService;

    @Autowired
    private S3Service s3Service;

    @GetMapping(path = "/post/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getPostById(@PathVariable String postId) {
        JsonObject jObject = postService.getPostById(postId);
        return ResponseEntity.ok(jObject.toString());
    }

    @GetMapping(path = "/posts/{placeId}")
    public ResponseEntity<String> getPostsByPlaceId(@PathVariable String placeId) {
        JsonArray posts = postService.getPostsByPlaceId(placeId);
        return ResponseEntity.ok(posts.toString());
    }

    // TODO
    @PostMapping(path = "/post/new", produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> createPost(@RequestPart String post, @RequestPart String place,
    @RequestParam(name = "data") MultipartFile... file) throws IOException {
        System.out.println("XXXXXXX");
        System.out.println(post + " " + file[0].getOriginalFilename() + " " + place);
        // {"rating":3,"review":"test","placeId":"ChIJ7cXuxpYZ2jERPmwg_xdxMsE"} 
        // Crochet mini cameilla.png 
        // {"placeId":"ChIJ7cXuxpYZ2jERPmwg_xdxMsE","name":"Hellu Coffee","formattedAddress":"137 Amoy St, #01-05 Far East Square, Singapore 049965","lat":1.2833573,"lng":103.8484733}
        String postId = UUID.randomUUID().toString().substring(0, 8);
        
        try {
            List<String> endpointUrls = s3Service.upload(postId, file);
            postService.createPost(postId, post, place, endpointUrls);

            JsonObject jObject = Json.createObjectBuilder()
                    .add("postId", postId)
                    .build();

            return ResponseEntity.ok(jObject.toString());
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
            // TODO change the body of the response entity
        }
    }

    // TODO update

    // TODO handle errors?
    @DeleteMapping(path = "/delete/{postId}") 
    public ResponseEntity<String> deletePost(@PathVariable String postId) {
        long deletedCount = postService.deletePostById(postId);
        return ResponseEntity.ok(String.valueOf(deletedCount));
    }
}
