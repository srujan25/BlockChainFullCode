<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/ui/common-spark.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/main.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Service Over</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
$(document).ready(function(){
   var temp;
   $.post("serviceRequests", function( data ) {
      temp = JSON.parse(data);
      var serviceRequestCombo = document.getElementById("serviceRequestId");
      var option = document.createElement("option");
      option.text = "";
      option.value = "";
      serviceRequestCombo.add(option,0)
      for (var i in temp) {
         option = document.createElement("option");
         option.text = temp[i].serviceRequestId;
         option.value = temp[i].serviceRequestId;
         serviceRequestCombo.add(option,i+1);
      }
   });

   $( "#serviceRequestId").change(function(event) {
     var serviceRequestVal =  $( "#serviceRequestId option:selected" ).val()
     for (var i in temp) {
         if(serviceRequestVal == temp[i].serviceRequestId){
             document.getElementById("serviceRequestDate").value=temp[i].serviceRequestDate;
             document.getElementById("flightNo").value=temp[i].flightNo;
             document.getElementById("airline").value=temp[i].airline;
             document.getElementById("vendor").value=temp[i].vendor;
             document.getElementById("serialNo").value=temp[i].serialNo;
             document.getElementById("componentName").value=temp[i].componentName;
             document.getElementById("componentModel").value=temp[i].componentModel;
             document.getElementById("componentManufacturer").value=temp[i].componentManufacturer;
             document.getElementById("componentManufacturingDate").value=temp[i].componentManufacturingDate;
             document.getElementById("componentExpiryDate").value=temp[i].componentExpiryDate;
          }
       }

   });
  });
  </script>
