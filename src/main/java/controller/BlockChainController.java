package controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.sabre.biznet.AircraftComponents;
import org.sabre.biznet.Airline;
import org.sabre.biznet.ServiceTransaction;
import org.sabre.biznet.Vendor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

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
    private static final String SERVICE_REQUESTS_URL = "http://localhost:3000/api/queries/selectServiceRequest";

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

    @RequestMapping(path={"/transactionHistoryObjects"},method=RequestMethod.POST)
    @ResponseBody
    public String getTransactionHistoryObjects(Model model) {
        ServiceTransaction[] serviceTransactions = new ServiceTransaction[1];
        ServiceTransaction serviceTransaction= new ServiceTransaction();
        serviceTransaction.setAircraftComponent("comp");
        serviceTransaction.setFlightNo("12");

        serviceTransactions[0] = serviceTransaction;

        if(serviceTransactions == null || serviceTransactions.length == 0 )
        {
            return "";
        }

        JSONArray array = new JSONArray();
        JSONObject json;
        for (int i = 0; i < serviceTransactions.length; i++) {
            json = new JSONObject();
            /*json.put("$class","org.sabre.biznet.airlines[i]");
            json.put("serialNo", serviceTransactions[i].getSerialNo());*/
            json.put("flightNo", serviceTransactions[i].getFlightNo());
           /* json.put("componentName", serviceTransactions[i].getComponentName());
            json.put("componentModel", serviceTransactions[i].getComponentModel());
            json.put("componentManufacturer", serviceTransactions[i].getComponentModel());
            json.put("componentManufacturingDate", serviceTransactions[i].getComponentManufacturingDate());
            json.put("componentExpiryDate", serviceTransactions[i].getComponentExpiryDate());
            json.put("serviceRequestId", serviceTransactions[i].getServiceRequestId());
            json.put("serviceRequestDate", serviceTransactions[i].getServiceRequestDay()+"/"
                    +serviceTransactions[i].getServiceRequestMonth() +"/"+serviceTransactions[i].getServiceRequestYear());
            json.put("nextServiceDate", serviceTransactions[i].getNextServiceDay()+"/"
                    +serviceTransactions[i].getNextServiceMonth() +"/"+serviceTransactions[i].getNextServiceYear());

            json.put("serviceOverDate", serviceTransactions[i].getServiceOverDay()+"/"
                    +serviceTransactions[i].getServiceOverMonth() +"/"+serviceTransactions[i].getServiceOverYear());

            json.put("serviceEngineer", serviceTransactions[i].getServiceEngineer());
            json.put("comments", serviceTransactions[i].getComments());
            json.put("transactionType", "ServiceRequest");
            json.put("serviceVerifiedBy", serviceTransactions[i].getServiceVerifiedBy());
            json.put("designation", serviceTransactions[i].getDesignation());
            json.put("airline", "org.sabre.biznet.Airline#"+serviceTransactions[i].getAirline());*/
            json.put("aircraftComponent", serviceTransactions[i].getAircraftComponent());
            /*json.put("vendor", "org.sabre.biznet.Vendor#"+serviceTransactions[i].getVendor());
            json.put("transactionId", "");*/
            array.add(json);
        }

        return array.toJSONString();
    }

    @RequestMapping(path={"/vendors"},method=RequestMethod.POST)
    @ResponseBody
    public String getVendors(Model model) {
        RestTemplate restTemplate = new RestTemplate();
        Vendor[] vendors = restTemplate.getForObject(VENDOR_URL, Vendor[].class);
        if(vendors == null || vendors.length == 0 ) {
            return "";
        }
        JSONArray array = new JSONArray();
        JSONObject json;
        for (int i = 0; i < vendors.length; i++) {
            json = new JSONObject();
            json.put("vendorName", vendors[i].getVendorName());
            json.put("regnNo", vendors[i].getRegnNo());
            array.add(json);
        }
        return array.toJSONString();
    }

    @RequestMapping(path={"/aircraftComponents"},method=RequestMethod.POST)
    @ResponseBody
    public String getaircraftComponents(Model model) {
        RestTemplate restTemplate = new RestTemplate();
        AircraftComponents[] aircraftComponents = restTemplate.getForObject(COMPONENT_URL, AircraftComponents[].class);
        if(aircraftComponents == null || aircraftComponents.length == 0 ) {
            return "";
        }
        JSONArray array = new JSONArray();
        JSONObject json;
        for (int i = 0; i < aircraftComponents.length; i++) {
            json = new JSONObject();
            json.put("serialNo", aircraftComponents[i].getSerialNo());
            json.put("componentName", aircraftComponents[i].getComponentName());
            array.add(json);
        }
        return array.toJSONString();
    }


    @RequestMapping(path={"/serviceRequests"},method=RequestMethod.POST)
    @ResponseBody
    public String getServiceRequests(Model model) {
        RestTemplate restTemplate = new RestTemplate();
        ServiceTransaction[] serviceRequests = restTemplate.getForObject(SERVICE_REQUESTS_URL, ServiceTransaction[].class);
        if(serviceRequests == null || serviceRequests.length == 0 ) {
            return "";
        }
        JSONArray array = new JSONArray();
        JSONObject json;
        for (int i = 0; i < serviceRequests.length; i++) {
            json = new JSONObject();
            json.put("serialNo", serviceRequests[i].getSerialNo());
            json.put("flightNo", serviceRequests[i].getFlightNo());
            json.put("componentName", serviceRequests[i].getComponentName());
            json.put("componentModel", serviceRequests[i].getComponentModel());
            json.put("componentManufacturer", serviceRequests[i].getComponentManufacturer());
            json.put("componentManufacturingDate", serviceRequests[i].getComponentManufacturingDate());
            json.put("componentExpiryDate", serviceRequests[i].getComponentExpiryDate());
            json.put("serviceRequestId", serviceRequests[i].getServiceRequestId());
            json.put("serviceRequestDate", serviceRequests[i].getServiceRequestDate());
            json.put("transactionType", "ServiceOver");
            json.put("airline", serviceRequests[i].getAirline().substring(serviceRequests[i].getAirline().lastIndexOf("#")+1,
                    serviceRequests[i].getAirline().length()));
            json.put("aircraftComponent", serviceRequests[i].getAircraftComponent());
            json.put("vendor", serviceRequests[i].getVendor()
                    .substring(serviceRequests[i].getVendor().lastIndexOf("#") +1,serviceRequests[i].getVendor().length()));
            json.put("transactionId", serviceRequests[i].getTransactionId());

            array.add(json);
        }
        return array.toJSONString();
    }

    @RequestMapping(path={"/airline"},method=RequestMethod.GET)
    public String getAirline(Model model) {
        /*RestTemplate restTemplate = new RestTemplate();
        Airline[] airlines = restTemplate.getForObject(AIRLINE_URL, Airline[].class);

        if(airlines == null || airlines.length == 0 )
        {
            return "";
        }

        JSONArray array = new JSONArray();
        JSONObject json;
        for (int i = 0; i < airlines.length; i++) {
            json = new JSONObject();
            json.put("carrierCode", airlines[i].getCarrierCode());
            json.put("address", airlines[i].getAddress());
            json.put("fullName", airlines[i].getFullName());
            json.put("state", airlines[i].getState());
            json.put("zipcode", airlines[i].getZipcode());
            json.put("city", airlines[i].getCity());
            json.put("country", airlines[i].getCountry());
            json.put("addressType", airlines[i].getAddressType());
            json.put("phonenumber", airlines[i].getPhonenumber());
            json.put("phoneType", airlines[i].getPhoneType());
            array.add(json);
        }

        return array.toJSONString();*/
        return "airline";
    }

    @RequestMapping(path={"/transactionHistory"},method=RequestMethod.GET)
    public String getTransactionHistory(Model model) {
        return "transactionHistory";
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
        AircraftComponents[] aircraftComponent = restTemplate.getForObject(COMPONENT_URL
                        +"?serialNo="+serviceTransaction.getSerialNo()
                , AircraftComponents[].class);

        Map<String, String> componentMap = new HashMap<String, String>();
        componentMap.put("$class","org.sabre.biznet.ServiceTransaction");
        componentMap.put("serialNo", aircraftComponent[0].getSerialNo());
        componentMap.put("flightNo", aircraftComponent[0].getFlightNo());
        componentMap.put("serviceRequestId", serviceTransaction.getServiceRequestId());
        componentMap.put("componentName", aircraftComponent[0].getComponentName());
        componentMap.put("componentModel", aircraftComponent[0].getComponentModel());
        componentMap.put("componentManufacturer", aircraftComponent[0].getComponentModel());
        componentMap.put("componentManufacturingDate", aircraftComponent[0].getComponentManufacturingDate());
        componentMap.put("componentExpiryDate", aircraftComponent[0].getComponentExpiryDate());
        componentMap.put("serviceRequestDate", serviceTransaction.getServiceRequestDay()+"/"
                +serviceTransaction.getServiceRequestMonth() +"/"+serviceTransaction.getServiceRequestYear());

        componentMap.put("transactionType", "ServiceRequest");
        componentMap.put("flightMode", "In Service");
        componentMap.put("airline",  aircraftComponent[0].getAirline());
        componentMap.put("aircraftComponent", "org.sabre.biznet.AircraftComponents#"+aircraftComponent[0].getSerialNo());
        componentMap.put("vendor", "org.sabre.biznet.Vendor#"+serviceTransaction.getSerialNo());
        componentMap.put("transactionId", "");

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