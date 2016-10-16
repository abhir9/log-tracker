$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){

$("#mydata").find("td").text("");
  var files = $(this).get(0).files;

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/upload',	
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
		  var count=1;
		   function recursively_ajax(count)
{		  $.ajax({
      url: '/output',	
      type: 'POST',
      data: data+"#"+count,
      processData: false,
      contentType: false,
      success: function(data1){
          console.log('upload successful!\n',data1);
		  if(data1[0] !== "end")
		  {
			           var tableBody="<table>";
				 $.each(data1, function( index, items){
				   tableBody+="<tr><td>"+items+"</td></tr>";
             });
			tableBody+="</table>"
		 			$("#mydata").append(tableBody);
					console.log("recieve successfully ");
					count++;
	  recursively_ajax(count);
		  }

		}
	  });
	  }
	  
	  recursively_ajax(count);
	  }
	,
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }

          }

        }, true);
        return xhr;
      }
    });
	
  }
});
