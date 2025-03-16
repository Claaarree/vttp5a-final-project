package sg.edu.nus.iss.server.service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${do.storage.bucket}")
    private String bucket;

    @Value("${do.storage.endpoint}")
    private String endPoint;

    public List<String> upload (String postId, MultipartFile... files) throws IOException{
        Map<String, String> metaData = Map.of(
            "postId", postId,
            "uploadDateTime", String.valueOf(System.currentTimeMillis())
        );

        List<String> endpointUrls  = new ArrayList<>();

        for(MultipartFile f : files) {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(f.getContentType());
            objectMetadata.setContentLength(f.getSize());
            objectMetadata.setUserMetadata(metaData);
            String originalFileName = f.getOriginalFilename();
            String finalFileName = URLEncoder.encode(originalFileName, StandardCharsets.UTF_8);
            
            PutObjectRequest putObjectRequest = 
                    new PutObjectRequest(bucket, 
                            "test/" + finalFileName, 
                            f.getInputStream(), 
                            objectMetadata);
    
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3.putObject(putObjectRequest);
    
            String endpointUrl = "https://%s.%s/%s"
                    .formatted(bucket, endPoint, "test/" + finalFileName);
            
            endpointUrls.add(endpointUrl);
    
            System.out.println(endpointUrl);
        }       

        return endpointUrls;
    }
}
