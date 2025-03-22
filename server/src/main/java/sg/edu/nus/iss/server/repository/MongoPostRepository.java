package sg.edu.nus.iss.server.repository;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import static sg.edu.nus.iss.server.utils.MongoDbConstants.C_INFORMATION;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F_PLACE_ID;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F_POST_ID;

import java.util.List;

@Repository
public class MongoPostRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    // public Document getImagesByPostId(String postId, String uid) {
    //     Criteria criteria = Criteria.where("_id")
    //             .is("test");
    //     Query query = Query.query(criteria);
    //     Document images = mongoTemplate.findOne(query, Document.class, C_INFORMATION);

    //     return images;
    // }

    public List<Document> getPostsByPlaceId(String placeId) {
        Criteria criteria = Criteria.where(F_PLACE_ID)
                .is(placeId);
        Query query = Query.query(criteria);
        List<Document> posts = mongoTemplate.find(query, Document.class, C_INFORMATION);

        return posts;
    }

    public void newPost(String postId, String uid) {
        Query query = Query.query(Criteria.where("_id").is(uid));
        Update updateOps = new Update()
                .push("post_ids", postId);

        mongoTemplate.upsert(query, updateOps, "information");
    }

    // TODO think about how to update....
    // public void updatePostById(String postId) {
    //     Query query = Query.query(Criteria.where(F_POST_ID).is(postId));
    //     Update updateOps = 
    //     mongoTemplate.up
    // }

    public long deletePostById(String postId) {
        Query query = Query.query(Criteria.where(F_POST_ID).is(postId));
        return mongoTemplate.remove(query, Document.class, C_INFORMATION).getDeletedCount();
    }


}
