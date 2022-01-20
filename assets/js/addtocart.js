$(document).ready(function()
  {
  
  $("#addtocart").click(function(){

    var productid = $(this).attr('data-productid');
    var price  = $(this).attr('data-product-price');
    var qty = $("#qty").val();
    var size = "";
    var color = "";
    var s = 0;
    var c = 0;

    if ($("#size").length  > 0)
     {
      size = $("#size").val();

      // if (size != "") 
      // {
      //   s = 1;
      // }
      // else{
      //   s = 0;
      //   AdminToastr.error('Select Size','Error');
      // }
      if (size == '' || size == 'custom') 
      {
        s = 0;
        AdminToastr.error('Select Size','Error');
      }
      else{
        s = 1;
      }

    }else{
        s = 1;
    }

    if ($("#color").length  > 0)
     {
      color = $("#color").val();
      
      // if (color != "") 
      if (color == '' || color == 'custom') 
      {
        AdminToastr.error('Select color','Error');
        c = 0;
      }
      else{
        c = 1;
      }
    }else{
        c = 1;
    }


    if (s == 1 && c == 1) {
        addtocart(productid,qty,price,size,color);
    }

     // {
     //    addtocart(productid,qty,price,size,color);
     // }

    // $.ajax({
    // type: "POST", 
    // url: base_url+"Checkout/add_cart",
    // data:  "product_id="+productid+"&qty="+qty+"&price="+price,
    // dataType: "json",                         
    // success: function(msg)
    // {
    //   Loader.hide();
    //   if(msg.status == true)
    //   {
    //     AdminToastr.success('Your item has been added into shopping cart.','Success');
    //     $(".total_items").html(msg.total_items);
    //   }
    //   else
    //   {
    //     AdminToastr.error('You can not add this product because price is not set yet.','Error');
    //   }
    // },    
    // beforeSend: function()
    // {
    //   Loader.show();
    // }

    // });

    });
  //adtocart function
  function addtocart(productid,qty,price,size,color){

        $.ajax({
    type: "POST", 
    url: base_url+"Checkout/add_cart",
    data:  "product_id="+productid+"&qty="+qty+"&price="+price+"&size="+size+"&color="+color,
    dataType: "json",                         
    success: function(msg)
    {
      Loader.hide();
      if(msg.status == true)
      {
        AdminToastr.success('Your item has been added into shopping cart.','Success');
        $(".total_items").html(msg.total_items);
        $(".total").html(msg.total);

      }
      else
      {
        AdminToastr.error('You can not add this product because price is not set yet.','Error');
      }
    },    
    beforeSend: function()
    {
      Loader.show();
    }

    });
  }
//update quantity
        //  $("#update_qty").click(function(e){
          
        //   var quantity = $("#quantity").val();
        //   var qtyid = $("#cart_id").val();
        //   // console.log(quantity);
        //   // console.log(qtyid);

        //   var data = { qty:quantity, id:qtyid}
        //   var url = base_url+"checkout/update_qty";
        //   var response = AjaxRequest.formrequest(url, data) ;

        //   if(response.status == 1)
        //   {
        //     AdminToastr.success("Updated",'Success');
        //     window.location = response.url;
        //   }
        //   else
        //   {
        //     AdminToastr.error(response.txt,'Error'); 
        //   }
        //   return false;
        // });
                 $(".update_qty").click(function(e){
          
          var quantity = $("#quantity").val();
          var qtyid = $("#cart_id").val();
          // console.log(quantity);
          // console.log(qtyid);

          // var data = { qty:quantity, id:qtyid}
          var data = $(this).closest('form').serialize();
          var url = base_url+"checkout/update_qty";
          var response = AjaxRequest.formrequest(url, data) ;
          
          console.log(response);

          if(response.status == 1)
          {
            AdminToastr.success("Updated",'Success');
            window.location = response.url;
          }
          else
          {
            AdminToastr.error(response.txt,'Error'); 
          }
          return false;
        });


  });   //document en


    // proceed checkout
   $("#chkout").click(function(){
    
   if(parseFloat($("#orderTotal").html()) <= 0)
    {
      AdminToastr.error("Invalid amount. Please add more items to the cart or remove the coupon.","Error");
      return false;
    }

    $.ajax({
      type: "POST",
      url: base_url+"checkout/check_checkoutpage",
      data:  "",
      dataType: "json",
      success: function(response)
      {    
        if(response.status == 1)
        {
          window.location = base_url+'checkout/step2';
        }
        else
        {
          // window.location = base_url+'login';
          $(".login-btn").click();
        }        
      }
    });
    return false;   
  }); 
   
            //coupons start
  $("#apply_coupon").click(function(){

  if($("#coupon").val() == '')
  {
    AdminToastr.error("Please enter the coupon code","Error");
    $("#coupon").focus();
    
    return false;
  }

  var total = $('#orderTotal').val();
  $.ajax({
    type: "POST",
    url: base_url+"Checkout/discount",
    data:  "coupon_code="+$("#coupon").val()+"&total="+total,
    dataType: "json",
    success: function(response)
    {    
      if(response.status == 1)
      {
        $("#discount").html(response.discount);
        $("#coupon_total").html("$"+response.new_total);
        AdminToastr.success(response.txt,"Success");  
        // window.setTimeout( function(){window.location = window.location;}, 3000);
        setTimeout(function(){ location.reload(); }, 3000);
        console.log(response.discount);
        console.log(response.new_total);
      }
      else
      {
       AdminToastr.error(response.txt,"Error");
      return false;
      }
      
    }
    });
    return false;   
  });  

