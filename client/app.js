
  var submit = document.getElementById('submit-upload'),
  fileInput = document.getElementById('file-input'),
  resultDisplay = document.getElementById('result')

  submit.addEventListener('click', function(){
    if(fileInput.files.length > 0){
      uploadFile(fileInput.files[0]);
    }
  });

  function uploadFile(file) {
    var http = new XMLHttpRequest(),
    formData = new FormData(),
    url = 'upload';

    formData.append('data', file);
    http.open('POST', url, true);
    http.send(formData);
    http.onload = function() {
      resultDisplay.innerHTML = this.responseText;
    }
  }
