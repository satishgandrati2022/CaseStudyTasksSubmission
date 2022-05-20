$(document).ready(function(){
    readData()
    submitforms();

    $('#full').click(function(){
        let sno=$("#sno").val();
        let PartitionKey=$("#PartitionKey").val();
        let RowKey=$("#RowKey").val();
        let title=$("#title").val();
        let description=$('#description').val();
        let completiondate=$('#completiondate').val();
        let imagename=$('#form1 #myfile').val().split('\\').pop();;
        let documentname=$('#form2 #myfile').val().split('\\').pop();;
        // alert("RowKey" + RowKey);
        // alert("Partitionkey" + PartitionKey);
        //alert('RowKey' + RowKey);
      //  alert(PartitionKey + "" + RowKey + ""+ title+" "+description+" "+completiondate+" "+imagename+" "+docname)
        //$.ajax('http://localhost:4500/tasks', {
          //   $.ajax('https://funemployee.azurewebsites.net/api/PostTasktitleDesc?clientId=blobs_extension', {
          //   type: 'POST',  // http method
          // //  data: { id:Math.round(Math.random()*10000),PartitionKey:PartitionKey,RowKey:RowKey,title:title,Description:description,completiondate:completiondate,imagename:imagename,docname:docname},  // data to submit
          // data: { PartitionKey:PartitionKey,RowKey:RowKey,sno:sno,title:title,Description:description,completiondate:completiondate,imagename:imagename,docname:docname},  // data to submit
          //   success: function (data, status, xhr) {
          //       alert("uploaded Successfully")
          //      console.log($("#form1"))
          //     // $( '#btn1' )[0].click()
          //     // $( '#btn2' )[0].click()

             
          //   },
          //   error: function (jqXhr, textStatus, errorMessage) {
          //           alert("failure");
          //   }
          $.ajax({
            type: "POST",
          
            url: "https://funemployee.azurewebsites.net/api/PostTasktitleDesc?clientId=blobs_extension",
            data: JSON.stringify({

                       
              "PartitionKey":PartitionKey,
              "RowKey":RowKey,
              "sno":sno,
              "title":title,
              "Description":description,
              "completiondate":completiondate,
              "imagename":imagename,
              "documentname":documentname,
                
            }),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
              alert("success");
            },
            error: function (jqXhr, textStatus, errorMessage) {
                         alert("failure");
                }
        });

        });
    })



function submitforms(){
    console.log($('#form1')[0])
$( '#btn1' ).click(

function( e ) {
    e.preventDefault();
    let form = $('#form1')[0]
  console.log('this is getting called')
  $.ajax( {
    //url: 'http://localhost:3000/upload',
    url: 'http://20.68.109.56:3000/upload',
    
    type: 'POST',
    data: new FormData( form ),
    processData: false,
    contentType: false,
    success:function(){
        console.log("file successfully uploaded")
    },
    error:function(e){
        console.log(e)
    }
  } );
  e.preventDefault();
} );
$( '#btn2' ).click( function( e ) {

    e.preventDefault();
    let form = $('#form2')[0]
  $.ajax( {
    //url: 'http://localhost:3000/upload',
    url: 'http://20.68.109.56:3000/upload',
    type: 'POST',
    data: new FormData( form ),
    processData: false,
    contentType: false,
    success:function(){
        console.log("file successfully uploaded")
    },
    error:function(e){
        console.log(e)
    }
  } );
 
} );
}
function readData(){
    
  //  $.get("http://localhost:4500/tasks",function(data){
    $.get("https://funemployee.azurewebsites.net/api/PostTasktitleDesc?clientId=blobs_extension",function(data){
        let code="<ul class='list-group'>"
        for(let x in data){
           code+="<li class='list-group-item'>"
           
           code+="<h3>"+data[x].PartitionKey+"</h3>"
           code+="<h3>"+data[x].RowKey+"</h3>"
           code+="<h3>"+data[x].sno+"</h3>"
           code+="<h3>"+data[x].title+"</h3>"
           code+="<p>"+data[x].Description+"</p>"
           code+="<h6>Completion Date:"+data[x].completiondate+"</h6>"
           code+="<h5> Document :: <a href='http://localhost:8090/"+data[x].docname+"'>"+data[x].docname+"</a><h5>"
           code+="<h5>Image::<h5>"+"<img src='http://localhost:8090/"+data[x].imagename+"'>"
           code+="</li>"
        }
        code+="</ul>"
      
        $("#container").html(code)
    })
}