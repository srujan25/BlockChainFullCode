package controller;

import org.sabre.biznet.Airline;
import org.sabre.biznet.Vendor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

   /* @RequestMapping(path={"/"},method=RequestMethod.GET)
    public String sayHello(Model model) {
        model.addAttribute("message","Hello Spring MVC!");
        DateTimeFormatter formatter=DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL);
        LocalDate date=LocalDate.now();
        model.addAttribute("date", date.format(formatter));
        return "index";
    }*/

    /*//@RequestMapping(value="/processForm",params="action1",method=RequestMethod.POST)
    @RequestMapping(path={"/blockchain/loginController"},method=RequestMethod.GET)
    public String getLoginController(Model model) {
        return "aircraft";
    }*/

    @RequestMapping(path={"/"},method=RequestMethod.GET)
    public String getWelcome(Model model) {
        //return "aircraft";
        return "index_home";
    }

    @RequestMapping(path={"/aircraft"},method=RequestMethod.GET)
    public String getAircraftDetails(Model model) {
        //return "aircraft";
        return "aircraft";
    }


    @RequestMapping(path={"/aircraftsave"},method=RequestMethod.POST)
    public String saveAirCraft(Model model) {

        model.addAttribute("message","Hello Spring MVC!");
        model.addAttribute("date", "today");
        return "aircraftSave";
    }

    @RequestMapping(path={"/airline"},method=RequestMethod.GET)
    public String getAirline(Model model) {
        //return "aircraft";
        return "airline";
    }

    @RequestMapping(path={"/airlineMain"},method=RequestMethod.GET)
    public String getAirlineMain(Model model) {
        //return "aircraft";
        return "airlineMain";
    }

    @RequestMapping(path={"/airlineSave"},method=RequestMethod.POST)
    public String saveAirline(@ModelAttribute("airline") Airline airline) {

        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> componentMap = new HashMap<String, String>();
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


        ResponseEntity<String> response = restTemplate.postForEntity( AIRLINE_URL, componentMap, String.class );

        //model.addAttribute("message","Hello Spring MVC!");
        //model.addAttribute("date", "today");
        return "airline";
    }

    @RequestMapping(path={"/vendor"},method=RequestMethod.GET)
    public String getVendor(Model model) {
        //return "aircraft";
        return "vendor";
    }

    @RequestMapping(path={"/vendorSave"},method=RequestMethod.POST)
    public String saveVendor(@ModelAttribute("vendor") Vendor vendor) {

        return "vendorSave";
    }

    @RequestMapping(path={"/servicerequestSave"},method=RequestMethod.POST)
    public String saveServiceRequest(Model model) {

        model.addAttribute("message","Hello Spring MVC!");
        model.addAttribute("date", "today");
        return "servicerequestSave";
    }

    @RequestMapping(path={"/servicerequest"},method=RequestMethod.GET)
    public String getServiceReuqest(Model model) {
        //return "aircraft";
        return "servicerequest";
    }

    @RequestMapping(path={"/serviceover"},method=RequestMethod.GET)
    public String getServiceOver(Model model) {
        //return "aircraft";
        return "serviceover";
    }

    @RequestMapping(path={"/serviceoversave"},method=RequestMethod.POST)
    public String saveServiceOver(Model model) {

        model.addAttribute("message","Hello Spring MVC!");
        model.addAttribute("date", "today");
        return "serviceOverSave";
    }



}