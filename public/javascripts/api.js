        //*************   AJAX Requests   ********************

    $(document).ready(function(){

    //AJAX Create User Account
    $('.form1').on('submit', function(event){

        event.preventDefault(); // Prevent the default form submission

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
             
        if(xhttp.readyState == 4 && xhttp.status == 200){


        if ($('.form1')[0]) {
            $('.form1')[0].reset(); // Reset the form if the request is successful
            }  
                
        const response = JSON.parse(xhttp.responseText); // Parse JSON response

      if(response.message) {
            $('.responseDiv').removeClass('bg-red-200').addClass('bg-green-200');
            $('.responseDiv h1').text(response.message); // Display the message
            window.location.href = response.redirect; // Redirect on successful Registration
            

      } else {
           $('.responseDiv').removeClass('bg-green-200').addClass('bg-red-200');
           $('.responseDiv h1').text(response.error); // Display the message
      }
         $('.responseDiv').show().delay(3000).fadeOut(); 
     }
        }

        xhttp.open('POST', 'users/register', true); // Open a POST request
        xhttp.setRequestHeader('Content-Type', 'application/json');  // Set the content type to JSON

        // Serialize form data to JSON
        const formData = $(this).serializeArray();
        const jsonData = {};
        formData.forEach(field => jsonData[field.name] = field.value);
        xhttp.send(JSON.stringify(jsonData));  // Send the JSON string
     });



    //  Login AJAX
     $('.form2').on('submit', function(event){
                 
        event.preventDefault();

      let xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function(){
         if(xhttp.readyState == 4 && xhttp.status == 200){

            if ($('.form2')[0]) {
               $('.form2')[0].reset(); // Reset the form if the request is successful
            }
            // Parising the response
            const response = JSON.parse(xhttp.responseText);

            if(response.error) {
            $('.responseDiv2 h1').text(response.error);
            $('.responseDiv2').show().delay(3000).fadeOut();
            }
            else{
               window.location.href = response.redirect; // Redirect on successful login
            }
         }
      }
      xhttp.open('POST', 'users/login', true);
      xhttp.setRequestHeader('Content-Type', 'application/json');

      // Serialize form data to JSON
      const formData = $(this).serializeArray();
      const jsonData = {};
      formData.forEach(field => jsonData[field.name] = field.value);
      xhttp.send(JSON.stringify(jsonData));
     });




      //Create Product 
      $('.productForm').on('submit', function (event) {
        event.preventDefault();
        
     // Create a FormData object
     var formData = new FormData(this)
     let xhttp = new XMLHttpRequest()
     xhttp.onreadystatechange = function () {
     if(xhttp.readyState == 4 && xhttp.status == 200){
        
        let response = JSON.parse(xhttp.responseText);
       
        if(response.success) {
        $('.responseDiv').removeClass('bg-red-200').addClass('bg-green-200');
        $('.responseDiv h1').text(response.success); // Display the message
        $('.responseDiv').show().delay(3000).fadeOut(); 
        if ($('.productForm')[0]) {
          // Use a timeout to ensure the form is reset after the response is processed
          setTimeout(function () {
              $('.productForm')[0].reset(); // Reset the form if the request is successful
              $('#proImg').attr('src', '/images/defaultImage.png'); // Reset the image preview
              $('#proImg2').attr('src', '/images/defaultImage.png'); // Reset the image preview
          }, 500)};
        }else if(response.error) {
        $('.responseDiv').removeClass('bg-green-200').addClass('bg-red-200');
        $('.responseDiv h1').text(response.error); // Display the error message
        $('.responseDiv').show().delay(3000).fadeOut(); 
       }else if(response.errorImg){
        $('#imgResponse').text(response.errorImg);
       }
      }
    }
    xhttp.open('POST', '/products/create', true);
    xhttp.send(formData);
  });


    // Shop
    $('.addToCart').on('click', function (e){
                     
        let productId = $(this).data('id');

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if(xhttp.readyState == 4 && xhttp.status == 200){
          let response = JSON.parse(xhttp.responseText);
            $('.success').show().delay(1000).fadeOut();
            $('.success h1').text(response.message);
          }
        }

        xhttp.open('GET', `/addtocart/${productId}`, true);
        xhttp.send();
      
    });


    // Admin Event listener for delete button
    $('.cart').on('click', '.delete-btn', function(){
      let productid = $(this).data('productid');
      let slideElement = $(this).closest('.cart');  // Define slideElement here

      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
          if(xhttp.readyState == 4 && xhttp.status == 200){

              let response = JSON.parse(xhttp.responseText);
              
              // Show success message
              $('.success h1').text(response);
              $('.success').show().delay(1000).fadeOut();
               // Remove the slide from the DOM
              
              slideElement.remove();
              }
            }

      xhttp.open('GET', `/deleteProduct/${productid}`, true);
      xhttp.send();
  });




 });