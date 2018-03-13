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
<form action="aircraftsave" method="post" commandName="somedata" style="form-spacing">


    <div class="container container-spacing">
        <div class="heading-content-container container sb-full-max-width spark-padding-top--sm spark-padding-bottom--sm"><div class="row"><div class="col-xs-12 property-id-container spark-text-right spark-bold"><div class="property-id-sub-container"><span class="property-id spark-padding-left title-spacing">Hi Srujan!!</span></div></div></div></div>

        <div class="pms-page-title title-spacing"><h3>Aircraft Componet</h3></div>
        <div class="sb-pad-0 col-xs-6 col-sm-6 col-md-6 col-lg-6">

            <label class="spark-input">
                <input class="spark-input__field" name="serialNo" id="serialNo" role="textbox" value="">
                <span class="spark-label">Serial No</span>
            </label>

            <label class="spark-input">
                <input class="spark-input__field" name="flightNo" id="flightNo" role="textbox" value="">
                <span class="spark-label">flight No</span>
            </label>

            <label class="spark-input">
                <input class="spark-input__field" name="flightMode" id="flightMode" role="textbox" value="">
                <span class="spark-label">Flight Mode</span>
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

            <!--expriry component-->


                        <label class="spark-input">
                            <input class="spark-input__field" name="compoentServiceOverDate" id="compoentServiceOverDate" role="textbox" value="">
                            <span class="spark-label">Compoent Service Over Date</span>
                        </label>

                        <label class="spark-input">
                            <input class="spark-input__field" name="componentNextServiceDate" id="componentNextServiceDate" role="textbox" value="">
                            <span class="spark-label">Component Next Service Date</span>
                        </label>




            <label class="spark-input">
                <input class="spark-input__field" name="componentServiceProvider" id="componentServiceProvider" role="textbox" value="">
                <span class="spark-label">Component Service Provider</span>
            </label>

            <label class="spark-input">
                <input class="spark-input__field" name="componentServiceEngineer" id="componentServiceEngineer" role="textbox" value="">
                <span class="spark-label">Component Service Engineer</span>
            </label>

            <label class="spark-input">
                <input class="spark-input__field" name="transactionType" id="transactionType" role="textbox" value="">
                <span class="spark-label">Transaction Type</span>
            </label>

            <label class="spark-input">
                <input class="spark-input__field" name="serviceRequestFor" id="serviceRequestFor" role="textbox" value="">
                <span class="spark-label">Service Request For</span>
            </label>

            <label class="spark-input">
                <input class="spark-input__field" name="serviceVerifiedBy" id="serviceVerifiedBy" role="textbox" value="">
                <span class="spark-label">Service Verified By</span>
            </label>

            <label class="spark-input">
                <input class="spark-input__field" name="designation" id="designation" role="textbox" value="">
                <span class="spark-label">Designation</span>
            </label>

            <div class="spark-margin-top">
                <label class="spark-select">
                    <select name="airline" lass="spark-select__input"> <!-- This has to be before .spark-label! -->
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
                    <select componentName="vendor" class="spark-select__input"> <!-- This has to be before .spark-label! -->
                        <option></option>
                        <option>Srujan</option>
                        <option>Ajay</option>
                        <option>Hasan</option>
                        <option>Basha</option>
                    </select>
                    <span class="spark-label">Select Vendor</span>
                </label>
            </div>

            <label class="spark-input">
                <input class="spark-input__field" name="comments" id="comments" role="textbox" value="">
                <span class="spark-label">Comments</span>
            </label>


        </div>
    </div>



    <div class="row btn-spacing">
        <div><button class="spark-btn spark-btn--md spark-btn--secondary btn-clr-spacing">Clear</button></div>
        <div><button class="sb-btn spark-btn btn-save-spacing" onclick="location.href='/aircraftsave'">Save</button></div>
    </div>

    <style type="text/css">
        var el = document.querySelector('.spark-select');
        var selectInstance = new Spark.SelectInput(el);
    </style>




</body>
</html>