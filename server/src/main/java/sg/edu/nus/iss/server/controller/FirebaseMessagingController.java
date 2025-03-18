package sg.edu.nus.iss.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RequestMapping("/api/messaging")
public class FirebaseMessagingController {
    
    @PostMapping("/token")
    public ResponseEntity<String> postMethodName(@RequestBody String token) {
        System.out.println("FCM token: " + token);
        return ResponseEntity.ok("in backend");
    }
    
}
