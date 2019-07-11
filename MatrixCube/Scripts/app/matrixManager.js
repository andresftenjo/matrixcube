$(function () {

    let input = $("#txtInputMatrix");
    let inputNtest = $("#txtNumberTest");
    let objTest = [];
    let testCasesContainer = document.getElementsByClassName("testCases-container");

    let testData = {
            dim: "4 5",
            actions: "UPDATE 2 2 2 4\nQUERY 1 1 1 3 3 3\nUPDATE 1 1 1 23\nQUERY 2 2 2 4 4 4\nQUERY 1 1 1 3 3 3"
    };

    let sendMatrixRequest = function (dim, actions, elem) {
        $.ajax({
            type: "POST",
            url: "Home/ReadMatrix",
            //    data: { matrixStr: matrixStr },
            data: {
                dimensions: dim,
                actions: actions
            },
            success: function (resp) {
                if (resp) {
                    elem.find(".txtResponse").val(resp.replace(/ /g, "\n").replace(/,/g, "\n"))
                }
            },
            dataType: "text"
        });
    };

   

    $("#setNumTest").on("click", function () {
    
        let tests = parseInt(inputNtest.val());
        for (let i = 0; i < tests; i++){
            //objTest.push({
            //    dimensions: "",
            //    actions: ""
            //});
           
            $(testCasesContainer).append('<div class="form-group testCase"> <div class="row"> <label class="col-md-2">Enter the Matrix Dimension:</label> <div class="col-md-10"> <input style="width:50%;" type="text" class="txtDimension" /> </div> </div> <div class="row"> <label class="col-md-2">Enter the Updates or Queries</label> <div class="col-md-10"> <textarea style="width:50%;height:200px;" class="txtActions"></textarea> </div> </div> <div class="row"> <div class="col-md-offset-2 col-md-10"> <input type="button" id="submitMatrix-' + i +'" value="Send Test" class="btn btn-default" /> </div> </div> </div>');

            $("#submitMatrix-" + i).on("click", function () {
                //console.log($(this).text());

                let parentEle = $(this).parent().parent().parent();
                let cDimension = parentEle.find(".txtDimension").val();
                let cActions = parentEle.find(".txtActions").val();

                parentEle.append('<br /><div class="row"> <label class="col-md-2">Response:</label> <div class="col-md-10"> <textarea style="width:50%;height:200px;" class="txtResponse"></textarea> </div> </div> <br />');

                sendMatrixRequest(cDimension, cActions, parentEle);
                
                //$(".txtActions").val("1,2,3".replace(/ /g,"\n").replace(/,/g,"\n"));
            });
        }

        $(".form1").hide();

    });

    

});
