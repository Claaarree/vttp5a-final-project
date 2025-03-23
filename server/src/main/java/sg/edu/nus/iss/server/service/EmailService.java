package sg.edu.nus.iss.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.google.api.client.util.Value;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMessage.RecipientType;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") 
    private String sender;

    public String sendSimpleEmail(String link, String emailTo) throws MessagingException {
        MimeMessage mailMessage = javaMailSender.createMimeMessage();

        mailMessage.setFrom(sender);
        mailMessage.setRecipients(RecipientType.TO, emailTo);
        String htmlContent = """
            <img src="/CiakWhere.svg"> ChiakWhere?
            <div>
            <h1>
                Welcome to ChiakWhere!
            </h1>
            <h3>
                Saving you the trouble of wondering where to chiak!
            </h3>
            <p>
                Please click on the following link to verify your email. You can begin using the app afterwards!
            </p>
            <a href="%s">Verify Your Email By Clicking Here!</a>
            </div>
            """.formatted(link);
        mailMessage.setContent(htmlContent, "text/html; charset=utf-8");
    
        mailMessage.setSubject("Verify your email");

        try {
            javaMailSender.send(mailMessage);
            return "Mail sent successfully...";
        } catch (Exception e) {
            return "Failed to send mail...";
        }
    }



}
