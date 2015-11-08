mainApp.controller('FormController', function($scope, $http, $compile) {
     
    $scope.init = function(){
            $.get($scope.server + '/type-form-app/webapp/view/layout/question.html', function( response ) {
                    $scope.$apply(function() { $scope.question = response; });
            });
            
            $.get($scope.server + '/type-form-app/webapp/view/layout/questions.html', function( response ) {
                    $scope.$apply(function() { $scope.questions = response; });
            });

            $.get($scope.server + '/type-form-app/webapp/view/layout/radio.html', function( response ) {
                    $scope.$apply(function() { $scope.radio = response; });
            });
            
            $.get($scope.server + '/type-form-app/webapp/view/layout/text.html', function( response ) {
                    $scope.$apply(function() { $scope.text = response; });
            });
            
            $.get($scope.server + '/type-form-app/webapp/view/layout/select.html', function( response ) {
                    $scope.$apply(function() { $scope.select = response; });
            });
            
           $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/form.php',
              data: {
                  action : "getTopic"
              }
            })
            .done(function( response ) {
                for(i = 0; i < response["data"].length; i++){
                    html = '<button style="height:100px;" ng-click="getForm(\''+ response["data"][i]["topic"] +'\')" class="btn btn-info button-form"><span style="font-size: 24px;" class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> <span style=" font-weight: bold; font-size: 20px;"><br/>' + response["data"][i]["topic"] + '</span></button> ';
                    $("#existing-forms").append($compile(html)($scope));
                }
            });

    };
     
    $scope.create_radio = function(){

        
        $scope.number++;
        var temp = $scope.question.replace("[[number]]", $scope.number);
        var temp = temp.replace("[[number]]", $scope.number);
        $("#form-list").append($compile(temp)($scope));
        
        var temp = $scope.radio.replace("[[choice]]", "1");
        var temp = temp.replace("[[number]]", $scope.number);
        var temp = temp.replace("[[number]]", $scope.number);
        var temp = temp.replace("[[number]]", $scope.number);
        $("#question-" + $scope.number + "-child").append($compile(temp)($scope));
    };
    
    $scope.add_radio = function(qa){
        $("#add-" + qa).remove();
        count = ($("input[id='choice-" + qa + "']").length) + 1;
        var temp = $scope.radio.replace("[[choice]]", count);
        var temp = temp.replace("[[number]]", qa);
        var temp = temp.replace("[[number]]", qa);
        var temp = temp.replace("[[number]]", qa);
        $("#question-" + qa + "-child").append($compile(temp)($scope));
    };
    
    $scope.create_text = function(){

        $scope.number++;
        var temp = $scope.question.replace("[[number]]", $scope.number);
        $("#form-list").append($compile(temp)($scope));
    }
    
    $scope.submit = function(){
        $.each($("input[id='question']"), function(index, value){ 
            $scope.form[index] = new Array();
            $scope.form[index][0] = value.value;
            $.each($("input[id='choice-"+ (index+1) +"']"), function(indexs, values){ 
                  d = (indexs+1);
                  $scope.form[index][d] = values.value;
            });
        });

           $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/form.php',
              data: {
                  action : "save",
                  forms : $scope.form
              }
            })
            .done(function( response ) {
                $("#form-list").html("");
                alert("Save Form Completed");
            });

    };
    
    $scope.getForm = function(ref){
            $("#form-list-select").html("");
                           $scope.show_list = true;
                $scope.show = false;
           $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/form.php',
              data: {
                  action : "getForm",
                  ref : ref
              }
            })
            .done(function( response ) {
                for(i = 0; i < response["question"].length; i++){
                    var temp = $scope.questions.replace("[[Question]]", response["question"][i]["question"]);
                    var temp = temp.replace("[[number]]", (i + 1));
                    $("#form-list-select").append($compile(temp)($scope));
                        for(j = 0; j < response["choice"].length; j++){
                            if(response["question"][i]["id"] == response["choice"][j]['form_id']){
                                if(response["question"][i]['type'] == 'radio'){
                                    $("#form-list-select").append($compile("<div class='radio-group'><input name='"+ response["question"][i]["id"] +"' type='radio'> " + response["choice"][j]['choice'] + "</div>")($scope));
                                } else if(response["question"][i]['type'] == 'text'){
                                    $("#form-list-select").append($compile("<div><textarea></textarea></div>")($scope));
                                }
                            }
                        }
                }
            });
    };
    
    $scope.newForm = function(){
        $scope.show = true;
        $scope.show_list = false;
    };

    $scope.add = function(){
        $scope.radio_no++;
        var html = '<tr class="t-' + $scope.radio_no + '">\n\
                        <td>\n\
                            <div class="row">\n\
                                <div class="col-md-9">\n\
                                    <textarea class="form-control" id="question-' + $scope.radio_no + '"  placeholder="คำถามข้อที่ ' + $scope.radio_no + '"></textarea>\n\
                                </div>\n\
                                <div class="col-md-1">\n\
                                    <button id="add" ng-click="addChild(' + $scope.radio_no + ')" class="btn btn-info"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> เพิ่มข้อย่อย</button>\n\
                                </div>\n\
                            </div>\n\
                        </td>\n\
                        <td><input type="radio" name="q-' + $scope.radio_no + '" value="5"></td>\n\
                        <td><input type="radio" name="q-' + $scope.radio_no + '" value="4"></td>\n\
                        <td><input type="radio" name="q-' + $scope.radio_no + '" value="3"></td>\n\
                        <td><input type="radio" name="q-' + $scope.radio_no + '" value="2"></td>\n\
                        <td><input type="radio" name="q-' + $scope.radio_no + '" value="1"></td>\n\
                    </tr>';
        $("#table-form").append($compile(html)($scope));
    };
    
    $scope.addChild = function(ch){
        $("input[name='q-"+ch+"']").remove();
        if($scope.radio_child_no[ch] == undefined){
            $scope.radio_child_no[ch] = 1;
        } else {
            $scope.radio_child_no[ch]++;
        }
        var html = '<tr class="t-' + ch + '">\n\
                        <td><textarea class="form-control" id="child-'+ch+'" placeholder="คำถามข้อที่ ' + ch + ' ข้อย่อยที่ '+ $scope.radio_child_no[ch] +'"></textarea></td>\n\
                        <td><input type="radio" name="q-' + ch + '-ch'+$scope.radio_child_no[ch]+'" value="5"></td>\n\
                        <td><input type="radio" name="q-' + ch + '-ch'+$scope.radio_child_no[ch]+'" value="4"></td>\n\
                        <td><input type="radio" name="q-' + ch + '-ch'+$scope.radio_child_no[ch]+'" value="3"></td>\n\
                        <td><input type="radio" name="q-' + ch + '-ch'+$scope.radio_child_no[ch]+'" value="2"></td>\n\
                        <td><input type="radio" name="q-' + ch + '-ch'+$scope.radio_child_no[ch]+'" value="1"></td>\n\
                    </tr>';
        $(".t-" + ch+":last").after($compile(html)($scope));
        
    };
    
    $scope.save = function(){
        var data = new Array();
        $.each($("textarea[id^='question-']"), function(index, obj) {
            data[index] = new Array();
            data[index][0] = obj.value;
            $.each($("textarea[id='child-"+ (index+1) +"']"), function(index_child, obj_child) {
                d = (index_child + 1);
                data[index][d] = obj_child.value;
            });
        });
        
        $scope.data = {
            "header" : $("#header").val(),
            "topic" : $("#topic").val(),
            "data" : data
        }
        
          $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/form.php',
              data: {
                  action : "save",
                  forms : $scope.data
              }
            })
            .done(function( response ) {
//                $("#form-list").html("");
                alert("Save Form Completed");
            });
        
    };
    
    $scope.data = new Array();
    $scope.radio_child_no = new Array();
    $scope.radio_no = 1;
    $scope.number = 0;
    $scope.show = false;
    $scope.show_list = false;
    $scope.email = "";
    $scope.password = "";
    $scope.question = "";
    $scope.questions = "";
    $scope.radio = "";
    $scope.text = "";
    $scope.select = "";
    $scope.form = new Array();
    $scope.server = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '');
    $scope.init();
});


