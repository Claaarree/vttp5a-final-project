package sg.edu.nus.iss.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import sg.edu.nus.iss.server.components.AuthenticatedUserIdProvider;
import sg.edu.nus.iss.server.model.NotificationMessage;
import sg.edu.nus.iss.server.repository.MongoPostRepository;

@Service
public class FirebaseMessagingService {
    
    @Autowired
    private FirebaseMessaging firebaseMessaging;

    @Autowired
    private MongoPostRepository mongoPostRepository;

    @Autowired
    private AuthenticatedUserIdProvider authenticatedUserIdProvider;

    public void sendNotification(NotificationMessage notif) {
       
        Notification notification = Notification
                .builder()
                .setTitle(notif.getTitle())
                .setBody(notif.getBody())
                .build();

        Message message = Message
                .builder()
                .setTopic(notif.getRecipient())
                .setNotification(notification)
                .build();

        try {
            firebaseMessaging.send(message);
                System.out.println("Sent notification!");
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            System.out.println("Failed to send notification!");
        }
    }

    public void saveFCMToken(String token) throws FirebaseMessagingException {
        // TODO change this back!
        String userId = authenticatedUserIdProvider.getUserId();
        mongoPostRepository.newFCMToken(token, userId);
        subscribeTopic(token, userId);
    }

    public void subscribeTopic(String token, String userId) throws FirebaseMessagingException {
        System.out.println("in subscribe: " + token);
        System.out.println("userId: " + userId);
        firebaseMessaging.subscribeToTopic(List.of(token), userId);
    }
}
