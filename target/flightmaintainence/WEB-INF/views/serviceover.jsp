<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/ui/common-spark.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/main.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>AirCraft page</title>

</head>
<body>
<form action="serviceoversave" method="post" commandName="somedata" style="form-spacing">

    <%@include file="menubar.jsp" %>
    <div class="container container-spacing">


        <div class="pms-page-title title-spacing"><h3>Service Over</h3></div>
        <div class="sb-pad-0 col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <section>


                <label class="spark-input">
                    <input class="spark-input__field" name="serviceRequestFor" id="serviceRequestId" role="textbox" value="">
                    <span class="spark-label">service Request Id</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="serviceRequestFor" id="serviceRequestFor" role="textbox" value="">
                    <span class="spark-label">service Request For</span>
                </label>

                <div class="spark-select-group spark-margin-top">
                    <label class="spark-select">
                        <select class="spark-select__input">
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
                        <select class="spark-select__input">
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
                        <select class="spark-select__input">
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
                    <span class="spark-label">service Request Date</span>
                </div>






                <div class="spark-select-group spark-margin-top">
                    <label class="spark-select">
                        <select class="spark-select__input">
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
                        <select class="spark-select__input">
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
                        <select class="spark-select__input">
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
                        <select class="spark-select__input">
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
                        <select class="spark-select__input">
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
                        <select class="spark-select__input">
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
                    <input class="spark-input__field" name="serviceRequestFor" id="serviceProvider" role="textbox" value="">
                    <span class="spark-label">service Provider</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="serviceEngineer" id="serviceEngineer" role="textbox" value="">
                    <span class="spark-label">Service Engineer</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="serviceRequestFor" id="comments" role="textbox" value="">
                    <span class="spark-label">Comments</span>
                </label>
                <label class="spark-input">
                    <input class="spark-input__field" name="serviceRequestFor" id="transactionType" role="textbox" value="">
                    <span class="spark-label">Transaction Type</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="serviceVerifiedBy" id="serviceVerifiedBy" role="textbox" value="">
                    <span class="spark-label">Service Verified By</span>
                </label>

                <label class="spark-input">
                    <input class="spark-input__field" name="designation   " id="designation" role="textbox" value="">
                    <span class="spark-label">Designation</span>
                </label>




                <div class="spark-margin-top">
                    <label class="spark-select">
                        <select class="spark-select__input"> <!-- This has to be before .spark-label! -->
                            <option></option>
                            <option>LH</option>
                            <option>EY</option>
                            <option>VS</option>
                        </select>
                        <span class="spark-label">Select Airline</span>
                    </label>
                </div>

                <div class="spark-margin-top">
                    <label class="spark-select">
                        <select class="spark-select__input"> <!-- This has to be before .spark-label! -->
                            <option></option>
                            <option>Tyres1</option>
                            <option>Tyrpes2</option>
                            <option>Tyres3</option>
                        </select>
                        <span class="spark-label">Select Aircraft Components</span>
                    </label>
                </div>

                <div class="spark-margin-top">
                    <label class="spark-select">
                        <select class="spark-select__input"> <!-- This has to be before .spark-label! -->
                            <option></option>
                            <option>LH</option>
                            <option>EY</option>
                            <option>VS</option>
                        </select>
                        <span class="spark-label">Select Vendor</span>
                    </label>
                </div>





        </div>


        </section>


    </div>
    </div>



    <div class="row btn-spacing">
        <div><button class="spark-btn spark-btn--md spark-btn--secondary btn-left-airline-clear-spacing">Clear</button></div>
        <div><button class="sb-btn spark-btn btn-save-spacing" onclick="location.href='/serviceoversave'">Save</button></div>
    </div>






</body>
</html>