package sg.edu.nus.iss.server.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.server.model.Place;
import sg.edu.nus.iss.server.repository.MySQLPlaceRepository;

@Service
public class PlaceService {
    
    @Autowired
    private MySQLPlaceRepository placeRepository;

    public JsonArray getTopPlaces(int offset) throws DataAccessException {
        SqlRowSet rs = placeRepository.getTopPlaces(offset);
        JsonArrayBuilder jArrayBuilder = Json.createArrayBuilder();
        while(rs.next()) {
            JsonObject jObject = Place.rsToJson(rs);
            jArrayBuilder.add(jObject);
        }

        return jArrayBuilder.build();
    }

    public Optional<JsonObject> getPlaceByPlaceId(String placeId) throws DataAccessException{
        SqlRowSet rs = placeRepository.getPlaceByPlaceId(placeId);
        if(rs.next()){
            JsonObject jObject = Place.rsToJson(rs);
            return Optional.of(jObject);
        } else{
            return Optional.empty();
        }
    }
}
