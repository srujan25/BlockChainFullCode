<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/ui/common-spark.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/main.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Service Request</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


    <script>
        $(document).ready(function(){
            $.post("vendors", function( data ) {
                var temp = JSON.parse(data);
                var venderCombo = document.getElementById("vendor");
                  var option = document.createElement("option");
                  option.text = "";
                  option.value = "";
                   venderCombo.add(option,0);
                for (var i in temp) {
                    option = document.createElement("option");
                    option.text = temp[i].vendorName;
                    option.value = temp[i].regnNo;
                    venderCombo.add(option,i+1);
                }
            });

            $.post("aircraftComponents", function( data ) {
                var temp = JSON.parse(data);
                var aircraftCombo = document.getElementById("serialNo");
                 var option = document.createElement("option");
                  option.text = "";
                  option.value = "";
                   aircraftCombo.add(option,0);
                for (var i in temp) {
                    var option = document.createElement("option");
                    option.text = temp[i].componentName;
                    option.value = temp[i].serialNo;
                    aircraftCombo.add(option,i+1);
                }
            });
        });
    </script>

</head>
<body>
<form action="servicerequestSave" method="post" commandName="somedata" style="form-spacing">

    <%@include file="menubar.jsp" %>
    <table align='center' width='100%'>
        <tr><td width='10%'></td><td align='center' >

            <div class="container container-spacing">


                <div class="pms-page-title title-spacing"><h3>Service Request</h3></div>
                <div class="sb-pad-0 col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <section>

                        <label class="spark-input">
                            <input class="spark-input__field" name="serviceRequestId" id="serviceRequestId" role="textbox" value="">
                            <span class="spark-label">Service Request ID</span>
                        </label>

                        <label class="spark-input">
                            <input class="spark-input__field" name="flightNo" id="flightNo" role="textbox" value="">
                            <span class="spark-label">Aircraft Reg No</span>
                        </label>

                        <div class="spark-margin-top">
                            <label class="spark-select">
                                <select name="serialNo" id="serialNo" class="spark-select__input">
                                </select>
                                <span class="spark-label">Select AirCraft Components</span>
                            </label>
                        </div>

                        <div class="spark-select-group spark-margin-top">
                            <label class="spark-select">
                                <select name="serviceRequestMonth" class="spark-select__input">
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
                                <select name="serviceRequestDay" class="spark-select__input">
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
                                <select name="serviceRequestYear" class="spark-select__input">
                                    <option></option>
                                    <option>2018</option>
                                    <option>2017</option>
                                    <option>2016</option>
                                    <option>2015</option>
                                </select>
                                <span class="spark-label">Year</span>
                            </label>
                            <span class="spark-label">Service Request Date</span>
                        </div>

                        <div class="spark-margin-top">
                            <label class="spark-select">
                                <select name="vendor" id="vendor" class="spark-select__input"> <!-- This has to be before .spark-label! -->
                                </select>
                                <span class="spark-label">Select Vendor</span>
                            </label>
                        </div>

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
                <div><button class="sb-btn spark-btn btn-save-spacing" onclick="location.href='/servicerequestSave'">Save</button></div>
            </div>




        </td></tr></table>

</body>
</html>