package sg.edu.nus.iss.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") 
    private String sender;

    public String sendSimpleEmail(String link, String emailTo) throws MessagingException {
        MimeMessage mailMessage = javaMailSender.createMimeMessage();
        // mailMessage.setFrom(sender);
        MimeMessageHelper helper = new MimeMessageHelper(mailMessage, true);

        helper.setFrom(sender);
        helper.setTo(emailTo);
        helper.setSubject("Verify your email"); 
        
        String htmlContent = """
            <img width="50px" src="https://lfhc06mar.sgp1.digitaloceanspaces.com/CiakWhere.svg"> ChiakWhere?
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

        helper.setText(htmlContent, true);
        // File logo = new File("server\\src\\main\\resources\\static\\CiakWhere.svg");
        // helper.addInline("CiakWhere.svg", logo);
        // mailMessage.setContent(htmlContent, "text/html; charset=utf-8");
    

        try {
            javaMailSender.send(mailMessage);
            return "Mail sent successfully...";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send mail...";
        }
    }



}
