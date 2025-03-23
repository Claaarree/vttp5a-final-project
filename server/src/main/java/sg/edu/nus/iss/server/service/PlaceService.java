package sg.edu.nus.iss.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import jakarta.json.JsonArray;
import sg.edu.nus.iss.server.repository.MySQLPlaceRepository;

@Service
public class PlaceService {
    
    @Autowired
    private MySQLPlaceRepository placeRepository;

    public JsonArray getTopPlaces(String area, int offset) {
        SqlRowSet rs = placeRepository.getTopPlaces(area, offset);

        return null;
    }
}
