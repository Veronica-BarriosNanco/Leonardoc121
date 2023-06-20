function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet', modelLoaded); //corregir classifier es con i latina
}
function modelLoaded() {
  console.log('modelLoaded')
}
function draw() {
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);// corregir la palabra classifier porque es con i latina al igual que classify corregir las dos
 
  }
  var prevews_result='';
  function gotResult(error, results) {
    if(error){
     
      console.error(error);
    }else{
        if((results[0].confidence>0.5)&&(prevews_result != results[0].label)){//palabra confidence va con c
          console.log(results);
          prevews_result=results[0].label;
          var synth = window.speechSynthesis;
          speak_data='el objeto detectado es '+results[0].label; //corregir la palabra speak data esta mal escrita
          var utterThis= new SpeechSynthesisUtterance(speak_data); //completar esta linea de codigo porque esta incompleta
          synth.speak(utterThis); 
          document.getElementById("result_object_name").innerHTML = results[0].label; 
          document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        }
      }
  }