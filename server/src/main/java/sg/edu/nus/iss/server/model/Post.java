package sg.edu.nus.iss.server.model;

import java.io.StringReader;
import java.util.Date;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Post {
    private String postId;
    private int rating;
    private String review;
    private String images;
    private String placeId;
    private Date postDate;
    
    public String getPostId() {
        return postId;
    }
    public void setPostId(String postId) {
        this.postId = postId;
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
    public String getImages() {
        return images;
    }
    public void setImages(String images) {
        this.images = images;
    }
    public String getPlaceId() {
        return placeId;
    }
    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }
    public Date getPostDate() {
        return postDate;
    }
    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public static Post jsonToPost(String post, String postId, List<String>endpointUrls) {
        Post p = new Post();
        JsonObject jsonObject = Json
                .createReader(new StringReader(post))
                .readObject();

        p.setPostId(postId);
        p.setRating(jsonObject.getInt("rating"));
        p.setReview(jsonObject.getString("review"));
        StringBuilder sb = new StringBuilder();
        for(String s : endpointUrls) {
            sb.append("|" + s);
        }
        String images = sb.toString();
        p.setImages(images);
        p.setPlaceId(jsonObject.getString("placeId"));
        p.setPostDate(new Date());

        return p;
    }

    
}
