package sg.edu.nus.iss.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;

import sg.edu.nus.iss.server.components.AuthenticatedUserIdProvider;

@Service
public class UserService {

    // private final FirebaseAuth firebaseAuth;
    // private final AuthenticatedUserIdProvider authenticatedUserIdProvider;

    // public UserService(FirebaseAuth firebaseAuth, AuthenticatedUserIdProvider authenticatedUserIdProvider) {
    //     this.firebaseAuth = firebaseAuth;
    //     this.authenticatedUserIdProvider = authenticatedUserIdProvider;
    // }

    @Autowired
    private FirebaseAuth firebaseAuth;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticatedUserIdProvider authenticatedUserIdProvider;
    
    public void createUser(String email, String password, String username) throws FirebaseAuthException {
        CreateRequest request = new CreateRequest();
        request.setEmail(email);
        request.setPassword(password);
        request.setDisplayName(username);
        // TODO maybe implement email verification?
        request.setEmailVerified(Boolean.FALSE);
        
        try {
            firebaseAuth.createUser(request);
            sendVerificationEmail(email);
        } catch (FirebaseException e) {
            if (e.getMessage().contains("EMAIL_EXISTS")) {
                System.out.println("Account already exists!");
            }
        }
    }

    public void sendVerificationEmail(String email) throws FirebaseAuthException {
        String link = firebaseAuth.generateEmailVerificationLink(email);
        emailService.sendSimpleEmail(link);
    }

    public void logout() throws FirebaseAuthException {
        String userId = authenticatedUserIdProvider.getUserId();
        firebaseAuth.revokeRefreshTokens(userId);
    }

    public UserRecord retrieve() throws FirebaseAuthException {
        String userId = authenticatedUserIdProvider.getUserId();
        return firebaseAuth.getUser(userId);
    }
}
