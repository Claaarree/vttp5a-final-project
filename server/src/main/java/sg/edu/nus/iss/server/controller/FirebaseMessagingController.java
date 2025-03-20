package sg.edu.nus.iss.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.json.JsonObject;
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
    public ResponseEntity<String> postMethodName(@RequestBody String token) {
        System.out.println("FCM token: " + token);
        // TODO change this
        NotificationMessage notificationMessage = new NotificationMessage();
        notificationMessage.setRecipientToken(token);
        notificationMessage.setTitle("Success");
        notificationMessage.setBody("Got your token!");
        JsonObject response = firebaseMessagingService.sendNotificationByToken(notificationMessage);
        return ResponseEntity.ok(response.toString());
    }
    
}
