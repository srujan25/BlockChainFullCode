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

    <%@include file="menubar.jsp" %>
    <table align='center' width='100%'>
        <tr><td width='30%'></td><td align='center' >

    <div class="container container-spacing">
        <div class="heading-content-container container sb-full-max-width spark-padding-top--sm spark-padding-bottom--sm">
        <div class="row"><div class="col-xs-12 property-id-container spark-text-right spark-bold">
        <div class="pms-page-title title-spacing"><h3>Aircraft Component</h3></div>
        <div class="sb-pad-0 col-xs-6 col-sm-6 col-md-6 col-lg-6">

            <label class="spark-input">
                <input class="spark-input__field" name="serialNo" id="serialNo" role="textbox" value="">
                <span class="spark-label">Serial No</span>
            </label>

            <label class="spark-input">
                <input class="spark-input__field" name="flightNo" id="flightNo" role="textbox" value="">
                <span class="spark-label">Flight No</span>
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


            <div class="spark-margin-top">
                <label class="spark-select">
                    <select name="airline" class="spark-select__input"> <!-- This has to be before .spark-label! -->
                        <option></option>
                        <option>LH</option>
                    </select>
                    <span class="spark-label">Select Airline</span>
                </label>
            </div>

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

        </td></tr></table>


</body>
</html>