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
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F_POST_ID;
import static sg.edu.nus.iss.server.utils.MongoDbConstants.F__ID;

import java.util.List;

@Repository
public class MongoPostRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void newPost(String postId, String uid) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Update updateOps = new Update()
                .push(F_POST_ID, postId);

        mongoTemplate.upsert(query, updateOps, C_INFORMATION);
    }

    public long deletePostById(String postId, String userId) {
        Query query = Query.query(Criteria.where(F__ID).is(userId));
        Update updateOps = new Update()
            .pull(F_POST_ID, postId);
        return mongoTemplate.updateFirst(query, updateOps, C_INFORMATION).getModifiedCount();
    }

    public void newFCMToken(String token, String uid) {
        Query query = Query.query(Criteria.where(F__ID).is(uid));
        Update updateOps = new Update()
                .addToSet(F_DEVICES, token);

        mongoTemplate.upsert(query, updateOps, C_INFORMATION);
    }


}
