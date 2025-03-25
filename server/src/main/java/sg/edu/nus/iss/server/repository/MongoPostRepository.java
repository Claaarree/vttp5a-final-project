package sg.edu.nus.iss.server.repository;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import static sg.edu.nus.iss.server.utils.MongoDbConstants.C_INFORMATION;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F_DEVICES;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F_FOLLOWED;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F_SAVED_POSTS;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F__ID;

import java.util.List;

@Repository
public class MongoPostRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void savePost(String uid, String postId) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Update updateOps = new Update()
                .push(F_SAVED_POSTS, postId);

        mongoTemplate.upsert(query, updateOps, C_INFORMATION);
    }

    public long unsavePost(String uid, String postId) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Update updateOps = new Update()
            .pull(F_SAVED_POSTS, postId);
        return mongoTemplate.updateFirst(query, updateOps, C_INFORMATION).getModifiedCount();
    }

    public void follow(String uid, String recipient) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Update updateOps = new Update()
                .push(F_FOLLOWED, recipient);

        mongoTemplate.upsert(query, updateOps, C_INFORMATION);
    }

    public long unfollow(String uid, String recipient) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Update updateOps = new Update()
            .pull(F_FOLLOWED, recipient);
        return mongoTemplate.updateFirst(query, updateOps, C_INFORMATION).getModifiedCount();
    }

    public void newFCMToken(String token, String uid) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Update updateOps = new Update()
                .addToSet(F_DEVICES, token);

        mongoTemplate.upsert(query, updateOps, C_INFORMATION);
    }

    public List<String> getFollowed(String uid) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Document d = mongoTemplate.findOne(query, Document.class, C_INFORMATION);
        return d.getList(F_FOLLOWED, String.class);
    }

    public List<String> getSaved(String uid) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Document d = mongoTemplate.findOne(query, Document.class, C_INFORMATION);
        return d.getList(F_SAVED_POSTS, String.class);
    }

}
