package sg.edu.nus.iss.server.config;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.messaging.FirebaseMessaging;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() {
        FileInputStream serviceAccount = null;
        if (FirebaseApp.getApps().isEmpty()) {
            try {
                serviceAccount = new FileInputStream("sound-vault-452513-u3-firebase-adminsdk-fbsvc-6681b74e16.json");
            } catch (FileNotFoundException e) {
                System.out.println("Cannot find firebase credentials json!");
                e.printStackTrace();
            }
    
            FirebaseOptions firebaseOptions = null;
            try {
                firebaseOptions = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();
            } catch (IOException e) {
                System.out.println("Error in getting firebase apikey");
            }
            return FirebaseApp.initializeApp(firebaseOptions);
        } else {
            return FirebaseApp.getInstance();
        }
    }

    @Bean
    public FirebaseAuth firebaseAuth(FirebaseApp firebaseApp) {
        return FirebaseAuth.getInstance(firebaseApp);
    }

    @Bean
    public FirebaseMessaging firebaseMessaging(FirebaseApp firebaseApp) {
        return FirebaseMessaging.getInstance(firebaseApp);
    }
}
