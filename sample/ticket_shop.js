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
  //Default JSON erstellen
  var json =  {
      transactions: [
          {
            "amount": {
"total": overall,
"currency": "EUR",
"details": {
 "subtotal": overall,
 "tax": "0.00",
 "shipping": "0.00",
 "handling_fee": "0.00",
 "shipping_discount": "0.00",
 "insurance": "0.00"
}
},
"description": "This is the payment transaction description.",
"custom": "GGB_ABIPARTY_TICKET",
"invoice_number": "",
"payment_options": {
"allowed_payment_method": "INSTANT_FUNDING_SOURCE"
},
"soft_descriptor": "ECHI5786786",
"item_list": {
"items": [
 {
   "name": "ticket",
   "description": "Normales Ticket",
   "quantity": amount_ticket1,
   "price": "7",
   "tax": "0.00",
   "sku": "1",
   "currency": "EUR"
 },
 {
   "name": "vip_ticket",
   "description": "VIP-TICKET",
   "quantity": amount_ticket2,
   "price": "10",
   "tax": "0.00",
   "sku": "product34",
   "currency": "EUR"
 }
],
}
              }
      ]
  };
  //Json erstellt
  // Bedingung 1, damit sich das Paypalfenster öffnet
  if(amount_ticket1==0){
    json= {
        transactions: [
            {
              "amount": {
 "total": overall,
 "currency": "EUR",
 "details": {
   "subtotal": overall,
   "tax": "0.00",
   "shipping": "0.00",
   "handling_fee": "0.00",
   "shipping_discount": "0.00",
   "insurance": "0.00"
 }
},
"description": "This is the payment transaction description.",
"custom": "GGB_ABIPARTY_TICKET",
"invoice_number": "",
"payment_options": {
 "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
},
"soft_descriptor": "ECHI5786786",
"item_list": {
 "items": [
   {
     "name": "vip_ticket",
     "description": "VIP-TICKET",
     "quantity": amount_ticket2,
     "price": "10",
     "tax": "0.00",
     "sku": "product34",
     "currency": "EUR"
   }
 ],
}
                }
        ]
    };
  }
    // Bedingung 2, damit sich das Paypalfenster öffnet
  if(amount_ticket2==0){
    json= {
        transactions: [
            {
              "amount": {
 "total": overall,
 "currency": "EUR",
 "details": {
   "subtotal": overall,
   "tax": "0.00",
   "shipping": "0.00",
   "handling_fee": "0.00",
   "shipping_discount": "0.00",
   "insurance": "0.00"
 }
},
"description": "This is the payment transaction description.",
"custom": "GGB_ABIPARTY_TICKET",
"invoice_number": "",
"payment_options": {
 "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
},
"soft_descriptor": "ECHI5786786",
"item_list": {
 "items": [
   {
     "name": "ticket",
     "description": "Normales Ticket",
     "quantity": amount_ticket1,
     "price": "7",
     "tax": "0.00",
     "sku": "1",
     "currency": "EUR"
   }
 ],
}
                }
        ]
    };
  }
  //Bedingung ende
  $('#option_holder').replaceWith('<div id="holder" style="overflow:auto;height:auto;width:100%;"><div id="summary"style="float:left;color:#3B3738;height:auto;width:30%;margin-left:60%;background-color:#7E8F7C;font-size:40px;box-sizing:border-box;padding-top:20px;padding-right:20px;padding-bottom:20px;text-align:right;">Bestellung<br/><br/>'+ticket1+'x7€<br/>'+ticket2+'x10€<br/><hr align="right" style="width:40%;"/>'+all+'€</div></div>');
  $('#summary').animate({
    'marginLeft' : "-=60%"
  },'slow');
  $("#holder").append('<div id="formula"style="float:right;background-color:#7E8F7C;color:#3B3738;width:30%;height:auto;display:none;font-size:40px;text-align:left;padding-left:20px;padding-top:20px;padding-bottom:20px;">Kontaktdaten<br/><input class="textfield" type="text" name="Vorname" id="vorname" maxlength="30" placeholder="Vorname" oninput="FadeInPayPalButton()"><br/><input class="textfield" type="text" name="Nachname" id="nachname" maxlength="30" placeholder="Nachname" oninput="FadeInPayPalButton()"><br/><input class="textfield" type="text" name="Geburtsdatum" id="geburtsdatum" maxlength="8" placeholder="Geburtstag(TT.MM.JJ)" oninput="FadeInPayPalButton()"><br/><input class="textfield" type="text" name="Email" id="email" maxlength="30" placeholder="Email" oninput="FadeInPayPalButton()"></div>');
  $("#formula").fadeIn(1000);
  /*$('#go_back').replaceWith('<div class="ticket_button" onclick="LoadTicketOverview()" style="float:left;width:10%;height:50px;background-color:#C63D0F;margin-top:20px;margin-left:0px;text-align:center;font-size:40px;box-sizing:border-box;color:#3B3738;border-radius:5px;">Zurück</div>');*/
  //$('#go_forward').replaceWith('<div id="paypal-button" class="ticket_button"style="float:right;width:10%;height:50px;background-color:#C63D0F;margin-top:20px;text-align:center;font-size:40px;box-sizing:border-box;color:#3B3738;border-radius:5px;" onclick="SendPOSTRequest()">Weiter</div>');
  $('#go_forward').replaceWith('<div id="paypal-button" style="display:none;width:30%;margin-left:70%;margin-top:20px;"></div>');
  paypal.Button.render({

       env: 'sandbox', // Optional: specify 'sandbox' environment
       client: {
           sandbox:    'ASG4AMze_xYQv5yunNPTPk-B9hUNUUvFjej2nMqzv_euMjSBrEnWmSj7YuLdFqieVqKGz206OgMZ8Yve',
           production: 'xxxxxxxxx'
       },

       payment: function() {

           var env    = this.props.env;
           var client = this.props.client;

           return paypal.rest.payment.create(env, client,json);
       },

       commit: true, // Optional: show a 'Pay Now' button in the checkout flow

       onAuthorize: function(data, actions) {

           // Optional: display a confirmation page here

           return actions.payment.execute().then(function() {
             $('#paypal-button').replaceWith('');
               $('#holder').replaceWith('<div id="success" style="display:block;width:30%;margin-left:70%;color:#3B3738;background-color:#7E8F7C;font-size:40px;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;box-sizing:border-box;">Danke für deine Bestellung!<br/> Wir werden dir dein Ticket schnellstmöglich zusenden!</div>');
               $('#success').animate({
                 'marginLeft' : "-=70%"
               },'slow');
           });
       }

   }, '#paypal-button');
}
function SendPOSTRequest(){
  var vorname =  document.getElementById("vorname").value;
  var nachname =  document.getElementById("nachname").value;
  var geburtsdatum =  document.getElementById("geburtsdatum").value;
  var email =  document.getElementById("email").value;
  $.post( "http://localhost/scrims.NET/input.php", { first_name: vorname, last_name: nachname, birthday: geburtsdatum,email: email,payment_done: "false", ticket1: amount_ticket1, ticket2: amount_ticket2, all: overall} );
}
function FadeInPayPalButton(){
  var vorname =  document.getElementById("vorname").value;
  var nachname =  document.getElementById("nachname").value;
  var geburtsdatum =  document.getElementById("geburtsdatum").value;
  var email =  document.getElementById("email").value;
  if((vorname!="")&&(nachname!="")&&(geburtsdatum!="")&&(email!="")&&(email.includes("@"))&&(geburtsdatum.includes("."))){
    $("#paypal-button").fadeIn(1000);
  }else{
    $("#paypal-button").fadeOut(1000);
  }
}
