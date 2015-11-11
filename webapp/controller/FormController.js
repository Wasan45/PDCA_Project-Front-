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
				$scope.topic = response["data"];
                for(i = 0; i < response["data"].length; i++){
                    html = '<button id="tp-'+ response["data"][i]["id"] +'" style="height:100px; width:250px;" ng-click="getMenu(\''+ response["data"][i]["id"] +'\')" class="btn btn-info button-form"><span style="font-size: 24px;" class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> <span style=" font-weight: bold; font-size: 20px;"><br/>' + response["data"][i]["topic"] + '</span></button> ';
                    $("#existing-forms").append($compile(html)($scope));
                }
            });
            $("#start_date").datepicker();
            $("#end_date").datepicker();
            $scope.addChild($scope.radio_no);
    };
    
    $scope.getMenu = function(id){
        $('#f_id').val(id);
        $scope.f_id = id;
        $("#modal-question").modal('show');
    }
     
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
    
    $scope.beforeDelete = function(){
        $('.form-delete').show();
    }
  
    $scope.delete = function(){
        $scope.complete();
        $("#modal-question").modal('hide');
        $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/form.php',
              data: {
                  action : "delete",
                  topic_id : $scope.f_id
              }
            })
            .done(function( response ) {
                $("#tp-" + $scope.f_id).remove();
             
            });
    };
    
    $scope.getReport = function(){
        $scope.reportlist = true;
        $scope.complete();
        $("#modal-question").modal('hide');
        $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/statistic.php',
              data: {
                  action : "getStatistic",
                  topic_id : $scope.f_id
              }
            })
            .done(function( response ) {
                for(i = 0; i < response["statistic"].length; i++){
                    
                    $("#report_topic").html(response["statistic"][i]["topic"]);
                    
                    html_stat = '<tr class="t-h">\n\
                                <td>'+response["statistic"][i]["quest"]+'</td>\n\
                                <td>'+((response["statistic"][i]["s_min"] == null)?"0":response["statistic"][i]["s_min"])+'</td>\n\
                                <td>'+((response["statistic"][i]["s_max"] == null)?"0":response["statistic"][i]["s_mas"])+'</td>\n\
                                <td>'+((response["statistic"][i]["s_mean"] == null)?"0":response["statistic"][i]["s_mean"])+'</td>\n\
                                <td></td>\n\
                                <td></td>\n\
                                <td></td>\n\
                            </tr>';
 
                    $("#report-show").append($compile(html_stat)($scope));
                }
                
            });
    };
    
   $scope.getReportSpec = function(){
        $scope.reportlist = true;
        $scope.complete();
        $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/statistic.php',
              data: {
                  action : "getStatistic",
                  topic_id : $scope.f_id
              }
            })
            .done(function( response ) {
                for(i = 0; i < response["statistic"].length; i++){
                    
                    $("#report_topic").html(response["statistic"][i]["topic"]);
                    
                    html_stat = '<div class="table-responsive">\n\
                        <table class="table table-bordered" id="table-form">\n\
                            <tr>\n\
                                <th width="52%">หัวข้อ</th>\n\
                                <th width="8">MIN</th>\n\
                                <th width="8">MAX</th>\n\
                                <th width="8">MEAN</th>\n\
                                <th width="8">MODE</th>\n\
                                <th width="8">SD</th>\n\
                                <th width="8">N</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <td>'+response["statistic"][i]["quest"]+'</td>\n\
                                <td>'+response["statistic"][i]["s_min"]+'</td>\n\
                                <td>'+response["statistic"][i]["s_max"]+'</td>\n\
                                <td>'+response["statistic"][i]["s_mean"]+'</td>\n\
                                <td></td>\n\
                                <td></td>\n\
                                <td></td>\n\
                            </tr>\n\
                    </table><br/>\n\
                    </div>';
 
                    $("#report-show").append($compile(html_stat)($scope));
                }
                
            });
    };
    
    $scope.getQuestion = function(index){
            index = $scope.f_id;
            $scope.topic_select = index;
            $("#form-list-select").html("");
                $scope.show_list = true;
                $scope.show = false;
           $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/form.php',
              data: {
                  action : "getQuestion",
                  topic_id : $scope.f_id
              }
            })
            .done(function( response ) {
                var temp_id = 0;
		$("#table-form-show").html("");
                $scope.html = "";
                $scope.count_print = new Array();
                        
                        
                for(i = 0; i < response["question"].length; i++){
                    $("#topic_form").html(response["question"][i]["topic"]);
                    var form_id = response["question"][i]["from_id"];
                    
                    if($scope.count_print[form_id] == undefined){
                        $scope.count_print[form_id] = 0;
                    }

                    if(response["question"][i]["from_id"] != temp_id && temp_id != 0){
                        $scope.html += "</table></div></div></div>";
                    }
                    
			var html = '<div class="row">\n\
                            <div class="col-md-2">\n\
                                Topic : \n\
                            </div>\n\
                            <div class="col-md-8">\n\
                                '+ response["question"][i]["question"] +'\n\
                            </div>\n\
                           </div><br/>\n\
                    <div class="row">\n\
                    <div class="col-md-10">\n\
                    <div class="table-responsive">\n\
                    <table class="table table-bordered" id="table-form">\n\
                    <tr>\n\
                        <th width="60%" rowspan="2"></th>\n\
                        <th width="8">มากที่สุด</th>\n\
                        <th width="8">มาก</th>\n\
                        <th width="8">ปานกลาง</th>\n\
                        <th width="8">น้อย</th>\n\
                        <th width="8">น้อยที่สุด</th>\n\
                    </tr>\n\
                    <tr>\n\
                        <th>5</th>\n\
                        <th>4</th>\n\
                        <th>3</th>\n\
                        <th>2</th>\n\
                        <th>1</th>\n\
                    </tr>\n\
                    <tr class="'+response["question"][i]["from_id"]+'" style="display:none"> \n\
                        <td></td>\n\
                        <td></td>\n\
                        <td></td>\n\
                        <td></td>\n\
                        <td></td>\n\
                        <td></td>\n\
                    </tr>';
                    
                    var html_child = '<tr class="t-'+i+'"> <td class="question-child">\n\
                            <div class="row">\n\
                                <div class="col-md-9">\n\
                                    '+ response["question"][i]["sub_question"] +'\n\
                                </div>\n\
                            </div>\n\
                        </td>\n\
                        <td><input type="radio" value="'+ response["question"][i]["question_id"] +'-5" name="q-'+ response["question"][i]["question_id"] +'"></td>\n\
                        <td><input type="radio" value="'+ response["question"][i]["question_id"] +'-4" name="q-'+ response["question"][i]["question_id"] +'"></td>\n\
                        <td><input type="radio" value="'+ response["question"][i]["question_id"] +'-3" name="q-'+ response["question"][i]["question_id"] +'"></td>\n\
                        <td><input type="radio" value="'+ response["question"][i]["question_id"] +'-2" name="q-'+ response["question"][i]["question_id"] +'"></td>\n\
                        <td><input type="radio" value="'+ response["question"][i]["question_id"] +'-1" name="q-'+ response["question"][i]["question_id"] +'"></td></tr>';
                        
//                        alert($scope.count_print[form_id]);
                        if($scope.count_print[form_id] == 0){
                            $scope.html  += html;
                        }
                        $scope.count_print[form_id]++;
                        $scope.html += html_child;
                        temp_id = form_id;
                }
                $scope.html += "</table></div></div></div>";
                $("#table-form-show").append($compile($scope.html)($scope));
            });
            $("#modal-question").modal('hide');
            
    };
    
    $scope.newForm = function(){
        $scope.show = true;
        $scope.show_list = false;
        $("#topic").val($("#topic-modal").val());
    };

    $scope.add = function(){
        $scope.radio_no++;
        var html = '<p style="border-bottom:1px solid black; margin-bottom:40px;"></p>\n\
            <div class="row">\n\
                <div class="col-md-2">\n\
                    Topic Area : \n\
                </div>\n\
                <div class="col-md-8">\n\
                    <textarea class="form-control" id="question-' + $scope.radio_no + '"  placeholder="Topic No ' + $scope.radio_no + '"></textarea>\n\
                </div>\n\
            </div><br/>\n\
            <div class="row">\n\
                <div class="col-md-10">\n\
                    <div class="table-responsive">\n\
                        <table class="table table-bordered" id="table-form">\n\
                        <tr>\n\
                                <th width="60%" rowspan="2">\n\
                                </th>\n\
                                <th width="8">มากที่สุด</th>\n\
                                <th width="8">มาก</th>\n\
                                <th width="8">ปานกลาง</th>\n\
                                <th width="8">น้อย</th>\n\
                                <th width="8">น้อยที่สุด</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th>5</th>\n\
                                <th>4</th>\n\
                                <th>3</th>\n\
                                <th>2</th>\n\
                                <th>1</th>\n\
                            </tr>\n\
                            <tr class="t-' + $scope.radio_no + '" style="display:none;">\n\
                            <td><textarea class="form-control"  placeholder="คำถามข้อที่ ' + $scope.radio_no + '"></textarea>\n\</td>\n\
                            <td><input type="radio" name="q-' + $scope.radio_no + '" value="5"></td>\n\
                            <td><input type="radio" name="q-' + $scope.radio_no + '" value="4"></td>\n\
                            <td><input type="radio" name="q-' + $scope.radio_no + '" value="3"></td>\n\
                            <td><input type="radio" name="q-' + $scope.radio_no + '" value="2"></td>\n\
                            <td><input type="radio" name="q-' + $scope.radio_no + '" value="1"></td>\n\
                            </tr>\n\
                        </table><br/>\n\
                    </div>\n\
                </div>\n\
                <div class="col-md-1">\n\
                    <button id="add" ng-click="addChild(' + $scope.radio_no + ')" class="btn btn-info"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>\n\
                </div>\n\
            </div>';
        $("#form-list").append($compile(html)($scope));
        $scope.addChild($scope.radio_no);
    };
    
    $scope.addChild = function(ch){
        $("input[name='q-"+ch+"']").remove();
        if($scope.radio_child_no[ch] == undefined){
            $scope.radio_child_no[ch] = 1;
        } else {
            $scope.radio_child_no[ch]++;
        }
        var html = '<tr class="t-' + ch + '">\n\
                        <td><textarea class="form-control" id="child-'+ch+'" placeholder="Question No '+ $scope.radio_child_no[ch] +'"></textarea></td>\n\
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
            "start_date" : $("#start_date").val(),
            "end_date" : $("#end_date").val(),
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
                $scope.alert("Save Form Completed");
            });
        
    };
    
    $scope.poll = function(){
        var question_id = new Array();
        var choice = new Array();
        $.each($("input[name^='q-']:checked"), function(index, value){
            var data = value.value.split("-");
            question_id[index] = data[0];
            choice[index] = data[1];
        });
        
      $scope.data = {
            "question_id" : question_id,
            "choice" : choice
        }
        
          $.ajax({
              method: "POST",
              url: $scope.server + '/type-form-service/services/form.php',
              data: {
                  action : "poll",
                  forms : $scope.data
              }
            })
            .done(function( response ) {
                $scope.alert("Save Poll Completed");
            });
    };
    
    $scope.alert = function(msg){
        $scope.msg = msg;
        $("#modal-complete").modal('show');
    };

    $scope.complete = function(){
        $("#table-form-show").html("");
        $scope.html = "";
        $scope.count_print = new Array();
        $("#form-list-select").html("");
        $scope.show_list = false;
        $scope.show = false;
        $(".t-h").html("");
    };
    
    $scope.msg = "Complete";
    $scope.html = "";
    $scope.topic_select = -1;
    $scope.topic = new Array();
    $scope.data = new Array();
    $scope.count_print = new Array();
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

