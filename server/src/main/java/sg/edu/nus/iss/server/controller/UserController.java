package sg.edu.nus.iss.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.server.service.FirebaseAuthenticationService;
import sg.edu.nus.iss.server.service.FirebaseAuthenticationService.FirebaseSignInResponse;
import sg.edu.nus.iss.server.service.FirebaseAuthenticationService.RefreshTokenResponse;
import sg.edu.nus.iss.server.service.UserService;


@RestController
@RequestMapping("/api/user")
public class UserController {
    
    // private final UserService userService;
    // private final FirebaseAuthenticationService firebaseAuthClient;

    // public UserController(UserService userService, FirebaseAuthenticationService firebaseAuthClient) {
    //     this.userService = userService;
    //     this.firebaseAuthClient = firebaseAuthClient;
    // }

    @Autowired
    private UserService userService;

    @Autowired
    private FirebaseAuthenticationService firebaseAuthClient;

    @GetMapping
    public ResponseEntity<UserRecord> getUser() throws FirebaseAuthException {
        UserRecord userRecord = userService.retrieve();
        return ResponseEntity.ok(userRecord);
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody CreateUserRequest request) throws FirebaseAuthException {
        System.out.println("in create user request");
        try {
            userService.createUser(request.email(), request.password(), request.username());
            return ResponseEntity.status(201).body("{}");
            
        } catch (Exception e) {
            // TODO: handle exception
            JsonObject error = Json.createObjectBuilder()
                .add("message", e.getMessage())
                .build();
            return ResponseEntity.badRequest().body(error.toString());
        }
    }

    // TODO remove this
    @GetMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok().body("get login");
    // "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJjNDAxN2U3MGE4MWM5NTMxY2YxYjY4MjY4M2Q5OThlNGY1NTg5MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc291bmQtdmF1bHQtNDUyNTEzLXUzIiwiYXVkIjoic291bmQtdmF1bHQtNDUyNTEzLXUzIiwiYXV0aF90aW1lIjoxNzQxNTk3MDM1LCJ1c2VyX2lkIjoiWGVEaGFQMXBtZVVzSmMxUWlzcEwyUVdoZk5OMiIsInN1YiI6IlhlRGhhUDFwbWVVc0pjMVFpc3BMMlFXaGZOTjIiLCJpYXQiOjE3NDE1OTcwMzUsImV4cCI6MTc0MTYwMDYzNSwiZW1haWwiOiJiYXJuZXlAYmFybmV5LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJhcm5leUBiYXJuZXkuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.GfNdW-f_pfGYpiv9YfMLI2LetxULPeRzCZXnkBq57IKTfaqtSbYMuTUrUnh88iXXrjFFLvvkE7hrHaJi3jHdYiFo5bppRDDK86al_PR_AI4bP6qkouyYdda9Vv70MZ6Vn838aE-tbtWzsHMhHGWhOvejgUP7gOMk80cFkhorVdTJO1INg5JznaS-oS4YBa-WVUAGYVVxeVLaquu2IIKLSj5KGECiUU1vSHu_F1by7Efsac_BnPXkOjiHNBF-t1YzXxXmoqOoVeJYVaM3qCQ_lb8-ADBX378zfOs_qFzE1Wdeenqqb8yHyo0V-eAda3XHCbwcqMss-SOUO5AD_vCARQ",
    // "refreshToken": "AMf-vBw4WR8_CDnCzeCfDFX9-sM46PrYwcStXPLBWuPMYxj5sWUjZ0yYby-aRSIrgTSBPElAkJ-kkeYYan17FcI726i8SfeSubZ8vRyd-mucSE6YfdXmuUPqY1NqvR1IIqSrWdxGJtAnds_Fdpt7Zfmwc3i18Kmh6MPYxUgd1kXzOWAQROs6oTcqaZ_1DNi6EOw0gb0ZbldiDWqEUMhBQGAlcXeWO7OOyBSezsskT98cHm3FiJgQvvY"
    }
    

    @PostMapping("/login")
    public ResponseEntity<FirebaseSignInResponse> loginUser(@RequestBody LoginUserRequest request) {
        System.out.println("in login");
        FirebaseSignInResponse response = firebaseAuthClient.login(request.email(), request.password());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        RefreshTokenResponse response = firebaseAuthClient.exchangeRefreshToken(request.refreshToken());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logoutUser() throws FirebaseAuthException {
        userService.logout();
        return ResponseEntity.ok().build();
    }

    record CreateUserRequest(String email, String password, String username) {}

    record LoginUserRequest(String email, String password) {}

    record RefreshTokenRequest(String refreshToken) {}
}
