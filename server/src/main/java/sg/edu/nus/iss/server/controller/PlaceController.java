package sg.edu.nus.iss.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.server.service.PlaceService;
import sg.edu.nus.iss.server.service.PostService;

@RestController
@RequestMapping("/api/places")
public class PlaceController {
    
    @Autowired
    private PlaceService placeService;

    @Autowired
    private PostService postService;

    @GetMapping("/list")
    public ResponseEntity<String> getAllPlaces( 
        @RequestParam(defaultValue = "0") int offset) {
        try {
            JsonArray jArray = placeService.getTopPlaces(offset);
            return ResponseEntity.ok().body(jArray.toString());
        } catch (Exception e) {
            JsonObject error = Json.createObjectBuilder()
                    .add("message", "Oops there seems to be something wrong... Please try again later!")
                    .build();

            return ResponseEntity.badRequest().body(error.toString());
        }
    }

    @GetMapping("/{placeId}")
    public ResponseEntity<String> getPostByPlaceId(@PathVariable String placeId) {
        try {
            JsonArray jArray = postService.getPostsByPlaceId(placeId);
            if (jArray.isEmpty()) {
                JsonObject none = Json.createObjectBuilder()
                    .add("message", "There are no posts made on this place...")
                    .build();
                return ResponseEntity.ok().body(none.toString());
            } else {
                return ResponseEntity.ok().body(jArray.toString());
            }
            
        } catch (Exception e) {
            JsonObject error = Json.createObjectBuilder()
                    .add("message", "Oops there seems to be something wrong... Please try again later!")
                    .build();
            return ResponseEntity.ok().body(error.toString());
        }
    }
}
