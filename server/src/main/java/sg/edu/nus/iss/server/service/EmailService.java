package sg.edu.nus.iss.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.google.api.client.util.Value;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") 
    private String sender;

    public String sendSimpleEmail(String link) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(sender);
        mailMessage.setTo("clare.fh@hotmail.com");
        mailMessage.setText("hello! this is a test!" + link);
        mailMessage.setSubject("Test test");

        try {
            javaMailSender.send(mailMessage);
            return "Mail sent successfully...";
        } catch (Exception e) {
            return "Failed to send mail...";
        }
    }

}
