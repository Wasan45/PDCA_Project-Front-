<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Type - Form</title>

    <script src="js/angular.min.js"></script>
    <script src="js/angular-route.min.js"></script>
    <script src="webapp/app.js"></script>
    <script src="webapp/controller/LoginController.js"></script>
    <script src="webapp/controller/FormController.js"></script>
    
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/jquery-ui.min.css" rel="stylesheet">
    <link href="css/logo-nav.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body ng-app="mainApp">

<div id="wrapper">
    <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                
                <li style="margin-top:50px;" class="men m-a" ><a tabindex="-1" href="index.php#/form"> My Servey</a></li>
                <li class="men m-a" ><a tabindex="-1" href="index.php#/form"> Fill in Servey</a></li>
         
                                      
            </ul>
</div>
    <div id="page-content-wrapper">
    <!-- Navigation -->
<!--    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
             Brand and toggle get grouped for better mobile display 
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <img src="http://placehold.it/150x50&text=Logo" alt="">
                </a>
            </div>
             Collect the nav links, forms, and other content for toggling 
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="index.php#/index">Home</a>
                    </li>
                    <li>
                        <a href="index.php#/form">Forms</a>
                    </li>
                </ul>
            </div>
             /.navbar-collapse 
        </div>
         /.container 
    </nav>-->

    <!-- Page Content -->
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div ng-view></div>
            </div>
        </div>
    </div>
    <!-- /.container -->

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <div style="margin-top: 20px;"></div>
    </div>
</div>
</body>

</html>