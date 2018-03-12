<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="HandheldFriendly" content="true" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
   <meta name="robots" content="noindex, nofollow">
   <title>Flight Maintainence</title>
   <meta name="description" content="Spark is the Enterprise Design Language for all Sabre solutions.">
   <link rel="stylesheet" href="resources/sabre-spark-lib/docs/themes/scss/assets/css/main.css">
   <link rel="stylesheet" href="resources/sabre-spark-lib/dist/css/spark.light.min.css">
   <link rel="canonical" href="/iframe/example_header_condensed.html">
   <link rel="alternate" type="application/rss+xml" title="Spark EDL" href="/feed.xml">
</head>
<body class="spark-content--sticky-footer">
<div class="spark-content__wrapper--sticky-footer">
   <!-- SECTION ONLY FOR DEMO -->
   <div class="spark-content__wrapper--sticky-footer">
       <%@include file="header.jsp" %>
      <style type="text/css">
      </style>
   </div>
   <script type="text/javascript" src="resources/sabre-spark-lib/js/modernizr.js"></script>
   <script type="text/javascript" src="resources/sabre-spark-lib/js/jquery.js"></script>
   <script type="text/javascript" src="resources/sabre-spark-lib/js/spark.min.js"></script>
   <script type="text/javascript" src="resources/sabre-spark-lib/js/main.js"></script>
   <script>
       (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
       ga('create', 'UA-37251691-15', 'auto');
       ga('send', 'pageview');
   </script>
   <!-- END SECTION ONLY FOR DEMO -->
   <%@include file="airline.jsp" %>
    <%@include file="footer.jsp" %>
</div>
<style type="text/css">
   /*
   * Background styling based off `spark-splash-screen`
   * Removed portions that were causing defects, like bottom angle and gradient
   * Set a minimum height that should cause a need for scrolling.
   */
   #demo-scroll-background{
      background-color: #e50000;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      min-height: 1500px;
      height: 175%;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
   }
   #demo-scroll-background > * {
      position: relative;
      z-index: 5;
   }
   .shortbody{
      height:300px !important;
      min-height: 300px !important;
   }
</style>
</body>
</html>