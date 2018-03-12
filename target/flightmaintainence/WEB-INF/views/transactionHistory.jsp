<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/ui/common-spark.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/main.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Transaction History page</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

</head>
<body>
<%@ include file="header.jsp"%>


<h1> hello Bro</h1>


<script type="text/javascript">

    $(document).ready(function () {
        $.post("transactionHistoryObjects", function(data){
            alert("Data: " + data );
        });

    })

</script>


    <%@ include file="footer.jsp"%>
</body>
</html>