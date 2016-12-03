function increaseValue(){
  var fieldElem = document.getElementById("countField");
  if(parseInt(fieldElem.value, 10)<10){
    fieldElem.value = parseInt(fieldElem.value, 10) +1;
  }
}
function decreaseValue(){
  var fieldElem = document.getElementById("countField");
  if(parseInt(fieldElem.value, 10)>0){
    fieldElem.value = parseInt(fieldElem.value, 10) -1;
}
}
function increaseValue2(){
  var fieldElem = document.getElementById("countField2");
  if(parseInt(fieldElem.value, 10)<10){
    fieldElem.value = parseInt(fieldElem.value, 10) +1;
}
}
function decreaseValue2(){
  var fieldElem = document.getElementById("countField2");
  if(parseInt(fieldElem.value, 10)>0){
    fieldElem.value = parseInt(fieldElem.value, 10) -1;
}
}
var amount_ticket1=0;
var amount_ticket2=0;
var overall=0;
function LoadBill(){
  var fieldElem = document.getElementById("countField");
  var fieldElem2 = document.getElementById("countField2");
  var ticket1=parseInt(fieldElem.value, 10);
  var ticket2=parseInt(fieldElem2.value, 10);
  amount_ticket1=ticket1;
  amount_ticket2=ticket2;
  var all=ticket1*7+ticket2*10;
  overall=all;
  $('#option_holder').replaceWith('<div id="holder" style="overflow:auto;height:auto;width:100%;"><div id="summary"style="float:left;color:#3B3738;height:auto;width:30%;margin-left:60%;background-color:#7E8F7C;font-size:40px;box-sizing:border-box;padding-top:20px;padding-right:20px;padding-bottom:20px;text-align:right;">Bestellung<br/><br/>'+ticket1+'x7€<br/>'+ticket2+'x10€<br/><hr align="right" style="width:40%;"/>'+all+'€</div></div>');
  $('#summary').animate({
    'marginLeft' : "-=60%"
  },'slow');
  $("#holder").append('<div id="formula"style="float:right;background-color:#7E8F7C;color:#3B3738;width:30%;height:auto;display:none;font-size:40px;text-align:left;padding-left:20px;padding-top:20px;padding-bottom:20px;">Kontaktdaten<br/><input type="text" name="Vorname" id="vorname" maxlength="30" placeholder="Vorname"><br/><input type="text" name="Nachname" id="nachname" maxlength="30" placeholder="Nachname"><br/><input type="text" name="Geburtsdatum" id="geburtsdatum" maxlength="8" placeholder="Geburtstag(TT.MM.JJ)"><br/><input type="text" name="Email" id="email" maxlength="30" placeholder="Email"></div>');
  $("#formula").fadeIn(1000);
  /*$('#go_back').replaceWith('<div class="ticket_button" onclick="LoadTicketOverview()" style="float:left;width:10%;height:50px;background-color:#C63D0F;margin-top:20px;margin-left:0px;text-align:center;font-size:40px;box-sizing:border-box;color:#3B3738;border-radius:5px;">Zurück</div>');*/
  $('#go_forward').replaceWith('<div id="go_forward" class="ticket_button"style="float:right;width:10%;height:50px;background-color:#C63D0F;margin-top:20px;text-align:center;font-size:40px;box-sizing:border-box;color:#3B3738;border-radius:5px;" onclick="LoadFormula()">Weiter</div>');
}

/*
function LoadTicketOverview(){
  $('#summary').replaceWith(ticket_overview);
}*/
