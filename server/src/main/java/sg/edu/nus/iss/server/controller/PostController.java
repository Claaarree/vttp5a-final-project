package sg.edu.nus.iss.server.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
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
        try {
            JsonObject jObject = postService.getPostById(postId);
            
            return ResponseEntity.ok(jObject.toString());
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            JsonObject error = Json.createObjectBuilder()
                    .add("message", "Oops an error occurred... Please try again later!")
                    .build();
            
            return ResponseEntity.badRequest().body(error.toString());
        }
    }

    @GetMapping("/posts/{userId}")
    public ResponseEntity<String> getAllPostsByUserId(@PathVariable String userId) {
        try {
            JsonArray jArray = postService.getAllPostsByUserId(userId);
            if(jArray.isEmpty()){
                JsonObject empty = Json.createObjectBuilder()
                    .add("message", "This user has no posts yet!")
                    .build();
            
                return ResponseEntity.ok().body(empty.toString());
            } else {
                return ResponseEntity.ok().body(jArray.toString());
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            JsonObject error = Json.createObjectBuilder()
                    .add("message", "Oops an error occurred... Please try again later!")
                    .build();
            
            return ResponseEntity.badRequest().body(error.toString());
        }
    }

    // TODO
    @PostMapping(path = "/post/new", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createPost(@RequestPart String post, @RequestPart String place,
    @RequestParam(name = "data") MultipartFile... file) throws IOException {
        // System.out.println("XXXXXXX");
        // System.out.println(post + " " + file[0].getOriginalFilename() + " " + place);
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
            e.printStackTrace();
            System.out.println(e.getMessage());
            JsonObject error = Json.createObjectBuilder()
                    .add("message", "Oops the post could not be created... Please try again later!")
                    .build();
            return ResponseEntity.badRequest().body(error.toString());
        }
    }

    @PutMapping(path = "/post/update/{postId}")
    public ResponseEntity<String> updatePost(@PathVariable String postId, 
    @RequestBody String payload) {
        System.out.println("postid"+postId);
        JsonObjectBuilder jObjectBuilder = Json.createObjectBuilder();
        int updatedRows = 0;
        try {
            updatedRows = postService.updatePostById(postId, payload);
            
            if (updatedRows == 1){
                jObjectBuilder.add("message", "The post has successfully been updated!");
            }
            return ResponseEntity.ok(jObjectBuilder.build().toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        jObjectBuilder.add("message", "Hmm there seems to be an issue updating... Please try again later!");
        return ResponseEntity.badRequest().body(jObjectBuilder.build().toString());
       
    }

    @DeleteMapping(path = "/post/delete/{postId}") 
    public ResponseEntity<String> deletePost(@PathVariable String postId, @RequestParam String placeId) {
        JsonObjectBuilder jObjectBuilder = Json.createObjectBuilder();
        try {
            boolean isDeleted = postService.deletePostById(postId, placeId);
            if (isDeleted){
                jObjectBuilder.add("message", "The post has successfully been deleted!");
                return ResponseEntity.ok(jObjectBuilder.build().toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        jObjectBuilder.add("message", "Hmm there seems to be an issue deleting... Please try again later!");
        return ResponseEntity.badRequest().body(jObjectBuilder.build().toString());
    }

    @PostMapping("/post/save") 
    public ResponseEntity<String> savePost(@RequestBody String post) {
        try {
            postService.savePost(post);
            return ResponseEntity.ok("{}");
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/post/unsave")
    public ResponseEntity<String> unsavePost(@RequestBody String postId) {
        try {
            postService.unsavePost(postId);
            return ResponseEntity.ok("{}");
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