//save order
  $("#btn_send").click(function(){

    var data = $("#orderForm").serialize();
    $.ajax({
      type: "POST",
      url:  base_url+"checkout/save_order",
      data:  data,
      dataType: "json",
      success: function(response)
      {
        Loader.hide();
        if(response.status == true){

          $("#orderForm").trigger('reset');
          window.setTimeout( function(){window.location = response.url,3000} );
        }
        else{
          AdminToastr.error(response.txt,'Error');
        }
      },
      beforeSend: function()
      {
        Loader.show();
      }
    });
    return false;

  });


  $("#sameinfo").click(function(){
        if($(this).prop("checked") == true)
        {
        // alert("checked");
        $("#order_shipping_fname").val($("#order_firstname").val());
        $("#order_shipping_lname").val($("#order_lastname").val());
        $("#order_shipping_email").val($("#order_email").val());
        $("#order_shipping_phone").val($("#order_phone").val());
        $("#order_shipping_country").val($("#order_country").val());
        $("#order_shipping_address1").val($("#order_address1").val());
        $("#order_shipping_city").val($("#order_city").val());
        $("#order_shipping_zip").val($("#order_zip").val());
        $("#order_shipping_state").val($("#order_state").val());

        }else{
          
        $("#order_shipping_fname").val('');
        $("#order_shipping_lname").val('');
        $("#order_shipping_email").val('');
        $("#order_shipping_phone").val('');
        $("#order_shipping_country").val('');
        $("#order_shipping_address1").val('');
        $("#order_shipping_city").val('');
        $("#order_shipping_zip").val('');
        $("#order_shipping_state").val('');

        }

  });
// BRAND FILTER AJAX VIEW
  
// $(".bid").click(function()
// {
//     var form_size = $("#brand_form").serialize();

//     // var site_url = "<?=g('base_url')?>";
//     $.ajax({
//     type: "POST",
//     url: base_url+"shop/brand_wise",
//     data:  form_size,
//     dataType: "json",

//     success: function(response)
//     {
//         Loader.hide();
//             $("#htab1").html(response.data);
//             $("#grid").html(response.grid_data);
//     },    

//     beforeSend: function()
//     {
//     Loader.show();
//     }

//     });

// });

// ALPHABET SORTING
//SORT FILTER
$("#sort_by").change(function(){

  sort = $(this).val();
  var main_cat = $(".sort_pid").val();

//reset other filters
  $("#collection_by").val('');  //alphabetical

  $.ajax({
    type: "POST",
    url: base_url+"Shop/alphabet_sorting",
    data:  "pcat="+main_cat+"&sorttype="+sort,
    dataType: "json",
    success: function(response)
    {
        // Loader.hide();
        $("#htab1").html(response.data);
        $("#grid").html(response.grid_data);
      },    
      beforeSend: function()
      {
    // Loader.show();
  }
});
});

// COLLECTION SORTING
$("#collection_by").change(function(){

  //reset other filters
  $("#sort_by").val('');  //alphabetical

  sort = $(this).val();
  var main_cat = $(".sort_pid").val();

  $.ajax({
    type: "POST",
    url: base_url+"Shop/collection_sorting",
    data:  "pcat="+main_cat+"&sorttype="+sort,
    dataType: "json",
    success: function(response)
    {
        // Loader.hide();
        $("#htab1").html(response.data);
        $("#grid").html(response.grid_data);
      },    
      beforeSend: function()
      {
    // Loader.show();
  }
});
});


// $("#alphabet").click(function(){
//     var site_url = "http://localhost/linzee_lee/";
//     var main_cat = "";
//     $.ajax({
//     type: "POST",
//     url: site_url+"Shop/alphabet_sorting",
//     data:  "pcat="+main_cat,
//     dataType: "json",
//     success: function(response)
//     {
//         Loader.hide();
//             $("#filter").html(response.data);
//     },    
//     beforeSend: function()
//     {
//     Loader.show();
//     }
//     });
// });


// WISHLIST AJAX

