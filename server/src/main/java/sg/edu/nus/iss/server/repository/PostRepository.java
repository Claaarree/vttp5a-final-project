package sg.edu.nus.iss.server.repository;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import static sg.edu.nus.iss.server.utils.MongoDbConstants.C_POSTS;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F_PLACE_ID;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F_POST_ID;

import java.util.List;

@Repository
public class PostRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Document getPostById(String postId) {
        Criteria criteria = Criteria.where(F_POST_ID)
                .is(postId);
        Query query = Query.query(criteria);
        Document post = mongoTemplate.findOne(query, Document.class, C_POSTS);

        return post;
    }

    public List<Document> getPostsByPlaceId(String placeId) {
        Criteria criteria = Criteria.where(F_PLACE_ID)
                .is(placeId);
        Query query = Query.query(criteria);
        List<Document> posts = mongoTemplate.find(query, Document.class, C_POSTS);

        return posts;
    }

    public void createPost(Document post) {
        mongoTemplate.insert(post, C_POSTS);
    }

    // TODO think about how to update....
    // public void updatePostById(String postId) {
    //     Query query = Query.query(Criteria.where(F_POST_ID).is(postId));
    //     Update updateOps = 
    //     mongoTemplate.up
    // }

    public long deletePostById(String postId) {
        Query query = Query.query(Criteria.where(F_POST_ID).is(postId));
        return mongoTemplate.remove(query, Document.class, C_POSTS).getDeletedCount();
    }


}
