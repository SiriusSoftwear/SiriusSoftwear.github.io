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
  $("#holder").append('<div id="formula"style="float:right;background-color:#7E8F7C;color:#3B3738;width:30%;height:auto;display:none;font-size:40px;text-align:left;padding-left:20px;padding-top:20px;padding-bottom:20px;">Kontaktdaten<br/><input class="textfield" type="text" name="Vorname" id="vorname" maxlength="30" placeholder="Vorname"><br/><input class="textfield" type="text" name="Nachname" id="nachname" maxlength="30" placeholder="Nachname"><br/><input class="textfield" type="text" name="Geburtsdatum" id="geburtsdatum" maxlength="8" placeholder="Geburtstag(TT.MM.JJ)"><br/><input class="textfield" type="text" name="Email" id="email" maxlength="30" placeholder="Email"></div>');
  $("#formula").fadeIn(1000);
  /*$('#go_back').replaceWith('<div class="ticket_button" onclick="LoadTicketOverview()" style="float:left;width:10%;height:50px;background-color:#C63D0F;margin-top:20px;margin-left:0px;text-align:center;font-size:40px;box-sizing:border-box;color:#3B3738;border-radius:5px;">Zurück</div>');*/
  //$('#go_forward').replaceWith('<div id="paypal-button" class="ticket_button"style="float:right;width:10%;height:50px;background-color:#C63D0F;margin-top:20px;text-align:center;font-size:40px;box-sizing:border-box;color:#3B3738;border-radius:5px;" onclick="SendPOSTRequest()">Weiter</div>');
  $('#go_forward').replaceWith('<div id="paypal-button" NOSHIPPING=1 style="width:30%;margin-top:20px;margin-left:70%;box-sizing:border-box;"></div>');
  paypal.Button.render({

      env: 'sandbox', // Optional: specify 'sandbox' environment


      client: {
          sandbox:    'ASYUBLFT5ziCVG0cGaGSw2n2_4ZjwMymqHVf0JkLiop_aYvGRF1bgdJt6YGsI4DOn_qXT5sBC-q59jAI'
      },

      payment: function() {

          var env    = this.props.env;
          var client = this.props.client;

          return paypal.rest.payment.create(env, client, {
              transactions: [
                  {
                    amount:
                    {
                      total: overall,
                      currency: 'EUR',
                      details: {
                        subtotal: overall,
                        tax: "0.00",
                        shipping: "0.00",
                        handling_fee: "0.00",
                        shipping_discount: "0.00",
                        insurance: "0.00"
                      }
                    },
                    description: "BEschreibung"
                }
              ]
          });
      },

      commit: true, // Optional: show a 'Pay Now' button in the checkout flow

      onAuthorize: function(data, actions) {

          return actions.payment.execute().then(function() {
              // Show a success page to the buyer
              $('#paypal-button').replaceWith('');
              $('#holder').replaceWith('<div id="holder" style="overflow:auto;height:auto;width:100%;"><div id="checkout"style="margin-left:70%;background-color:#7E8F7C;color:#3B3738;width:30%;height:auto;font-size:40px;text-align:left;padding-left:20px;padding-top:20px;padding-bottom:20px;">Danke für deine Bestellung!</div></div>')
              $('#checkout').animate({
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
