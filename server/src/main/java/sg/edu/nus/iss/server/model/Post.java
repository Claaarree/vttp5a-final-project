package sg.edu.nus.iss.server.model;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class Post {
    private String postId;
    private List<MultipartFile> file;
    private String review;
    private int rating;
    private String placeId;
    private String address;
    private String area;
    private Date postDate;
    
    public String getPostId() {
        return postId;
    }
    public void setPostId(String postId) {
        this.postId = postId;
    }
    public List<MultipartFile> getFile() {
        return file;
    }
    public void setFile(List<MultipartFile> file) {
        this.file = file;
    }
    public String getReview() {
        return review;
    }
    public void setReview(String review) {
        this.review = review;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public String getPlaceId() {
        return placeId;
    }
    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getArea() {
        return area;
    }
    public void setArea(String area) {
        this.area = area;
    }
    public Date getPostDate() {
        return postDate;
    }
    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    
}
