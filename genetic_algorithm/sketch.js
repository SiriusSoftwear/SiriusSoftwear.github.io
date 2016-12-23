var newpop=new Population();
newpop.Setup();
newpop.update();
function Population(){
  this.size=200;
  this.r=64;
  this.g=255;
  this.b=0;
  this.population=[];
  this.genpool_r=[];
  this.genpool_g=[];
  this.genpool_b=[];
  this.maxfitness=0;
  this.mutationrate=0.01;
  this.mutations=0;
  this.generation=0;
  this.Setup=function(){
    for(i=0;i<this.size;i++){
      this.population.push(new animal());
    }
    var mutation=document.getElementById("mutation");
    mutation.innerHTML=this.mutationrate;
    var mutations=document.getElementById("mutations");
    mutations.innerHTML=this.mutations;
    var population=document.getElementById("population");
    population.innerHTML=this.size;
    var generations=document.getElementById("generations");
    generations.innerHTML=this.generation;
    var highest_fitness=document.getElementById("highest_fitness");
    highest_fitness.innerHTML=this.maxfitness;
    $( "#target" ).replaceWith( '<div class="container"style="background-color:rgb('+this.r+','+this.g+','+this.b+')" id="target"></div>' );
  }

  this.update=function(){
    window.setInterval(function(){
      /// call your function here
      newpop.generation=newpop.generation+1;
      var generations=document.getElementById("generations");
      generations.innerHTML=newpop.generation;
      var av_r=0;
      var av_g=0;
      var av_b=0;
      var average_fitness=0;
      for(i=0;i<newpop.population.length;i++){
        average_fitness+=newpop.population[i].fitness;
        if(newpop.population[i].fitness>newpop.maxfitness){
          newpop.maxfitness=newpop.population[i].fitness;
        }
        av_r+=newpop.population[i].r;
        av_g+=newpop.population[i].g;
        av_b+=newpop.population[i].b;
      }
      av_r/=newpop.population.length;
      av_g/=newpop.population.length;
      av_b/=newpop.population.length;
      average_fitness/=newpop.population.length;
      $( "#average" ).replaceWith( '<div class="container"style="background-color:rgb('+Math.floor(av_r)+','+Math.floor(av_g)+','+Math.floor(av_b)+')" id="average"></div>' );
      var highest_fitness=document.getElementById("highest_fitness");
      highest_fitness.innerHTML=Number((newpop.maxfitness).toFixed(4))*100+"%";
      var average_fitness1=document.getElementById("average_fitness");
      average_fitness1.innerHTML=Number((average_fitness).toFixed(4))*100+"%";
      for(i=0;i<newpop.population.length;i++){
        newpop.population[i].fitness/=newpop.maxfitness;
      }
      for(i=0;i<newpop.population.length;i++){
        var n= newpop.population[i].fitness*100;
        for(j=0;j<n;j++){
          newpop.genpool_r.push(newpop.population[i].r);
          newpop.genpool_g.push(newpop.population[i].g);
          newpop.genpool_b.push(newpop.population[i].b);
        }
      }
      newpop.population=[];
      clearCanvas();
      for(i=0;i<newpop.size;i++){
        newpop.population.push(new animal(newpop.genpool_r[getRandomInt(0,newpop.genpool_r.length)],newpop.genpool_g[getRandomInt(0,newpop.genpool_g.length)],newpop.genpool_b[getRandomInt(0,newpop.genpool_b.length)]));
      }
    }, 2000);
  }
}
function animal(a,b,c){
  if((a!=null)&&(b!=null)&&(c!=null)){
    this.r=a;
    this.g=b;
    this.b=c;
    if(Math.random()<newpop.mutationrate){
      this.r=getRandomInt(0,255);
      this.g=getRandomInt(0,255);
      this.b=getRandomInt(0,255);
      newpop.mutations=newpop.mutations+1;
      var mutations=document.getElementById("mutations");
      mutations.innerHTML=newpop.mutations;
    }
  }else{
    this.r=getRandomInt(0,255);
    this.g=getRandomInt(0,255);
    this.b=getRandomInt(0,255);
  }
  this.fitness=calcFitness(this.r,this.g,this.b);
  drawAnimal(this.r,this.g,this.b);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function calcFitness(r,g,b){
  var fitness=Math.pow(1/Math.sqrt(Math.pow(r-newpop.r,2)+Math.pow(g-newpop.g,2)+Math.pow(b-newpop.b,2)),2);
  return fitness;
}
function drawAnimal(a,b,c){;
  var a_canvas = document.getElementById("myCanvas");
  var context = a_canvas.getContext("2d");
  context.fillStyle="rgb("+Math.floor(a)+", "+Math.floor(b)+", "+Math.floor(c)+")";
  context.beginPath();
  //context.arc(10, 10, 10, 0, 2*Math.PI);
  context.arc(Math.floor(getRandomInt(10,a_canvas.width-10)), Math.floor(getRandomInt(10,a_canvas.height-10)), 10, 0, 2*Math.PI);
  context.closePath();
  context.fill();
}
function clearCanvas(){
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);


}
function changeTarget(){
  var red=parseInt(document.getElementById("red").value);
  var green=parseInt(document.getElementById("green").value);
  var blue=parseInt(document.getElementById("blue").value);
  if((red>=0)&&(green>=0)&&(blue>=0)){
    newpop.r=red;
    newpop.g=green;
    newpop.b=blue;
    $( "#target" ).replaceWith( '<div class="container"style="background-color:rgb('+red+','+green+','+blue+')" id="target"></div>' );
    console.log(newpop.r);
    console.log(newpop.g);
    console.log(newpop.b);
  }
  }
