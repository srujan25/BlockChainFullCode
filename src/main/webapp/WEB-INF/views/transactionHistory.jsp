<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/ui/common-spark.css"/>
    <link rel="stylesheet" type="text/css" href="resources/ui/style.css"/>
    <link rel="stylesheet" type="text/css" href="resources/ui/framework-sass.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/main.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Transaction History page</title>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>

</head>
<body>
<%@include file="menubar.jsp" %>
<table align='center' width='100%'>
    <tr><td width='30%'></td><td align='center' >


<section class="spark-table col-xs-12">
    <header class="spark-table__header">
        <h4 class="spark-table__title">
            Service Transaction History
        </h4>
        <nav class="spark-table__nav">
            <div class="spark-toolbar spark-toolbar--icon" tabindex="1">
                <div class="spark-toolbar__container--visible">
                    <div class="spark-toolbar__item spark-tooltip" label="Print" tabindex="-1">
                        <span class="spark-tooltip__content--bottom" role="tooltip">Print</span>
                        <div class="spark-icon-print spark-toolbar__item-helper"></div>
                    </div>
                    <div class="spark-toolbar__item" label="Settings" tabindex="-1">
                        <div class="spark-toolbar__item--content">
                            <ul class="spark-toolbar__list spark-toolbar__item--close-on-click">
                                <li>Save Results</li>
                                <li>Export to Excel</li>
                                <li>Create an Alert</li>
                            </ul>
                            <ul class="spark-toolbar__list spark-toolbar__item--close-on-click">
                                <li>Modify Search</li>
                                <li>Advanced Search</li>
                            </ul>
                        </div>
                        <div class="spark-icon-cog spark-toolbar__item-helper"></div>
                    </div>
                    <div class="spark-toolbar__item spark-tooltip" label="Filter" tabindex="-1">
                        <span class="spark-tooltip__content--bottom" role="tooltip">Filter</span>
                        <div class="spark-icon-sliders spark-toolbar__item-helper"></div>
                    </div>
                    <div class="spark-toolbar__item spark-tooltip" label="Delete" tabindex="-1">
                        <span class="spark-tooltip__content--bottom" role="tooltip">Delete</span>
                        <div class="spark-icon-trash spark-toolbar__item-helper"></div>
                    </div>
                </div>
                <div class="spark-toolbar__show-more">
                    <i class="spark-icon-menu-ellipsis-vertical"></i>
                </div>
                <!-- All items should be placed in .spark-toolbar__container-shown -->
                <div class="spark-toolbar__container--hidden">
                </div>
            </div>
        </nav>
    </header>
    <div class="spark-table__scroll" id="transactionTable">
        <%--<script id="itemTemplate" type="text/x-jquery-tmpl">
            <tr>
                <td>${flightNo}</td>
                <td>${aircraftComponent}</td>
            </tr>
        </script>
        <table role="grid">
            <thead>
            <tr>
                <th data-sort="asc">
                    Flight No.
                </th>
                <th data-sort>
                    Aircraft Component
                </th>
            </tr>
            </thead>
            <tbody id="itemList">
            </tbody>
        </table>--%>
    </div>
</section>

<style type="text/css">

</style>





<script type="text/javascript">

    $(document).ready(function () {
        $.post("transactionHistoryObjects", function(data){
            var temp = JSON.parse(data);
            alert("Data: " + temp );

            var count=Object.keys(temp).length;
            alert("length: " + count );

            var content = "<table role='grid'><thead>";
            content += "<tr> <th data-sort>Serial No </th> <th data-sort='asc'>Flight No. </th> <th data-sort>Component Name </th><th data-sort>Model </th>";
            content += "<th data-sort>Manufacturer </th><th data-sort>Manufacturing Date</th><th data-sort>Expiry Date </th><th data-sort>Service Request ID </th>"
            content += "<th data-sort>Service request Date </th><th data-sort>Service over date</th><th data-sort>Next service Date </th><th data-sort>Service Engineer </th>"
            content += "<th data-sort>Comments </th><th data-sort>transaction type</th><th data-sort>Service verified by </th><th data-sort>Designation </th>"
            content += " </tr></thead>";
            for(i=0; i<count; i++){
                content += '<tr><td>' + temp[i].serialNo + '</td>';
                content += '<td>' + temp[i].flightNo + '</td>';
                content += '<td>' + temp[i].componentName + '</td>';
                content += '<td>' + temp[i].componentModel + '</td>';
                content += '<td>' + temp[i].componentManufacturer + '</td>';
                content += '<td>' + temp[i].componentManufacturingDate + '</td>';
                content += '<td>' + temp[i].componentExpiryDate + '</td>';
                content += '<td>' + temp[i].serviceRequestId + '</td>';
                content += '<td>' + temp[i].serviceRequestDate + '</td>';
                content += '<td>' + temp[i].serviceOverDate + '</td>';
                content += '<td>' + temp[i].nextServiceDate + '</td>';
                content += '<td>' + temp[i].serviceEngineer + '</td>';
                content += '<td>' + temp[i].comments + '</td>';
                content += '<td>' + temp[i].transactionType + '</td>';
                content += '<td>' + temp[i].serviceVerifiedBy + '</td>';
                content += '<td>' + temp[i].designation + '</td></tr>';
            }
            content += "</table>"

            $('#transactionTable').append(content);


           /* $( "#itemTemplate" ).tmpl(data).appendTo( "#itemList" );*/
        });

    })

</script>
    </td></tr></table>

</body>
</html>