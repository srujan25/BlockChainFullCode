package controller;

import bean.Airline;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author imssbora
 */
@Controller
public class BlockChainController {

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

    @RequestMapping(path={"/airlineSave"},method=RequestMethod.POST)
    public String saveAirline(@ModelAttribute("airline") Airline airline) {

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
    public String saveVendor(Model model) {

        model.addAttribute("message","Hello Spring MVC!");
        model.addAttribute("date", "today");
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