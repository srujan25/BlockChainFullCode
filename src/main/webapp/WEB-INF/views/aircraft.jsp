<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/ui/common-spark.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/main.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Aircraft Component</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $(document).ready(function(){
            $.post("airlines", function( data ) {
                var temp = JSON.parse(data);
                var airlineCombo = document.getElementById("airline");
                var option = document.createElement("option");
                option.text = "";
                option.value = "";
                airlineCombo.add(option,0);
                for (var i in temp) {
                    option = document.createElement("option");
                    option.text = temp[i].fullName;
                    option.value = temp[i].carrierCode;
                    airlineCombo.add(option,i+1);
                }
            });
        });
    </script>

</head>
<body>
<form action="aircraftsave" method="post" commandName="somedata" style="form-spacing">

    <%@include file="menubar.jsp" %>
    <table align='center' width='100%'>
        <tr><td width='10%'></td><td align='center' >

            <div class="container container-spacing">
                <div class="pms-page-title title-spacing"><h3>Aircraft Component</h3></div>
                <div class="sb-pad-0 col-xs-6 col-sm-6 col-md-6 col-lg-6">

                    <label class="spark-input">
                        <input class="spark-input__field" name="serialNo" id="serialNo" role="textbox" value="">
                        <span class="spark-label">Component Serial No</span>
                    </label>

                    <label class="spark-input">
                        <input class="spark-input__field" name="flightNo" id="flightNo" role="textbox" value="">
                        <span class="spark-label">Aircraft Reg No</span>
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
                    <div class="spark-select-group spark-margin-top">
                        <label class="spark-select">
                            <select name="componentManufacturingMonth" id="componentManufacturingMonth" class="spark-select__input">
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
                            <select name="componentManufacturingDay" id="componentManufacturingDay" class="spark-select__input">
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
                            <select name="componentManufacturingYear" id="componentManufacturingYear" class="spark-select__input">
                                <option></option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2011</option>
                                <option>2010</option>
                                <option>2009</option>
                                <option>2008</option>
                                <option>2007</option>
                                <option>2006</option>
                                <option>2005</option>
                                <option>2004</option>
                                <option>2003</option>
                                <option>2002</option>
                                <option>2001</option>
                                <option>2000</option>
                            </select>
                            <span class="spark-label">Year</span>
                        </label>
                        <span class="spark-label">Component Manufacturing Date</span>
                    </div>
                    <div class="spark-select-group spark-margin-top">
                        <label class="spark-select">
                            <select name="componentExpiryMonth" id="componentExpiryMonth" class="spark-select__input">
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
                            <select name="componentExpiryDay" id="componentExpiryDay" class="spark-select__input">
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
                            <select name="componentExpiryYear" id="componentExpiryYear" class="spark-select__input">
                                <option></option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                            </select>
                            <span class="spark-label">Year</span>
                        </label>
                        <span class="spark-label">Component Expiry Date</span>
                    </div>
                    <!--expriry component-->


                    <div class="spark-margin-top">
                        <label class="spark-select">
                            <select name="airline" id="airline" class="spark-select__input"> <!-- This has to be before .spark-label! -->
                            </select>
                            <span class="spark-label">Select Airline</span>
                        </label>
                    </div>

                </div>
            </div>



            <div class="row btn-spacing">
                <div><button class="spark-btn spark-btn--md spark-btn--secondary btn-left-airline-clear-spacing">Clear</button></div>
                <div><button class="sb-btn spark-btn btn-save-spacing" onclick="location.href='/aircraftsave'">Save</button></div>
            </div>

            <style type="text/css">
                var el = document.querySelector('.spark-select');
                var selectInstance = new Spark.SelectInput(el);
            </style>

        </td></tr></table>


</body>
</html>