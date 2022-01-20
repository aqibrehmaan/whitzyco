// signupform


        $(document).ready(function(){

          // console.log(base_url);
     function sendinblue(email)
      {
            var data = {EMAIL:email,locale:'en',html_type:'simple',email_address_check:''};
            var url = "https://d9f974f4.sibforms.com/serve/MUIEAHX6M2usNnZYjfMZZNo1cyiKMposLqnW8pmEoFAX4-jNdMpZ_M2bTw4fDuxIwYkp3xJ8zTHyK-4FRoIK14OBAfBciu15Ayy7oTdHKPGL57LfZrv63FgnvxfoiRJ58RIfHyHLGLwWVHR-Zq45FzzgtlDtyNOQ2REwCcLcIDj1wXGuGhvIQTjkmmacOz47vZkesHbpCurBAXdy";
            var response = AjaxRequest.formrequest(url, data);
            // console.log("adasdasd");
      }


   $("#signupSubmit").click(function()
    {
    
      var alldone= 0;
  
       if ($('#pass').val() == $('#retype').val()) 
       {
        alldone = 1;
       }else
       {
         AdminToastr.error("Password Feilds Donot Match",'Success');
          alldone = 0;
       }
       if (alldone == 1){
            var target_url = base_url+"account/save_signup";
            
            var data = $("#signupForm").serialize();
            var url = target_url;
            var response = AjaxRequest.formrequest(url, data) ;
            if(response.status == 1)
            {
                 sendinblue($("#signup_email").val());
              AdminToastr.success(response.txt,'Success');
                document.getElementById('signupForm').reset();
                // window.location.href = base_url+"login"; 
            }
            else
            {
              AdminToastr.error(response.txt,'Error'); 
            }
          return false;
       }

    });




      $("#signupSubmit2").click(function()  //for  whitzyco
    {
    
      var alldone= 0;
  
       if ($('#pass2').val() == $('#retype2').val()) 
       {
        alldone = 1;
       }else
       {
         AdminToastr.error("Password Feilds Donot Match",'Success');
          alldone = 0;
       }
       if (alldone == 1){
            var target_url = base_url+"account/save_signup";
            
            var data = $("#signupForm2").serialize();
            var url = target_url;
            var response = AjaxRequest.formrequest(url, data);

            if(response.status == 1)
            {
              AdminToastr.success(response.txt,'Success');
                sendinblue($("#signup_email2").val());
                document.getElementById('signupForm2').reset();
                window.location.href = base_url+"login"; 
            }
            else
            {
              AdminToastr.error(response.txt,'Error'); 
            }
          return false;
       }

    });


   //signin Form
         $("#loginForm").submit(function(e){
          e.preventDefault();
          
          var data = jQuery("#loginForm").serialize();
          var url = base_url+"account/do_login";
          var response = AjaxRequest.formrequest(url, data) ;

          if(response.status == 1)
          {
            AdminToastr.success(response.txt,'Success');
            window.setTimeout(function(){ window.location=document.referrer; }, 2000);
          }
          else
          {
            AdminToastr.error(response.txt,'Error'); 
          }
          return false;
        });

   //signin Form
         // $("#loginForm").submit(function(e){
         $("#loginBtn").click(function(e){
          e.preventDefault();
          
          var data = jQuery("#loginForm").serialize();
          var url = base_url+"account/do_login";
          var response = AjaxRequest.formrequest(url, data) ;

          if(response.status == 1)
          {
            AdminToastr.success(response.txt,'Success');
            window.setTimeout(function(){ window.location=document.referrer; }, 4000);
          }
          else
          {
            AdminToastr.error(response.txt,'Error'); 
          }
          return false;
        });



});

    


//contact_us form
     $("#inquiryForm").submit(function(e){
            e.preventDefault();

            var data = $("#inquiryForm").serialize();
            var url = base_url+"Contact_us/send";
            response = AjaxRequest.formrequest(url, data);

            if(response.status == 0){
              AdminToastr.error(response.txt,'Error');
            }
            else if(response.status == 1){
              AdminToastr.success(response.txt,'Success');
              $('#inquiryForm').trigger("reset");
              grecaptcha.reset();
              
            }
            return false;
    });

     //newsletter
          $("#newsletterForm").submit(function(e){
            e.preventDefault();

            var data = $("#newsletterForm").serialize();
            var url = base_url+"Contact_us/newsletter";
            response = AjaxRequest.formrequest(url, data);

            if(response.status == 0){
              AdminToastr.error(response.txt,'Error');
            }
            else if(response.status == 1){
              AdminToastr.success(response.txt,'Success');
              $('#newsletterForm').trigger("reset");              
            }
            return false;
    });

               //newsletter
          $("#btn-newsletter").click(function(e){
            e.preventDefault();

            var data = $("#newsletterForm_banner").serialize();
            var url = base_url+"Contact_us/newsletter";
            response = AjaxRequest.formrequest(url, data);

            if(response.status == 0){
              AdminToastr.error(response.txt,'Error');
            }
            else if(response.status == 1){
              AdminToastr.success(response.txt,'Success');
              $('#newsletterForm_banner').trigger("reset");              
            }
            return false;
    });


          //reviews or comments
          $("#comment_form").submit(function(e){
            e.preventDefault();
            var data = $("#comment_form").serialize();
            var url = base_url+"contact_us/comment";
            var response = AjaxRequest.formrequest(url, data) ;
            if(response.status == 1)
            {
              AdminToastr.success('Thank you. Your comment.','Success');
              $("#comment_form").trigger("reset");    
    // $('#txt_rply').val(0);
                location.reload(); 
              }
              else
              {
                AdminToastr.error(response.txt,'Error'); 
              }
              return false;
            });


      // FileUploadScript  
//     $(document).ready(function(){
    
//   $(".btn_apply").click(function()
//   {
//       var a = $(this).attr("data-job-info");
//      $("#id_job").val(a);
//   });

//   //Submit Button Clicked
//   $("#submit_inquiry").click(function(){

//   var data = new FormData(document.getElementById('job_inquiry_form'));
//   var url = base_url+"jobs/send";
//   var response = FileUploadScript.fire(url,data,'json','job_inquiry_form');

// return false;
//   });
// });

// $('#file').change(function(e) {
//                 var fileName  = e.target.files[0].name;
//                 // console.log(fileName);
//                 $("#filename").text(fileName );




   // $("#clickme").click(function()
   //  {
            
   //          var target_url = "https://d9f974f4.sibforms.com/serve/MUIEAHX6M2usNnZYjfMZZNo1cyiKMposLqnW8pmEoFAX4-jNdMpZ_M2bTw4fDuxIwYkp3xJ8zTHyK-4FRoIK14OBAfBciu15Ayy7oTdHKPGL57LfZrv63FgnvxfoiRJ58RIfHyHLGLwWVHR-Zq45FzzgtlDtyNOQ2REwCcLcIDj1wXGuGhvIQTjkmmacOz47vZkesHbpCurBAXdy";
            
   //          // var data = $("#signupForm").serialize();
   //          var data = {EMAIL:'qwe@asd.asd',email_address_check:'',locale:'en'};
   //          var url = target_url;
   //          var response = AjaxRequest.formrequest(url, data) ;
   //          if(response.status == 1)
   //          {
              
   //              // AdminToastr.success(response.txt,'Success');
   //              // document.getElementById('signupForm').reset();
   //          }
   //          else
   //          {
   //            AdminToastr.error(response.txt,'Error'); 
   //          }
   //        return false;

   //  });