</head>
<body>
<form action="serviceOverSave" method="post" commandName="somedata" style="form-spacing">

    <%@include file="menubar.jsp" %>
        <table align='center' width='100%'>
            <tr><td width='30%'></td><td align='center' >

            <div class="container container-spacing">


        <div class="pms-page-title title-spacing"><h3>Service Over</h3></div>
        <div class="sb-pad-0 col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <section>

              <div class="spark-select-group spark-margin-top">
                    <label class="spark-select">
                        <select name="serviceRequestId" id="serviceRequestId" class="spark-select__input">
                        </select>
                        <span class="spark-label">Service Request ID</span>
                     </label>
               </div>

                <label class="spark-input">
                    <input class="spark-input__field" name="serviceRequestDate" id="serviceRequestDate" role="textbox" value="">
                    <span class="spark-label">Service Request Date</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="flightNo" id="flightNo" role="textbox" value="">
                    <span class="spark-label">Aircraft ID</span>
                </label>

                 <label class="spark-input">
                    <input class="spark-input__field" name="airline" id="airline" role="textbox" value="">
                    <span class="spark-label">Carrier Code</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="vendor" id="vendor" role="textbox" value="">
                    <span class="spark-label">Vendor Regn</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="serialNo" id="serialNo" role="textbox" value="">
                    <span class="spark-label">Serial No</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="componentName" id="componentName" role="textbox" value="">
                    <span class="spark-label">Component Name</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="componentModel" id="componentModel" role="textbox" value="">
                    <span class="spark-label">Component Model</span>
                </label>
                <label class="spark-input">
                    <input class="spark-input__field" name="componentManufacturer" id="componentManufacturer" role="textbox" value="">
                    <span class="spark-label">Component Manufacturer</span>
                </label>
                <label class="spark-input">
                    <input class="spark-input__field" name="componentManufacturingDate" id="componentManufacturingDate" role="textbox" value="">
                    <span class="spark-label">Component Manufacturing Date</span>
                </label>
                <label class="spark-input">
                    <input class="spark-input__field" name="componentExpiryDate" id="componentExpiryDate" role="textbox" value="">
                    <span class="spark-label">Component Expiry Date</span>
                </label>

                <div class="spark-select-group spark-margin-top">
                    <label class="spark-select">
                        <select name="serviceOverMonth" id="serviceOverMonth" class="spark-select__input">
                            <option></option>
                            <option>Jan</option>
                            <option>Feb</option>
                            <option>Mar</option>
                            <option>Apr</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>Aug</option>
                            <option>Sept</option>
                            <option>Oct</option>
                            <option>Nov</option>
                            <option>Dec</option>
                        </select>
                        <span class="spark-label">Month</span>
                    </label>
                    <label class="spark-select">
                        <select name="serviceOverDay" id="serviceOverDay" class="spark-select__input">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                        </select>
                        <span class="spark-label">Day</span>
                    </label>
                    <label class="spark-select">
                        <select name="serviceOverYear" id="serviceOverYear" class="spark-select__input">
                            <option></option>
                            <option>1967</option>
                            <option>1968</option>
                            <option>1969</option>
                            <option>1970</option>
                            <option>1971</option>
                            <option>1972</option>
                            <option>1973</option>
                            <option>1974</option>
                            <option>1975</option>
                            <option>1976</option>
                            <option>1977</option>
                            <option>1978</option>
                            <option>1979</option>
                            <option>1980</option>
                            <option>1981</option>
                            <option>1982</option>
                            <option>1983</option>
                            <option>1984</option>
                            <option>1985</option>
                            <option>1986</option>
                            <option>1987</option>
                            <option>1988</option>
                            <option>1989</option>
                            <option>1990</option>
                            <option>1991</option>
                            <option>1992</option>
                            <option>1993</option>
                            <option>1994</option>
                            <option>1995</option>
                            <option>1996</option>
                            <option>1997</option>
                            <option>1998</option>
                            <option>1999</option>
                            <option>2000</option>
                            <option>2001</option>
                            <option>2002</option>
                            <option>2003</option>
                            <option>2004</option>
                            <option>2005</option>
                            <option>2006</option>
                            <option>2007</option>
                            <option>2008</option>
                            <option>2009</option>
                            <option>2010</option>
                            <option>2011</option>
                            <option>2012</option>
                            <option>2013</option>
                            <option>2014</option>
                            <option>2015</option>
                            <option>2016</option>
                        </select>
                        <span class="spark-label">Year</span>
                    </label>
                    <span class="spark-label">service Over Date</span>

                </div>



                <div class="spark-select-group spark-margin-top">
                    <label class="spark-select">
                        <select name="nextServiceMonth" id="nextServiceMonth" class="spark-select__input">
                            <option></option>
                            <option>Jan</option>
                            <option>Feb</option>
                            <option>Mar</option>
                            <option>Apr</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>Aug</option>
                            <option>Sept</option>
                            <option>Oct</option>
                            <option>Nov</option>
                            <option>Dec</option>
                        </select>
                        <span class="spark-label">Month</span>
                    </label>
                    <label class="spark-select">
                        <select name="nextServiceDay" id="nextServiceDay" class="spark-select__input">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                        </select>
                        <span class="spark-label">Day</span>
                    </label>
                    <label class="spark-select">
                        <select name="nextServiceYear" id="nextServiceYear" class="spark-select__input">
                            <option></option>
                            <option>1967</option>
                            <option>1968</option>
                            <option>1969</option>
                            <option>1970</option>
                            <option>1971</option>
                            <option>1972</option>
                            <option>1973</option>
                            <option>1974</option>
                            <option>1975</option>
                            <option>1976</option>
                            <option>1977</option>
                            <option>1978</option>
                            <option>1979</option>
                            <option>1980</option>
                            <option>1981</option>
                            <option>1982</option>
                            <option>1983</option>
                            <option>1984</option>
                            <option>1985</option>
                            <option>1986</option>
                            <option>1987</option>
                            <option>1988</option>
                            <option>1989</option>
                            <option>1990</option>
                            <option>1991</option>
                            <option>1992</option>
                            <option>1993</option>
                            <option>1994</option>
                            <option>1995</option>
                            <option>1996</option>
                            <option>1997</option>
                            <option>1998</option>
                            <option>1999</option>
                            <option>2000</option>
                            <option>2001</option>
                            <option>2002</option>
                            <option>2003</option>
                            <option>2004</option>
                            <option>2005</option>
                            <option>2006</option>
                            <option>2007</option>
                            <option>2008</option>
                            <option>2009</option>
                            <option>2010</option>
                            <option>2011</option>
                            <option>2012</option>
                            <option>2013</option>
                            <option>2014</option>
                            <option>2015</option>
                            <option>2016</option>
                        </select>
                        <span class="spark-label">Year</span>
                    </label>
                    <span class="spark-label">Next Service Date</span>
                </div>


                <label class="spark-input">
                    <input class="spark-input__field" name="serviceEngineer" id="serviceEngineer" role="textbox" value="">
                    <span class="spark-label">Service Engineer</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="comments" id="comments" role="textbox" value="">
                    <span class="spark-label">Comments</span>
                </label>


        </div>


        </section>


    </div>
    </div>



    <div class="row btn-spacing">
        <div><button class="spark-btn spark-btn--md spark-btn--secondary btn-left-airline-clear-spacing">Clear</button></div>
        <div><button class="sb-btn spark-btn btn-save-spacing" onclick="location.href='/serviceoversave'">Save</button></div>
    </div>


        </td></tr></table>



</body>
</html>