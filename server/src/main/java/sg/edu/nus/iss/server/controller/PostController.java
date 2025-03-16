package sg.edu.nus.iss.server.controller;

import java.io.IOException;
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

import jakarta.json.JsonArray;
import sg.edu.nus.iss.server.service.PostService;
import sg.edu.nus.iss.server.service.S3Service;

@Controller
@RequestMapping("/api")
public class PostController {
    
    @Autowired
    private PostService postService;

    @Autowired
    private S3Service s3Service;

    @GetMapping(path = "/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getPostById(@PathVariable String postId) {
        Document post = postService.getPostById(postId);
        return ResponseEntity.ok(post.toJson());
    }

    @GetMapping(path = "/posts/{placeId}")
    public ResponseEntity<String> getPostsByPlaceId(@PathVariable String placeId) {
        JsonArray posts = postService.getPostsByPlaceId(placeId);
        return ResponseEntity.ok(posts.toString());
    }

    // TODO
    @PostMapping(path = "/post/new", produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> createPost(@RequestPart String p, 
    @RequestParam(name = "data") MultipartFile... file) throws IOException {
        System.out.println("XXXXXXX");
        System.out.println(p + " " + file[0].getOriginalFilename());
        s3Service.upload("testest", file);
        // TODO change the body of the response entity
        return ResponseEntity.ok("reached the backend!!");
    }

    // TODO update

    // TODO handle errors?
    @DeleteMapping(path = "/delete/{postId}") 
    public ResponseEntity<String> deletePost(@PathVariable String postId) {
        long deletedCount = postService.deletePostById(postId);
        return ResponseEntity.ok(String.valueOf(deletedCount));
    }
}
