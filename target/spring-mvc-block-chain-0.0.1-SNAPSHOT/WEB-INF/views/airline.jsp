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
<form action="vendorSave" method="post" commandName="somedata" style="form-spacing">


    <div class="container container-spacing">
        <div class="heading-content-container container sb-full-max-width spark-padding-top--sm spark-padding-bottom--sm"><div class="row"><div class="col-xs-12 property-id-container spark-text-right spark-bold"><div class="property-id-sub-container"><span class="property-id spark-padding-left title-spacing">Hi Srujan!!</span></div></div></div></div>

        <div class="pms-page-title title-spacing"><h3>Airline</h3></div>
        <div class="sb-pad-0 col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <section>
                <div class="spark-margin-top">
                    <label class="spark-select">
                        <select class="spark-select__input"> <!-- This has to be before .spark-label! -->
                            <option></option>
                            <option>LH</option>
                            <option>VS</option>
                            <option>AC</option>
                            <option>EY</option>
                        </select>
                        <span class="spark-label">Select Airline</span>
                    </label>
                </div>

                <label class="spark-input">
                    <input class="spark-input__field" name="flightNo" id="flightNo" role="textbox" value="">
                    <span class="spark-label">Full Name</span>
                </label>



                <div class="rsv-guest-details-info__phone-number">
                    <section>
                        <div class="container rsv-guest-details-info__phone">
                            <div class="row">

                                <div class="col-xs-3"><label
                                        class="spark-select spark-select--no-label rsv-guest-details-info-address__label"><select
                                        class="spark-select__input rsv-guest-details-info-address__select">
                                    <option value="V1">VOICE1</option>
                                    <option value="V2">VOICE2</option>
                                    <option value="M">MOBILE</option>
                                    <option value="F">FAX</option>
                                </select><span class="spark-label"></span></label></div>

                                <div class="col-xs-6 rsv-guest-details-info__phone-input"><label class="spark-input"><input
                                        class="spark-input__field" name="phonenumber" role="textbox" value="" maxlength="25"><span
                                        class="spark-label">Phone</span></label></div>
                                <div class="col-xs-4"></div>
                            </div>
                        </div>
                    </section>
                </div>


                <div class="rsv-guest-details-info__address">
                    <section>
                        <div class="container rsv-guest-details-info__address">
                            <div class="row">
                                <div class="col-xs-3"><label
                                        class="spark-select spark-select--no-label rsv-guest-details-info-address__label"><select
                                        class="spark-select__input rsv-guest-details-info-address__select">
                                    <option value="H">PERSONAL</option>
                                    <option value="B">BUSINESS</option>
                                    <option value="O">OTHER</option>
                                </select><span class="spark-label"></span></label></div>

                                <div class="col-xs-6 rsv-guest-details-info-address-street"><label class="spark-input"><input
                                        class="spark-input__field" name="address" role="textbox" maxlength="400" value=""><span
                                        class="spark-label">Address</span></label></div>
                            </div>
                        </div>

                        <div>
                            <div class="row">
                                <div class="col-xs-3"></div>
                                <div class="col-xs-6 rsv-guest-details-info-address-street"><label class="spark-input"><input
                                        class="spark-input__field" name="address" role="textbox" maxlength="400" value=""><span
                                        class="spark-label">City</span></label></div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-xs-3"></div>
                                <div class="col-xs-2 rsv-guest-details-info-address-state"><label class="spark-input"><input
                                        class="spark-input__field" name="state" role="textbox" maxlength="2" value=""><span
                                        class="spark-label">State</span></label></div>
                                <div class="col-xs-4 rsv-guest-details-info-address-zipcode"><label class="spark-input"><input
                                        class="spark-input__field" name="zipcode" role="textbox" maxlength="10" value=""><span
                                        class="spark-label">Postal Code</span></label></div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-3"></div>
                            <div class="col-xs-6 rsv-guest-details-info-address-city"><label class="spark-input"><input
                                    class="spark-input__field" name="country" role="textbox" maxlength="50" value=""><span
                                    class="spark-label">Country</span><span class="spark-input__message"></span></label>
                            </div>
                        </div>

                </div>
            </section>
        </div>


        </section>


    </div>
    </div>



    <div class="row btn-spacing">
        <div><button class="spark-btn spark-btn--md spark-btn--secondary btn-left-clear-spacing">Clear</button></div>
        <div><button class="sb-btn spark-btn btn-save-spacing" onclick="location.href='/vendorSave'">Save</button></div>
    </div>






</body>
</html>