$(".wish").click(function()
{
var productid = $(this).attr('data-productid');
$.ajax({
type: "POST",
url: base_url+"Checkout/add_wishlist",
data:  "product_id="+productid,
dataType: "json",
success: function(msg)
{
Loader.hide();

  if(msg.status == true)
  {
     AdminToastr.success(msg.txt,'Success'); 
    // window.setTimeout(function(){ window.location=document.referrer; }, 3000);
    $(".wish"+productid).css("color", "red");
    $(".txt").html("ADDED TO WISHLIST");
  }
  else
  {
    AdminToastr.error(msg.txt,'Error');
  }
},    
beforeSend: function()
{
Loader.show();
}
});
});

// BRAND FILTER AJAX VIEW
$(".bid").click(function()
{
  var arr = [];
   $("input:checkbox[class=sid]:checked").each(function () {   
 //           console.log($(this).attr("id") +   " Value: " + $(this).val());
            arr.push($(this).val());
        });
   
   if (arr.length > 0) {

    $("input:checkbox[class=sid]").removeAttr('checked');
    // $("input:checkbox[class=sid]:checked").removeAttr('checked');
   }
   // else{
   //  console.log("workind");
   // }

    var form_size = $("#brand_form").serialize();
    $.ajax({
    type: "POST",
    url: base_url+"shop/brand_wise",
    data:  form_size,
    dataType: "json",

    success: function(response)
    {
        Loader.hide();
            $("#htab1").html(response.data);
            $("#grid").html(response.grid_data);
    },    

    beforeSend: function()
    {
    Loader.show();
    }

    });

});

// SIZE FILTER  AJAX VIEW
$(".sid").click(function()
{
 var arr = [];
 $("input:checkbox[class=bid]:checked").each(function () {   
 //           console.log($(this).attr("id") +   " Value: " + $(this).val());
 arr.push($(this).val());
});

 if (arr.length > 0) {

  $("input:checkbox[class=bid]").removeAttr('checked');
    // $("input:checkbox[class=sid]:checked").removeAttr('checked');
  }


  var form_size = $("#size_form").serialize();
  $.ajax({
    type: "POST",
    url: base_url+"shop/size_wise",
    data:  form_size,
    dataType: "json",

    success: function(response)
    {
      Loader.hide();
      $("#htab1").html(response.data);
      $("#grid").html(response.grid_data);
    },    

    beforeSend: function()
    {
      Loader.show();
    }
  });

});

// /form dropdown
$("#size_by").change(function()
{
 var arr = [];
 $("input:checkbox[class=bid]:checked").each(function () {   
 //           console.log($(this).attr("id") +   " Value: " + $(this).val());
 arr.push($(this).val());
});

 if (arr.length > 0) {

  $("input:checkbox[class=bid]").removeAttr('checked');
    // $("input:checkbox[class=sid]:checked").removeAttr('checked');
  }


  var form_size = $("#size_form_dropdown").serialize();
  $.ajax({
    type: "POST",
    url: base_url+"shop/size_wise",
    data:  form_size,
    dataType: "json",

    success: function(response)
    {
      Loader.hide();
      $("#htab1").html(response.data);
      $("#grid").html(response.grid_data);
    },    

    beforeSend: function()
    {
      Loader.show();
    }
  });

});



$(function() {
    
      $('#size_label').click( function() {
           var other = prompt( "Looking for a Different Size? Enter Size" );
           // other = '';
           if (!other) return false;
           // console.log(other);
           $("#size").val(other);
           $("#size_reset").show();
    });

$('#size_reset').click( function() {
     $("#size").val($("#original_size").val());
     $("#size_reset").hide();
  });


//FOR COLOR
      $('#color_label').click( function() {
           var other = prompt( "Looking for a Different Size? Enter Size" );
           // other = '';
           if (!other) return false;
           // console.log(other);
           $("#color").val(other);
            $("#para_color").text(other);
           $("#color_reset").show();
    });

$('#color_reset').click( function() {
     
     $("#color").val($("#original_color").val());
     $("#para_color").text($("#original_color").val());

     $("#color_reset").hide();
  });


    // $('#size').change( function() {  for drop down // OLD FUNCTIONALITY
    //     var value = $(this).val();
    //     if (value =='custom') {
    //     // if (!value || value == '' || value =='custom') {
    //        var other = prompt( "Looking for a Different Size? Enter Size" );
    //        // other = '';
    //        if (!other) return false;
    //        console.log(other);
    //        $(this).append('<option value="'
    //                          + other
    //                          + '" selected="selected">'
    //                          + other
    //                          + '</option>');
    //     }
    // });


    // $('#color').change( function() {
    //     var value = $(this).val();
    //     if (value =='custom') {
    //     // if (!value || value == '' || value =='custom') {
    //        var other = prompt( "Looking for a Different Color? Enter Color" );
    //        // other = '';
    //        if (!other) return false;
    //        $(this).append('<option value="'
    //                          + other
    //                          + '" selected="selected">'
    //                          + other
    //                          + '</option>');
    //     }
    // });




});
