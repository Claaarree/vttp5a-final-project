package sg.edu.nus.iss.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.server.model.NotificationMessage;

@Service
public class FirebaseMessagingService {
    
    @Autowired
    private FirebaseMessaging firebaseMessaging;

    public JsonObject sendNotificationByToken(NotificationMessage notificationMessage) {
       
        Notification notification = Notification
                .builder()
                .setTitle(notificationMessage.getTitle())
                .setBody(notificationMessage.getBody())
                .build();

        Message message = Message
                .builder()
                .setToken(notificationMessage.getRecipientToken())
                .setNotification(notification)
                .build();

        try {

            firebaseMessaging.send(message);
            JsonObject success = Json.createObjectBuilder()
                .add("message", "success")
                .build();
            return success;
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            JsonObject failure = Json.createObjectBuilder()
                .add("message", "failure")
                .build();
            return failure;
        }
    }
}
