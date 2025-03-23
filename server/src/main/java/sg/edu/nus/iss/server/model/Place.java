package sg.edu.nus.iss.server.model;

import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Place {
    
    private String placeId;
    private String name;
    private String address;
    private String area;
    private double lat;
    private double lng;

    public String getPlaceId() {
        return placeId;
    }
    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
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
    public double getLat() {
        return lat;
    }
    public void setLat(double lat) {
        this.lat = lat;
    }
    public double getLng() {
        return lng;
    }
    public void setLng(double lng) {
        this.lng = lng;
    }

    public static Place jsonToPlace(String place) {
        Place p = new Place();
        JsonObject jObject = Json
                .createReader(new StringReader(place))
                .readObject();

        p.setPlaceId(jObject.getString("placeId"));
        p.setName(jObject.getString("name"));
        p.setAddress(jObject.getString("address"));
        p.setArea(jObject.getString("area"));
        p.setLat(jObject.getJsonNumber("lat").doubleValue());
        p.setLng(jObject.getJsonNumber("lng").doubleValue());

        return p;
    }

    public JsonObject rsToJson() {

        return null;
    }
    
}
