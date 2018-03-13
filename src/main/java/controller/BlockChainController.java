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
        componentMap.put("flightMode", "In Ready");
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
        RestTemplate restTemplate = new RestTemplate();
        ServiceTransaction[] serviceTransactions = restTemplate.getForObject(SERVICE_URL, ServiceTransaction[].class);

        if(serviceTransactions == null || serviceTransactions.length == 0 )
        {
            return "";
        }

        JSONArray array = new JSONArray();
        JSONObject json;
        for (int i = 0; i < serviceTransactions.length; i++) {
            json = new JSONObject();
            json.put("serialNo", format(serviceTransactions[i].getSerialNo()));
            json.put("flightNo", format(serviceTransactions[i].getFlightNo()));
            json.put("componentName", format(serviceTransactions[i].getComponentName()));
            json.put("componentModel", format(serviceTransactions[i].getComponentModel()));
            json.put("componentManufacturer", format(serviceTransactions[i].getComponentManufacturer()));
            json.put("componentManufacturingDate", format(serviceTransactions[i].getComponentManufacturingDate()));
            json.put("componentExpiryDate", format(serviceTransactions[i].getComponentExpiryDate()));
            json.put("serviceRequestId", format(serviceTransactions[i].getServiceRequestId()));
            json.put("serviceRequestDate", format(serviceTransactions[i].getServiceRequestDate()));
            json.put("nextServiceDate", format(serviceTransactions[i].getNextServiceDate()));
            json.put("serviceOverDate", format(serviceTransactions[i].getServiceOverDate()));
            json.put("serviceEngineer", format(serviceTransactions[i].getServiceEngineer()));
            json.put("comments", format(serviceTransactions[i].getComments()));
            json.put("transactionType", format(serviceTransactions[i].getTransactionType()));
            array.add(json);
        }

        return array.toJSONString();
    }

    private String format(String name)
    {
        if(name == null)
        {
            return "-";
        }
        return name;
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

    @RequestMapping(path={"/airlines"},method=RequestMethod.POST)
    @ResponseBody
    public String getAirlines(Model model) {
        RestTemplate restTemplate = new RestTemplate();
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
            json.put("fullName", airlines[i].getFullName());
            array.add(json);
        }
        return array.toJSONString();
    }



    @RequestMapping(path={"/airline"},method=RequestMethod.GET)
    public String getAirline(Model model) {
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
        componentMap.put("flightMode", "In Maintainence");
        componentMap.put("airline",  aircraftComponent[0].getAirline());
        componentMap.put("aircraftComponent", "org.sabre.biznet.AircraftComponents#"+aircraftComponent[0].getSerialNo());
        componentMap.put("vendor", "org.sabre.biznet.Vendor#"+serviceTransaction.getVendor());
        componentMap.put("transactionId", "");

        ObjectMapper mapper = new ObjectMapper();
        String jsonResult = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(componentMap);

        restTemplate.postForEntity( SERVICE_URL,componentMap,String.class );
        return "servicerequest";
    }

    @RequestMapping(path={"/serviceOverSave"},method=RequestMethod.POST)
    public String saveServiceOver(@ModelAttribute("serviceTransaction") ServiceTransaction serviceTransaction) throws Exception{

        RestTemplate restTemplate = new RestTemplate();
       /* AircraftComponents[] aircraftComponent = restTemplate.getForObject(COMPONENT_URL
                        +"?serialNo="+serviceTransaction.getSerialNo()
                , AircraftComponents[].class);*/

        Map<String, String> componentMap = new HashMap<String, String>();
        componentMap.put("$class","org.sabre.biznet.ServiceTransaction");
        componentMap.put("serialNo", serviceTransaction.getSerialNo());
        componentMap.put("flightNo", serviceTransaction.getFlightNo());
        componentMap.put("serviceRequestId", serviceTransaction.getServiceRequestId());
        componentMap.put("componentName", serviceTransaction.getComponentName());
        componentMap.put("componentModel", serviceTransaction.getComponentModel());
        componentMap.put("componentManufacturer", serviceTransaction.getComponentModel());
        componentMap.put("componentManufacturingDate", serviceTransaction.getComponentManufacturingDate());
        componentMap.put("componentExpiryDate", serviceTransaction.getComponentExpiryDate());
        componentMap.put("serviceRequestDate", serviceTransaction.getServiceRequestDate());
        componentMap.put("serviceOverDate", serviceTransaction.getServiceOverDay()+
                "/"+serviceTransaction.getServiceOverMonth()+"/"+serviceTransaction.getServiceOverYear());
        componentMap.put("nextServiceDate", serviceTransaction.getNextServiceDay()+
                "/"+serviceTransaction.getNextServiceMonth()+"/"+serviceTransaction.getNextServiceYear());
        componentMap.put("serviceEngineer", serviceTransaction.getServiceEngineer());
        componentMap.put("comments", serviceTransaction.getComments());
        componentMap.put("flightMode", "In Ready");
        componentMap.put("transactionType", "ServiceOver");
        componentMap.put("airline",  "org.sabre.biznet.Airline#"+serviceTransaction.getAirline());
        componentMap.put("aircraftComponent", "org.sabre.biznet.AircraftComponents#"+serviceTransaction.getSerialNo());
        componentMap.put("vendor", "org.sabre.biznet.Vendor#"+serviceTransaction.getVendor());
        componentMap.put("transactionId", "");

        ObjectMapper mapper = new ObjectMapper();
        String jsonResult = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(componentMap);

        restTemplate.postForEntity( SERVICE_URL,componentMap,String.class );
        return "serviceover";
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