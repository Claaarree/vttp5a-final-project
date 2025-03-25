package sg.edu.nus.iss.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import sg.edu.nus.iss.server.model.NotificationMessage;
import sg.edu.nus.iss.server.service.FirebaseMessagingService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RequestMapping("/api/messaging")
public class FirebaseMessagingController {

    @Autowired
    private FirebaseMessagingService firebaseMessagingService;
    
    @PostMapping("/token")
    public ResponseEntity<String> saveFCMToken(@RequestBody String token) {
        System.out.println("FCM token: " + token);
        JsonObjectBuilder jObjectBuilder = Json.createObjectBuilder();
        try {
            firebaseMessagingService.saveFCMToken(token);
            jObjectBuilder.add("message", "Your token has been saved!");
            return ResponseEntity.ok().body(jObjectBuilder.build().toString());
        } catch (Exception e) {
            // TODO: handle exception
            jObjectBuilder.add("message", e.getMessage());
            return ResponseEntity.badRequest().body(jObjectBuilder.build().toString());
        }
        // TODO change this
        // NotificationMessage notificationMessage = new NotificationMessage();
        // notificationMessage.setRecipientToken(token);
        // notificationMessage.setTitle("Success");
        // notificationMessage.setBody("Got your token!");
        // JsonObject response = firebaseMessagingService.sendNotificationByToken(notificationMessage);
        // return ResponseEntity.ok(response.toString());
    }
    
}
