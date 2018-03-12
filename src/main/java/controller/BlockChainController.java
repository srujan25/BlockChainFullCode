package controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.sabre.biznet.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author imssbora
 */
@Controller
public class BlockChainController {

    private static final String COMPONENT_URL = "http://localhost:3000/api/AircraftComponents";
    private static final String AIRLINE_URL = "http://localhost:3000/api/Airline";
    private static final String SERVICE_URL = "http://localhost:3000/api/ServiceTransaction";
    private static final String VENDOR_URL = "http://localhost:3000/api/Vendor";

    @RequestMapping(path={"/"},method=RequestMethod.GET)
    public String getWelcome(Model model) {
        return "index_home";
    }

    @RequestMapping(path={"/aircraft"},method=RequestMethod.GET)
    public String getAircraftDetails(Model model) {
        return "aircraft";
    }


    @RequestMapping(path={"/aircraftsave"},method=RequestMethod.POST)
    public String saveAirCraft(@ModelAttribute("aircraft") AircraftComponents aircraft) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> componentMap = new HashMap<String, String>();
        componentMap.put("$class","org.sabre.biznet.AircraftComponents");
        componentMap.put("serialNo", aircraft.getSerialNo());
        componentMap.put("flightNo", aircraft.getFlightNo());
        componentMap.put("flightMode", aircraft.getFlightMode());
        componentMap.put("componentName", aircraft.getComponentName());
        componentMap.put("componentModel", aircraft.getComponentModel());
        componentMap.put("componentManufacturer", aircraft.getComponentManufacturer());
        componentMap.put("componentManufacturingDate", aircraft.getComponentManufacturingDate());
        componentMap.put("componentExpiryDate", aircraft.getComponentExpiryDate());
        componentMap.put("airline", "org.sabre.biznet.Airline#"+aircraft.getAirline());
        restTemplate.postForEntity(COMPONENT_URL,componentMap,String.class );
        return "aircraft";
    }

    @RequestMapping(path={"/airline"},method=RequestMethod.GET)
    public String getAirline(Model model) {
        return "airline";
    }

    @RequestMapping(path={"/airlineSave"},method=RequestMethod.POST)
    public String saveAirline(@ModelAttribute("airline") Airline airline) {

        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> componentMap = new HashMap<String, String>();
        componentMap.put("$class","org.sabre.biznet.Airline");
        componentMap.put("carrierCode", airline.getCarrierCode());
        componentMap.put("address", airline.getAddress());
        componentMap.put("fullName", airline.getFullName());
        componentMap.put("state", airline.getState());
        componentMap.put("zipcode", airline.getZipcode());
        componentMap.put("city", airline.getCity());
        componentMap.put("country", airline.getCountry());
        componentMap.put("addressType", airline.getAddressType());
        componentMap.put("phonenumber", airline.getPhonenumber());
        componentMap.put("phoneType", airline.getPhoneType());


        restTemplate.postForEntity( AIRLINE_URL,componentMap,String.class );
        return "airline";
    }

    @RequestMapping(path={"/vendor"},method=RequestMethod.GET)
    public String getVendor(Model model) {
        return "vendor";
    }

    @RequestMapping(path={"/vendorSave"},method=RequestMethod.POST)
    public String saveVendor(@ModelAttribute("vendor") Vendor vendor) {

        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> componentMap = new HashMap<String, String>();
        componentMap.put("$class","org.sabre.biznet.Vendor");
        componentMap.put("address", vendor.getAddress());
        componentMap.put("regnNo", vendor.getRegnNo());
        componentMap.put("vendorName", vendor.getVendorName());
        componentMap.put("state", vendor.getState());
        componentMap.put("zipcode", vendor.getZipcode());
        componentMap.put("city", vendor.getCity());
        componentMap.put("country", vendor.getCountry());
        componentMap.put("addressType", vendor.getAddressType());
        componentMap.put("phonenumber", vendor.getPhonenumber());
        componentMap.put("phoneType", vendor.getPhoneType());


        restTemplate.postForEntity( VENDOR_URL,componentMap,String.class );

        return "vendor";
    }

    @RequestMapping(path={"/servicerequestSave"},method=RequestMethod.POST)
    public String saveServiceRequest(@ModelAttribute("serviceTransaction") ServiceTransaction serviceTransaction) throws Exception{

        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> componentMap = new HashMap<String, String>();
        componentMap.put("$class","org.sabre.biznet.ServiceTransaction");
        componentMap.put("serialNo", serviceTransaction.getSerialNo());
        componentMap.put("flightNo", serviceTransaction.getFlightNo());
        componentMap.put("componentName", serviceTransaction.getComponentName());
        componentMap.put("componentModel", serviceTransaction.getComponentModel());
        componentMap.put("componentManufacturer", serviceTransaction.getComponentModel());
        componentMap.put("componentManufacturingDate", serviceTransaction.getComponentManufacturingDate());
        componentMap.put("componentExpiryDate", serviceTransaction.getComponentExpiryDate());
        componentMap.put("serviceRequestId", serviceTransaction.getServiceRequestId());
        componentMap.put("serviceRequestDate", serviceTransaction.getServiceRequestDay()+"/"
                +serviceTransaction.getServiceRequestMonth() +"/"+serviceTransaction.getServiceRequestYear());
        componentMap.put("nextServiceDate", serviceTransaction.getNextServiceDay()+"/"
                +serviceTransaction.getNextServiceMonth() +"/"+serviceTransaction.getNextServiceYear());

        componentMap.put("serviceOverDate", serviceTransaction.getServiceOverDay()+"/"
                +serviceTransaction.getServiceOverMonth() +"/"+serviceTransaction.getServiceOverYear());

        componentMap.put("serviceEngineer", serviceTransaction.getServiceEngineer());
        componentMap.put("comments", serviceTransaction.getComments());
        componentMap.put("transactionType", "ServiceRequest");
        componentMap.put("serviceVerifiedBy", serviceTransaction.getServiceVerifiedBy());
        componentMap.put("designation", serviceTransaction.getDesignation());
        componentMap.put("airline", "org.sabre.biznet.Airline#"+serviceTransaction.getAirline());
        componentMap.put("aircraftComponent", "org.sabre.biznet.AircraftComponent#"+serviceTransaction.getAircraftComponent());
        componentMap.put("vendor", "org.sabre.biznet.Vendor#"+serviceTransaction.getVendor());
        componentMap.put("transactionId", "");
        componentMap.put("timestamp", new Date().toString());

        ObjectMapper mapper = new ObjectMapper();
        String jsonResult = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(componentMap);

        restTemplate.postForEntity( SERVICE_URL,componentMap,String.class );
        return "servicerequest";
    }

    @RequestMapping(path={"/servicerequest"},method=RequestMethod.GET)
    public String getServiceReuqest(Model model) {
        return "servicerequest";
    }

    @RequestMapping(path={"/serviceover"},method=RequestMethod.GET)
    public String getServiceOver(Model model) {
        return "serviceover";
    }

    @RequestMapping(path={"/serviceoversave"},method=RequestMethod.POST)
    public String saveServiceOver(Model model) {
        return "serviceOverSave";
    }

}