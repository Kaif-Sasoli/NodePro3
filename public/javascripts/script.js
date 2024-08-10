    //*********** Scripts  *****************/

$(document).ready(function (){

    // Handling paths for adding/removing classes
    var path = window.location.pathname;

    // Index
    if (path === '/') {
        $('#menuIcon').addClass('md:hidden');
        $('#shoplink').addClass('border-b-2');
        $('#headerCreate').addClass('hidden');
        $('#headerHome').addClass('hidden');
        $('#deleteAll').addClass('hidden');

    //  Cart 
    } else if (path.includes('/cart')) {
        $('.sidebar').addClass('md:hidden');
        $('#dashboard').addClass('hidden');
        $('#cartlink').addClass('border-b-2');
        $('#menuIcon').addClass('md:hidden');
        $('#createProduct').addClass('hidden');
        $('#allProductsAdmin').addClass('hidden');
        $('#sidebarCart').addClass('active');
        $('#headerCreate').addClass('hidden');
        $('#headerHome').addClass('hidden');
        $('#deleteAll').addClass('hidden');

    // Profile
    } else if (path.includes('/profile')) {
        $('.sidebar').addClass('md:hidden');
        $('.navbar').removeClass('border-b-2');
        $('.navbar').addClass('text-white');
        $('#profilelink').addClass('border-b-2');
        $('#profilelink').addClass('border-white');
        $('.profileBtn').addClass('border-white');
        $('.navbar').removeClass('bg-white');
        $('#menuIcon').addClass('md:hidden');
        $('#createProduct').addClass('hidden');
        $('#allProductsAdmin').addClass('hidden');
        $('#dashboard').addClass('hidden');
        $('#headerCreate').addClass('hidden');
        $('#headerHome').addClass('hidden');
        $('#deleteAll').addClass('hidden');

    // Edit
    }else if (path.includes('/edit')) {
        $('.sidebar').addClass('md:hidden');
        $('.sidebar').addClass('top-[72px]');
        $('#menuIcon').addClass('md:hidden');
        $('#createProduct').addClass('hidden');
        $('#allProductsAdmin').addClass('hidden');
        $('#dashboard').addClass('hidden');
        $('#headerCreate').addClass('hidden');
        $('#headerHome').addClass('hidden');
        $('#deleteAll').addClass('hidden');

    }  
    // Admin Dashboard
    else if (path.includes('/admin/dashboard')) {
        $('#menuIcon').removeClass('md:hidden');
        $('#dashboard').addClass('active');
        $('#allProducts').addClass('hidden');
        $('#sidebarCart').addClass('hidden');
        $('#newCollection').addClass('hidden');
        $('#discounted').addClass('hidden');
        $('#headerCart').addClass('hidden');
        $('#headerShop').addClass('hidden');
        // $('.filter').addClass('hidden');
    } 
    // Admin Products
    else if (path.includes('/admin/products')) {
        $('#menuIcon').removeClass('md:hidden');
        $('#allProductsAdmin').addClass('active');
        $('#allProducts').addClass('hidden');
        $('#sidebarCart').addClass('hidden');
        $('#discounted').addClass('hidden');
        $('#newCollection').addClass('hidden');
        $('#headerCart').addClass('hidden');
        // $('.filter').addClass('hidden');
        $('#headerShop').addClass('hidden');

    // Admin Create
    } else if (path.includes('/admin/create')) {
        $('#menuIcon').removeClass('md:hidden');
        $('#createProduct').addClass('active');
        $('#allProducts').addClass('hidden');
        $('#sidebarCart').addClass('hidden');
        $('#discounted').addClass('hidden');
        $('#newCollection').addClass('hidden');
        $('#headerCart').addClass('hidden');
        $('#headerProducts').addClass('hidden');
        // $('.filter').addClass('hidden');
        $('#headerShop').addClass('hidden');

    } else if (path.includes('/discounted')) {
        $('#discounted-products').addClass('active');

    } else if (path.includes('/delete')) {
        $('#delete-all').addClass('active');
    }   

    // Header Dropdown
    let isDropDownVisible = false;

    $('.profileBtn').on('click', function (e) {
        e.stopPropagation(); // Prevent click event from propagating to document

        if (!isDropDownVisible) {
            showDropdown();
        } else {
            hideDropdown();
        }
        isDropDownVisible = !isDropDownVisible;
    });

    // Hide Sidebar on Outside Click
    $(document).on('click', function (e) {
        if (isDropDownVisible && !$(e.target).closest('.dropdown, .profileBtn').length) {
            hideDropdown();
            isDropDownVisible = false;
        }
    });

    function showDropdown(){
        $('.dropdown').removeClass('max-h-0').addClass('max-h-52');
    }
    
    function hideDropdown(){
        $('.dropdown').removeClass('max-h-52').addClass('max-h-0');
    }

    // Prevent the dropdown itself from closing when clicked
    $('.dropdown').on('click', function(e) {
        e.stopPropagation();
    });

    
    //  Login & Sign Up of Login Page
     function togglePasswordVisibility(openId, closeId, passwordId) {
        $(`#${openId}`).on('click', function() {
        $(this).addClass('hidden');
        $(`#${closeId}`).removeClass('hidden');
        $(`#${passwordId}`).attr('type', 'text');
        });
     
        $(`#${closeId}`).on('click', function() {
            $(this).addClass('hidden');
            $(`#${openId}`).removeClass('hidden');
            $(`#${passwordId}`).attr('type', 'password');
        });
        }
        
        togglePasswordVisibility('eyeOpen1', 'eyeClose1', 'password1');
        togglePasswordVisibility('eyeOpen2', 'eyeClose2', 'password2');


        $('#signUp').on('click', function(){
           $('.div2').addClass('hidden');
           $('.div1').removeClass('hidden');
        });

           $('#signIn').on('click', function(){
           $('.div1').addClass('hidden');
           $('.div2').removeClass('hidden');
        });


        //  Login & Logout

        // Function to get a cookie by name
        function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
       }
   
        // Check if the user is logged in by checking the presence of the token cookie
        const token = getCookie("token");

        if (token) {
            // User is logged in
           $('#login').addClass('hidden');
           $('#logout').removeClass('hidden');
        } else {
           // User is not logged in
           $('#login').removeClass('hidden');
           $('#logout').addClass('hidden');
        }
        


    
         //  Dashboard
         let progress = ($('#totalOrders').text() / $('#productCount').text()) * 100; // Set progress here (0 to 100)

           // Calculate the stroke-dashoffset value for the progress
           const offset = 220 - (220 * progress / 100);
           $('.circle').css('stroke-dashoffset', offset);
           $('#progress-text').text(`${progress}%`);
        

           $('.flashMessage').each(function(flash){
            $(this).delay(3000).fadeOut();
      });


        // See All Button
        const rows = $('.dashboardTable tr').not(':first'); // Get all rows in the table (excluding the header)
      
        // Define how many rows should be shown initially
        const initialRows = 5;

        // If there are more than the initialRows, hide the extra rows and show the "See All" button
        if (rows.length > initialRows) {
            rows.slice(initialRows).addClass('hidden-row').hide(); // Hide rows beyond the initial 5
            $('#seeAllTable').show(); // Show the "See All" button
        } else {
            $('#seeAllTable').hide(); // Hide the "See All" button if there are 5 or fewer rows
        }

        // Handle "See All" button click
        $('#seeAllTable').on('click', function() {
            const hiddenRows = $('tr.hidden-row'); // Select all rows with the class 'hidden-row'

            if (hiddenRows.is(':visible')) {
              hiddenRows.hide(); // Hide rows if they are visible
              $(this).text('See All'); // Change button text
            } else {
              hiddenRows.show(); // Show hidden rows
              $(this).text('See Less'); // Change button text
            }
        });


        
      //  Dynamically change the Picture for Create User (Edit Page)
      $('#userImage').on('change', function(event){
          let file = this.files[0];
          let allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
          let errorMessage = '';
  
        if (file) {
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            errorMessage = 'Only PNG, JPEG, and JPG files are allowed.';
            $('#userImgResponse').text(errorMessage);
            // Clear the input value to prevent invalid file upload
            return;
              }
  
             let reader = new FileReader();
             reader.onload = function(e){
                 $('#userImg').attr('src', e.target.result);
             }
             reader.readAsDataURL(file);
             // Clear any previous error message
              }
             });
     
      

         // Side Bar
        let flag = false;
        $('.menu').on('click', function(){
        if(flag){
           $(this).css('transform', 'rotate(0)');
           $('.sidebar').addClass('-translate-x-full');
           $('.sidebar').removeClass('translate-x-0');
           $('.sidebar').removeClass('md:w-[280px]').addClass('md:w-[70px]');
           $('.main-body').removeClass('md:w-[calc(100%-280px)]').addClass('md:w-[calc(100%-70px)]');
           $('.main-body').addClass('md:ml-16').removeClass('md:ml-64 md:pl-12');
           $('.hide').each(function (index, element) {
           $(element).addClass('md:hidden');
        });
       }
        else {
           $(this).css('transform', 'rotate(90deg)');
           $('.sidebar').removeClass('-translate-x-full');
           $('.sidebar').addClass('translate-x-0'); 
           $('.sidebar').removeClass('md:w-[70px]').addClass('md:w-[280px]');
           $('.main-body').removeClass('md:w-[calc(100%-70px)]').addClass('md:w-[calc(100%-280px)]');
           $('.main-body').addClass('md:ml-64 md:pl-12').removeClass('md:ml-16');
        
           $('.hide').each(function (index, element) {
           $(element).removeClass('md:hidden');
           });
        }
            flag = !flag;
        });


        // Side bar for Small Screen Toggle
        let isSidebarVisible = false;

        // Toggle Sidebar on Menu Click
        $('.menu').on('click', function (e) {
            e.stopPropagation(); // Prevent click event from propagating to document
    
            if (isSidebarVisible) {
                hideSidebar();
            } else {
                showSidebar();
            }
            isSidebarVisible = !isSidebarVisible;
        });
    
        // Hide Sidebar on Outside Click
        $(document).on('click', function (e) {
            if (isSidebarVisible && !$(e.target).closest('.sidebar, .menu').length) {
                hideSidebar();
                isSidebarVisible = false;
            }
        });
    
        // Sidebar show
        function showSidebar() {
            $('.sidebar').removeClass('-translate-x-full').addClass('translate-x-0');
            $('.menu').css('transform', 'rotate(90deg)');
        }
        // Sidebar hide
        function hideSidebar() {
            $('.sidebar').addClass('-translate-x-full').removeClass('translate-x-0');
            $('.menu').css('transform', 'rotate(0)');  
        }
    

        let isSidebarVisible1 = false;

        // Toggle Sidebar on Menu Click
        $('.menu').on('click', function (e) {
            e.stopPropagation(); // Prevent click event from propagating to document
    
            if (isSidebarVisible1) {
                hideSidebar1();
            } else {
                showSidebar1();
            }
            isSidebarVisible1 = !isSidebarVisible1;
        });
    
        // Hide Sidebar on Outside Click
        $(document).on('click', function (e) {
            if (isSidebarVisible1 && !$(e.target).closest('.sidebar1, .menu').length) {
                hideSidebar1();
                isSidebarVisible1 = false;
            }
        });
    
        // Sidebar show
        function showSidebar1() {
            $('.sidebar1').removeClass('-translate-x-full').addClass('translate-x-0');
            $('.menu').css('transform', 'rotate(90deg)');
        }
        // Sidebar hide
        function hideSidebar1() {
            $('.sidebar1').addClass('-translate-x-full').removeClass('translate-x-0');
            $('.menu').css('transform', 'rotate(0)');  
        }
    
       

    // Dynamically change the Picture  Create Product
    $('#productImage').on('change', function(event){
        let file = this.files[0];
        let allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        let errorMessage = '';

        if (file) {
            // Validate file type
            if (!allowedTypes.includes(file.type)) {
                errorMessage = 'Only PNG, JPEG, and JPG files are allowed.';
                $('#imgResponse').text(errorMessage).css('color', 'red');
                // Clear the input value to prevent invalid file upload
                this.value = '';
                return;
            }

             let reader = new FileReader();
             reader.onload = function(e){
                 $('#proImg').attr('src', e.target.result);
                 $('#proImg2').attr('src', e.target.result);
             }
             reader.readAsDataURL(file);
             // Clear any previous error message
             $('#imgResponse').text('');
            }
           });


    //    Cart
    let slideWidth = getSlideWidth();
    let slidesLenght = $('.slides').length;
    let itreator = 1;


    backgroundUpdate(0); // Initial update
    updateSlideIndexes(slidesLenght); // Initial update

        
    // Event listener for delete button
    $('.cart').on('click', '.delete-btn', function(){
        let productid = $(this).data('productid');
        let slideElement = $(this).closest('.slides');  // Define slideElement here
        let slideIndex = slideElement.index();

        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200){
                let response = JSON.parse(xhttp.responseText);
                
                // Show success message
                $('.success').show().delay(1000).fadeOut();
                $('.success h1').text(response);

                // Remove the slide from the DOM
                slideElement.remove();
                backgroundColors.splice(slideIndex, 1); // Remove the background color of the deleted slide

                // Update the slide positioning and total price
                itreator--;
                slidesLenght--;
                updateCarouselAfterDeletion(slidesLenght);
                recalculatePrices();

                // Show "No Carts Added" message if no slides are left
            if (slidesLenght === 0) {
                $('.main-content').html(`
                    <div class="w-full h-[80vh] flex items-center justify-center text-3xl md:text-5xl font-semibol md:font-bold text-slate-400">
                        <h1>No Carts Added !</h1>
                    </div>
                `);
            }
                    }
                }

        xhttp.open('GET', `/delete/${productid}`, true);
        xhttp.send();
    });

    $('#left').on('click', function() {
            if (itreator <= slidesLenght) {   
                if (itreator == slidesLenght) {
                    itreator = 0;
                }
                backgroundUpdate(itreator);
                $('.slider').css('transform', `translateX(-${slideWidth * itreator}px)`);
                itreator++;
            }
            updateSlideIndexes(slidesLenght); 

        });

        $('#right').on('click', function() {
            if (itreator >= 1) {
                if (itreator == 1) {
                    itreator = slidesLenght + 1;
                }
                itreator--;
                backgroundUpdate(itreator - 1);
                $('.slider').css('transform', `translateX(${-((slideWidth * itreator) - slideWidth)}px)`);
            }
            updateSlideIndexes(slidesLenght); // Initial update

        });



    function updateCarouselAfterDeletion(slidesLenght) {
        let slideWidth = getSlideWidth();
    
 
    updateSlideIndexes(slidesLenght); // Pass totalSlides as a parameter

    // Ensure the iterator does not exceed the total number of slides
    if (itreator > slidesLenght) {
        itreator = slidesLenght;
    }

    // Adjust the slider position to show the correct slide after deletion
    if (itreator > 1) {
        // itreator--;
        $('.slider').css('transform', `translateX(${-(slideWidth * ((itreator)-1))}px)`);
    } else {
        $('.slider').css('transform', `translateX(0)`);
        itreator = 1;
    }

    // Update the background color
    if (slidesLenght > 0 && itreator > 0) {
        backgroundUpdate(itreator - 1);
    } else {
         backgroundUpdate(0);
    }
   }

    function updateSlideIndexes(slidesLenght) {
        $('.slides').each(function (index) {
        // Update the slide number
        $(this).find('.top-1 span').first().text(index + 1);

        // Update the total number of slides
        $(this).find('.top-1 span').last().text('/' + slidesLenght);
    });
    }

    function recalculatePrices() {
        let totalMart = 0;
        let totalDiscount = 0;

        $('.slides').each(function () {
            let price = parseFloat($(this).find('i[data-price]').data('price'));
            let discount = parseFloat($(this).find('i[data-discount]').data('discount'));

            totalMart += price;
            totalDiscount += (price * (discount / 100));
        });

        let platformFee = parseFloat($('#platform').data('platform'));
        let shippingFee = parseFloat($('#shipping').data('shipping'));

        let totalAmount = totalMart + platformFee + shippingFee - totalDiscount;

        $('#totalMRP').text("PKR " + totalMart);
        $('#totalDiscount').text("PKR " + totalDiscount);
        $('#totalAmount').text('PKR ' + totalAmount);
        $('#netTotalInput').val(totalAmount);
    }



        // function updates the background
        function backgroundUpdate(index) {
            if (backgroundColors[index]) {
                $('#sliderMain').css('backgroundColor', backgroundColors[index]);
            }
        }

        //function Caculates the slide width
        function getSlideWidth() {
            return $('.slides').outerWidth(true); // 'true' includes margin if any
        }

         

});