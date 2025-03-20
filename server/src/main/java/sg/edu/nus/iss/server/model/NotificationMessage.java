package sg.edu.nus.iss.server.model;

public class NotificationMessage {
    private String recipientToken;
    private String title;
    private String body;

    public String getRecipientToken() {
        return recipientToken;
    }
    public void setRecipientToken(String recipientToken) {
        this.recipientToken = recipientToken;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }
    
}
