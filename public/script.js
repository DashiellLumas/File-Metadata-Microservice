var base64Img = null;
margins = {
  top: 10,
  bottom: 40,
  left: 30,
  width: 550
};

generatePDF = function() {
  var pdf = new jsPDF('p', 'pt', 'a4');
 pdf.setFontSize(18);
 pdf.fromHTML(document.getElementById('html-2-pdfwrapper'),
   margins.left,
   margins.top,
   {
     width: margins.width
   },function(dispose) {
   },
   margins);

 var iframe = document.createElement('iframe');
 iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
 document.body.appendChild(iframe);

 iframe.src = pdf.output('datauristring');
}

function headerFooterFormatting(doc)
{
    var totalPages  = doc.internal.getNumberOfPages();

    for(var i = totalPages; i >= 1; i--)
    {
        doc.setPage(i);

        header(doc);

    }
};

function header(doc)
{
    doc.setFontSize(30);
    doc.setTextColor(40);
    doc.setFontStyle('normal');

    if (base64Img) {
       doc.addImage(base64Img, 'JPEG', margins.left, 10, 40,40);
    }

    doc.text("Report Header Template", margins.left + 50, 40 );

    doc.line(3, 70, margins.width + 43,70); // horizontal line
};

window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('html-2-pdfwrapper');

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function(){
        if(previousMarkdownValue != pad.value){
            return true;
        }
        return false;
    };

    setInterval(function(){
        if(didChangeOccur()){
            convertTextAreaToMarkdown();
        }
    }, 10);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    sharejs.open(document.location.pathname, 'text', function(error, doc) {
    doc.attach_textarea(pad);
    convertTextAreaToMarkdown();
});

};
