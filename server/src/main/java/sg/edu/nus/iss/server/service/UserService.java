package sg.edu.nus.iss.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;

import jakarta.mail.MessagingException;
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
    
    public void createUser(String email, String password, String username) 
    throws FirebaseAuthException, MessagingException {
        CreateRequest request = new CreateRequest();
        request.setEmail(email);
        request.setPassword(password);
        request.setDisplayName(username);
        // TODO maybe implement email verification?
        request.setEmailVerified(Boolean.FALSE);
        
        firebaseAuth.createUser(request);
        sendVerificationEmail(email);
        // try {
        // } catch (FirebaseException e) {
        //     if (e.getMessage().contains("EMAIL_EXISTS")) {
        //         System.out.println("Account already exists!");
        //     }
        // } catch (MessagingException e) {
        //             // TODO Auto-generated catch block
        //             e.printStackTrace();
        // }
    }

    public void sendVerificationEmail(String email) throws FirebaseAuthException, MessagingException {
        String link = firebaseAuth.generateEmailVerificationLink(email);
        emailService.sendSimpleEmail(link, email);
    }

    public void logout() throws FirebaseAuthException {
        String userId = authenticatedUserIdProvider.getUserId();
        firebaseAuth.revokeRefreshTokens(userId);
    }

    public UserRecord retrieve() throws FirebaseAuthException {
        String userId = authenticatedUserIdProvider.getUserId();
        return firebaseAuth.getUser(userId);
    }

    public String getDisplayName() throws FirebaseAuthException {
        return retrieve().getDisplayName();
    }

}
