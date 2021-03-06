/*
This program is written by CHEN ZHUOFAN | P2100746 | Singapore Polytechnic
Used for ST0502 Fundamental of Programming CA2 Assignment
All commits can be found at https://github.com/zhuofan-16/ST0502_Javascript-CA2
Shall you have any question about this program ,please email me at zhuofan@jiahan16.onmicrosoft.com(Preferred) or zhuofan.21@ichat.sp.edu.sg
 */
//Import the required modules
var input =require('readline-sync');
var fs=require('fs').promises;
const {questionInt} = require("readline-sync");
const nodemailer = require("nodemailer");

//Set expression regex for password and email
/*
Password :
Atleast 8 Character
Consist of number
Consist of uppercase and lowercase
Email:
Check via general email format like @ and etc
*/
const passwordrequire=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
const emailrequire=/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/

//Import classes needed
var Customer=require("./customer.js")
var Admin=require("./admin.js")
var item=require("./item.js")
var order_status=require("./order_status.js")
var coupon=require("./coupon.js")


//Define variable

//Variable to save current login user's array number
var currentlogin=0;
//Variable to save user-entered search keyword for fuzzy search function
var search="NA"
//Variable defined to show time later
var time=new Date();
//Variable used to save the last item added to cart so to add quantity and other information
var tempclass=0;
// Define food array to store food category
var food=new Array();
//Create a array in array to store different food item
//Noodle
food[0]=new Array();
//Rice
food[1]=new Array();
//Drink
food[2]=new Array();
//Other
food[3]=new Array();
//Promotion
food[4]=new Array();

//Create array to store active food order and expired food order
var order=new Array();
//Active food order
order[0]=new Array()
//Expire food order(Delivered)
order[1]=new Array()
//Create array to store customers
var customer=new Array();
//Create array to store admins
var admin=new Array();
//i variable
var i=0;
//Create variable for guest cart
var guest_cart=new Array();
//Variable to save user input for admin username and password.This will be used to compare against the Admin array to see matching
var temp_admin_login;
var temp_admin_password;
//Variable to save current login admin's array number
var adminlogin;
//Variable to ensure that a admin username have been entered before to prevent unauthorised operation
var adminloginstatus;
//Admin login status --Login or not--Default false
var adminloginc=false;
//Variable to save user input for coupon to be deleted
var deletedcoupon;
//Variable to save user input for new admin registration--StaffID
var tempadminstaff;
//Save user input for dish customisation like to have more ice and etc
var icetemp,drytemp,spicytemp;
//Variable used to calculate customer member no.
var tempmno=0;
//Customer login status -True or false
var customerloginstatus;
//User choice input when input user does not exist
var notfound_choice;
//Variable to keep selected coupon
var choiceselectioncoupon=10;
//Variables to save matched category and item array number in fuzzy search
var temps=0
var tempv=0;

//Total cost of cart
var totalcost=0;
//Boolean to determind whether to reduce total cost ,if usecoupon==false ,there will be no reduce
var usecoupon=false;
//Variable to enable switching of coupon ,avoid bug of subtracting coupon multiple times
var thismenu=0;
//Used to list all food items in the view all function
var foodcount=0;
//Variable used to ungroup and select item in the view all item function
var a,b,c,d,e;
//Variable to show item's selected groups from view all
var category_number=0;
//User selection from list of all items
var seeitem;
//Generate order number
var temporder=false;
//Find matching result from order array to determind order
var finalcall=false
var finalorder=false
//Use as index no for view all
var counterfind=0;
//Determind whether there is search result ,if false ,output no avaliable item --Fuzzy search function
var foundsearch=false;
//Variable used to save the last item added to cart so to add quantity and other information
var tempclassguest;
//Variable to use to determind whether user is guest login
var guestlogin;
//Create array to store coupon
var couponstore= new Array();

//Function to create time delay
function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}
//Function to show current time
function times(){

    return time.toLocaleString("en-sg");
}
//Function to show starting(Loading) screen
function start_up(){
    process.stdout.write('\033c')
   console.log(
       " _____ _            _   _ _          __  __            _ \n" +
       " |_   _| |__   ___  | \\ | (_) ___ ___|  \\/  | ___  __ _| |\n" +
       "   | | | '_ \\ / _ \\ |  \\| | |/ __/ _ | |\\/| |/ _ \\/ _` | |\n" +
       "   | | | | | |  __/ | |\\  | | (_|  __| |  | |  __| (_| | |\n" +
       "   |_| |_| |_|\\___| |_| \\_|_|\\___\\___|_|  |_|\\___|\\__,_|_|\n" +
       "  ____          _                              _          \n" +
       " |  _ \\ ___ ___| |_ __ _ _   _ _ __ __ _ _ __ | |_        \n" +
       " | |_) / _ / __| __/ _` | | | | '__/ _` | '_ \\| __|       \n" +
       " |  _ |  __\\__ | || (_| | |_| | | | (_| | | | | |_        \n" +
       " |_| \\_\\___|___/\\__\\__,_|\\__,_|_|  \\__,_|_| |_|\\__|   ")
    console.log("*****************************************************")
    console.log("System starting ...")
    console.log("*****************************************************")
    wait(3000);

}
//Function to show second page information for about program page
function about_program_page2(){
    process.stdout.write('\033c')
    console.log("        *****************************************************")
    console.log("        Project Name:The NiceMeal Restaurant Ordering System\n");
    console.log("        Description:A command prompt texted-based application")
    console.log("        application to digitalize their food menu to allow ")
    console.log("        their customers to make order. The restaurant ")
    console.log("        organises their items in categories and each item may")
    console.log("        or may not have a list of options to customise order\n")
    console.log("              Default admin ID:10001 Password:admin\n")
    console.log("               [1] Back to main menu     [2] Exit         \n ")
    console.log("        *****************************************************")
    function about_useroption2(){
        var choice=input.questionInt("        Your Choice: ");
        switch (choice){
            case 1:
                main_screen();return 0;
                break;
            case 2:

                newd();return 0;
            async function newd(){
                process.stdout.write('\033c')
                console.log(
                    " _____ _            _   _ _          __  __            _ \n" +
                    " |_   _| |__   ___  | \\ | (_) ___ ___|  \\/  | ___  __ _| |\n" +
                    "   | | | '_ \\ / _ \\ |  \\| | |/ __/ _ | |\\/| |/ _ \\/ _` | |\n" +
                    "   | | | | | |  __/ | |\\  | | (_|  __| |  | |  __| (_| | |\n" +
                    "   |_| |_| |_|\\___| |_| \\_|_|\\___\\___|_|  |_|\\___|\\__,_|_|\n" +
                    "  ____          _                              _          \n" +
                    " |  _ \\ ___ ___| |_ __ _ _   _ _ __ __ _ _ __ | |_        \n" +
                    " | |_) / _ / __| __/ _` | | | | '__/ _` | '_ \\| __|       \n" +
                    " |  _ |  __\\__ | || (_| | |_| | | | (_| | | | | |_        \n" +
                    " |_| \\_\\___|___/\\__\\__,_|\\__,_|_|  \\__,_|_| |_|\\__|   ")
                console.log("*****************************************************")
                console.log("System exiting ...")
                console.log("*****************************************************")
                wait(3000);
                await fs.writeFile('../.database/customerdetail.dat',JSON.stringify(customer))
                await fs.writeFile('../.database/i.txt',i.toString())
                await fs.writeFile('../.database/order.dat',JSON.stringify(order))
                await fs.writeFile('../.database/admin.dat',JSON.stringify(admin))
                await fs.writeFile('../.database/food.dat',JSON.stringify(food))
                await fs.writeFile('../.database/coupon.dat',JSON.stringify(couponstore))
            }
                break;
            default:
                about_useroption2();return 0;
                break;

        }
    }
    about_useroption2()
}
//Function to view promotion items and descriptions
function new_promotion(){
        process.stdout.write('\033c')
        console.log("        *****************************************************\n");
        console.log("              The NiceMeal Restaurant Ordering System          ");
        console.log("                      Quality you can taste.\n                 ");
        console.log("                         Promotion Items:")
   for (var m=0;m<food[4].length;m++){
       console.log("        "+m+". "+food[4][m].item_code+ ". "+food[4][m].item_name+"==>"+"$ "+ food[4][m].item_price.toFixed(2))
   }
   console.log('\n');
       console.log("        [1] View an item's description [2]Back to previous screen")
       console.log("        *****************************************************\n");
       function itemoverviewchoice(){
        var itemoverview=input.questionInt("        Choice: ")
    switch(itemoverview){
        case 1:
            var customeroverview=input.questionInt("        Which item do you want to see?: ");
            process.stdout.write('\033c')
            console.log("                *****************************************************\n");
            console.log("                      The NiceMeal Restaurant Ordering System          ");
            console.log("                              Quality you can taste.\n                 ");
            console.log("                Item description for "+food[4][customeroverview].item_name +":")   ;
            console.log("                "+food[4][customeroverview].item_description+"\n");
            console.log("                            [1]Back to previous screen ");
            console.log("                *****************************************************\n");
            backto();return 0;
            function backto(){
            var backtooption=input.questionInt("                Choice: ");
            switch (backtooption){
                case 1:
                    new_promotion();return 0;
                break;
                default:
                    console.log("                Invalid option");
                    backto();return 0;
                    break;
            }}
            break;
        case 2:
            main_screen();return 0;
            break
        default:
            console.log("        Invalid option");
             itemoverviewchoice();return 0;
             break;

    }  }
    itemoverviewchoice();return 0;

}
//Function to show first page information for about program page
function about_program(){

    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("        Project Name:The NiceMeal Restaurant Ordering System");
    console.log("         Module Name: ST0502 : Fundamentals Of Programming ")
    console.log("                  Module Lecturer: Ms Junie Tan ")
    console.log("        Student Name: CHEN ZHUOFAN |  Singapore Polytechnic")
    console.log("                     Student ID: P2100746")
    console.log("                  Program Language: Javascript\n")
    console.log("         [1] Next page    [2] Back to main menu     [3] Exit\n")
    console.log("        *****************************************************")
    function about_useroption(){
        var choice=input.questionInt("        Your Choice: ");
        switch (choice){
            case 1:
                about_program_page2();return 0;
                break;
            case 2:
                main_screen();return 0;
                break;
            case 3:

                newd();return 0;
            async function newd(){
                process.stdout.write('\033c')
                console.log(
                    " _____ _            _   _ _          __  __            _ \n" +
                    " |_   _| |__   ___  | \\ | (_) ___ ___|  \\/  | ___  __ _| |\n" +
                    "   | | | '_ \\ / _ \\ |  \\| | |/ __/ _ | |\\/| |/ _ \\/ _` | |\n" +
                    "   | | | | | |  __/ | |\\  | | (_|  __| |  | |  __| (_| | |\n" +
                    "   |_| |_| |_|\\___| |_| \\_|_|\\___\\___|_|  |_|\\___|\\__,_|_|\n" +
                    "  ____          _                              _          \n" +
                    " |  _ \\ ___ ___| |_ __ _ _   _ _ __ __ _ _ __ | |_        \n" +
                    " | |_) / _ / __| __/ _` | | | | '__/ _` | '_ \\| __|       \n" +
                    " |  _ |  __\\__ | || (_| | |_| | | | (_| | | | | |_        \n" +
                    " |_| \\_\\___|___/\\__\\__,_|\\__,_|_|  \\__,_|_| |_|\\__|   ")

                console.log("*****************************************************")
                console.log("System exiting ...")
                console.log("*****************************************************")
                wait(3000);
                await fs.writeFile('../.database/customerdetail.dat',JSON.stringify(customer))
                await fs.writeFile('../.database/i.txt',i.toString())
                await fs.writeFile('../.database/order.dat',JSON.stringify(order))
                await fs.writeFile('../.database/admin.dat',JSON.stringify(admin))
                await fs.writeFile('../.database/food.dat',JSON.stringify(food))
                await fs.writeFile('../.database/coupon.dat',JSON.stringify(couponstore))
            }
                break;
            default:
                about_useroption();return 0;
                break;

        }
    }
    about_useroption()
}
//Function to login as guest --Fill in information
function guest_login(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Guest System        ");
    console.log("        *****************************************************\n")
    guest_firstname=input.question("        Your First Name: ");
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Guest System        ");
    console.log("        *****************************************************\n")
     guest_lastname=input.question("        Your Last Name: ");
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Guest System        ");
    console.log("        *****************************************************\n")
    function registerguestsex(){
        guest_sex=input.question("        Your Sex: (M/F) :");
        if (guest_sex!=="M"&&guest_sex!=="F")
        {
            console.log("        Invalid gender,please retry");
            registerguestsex()
        }

    }

    registerguestsex();
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Guest System        ");
    console.log("        *****************************************************\n")
     guest_phone=input.questionInt("        Your Contact Number: ");
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Guest System        ");
    console.log("        *****************************************************\n")
    emailguesttype();
    function emailguesttype(){
        guest_email=input.question("        Your Email: ");
        if ((emailrequire.test(guest_email))===false){
            console.log("        Email does not meet standards");
            emailguesttype()

        }

    }

    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Guest System        ");
    console.log("            Estimated Time Of Waiting: "+(Math.round(Math.random()*11+10)) + " Minutes");
    console.log("        *****************************************************\n")
    function guest_confirmation_prompt() {
        var guest_confirmation = input.question("        Continue to order? (Y/N): ");
        if (guest_confirmation === "Y") {
            guestlogin=true;
            order_screen();return 0;

        } else if (guest_confirmation === "N") {
            main_screen();return 0;
        } else {
            console.log("        Invalid Option");
            guest_confirmation_prompt();return 0;
        }
    }
    guest_confirmation_prompt();return 0;

}
//Functions for admin login --verify and etc
function admin_login() {
    process.stdout.write('\033c')
    console.log("        *****************************************************\n");
    console.log("            The NiceMeal Restaurant Admin Management System    ");
    console.log("        *****************************************************\n");
    temp_admin_login = input.questionInt("        Admin ID: ");
    for (var l = 0; l < admin.length; l++){
        if(admin[l].staffid === temp_admin_login){

            adminlogin = l;
            adminloginstatus=true;

        }

    }
    process.stdout.write('\033c')
    console.log("        *****************************************************\n");
    console.log("            The NiceMeal Restaurant Admin Management System    ");
    console.log("        *****************************************************\n");
    temp_admin_password= input.question("        Password: ");
    if (adminloginstatus!==true){
        console.log("        Wrong admin ID or password,going back to main menu");
        adminlogin=0;
        adminloginstatus=false;
        wait(3000)
        main_screen();return 0;
    }
    if (temp_admin_password===admin[adminlogin].password){
        adminloginc=true;
        adminnotice();
        admin_control();return 0;

    }else {
        console.log("        Wrong admin ID or password,going back to main menu");
        wait(3000)
        main_screen();return 0;

    }





}
//Function to email after admin login
function adminnotice() {var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '4582h@dunearn.edu.sg',
            pass: 'XXXXX',

        }
    });
    mailOptions = {
        from: '4582h@dunearn.edu.sg',
        to: 'chzuofan@gmail.com',
        subject: 'Login attempt detected',
        html: '<h1>User Login</h1><br> <h3>We have detected a login to the admin system</h3><br><p>Best Regards<br> The Nicemeal Restaurant</p>',


    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return 0;
        } else {
            console.log('Email sent: ' + info.response);
            return 0;
        }
    });
    return 0;
}
//Main menu for admin after admin login
function admin_control(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Admin System        ");
    console.log("            "+time_identify()+"Admin "+admin[adminlogin].lastname+"\n");
    console.log("      [1] User control (View,Edit,Add,Remove)   ")
    console.log("      [2] User password reset   ")
    console.log("      [3] Menu Control (View,Edit,Add,Remove)  ")
    console.log("      [4] Coupon Control (View,Edit,Distribute)  ")
    console.log("      [5] Add new admin   [6] Update password ")
    console.log("      [7] Logout          [8]Exit")
    console.log("                    \n")
    if (adminloginc===true&&admin[adminlogin].staffid===10001){
        console.log("          [22] Delete an admin\n")
    }
    console.log("*****************************************************\n")
    admincontrolchoice();return 0;
    function admincontrolchoice(){

            var choice = input.questionInt("Choice: ");
            switch (choice){
                case 22:if (adminloginc===false||admin[adminlogin].staffid!==10001){
                    console.log("Unauthorised action!");
                    admin_control();return 0;
                }
                deleteadmin();return 0;
                break;

                case 1:user_control();return 0;break;
                case 2:user_password_reset();return 0;break;
                case 3:menu_control();return 0;break;
                case 4:coupon_control();return 0;break;
                case 5:addnewadmin();return 0;break;
                case 6:changeparticular_admin();return 0;break;
                case 7:
                    adminloginc=false;
                    adminloginstatus=false;
                    adminlogin=0;
                    main_screen();
                    return 0;
                    break;
                case 8:

                    newd();return 0;
                async function newd(){
                    process.stdout.write('\033c')
                    console.log(
                        " _____ _            _   _ _          __  __            _ \n" +
                        " |_   _| |__   ___  | \\ | (_) ___ ___|  \\/  | ___  __ _| |\n" +
                        "   | | | '_ \\ / _ \\ |  \\| | |/ __/ _ | |\\/| |/ _ \\/ _` | |\n" +
                        "   | | | | | |  __/ | |\\  | | (_|  __| |  | |  __| (_| | |\n" +
                        "   |_| |_| |_|\\___| |_| \\_|_|\\___\\___|_|  |_|\\___|\\__,_|_|\n" +
                        "  ____          _                              _          \n" +
                        " |  _ \\ ___ ___| |_ __ _ _   _ _ __ __ _ _ __ | |_        \n" +
                        " | |_) / _ / __| __/ _` | | | | '__/ _` | '_ \\| __|       \n" +
                        " |  _ |  __\\__ | || (_| | |_| | | | (_| | | | | |_        \n" +
                        " |_| \\_\\___|___/\\__\\__,_|\\__,_|_|  \\__,_|_| |_|\\__|   ")

                    wait(3000);
                    await fs.writeFile('../.database/customerdetail.dat',JSON.stringify(customer))
                    await fs.writeFile('../.database/i.txt',i.toString())
                    await fs.writeFile('../.database/order.dat',JSON.stringify(order))
                    await fs.writeFile('../.database/admin.dat',JSON.stringify(admin))
                    await fs.writeFile('../.database/food.dat',JSON.stringify(food))
                    await fs.writeFile('../.database/coupon.dat',JSON.stringify(couponstore))
                }
                    break;
                default:
                    console.log("Invalid Option ");
                    admincontrolchoice();return 0;
            }
    }
}
//Secondary menu of admin control -->Coupon management : Coupon store || Delete coupon from user
function coupon_control(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Admin System        ");
    console.log("                       Coupon Management\n")
    console.log("               [1] Coupon Store [2] Remove a coupon from user")
    console.log("                         [3] Return\n")
    console.log("        *****************************************************\n")
coupon_management_choice();return 0;
    function coupon_management_choice(){
        var choice=input.questionInt("        Choice: ")
        switch (choice){
            case 1: coupon_store();return 0;break;
            case 2: coupon_remove();return 0;break;
            case 3:admin_control();return 0;break;
            default:console.log("        Invalid Option");
            coupon_management_choice();return 0;
        }
    }
}
//Menu to carry out operation like add ,delete,edit and distribute coupon to user
function coupon_store(){
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                           Current registered coupons\n")
    for (var w=0;w<couponstore.length;w++){
        console.log("                "+w+". "+couponstore[w].coupon_code+". "+couponstore[w].coupon_name+"==>"+couponstore[w].coupon_price.toFixed(2))
    }
    console.log("                  [1] Add coupon [2] Remove Coupon [3] Edit Coupon");
    console.log("                       [4] Allocate Coupon [5] Return\n ")
    console.log("                *****************************************************\n")
    coupon_store_choice();return 0;
    function coupon_store_choice(){
        var choice =input.questionInt("                Choice: ")
        switch (choice){
            case 1:
                addcoupon();return 0;break;
            case 2:
                removecoupon();return 0;break;
            case 3:
                editcoupon();return 0;
                break;
            case 4:distributecoupon();return 0;break;
            case 5:
                coupon_control();return 0;
                break;
            default:
                console.log("                Invalid Option");
                coupon_store_choice();return 0;break;
        }
    }
}
//Functions to edit coupon --price
function editcoupon(){
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                           Current registered coupons\n")
    for (var w=0;w<couponstore.length;w++){
        console.log("                  "+w+". "+couponstore[w].coupon_code+". "+couponstore[w].coupon_name+"==>"+couponstore[w].coupon_price)
    }

    console.log("                            [1] Change Price [2] Return")
    console.log("                *****************************************************\n")
    editcoupon_choice()
    function editcoupon_choice(){
        var choice=input.questionInt("                Choice: ")
        switch (choice){
            case 1:
                var editprice_coupon=input.questionInt("                Which coupon do you want to edit: ");
                if (editprice_coupon<0||editprice_coupon>=couponstore.length){
                    console.log("                Invalid Option");
                    editcoupon_choice();return 0;
                }
                process.stdout.write('\033c')
                console.log("                        *****************************************************\n")
                console.log("                              The NiceMeal Restaurant Admin System        ");
                console.log("                                     Current price: "+ couponstore[editprice_coupon].coupon_price.toFixed(2))
                console.log("                        *****************************************************\n")
                var tempnewprice=input.questionInt("                        New price: ");
                couponstore[editprice_coupon].coupon_price=tempnewprice;
                process.stdout.write('\033c')
                console.log("  ____                             \n" +
                    " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                    " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                    "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                    " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                    "                                   ")
                console.log("*****************************************************\n")
                console.log("      The NiceMeal Restaurant Admin System        ");
                console.log("        Change successfully..Returning..")
                console.log("*****************************************************\n")
                wait(3000)
                coupon_store();return 0;
                break;
            case 2:
                coupon_store();return 0;break;
            default:
                console.log("                Invalid Choice");
                editcoupon_choice();return 0;
        }

    }

}
//Function to remove coupon from coupon store
function removecoupon(){
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                           Current registered coupons\n")
    for (var w=0;w<couponstore.length;w++){
        console.log("                  "+w+". "+couponstore[w].coupon_code+". "+couponstore[w].coupon_name+"==>"+couponstore[w].coupon_price.toFixed(2))
    }
    console.log("                         [1] Select to delete [2] Return")
    console.log("                *****************************************************\n")
    removecoupon_choice()
    function removecoupon_choice(){
    var choice=input.questionInt("                Choice: ")
    switch (choice){
        case 1:
             deletedcoupon=input.questionInt("                Which one to delete?: ")
            if (deletedcoupon<0||deletedcoupon>=couponstore.length){
                console.log("                Invalid Option")
                removecoupon_choice();return 0;
            }
            confirmationmess()
            function confirmationmess() {
                var inputconfirmation = input.question("                Are you sure you want to delete " + couponstore[deletedcoupon].coupon_name + " ?(Y/N): ")
                switch (inputconfirmation){
                    case 'Y':
                        process.stdout.write('\033c')
                        console.log("  ____                             _                   \n" +
                            " |  _ \\ _ __ ___   ___ ___ ___ ___(_)_ __   __ _       \n" +
                            " | |_) | '__/ _ \\ / __/ _ / __/ __| | '_ \\ / _` |      \n" +
                            " |  __/| | | (_) | (_|  __\\__ \\__ | | | | | (_| |_ _ _ \n" +
                            " |_|   |_|  \\___/ \\___\\___|___|___|_|_| |_|\\__, (_(_(_)\n" +
                            "                                           |___/       ")
                        console.log("*****************************************************\n")
                        console.log("      The NiceMeal Restaurant Admin System        ");
                        console.log("                   Deleting...")
                        console.log("*****************************************************\n")
                        wait(3000);
                        couponstore.splice(deletedcoupon,1);
                        removecoupon()
                        break;
                    case 'N':removecoupon();return 0;break;
                    default:
                        console.log("                Invalid Option")
                        confirmationmess();return 0;
                }
            }
            break;
        case 2: coupon_control();return 0;
        break;
        default:console.log("                Invalid Option");removecoupon_choice();return 0;
    }
    }
}
//Function to distribute coupon to user
function distributecoupon(){
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                           Current registered coupons\n")
    for (var w=0;w<couponstore.length;w++){
        console.log("                 "+w+". "+couponstore[w].coupon_code+". "+couponstore[w].coupon_name+"==>"+couponstore[w].coupon_price)
    }
    console.log("                        [1]Select a coupon [2] Return ")
    console.log("                *****************************************************\n")
    distributechoice()
    function distributechoice(){
        var choice=input.questionInt("                Choice: ")
        switch (choice){
            case 1:
                var choose_coupon=input.questionInt("                Which coupon do you want to distribute: ");
                if (choose_coupon<0||choose_coupon>=couponstore.length){
                    console.log("                Invalid Option");
                    distributechoice();return 0;
                }
                process.stdout.write('\033c')
                console.log("                        *****************************************************\n")
                console.log("                              The NiceMeal Restaurant Admin System        ");
                console.log("                                  Select a user to distribute")
                for (var u=0;u<customer.length;u++){
                    console.log("                        "+u+". "+customer[u].memberno+". "+customer[u].lastname +" "+customer[u].firstname +" "+customer[u].coupon.length+" coupons")
                }
                console.log("                        *****************************************************\n")
                selectuser();return 0;
                function selectuser(){
                    var userdistribute=input.questionInt("                        Choice: ");
                    if (userdistribute>=customer.length ||userdistribute<0){
                        console.log("                        Invalid Option");
                        selectuser()

                    }
                    customer[userdistribute].coupon[customer[userdistribute].coupon.length]= couponstore.slice(choose_coupon,choose_coupon+1)[0]

                    process.stdout.write('\033c')
                    console.log("  ____                             \n" +
                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                        "                                   ")
                    console.log("*****************************************************\n")
                    console.log("      The NiceMeal Restaurant Admin System        ");
                    console.log("       Operation is successful ,returning...")
                    console.log("*****************************************************\n")
                    wait(3000)
                    coupon_store();return 0;
                }


                break;
            case 2:coupon_store();return 0;break
            default:console.log("                Invalid Option")
                distributechoice(); return 0;
                break;
        }
    }
}
//Add a new coupon to coupon store
function addcoupon(){
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                              Creating coupon ")
    console.log("                *****************************************************\n")
    var tempcouponname=input.question("                Coupon Name: ")
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                              Creating coupon ")
    console.log("                *****************************************************\n")
    var tempcouponcode=input.questionInt("                Coupon Code: ");
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                              Creating coupon ")
    console.log("                *****************************************************\n")
    var tempcouponprice=input.questionInt("                Coupon Price: ")
    couponstore[couponstore.length]=new coupon(tempcouponname,tempcouponcode,"F",tempcouponprice)
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                              Processing coupon... ")
    console.log("                *****************************************************\n")
    wait(3000)
    console.log("  ____                             \n" +
        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
        "                                   ")
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Admin System        ");
    console.log("           Coupon created successfully ")
    console.log("*****************************************************\n")
    coupon_control();return 0;
}
//Removal of coupon from the coupon store
function coupon_remove(){
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                   You are going to remove coupon from a user")
    console.log("                 You are warned to consider twice before removing")
    for (var q=0;q<customer.length;q++){
        console.log("                "+q+". "+customer[q].memberno+". "+customer[q].lastname +" "+customer[q].firstname +" "+customer[q].coupon.length+" coupons")
    }
    console.log("                             [1] Select [2] Return")
    console.log("                *****************************************************\n")
     couponremove_choice();return 0;
    function couponremove_choice(){
        var choice=input.questionInt("                Choice: ")
        switch (choice){
            case 1:
                var userselected=input.questionInt("                Choose an user: ")
                if (userselected>=customer.length ||userselected<0){
                    console.log("                Invalid Option");
                    couponremove_choice();return 0;

                }else{

                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                              The NiceMeal Restaurant Admin System        ");
                    console.log("                             Warning !!! This action is irreversible\n")
                    console.log("                        User "+customer[userselected].memberno +"has "+customer[userselected].coupon.length+" coupons")
                    for (var g=0;g<customer[userselected].coupon.length;g++){
                        console.log("                        "+g+". "+customer[userselected].coupon[g].coupon_code+". "+customer[userselected].coupon[g].coupon_name+"===>"+customer[userselected].coupon[g].coupon_price)
                    }
                    console.log("                              [1] Select to delete [2] Return\n")
                    console.log("                        *****************************************************\n")
                    deletecouponuser();return 0;
                    function deletecouponuser(){
                        var choice=input.questionInt("                        Choice: ")
                        switch (choice){
                            case 1:
                                var optionop=input.questionInt("                        Which coupon to delete?: ")
                                if (optionop<0||optionop>=customer[userselected].coupon.length){
                                    console.log("                        Invalid Choice");
                                    deletecouponuser();return 0;
                                }
                                customer[userselected].coupon.splice(optionop,1);
                                console.log("  ____                             \n" +
                                    " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                    " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                    "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                    " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                    "                                   ")
                                console.log("Delete successfully,returning...")
                                wait(3000);
                                coupon_control();return 0;
                                break;
                            case 2:
                                coupon_control();return 0;
                                break;
                            default:
                                console.log("                Invalid Option");
                                deletecouponuser();return 0;
                                break;
                        }
                    }


                }

            break;
            case 2:
                coupon_control()
                break;
            default: console.log("                Invalid Option")
                couponremove_choice();return 0;
        }
    }


}
//Menu to add ,edit remove dishes
function menu_control(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Admin System        ");
    console.log("                        [1] Add a dish")
    console.log("                        [2] Edit a dish")
    console.log("                        [3] Remove a dish")
    console.log("                        [4] Return back \n")
    console.log("        *****************************************************\n")
    menuchoice();return 0;
    function menuchoice(){
        var choice=input.questionInt("        Choice: ");
        switch (choice){
            case 1:
                adddish();return 0;
                break;
            case 2:
                category_item()
                return 0;
                break;
            case 3:
               category_item();
               return 0;
                break
            case 4:
                admin_control();return 0;
                break
            default:
                console.log("        Invalid Option")
                menuchoice();return 0;
        }
    }
}
//Function to add a new dish
function adddish(){
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                      The NiceMeal Restaurant Admin System        ");
    console.log("                      Are you sure you want to add a dish ?\n")
    console.log("                               [1] Exit [2] Yes")
    console.log("                *****************************************************\n")
    decision();categorychoic();return 0;
    function decision(){
        var choice=input.questionInt("                Choice: ")
        switch (choice){
            case 1:
                admin_control();return 0;break;
            case 2:
                break;
            default: console.log("                Invalid Option");
            decision();return 0;
        }
    }



    function categorychoic() {
        process.stdout.write('\033c')
        console.log("                *****************************************************\n")
        console.log("                      The NiceMeal Restaurant Admin System  \n      ");
        console.log("                                Dish Category")
        console.log("                                [0] Noodle ")
        console.log("                                [1] Rice")
        console.log("                                [2] Drink ")
        console.log("                                [3] Other")
        console.log("                                [4] Promotion")
        console.log("                                [5] Return back")
        console.log("                *****************************************************\n")
        var choice1 =input.questionInt("                Choice: ")
        if (choice1===5){
            admin_control();return 0;
        }
        if (choice1>4||choice1<0){
            console.log("                Invalid Option")
            wait (2000);
            categorychoic();return 0;
        }else {
            dishname();
            function dishname() {
                console.log("                        *****************************************************\n")
                console.log("                              The NiceMeal Restaurant Admin System   \n     ");
                console.log("                                     Enter a dish name ")
                console.log("                              [1] Return back to previous screen")
                console.log("                        *****************************************************\n")
                 dishname1  = input.question("                        Dish Name: ")
                if (dishname==="1"){
                    admin_control()
                }
            }
            console.log("                        *****************************************************\n")
            console.log("                              The NiceMeal Restaurant Admin System   \n     ");
            console.log("                               Enter a description for "+dishname1)
            console.log("                         Wrong Name? Enter 2 to return back to previous screen")
            console.log("                        *****************************************************\n")
            var description=input.question("                        Description: ")
            if (description==="2"){
                dishname();return 0;
            }
            console.log("                        *****************************************************\n")
            console.log("                              The NiceMeal Restaurant Admin System   \n     ");
            console.log("                               Enter a cost for "+dishname1)
            console.log("                        *****************************************************\n")
            var costtemp=input.questionInt("                        Cost:")
            foodprefer();return 0;
            function foodprefer() {
                if (choice1 === 0 || choice1 === 1) {
                    var spicy = input.questionInt("                        Allow user to choose spicy(1 for yes,0 for no) ?: ")
                    if (spicy !== 1 && spicy !== 0) {
                        console.log("                        Invalid Option");
                         foodprefer();return 0;
                    }
                if (spicy===1){
                    spicytemp=true;
                }else{
                    spicytemp=false
                }
                drytemp=false;
                icetemp=false

                if (choice1===0){
                    var dry = input.questionInt("                        Allow user to choose dry/soup (1 for yes,0 for no) ?: ")
                    if (dry !== 1 && dry !== 0) {
                        console.log("                        Invalid Option");
                        foodprefer();return 0;
                    }
                    if (dry===1){
                        drytemp=true;
                    }else{
                        drytemp=false
                    }
                }
                }
                if (choice1===2){
                    drytemp=0;spicytemp=0;
                    var ice = input.questionInt("                        Allow user to choose ice(1 for yes,0 for no) ?: ")
                    if (ice !== 1 && ice !== 0) {
                        console.log("                        Invalid Option");
                        foodprefer();return 0;
                    }
                    if (ice===1){
                        icetemp=true;
                    }else{
                        icetemp=false
                    }

                }


                if (choice1===3||choice1===4){
                    var ice = input.questionInt("                        Allow user to choose ice(1 for yes,0 for no) ?: ")
                    if (ice !== 1 && ice !== 0) {
                        console.log("                        Invalid Option");
                        foodprefer();return 0;
                    }
                    if (ice===1){
                        icetemp=true;
                    }else{
                        icetemp=false
                    }


                    var spicy = input.questionInt("                        Allow user to choose spicy(1 for yes,0 for no) ?: ")
                    if (spicy !== 1 && spicy !== 0) {
                        console.log("                        Invalid Option");
                        foodprefer();return 0;
                    }
                    if (spicy===1){
                        spicytemp=true;
                    }else{
                        spicytemp=false
                    }

                    if (choice1===0){
                        var dry = input.questionInt("                        Allow user to choose dry/soup (1 for yes,0 for no) ?: ")
                        if (dry !== 1 && dry !== 0) {
                            console.log("                        Invalid Option");
                            foodprefer();return 0;
                        }
                        if (dry===1){
                            drytemp=true;
                        }else{
                            drytemp=false
                        }
                    }



                }
                console.log("                        *****************************************************\n")
                console.log("                              The NiceMeal Restaurant Admin System   \n     ");
                console.log("                                            Item code")
                console.log("                        *****************************************************\n")
                var itemcode=input.questionInt("                        Item code: ")
                process.stdout.write('\033c')
                console.log("  ____                             _                   \n" +
                    " |  _ \\ _ __ ___   ___ ___ ___ ___(_)_ __   __ _       \n" +
                    " | |_) | '__/ _ \\ / __/ _ / __/ __| | '_ \\ / _` |      \n" +
                    " |  __/| | | (_) | (_|  __\\__ \\__ | | | | | (_| |_ _ _ \n" +
                    " |_|   |_|  \\___/ \\___\\___|___|___|_|_| |_|\\__, (_(_(_)\n" +
                    "                                           |___/       ")
                console.log("*****************************************************\n")
                console.log("      The NiceMeal Restaurant Admin System   \n     ");
                console.log("               Processing dish...")
                console.log("*****************************************************\n")
                wait(3000)
                food[choice1][food[choice1].length]=new item(dishname1,"SL",itemcode,costtemp,description,"F",0,drytemp,spicytemp,icetemp)
                process.stdout.write('\033c')
               console.log("  ____                             \n" +
                   " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                   " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                   "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                   " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                   "                                   ")
                console.log("*****************************************************\n")
                console.log("      The NiceMeal Restaurant Admin System   \n     ");
                console.log("               Success...Going back...")
                console.log("*****************************************************\n")
                wait(1000)
                admin_control();return 0;
            }
        }
    }





}
var dishname1;
//Function to delete a admin (Excluding the default admin )
function deleteadmin(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Admin System       \n ");
    for (var o=0;o<admin.length;o++){
        if (admin[o].staffid===10001){
            continue;
        }
        console.log("        "+o+". "+admin[o].staffid +"   "+admin[o].lastname+" "+admin[o].firstname);
    }
    console.log("\n")
    console.log("                     [1] Delete [2] Return\n")
    console.log("        *****************************************************\n")
    optiondelete();return 0;
    function optiondelete(){
        var choice=input.questionInt("        Choice: ");
        switch (choice){
            case 1:
                var delte=input.questionInt("        Which admin do you want to delete?: ")
                if (delte >=admin.length){
                    console.log("        No such admin!")
                    optiondelete();return 0;
                }
                confirmation();return 0;
                function confirmation(){
                    var deletedconfirmation=input.question("        Are you sure you want to delete "+admin[delte].staffid+" ?(Y/N): ")
                    switch (deletedconfirmation){
                        case 'Y':
                            admin.splice(delte,1);
                            deleteadmin()
                            break;
                        case 'N':
                            deleteadmin();return 0;
                            break
                        default:
                            console.log("        Invalid Option");
                            confirmation()
                            break;
                    }
                }

                break;
            case 2:
                admin_control();return 0;
                break;
            default:
                console.log("        Invalid Option");
                optiondelete();return 0;
        }
    }
}
//Function to edit details like contact no. of a certain admin
function changeparticular_admin(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Admin System        ");
    console.log("        *****************************************************\n")
    var temppassword=input.question("        Enter your existing password(Enter 1 if you want to return):  ")
    if (temppassword==="1"){
        admin_control();return 0;
    }
    verifymatch();return 0;
    function verifymatch() {
        if (temppassword === admin[adminlogin].password) {
            var newpassadmin = input.question("        Enter your new password: ");
            var confirm = input.question("        Confirm your new password: ");
            if (newpassadmin === confirm) {
                admin[adminlogin].password = confirm;
                process.stdout.write('\033c')
                console.log("  ____                             \n" +
                    " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                    " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                    "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                    " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                    "                                   ")
                console.log("*****************************************************\n")
                console.log("      The NiceMeal Restaurant Admin System        ");
                console.log("        Change successfully..Returning..")
                console.log("*****************************************************\n")
                wait(3000);
                admin_control();
                return 0;
            } else {
                console.log("        2 Password does not match")
                verifymatch();return 0;
            }
        }else{
            console.log("        Wrong password,returning...");
            wait(3000)
            admin_control();return 0;
        }
    }
}
//Add a new admin
function addnewadmin(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Admin System        ");
    console.log("              WARNING!!! ONLY ADD TRUSTABLE ADMINS")
    console.log("           FAILURE TO FOLLOW INSTRUCTION CAN LEAD TO")
    console.log("           THE FAILURE OF SYSTEM AND CAUSE A DOWNFALL\n")
    console.log("              ARE YOU SURE YOU WANT TO CONTINUE?\n")
    console.log("                    [1] Continue [2] Return\n")
    console.log("        *****************************************************\n")
    choicenewadmin()
    function choicenewadmin(){
        var choice =input.questionInt("        Choice: ");
        switch (choice){
            case 1:
                process.stdout.write('\033c')
                console.log("        *****************************************************\n")
                console.log("              The NiceMeal Restaurant Admin System        ");
                console.log("                         Add new admin")
                console.log("        *****************************************************\n")
                var tempadminlast=input.question("        Input new admin's last name: ")
                process.stdout.write('\033c')
                console.log("        *****************************************************\n")
                console.log("              The NiceMeal Restaurant Admin System        ");
                console.log("                         Add new admin")
                console.log("        *****************************************************\n")
                var tempadminfirst=input.question("        Input new admin's first name: ")
                process.stdout.write('\033c')
                console.log("        *****************************************************\n")
                console.log("              The NiceMeal Restaurant Admin System        ");
                console.log("                         Add new admin")
                console.log("        *****************************************************\n")
                var tempadmincontact=input.question("        Input new admin's contact number: ")
                process.stdout.write('\033c')
                console.log("        *****************************************************\n")
                console.log("              The NiceMeal Restaurant Admin System        ");
                console.log("                         Add new admin")
                console.log("        *****************************************************\n")
                staffidcheck();
                function staffidcheck(){
                     tempadminstaff=input.questionInt("        Input new admin's staff id: ");
                    for (var adminloginid=0;adminloginid<admin.length;adminloginid++){
                        if (tempadminstaff===admin[adminloginid].staffid){
                            console.log("        Staff ID Conflict !!");
                            staffidcheck();return 0;
                        }
                    }
                }
                process.stdout.write('\033c')
                console.log("        *****************************************************\n")
                console.log("              The NiceMeal Restaurant Admin System        ");
                console.log("                         Add new admin")
                console.log("        *****************************************************\n")
                var tempadminspassword=input.question("        Input new admin's password: ");
                process.stdout.write('\033c')
                admin[admin.length]=new Admin(tempadminlast,tempadminfirst,0,tempadmincontact,tempadminstaff,tempadminspassword);
                console.log("  ____                             \n" +
                    " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                    " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                    "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                    " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                    "                                   ")
                console.log("*****************************************************\n")
                console.log("      The NiceMeal Restaurant Admin System        ");
                console.log("                 Operation success")
                console.log("*****************************************************\n")
                admin_control();return 0;
                break;
            case 2:
                admin_control();return 0;
                break;
            default:
                console.log("        Invalid Option");
                addnewadmin();return 0;
                break;
        }
    }

}
//Function to select a user and reset its password
function user_password_reset(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Admin System        ");
    console.log("        Which user's password do you want to reset ?")
    for ( var usercount=0;usercount<customer.length;usercount++){
        console.log("        "+usercount+".       "+customer[usercount].memberno+"       "+customer[usercount].lastname+" "+customer[usercount].firstname +"        "+ customer[usercount].contact+"       " +customer[usercount].email)
    }
    console.log("                 [1] Select user [2] Return")
    console.log("        *****************************************************\n")
    reset_password();return 0;
    function reset_password(){
        var choice =input.questionInt("        Choice: ")
        switch (choice){
            case 1:
                selectionuser();return 0;
                function selectionuser(){
                    var select=questionInt("        User: ")
                    if (select<0||select>=customer.length){
                        console.log("        Invalid Option");
                        reset_password();return 0;
                    }
                    confirmation_message();return 0;
                    function confirmation_message() {
                        var confirmation = input.question("        Are you sure you want to reset password of user " + customer[select].memberno+"(Y/N): ");
                        switch (confirmation){
                            case 'Y':
                                console.log("  ____                             _                   \n" +
                                    " |  _ \\ _ __ ___   ___ ___ ___ ___(_)_ __   __ _       \n" +
                                    " | |_) | '__/ _ \\ / __/ _ / __/ __| | '_ \\ / _` |      \n" +
                                    " |  __/| | | (_) | (_|  __\\__ \\__ | | | | | (_| |_ _ _ \n" +
                                    " |_|   |_|  \\___/ \\___\\___|___|___|_|_| |_|\\__, (_(_(_)\n" +
                                    "                                           |___/       ")
                                console.log("*****************************************************\n")
                                console.log("      The NiceMeal Restaurant Admin System        ");
                                console.log("                 Resetting....")
                                console.log("*****************************************************\n")
                                customer[select].password="password"+customer[select].memberno;
                                wait(3000);
                                process.stdout.write('\033c')
                                console.log("  ____                             \n" +
                                    " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                    " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                    "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                    " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                    "                                   ")
                                console.log("*****************************************************\n")
                                console.log("      The NiceMeal Restaurant Admin System        ");
                                console.log("               Reset successful!")
                                console.log("New password for user "+customer[select].memberno +"is now :"+customer[select].password)
                                console.log("                  Returning...")
                                console.log("*****************************************************\n")
                                wait(5000);
                                user_password_reset();return 0;
                                break;
                            case 'N':
                                user_password_reset();return 0;
                                break;
                            default:console.log("        Invalid Option");
                            confirmation_message();return 0;

                        }
                    }
                }
                break;
            case 2:
                admin_control();return 0;
                break;
            default:
                console.log("        Invalid Option");
                user_password_reset()
        }
    }
}
//Function to edit,delete and add new user
function user_control(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Admin System        ");
    console.log("                       User Management\n\n")
    for ( var usercount=0;usercount<customer.length;usercount++){
    console.log("        "+usercount+".       "+customer[usercount].memberno+"       "+customer[usercount].lastname+" "+customer[usercount].firstname +"        "+ customer[usercount].contact+"       " +customer[usercount].email)
    }
    console.log("\n")
    console.log("            [1] Delete [2] Edit [3] Add [4] Return")
    console.log("        *****************************************************\n")
    usermanagementchoice();return 0;
    function usermanagementchoice(){
        var choice=input.questionInt("        Choice: ");
        switch(choice){
            case 1:
                var deltechoice=input.questionInt("        Which one to delete?: ");
                if (deltechoice<0||deltechoice>=customer.length){
                    console.log("        Invalid Option");
                    usermanagementchoice();return 0;
                }
                confirmationdelteuser();return 0;
                function confirmationdelteuser(){
                    var confirmation=input.question("        Are you sure you want to delete "+customer[deltechoice].memberno+" ?(Y/N): ")
                    switch (confirmation)
                    {
                        case 'Y':
                            customer.splice(deltechoice ,1);
                            process.stdout.write('\033c')
                            console.log("  ____                             \n" +
                                " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                "                                   ")
                            console.log("User have been deleted...Returning...")
                            wait(1000);
                            user_control();return 0;

                            break;
                        case "N":
                            user_control();return 0;
                            break;

                        default:
                            console.log("        Invalid Option");
                            confirmationdelteuser();return 0;
                    }
                }
                break;
            case 2:
                useredtion();return 0;
                function useredtion(){
                var editchoice=input.questionInt("        Which one to edit?: ");
                if (editchoice<0||editchoice>=customer.length){
                    console.log("        Invalid Option");
                    useredtion();return 0;
                    }
                    process.stdout.write('\033c')
                    console.log("                *****************************************************\n")
                    console.log("                      The NiceMeal Restaurant Admin System        ");
                    console.log("                What would you want to edit for this user "+customer[editchoice].memberno);
                    console.log("                           [1] Member No.   [2] Name")
                    console.log("                           [3] Phone Number [4] Email")
                    console.log("                                     [5] Return\n")
                    console.log("                *****************************************************\n")
                    edituser();return 0;
                    function edituser(){
                        var choice =input.questionInt("                Choice: ")
                        switch (choice){
                            case 1:
                                console.log("                Changing membership number may lead to some conflicts.\nPlease consider twice");
                                console.log("                Enter 0 to exit ,or enter the new membership number");
                                var tempid=input.questionInt("                Choice: ");
                                if (tempid===0){
                                    useredtion();return 0;
                                }else {
                                    for (var g=0;g<customer.length;g++){
                                        if (customer[g].memberno===tempid){
                                            conflict=1
                                        }else{conflict=0;}
                                    }
                                    if (conflict===0){
                                        customer[editchoice].memberno=tempid;
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("Change is successful,returning...")
                                        wait(3000)
                                        user_control();return 0;
                                    }else if (conflict===1){
                                        console.log("                Member ID conflict.ERROR 1020");
                                        wait(1000);
                                        useredtion();return 0;
                                    }
                                }
                                break;
                            case 2:
                                console.log("                You are changing the users name");
                                console.log("                Press 0 to exit");
                                var templast=input.question("                New last name: ");
                                if (templast==="0"){
                                    useredtion();return 0;
                                }

                                else{
                                    var tempfirst=input.question("                New first name: ");
                                    customer[editchoice].lastname=templast;
                                    customer[editchoice].firstname=tempfirst;
                                    console.log("  ____                             \n" +
                                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                        "                                   ")
                                    console.log("Change is successful.Returning...");
                                    wait (3000);
                                    user_control();return 0;

                                }
                                break;
                            case 3:
                                console.log("                You are changing the users phone number");
                                console.log("                Press 0 to exit");
                                var tempnumber=input.questionInt("                New phone number: ");
                                if (tempnumber===0){
                                    useredtion();return 0;
                                }
                                else{
                                    customer[editchoice].contact=tempnumber;
                                    console.log("  ____                             \n" +
                                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                        "                                   ")
                                    console.log("Change is successful.Returning...");
                                    wait (3000);
                                    user_control();return 0;

                                }
                                break;
                            case 4:
                                console.log("                You are changing the users email");
                                console.log("                Press 0 to exit");
                                var tempemail1=input.question("                New email address: ");
                                if (tempemail1==='0'){
                                    useredtion();return 0;
                                }
                                else{
                                    customer[editchoice].email=tempemail1;
                                    console.log("  ____                             \n" +
                                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                        "                                   ")
                                    console.log("Change is successful.Returning...");
                                    wait (3000);
                                    user_control();return 0;

                                }
                                break;
                            case 5:
                                user_control();return 0;break;
                            default:
                                console.log("                Invalid Option");
                                edituser();return 0;break;
                        }
                    }
                }

                break;
            case 3:
                customer_register();return 0;
                break;

            case 4:admin_control();return 0;break;
            default: console.log("        Invalid Choice ")
                usermanagementchoice()


        }
    }
}
//Function for user to self register as member
function customer_register(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Registration System        ");
    console.log("            Become a member of The NiceMeal Restaurant today     \n");
    console.log("        *****************************************************\n")
    var temp_firstname=input.question("        Your First Name: ");
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Registration System        ");
    console.log("            Become a member of The NiceMeal Restaurant today     \n");
    console.log("        *****************************************************\n")
    var temp_lastname=input.question("        Your Last Name: ");
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Registration System        ");
    console.log("            Become a member of The NiceMeal Restaurant today     \n");
    console.log("        *****************************************************\n");
    function registersex(){
    temp_sex=input.question("        Your Sex: (M/F): ");
    if (temp_sex!=="M"&&temp_sex!=="F")
    {
        console.log("        Invalid gender,please retry");
        registersex()
    }

    }
    registersex();

    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Registration System        ");
    console.log("            Become a member of The NiceMeal Restaurant today     \n");
    console.log("        *****************************************************\n")
    var temp_contact=input.questionInt("        Your Contact Number: ");
    process.stdout.write('\033c');
    phonecheck()
    function phonecheck(){
    for (var j=0;j<customer.length;j++){
        if (temp_contact===customer[j].contact){
            conflict=1;
            console.log("        Mobile number conflict.Please enter a new one")
            temp_contact=input.questionInt("        Your Contact Number: ");
            phonecheck();return 0;
        }else {
            conflict=0;
        }
    }}


    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Registration System        ");
    console.log("            Become a member of The NiceMeal Restaurant today     \n");
    console.log("        *****************************************************\n")
    emailtype();
    function emailtype(){
        temp_email=input.question("        Your Email address :");
        if ((emailrequire.test(temp_email))===false){
            console.log("        Email does not meet standards");
            emailtype()

        }

    }

    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("              The NiceMeal Restaurant Registration System        ");
    console.log("            Become a member of The NiceMeal Restaurant today     \n");
    console.log("        *****************************************************\n");
    console.log("        Requirement:1.Contain at least 8 characters")
    console.log("                    2.Contain at least 1 number")
    console.log("                    3.Contain at least 1 lowercase character (a-z)")
    console.log("                    4.Contain at least 1 uppercase character (a-z)")
    function passwordtype(){
     temp_password=input.question("        Create a password:  ");
     if (passwordrequire.test(temp_password)){
     confirm_password =input.question("        Confirm your password: ");
        if (temp_password!==confirm_password){
            console.log("        Passwords does not match");
            passwordtype();return 0;
        }
     }else{
         console.log("        Passwords does not meet requirement");
         passwordtype()
     }
    }
    passwordtype();

tempmno=600000+i;
membercheck();
    function membercheck(){
        for (var j=0;j<customer.length;j++){
            if (tempmno===customer[j].memberno){
                conflict=1;
         tempmno++;
                membercheck();return 0;
            }else {
                conflict=0;
            }
        }}
    customer[i]=new Customer(temp_firstname,temp_lastname,temp_sex,temp_contact,temp_password,tempmno,temp_email);
    process.stdout.write('\033c')
    console.log("  ____                             _                   \n" +
        " |  _ \\ _ __ ___   ___ ___ ___ ___(_)_ __   __ _       \n" +
        " | |_) | '__/ _ \\ / __/ _ / __/ __| | '_ \\ / _` |      \n" +
        " |  __/| | | (_) | (_|  __\\__ \\__ | | | | | (_| |_ _ _ \n" +
        " |_|   |_|  \\___/ \\___\\___|___|___|_|_| |_|\\__, (_(_(_)\n" +
        "                                           |___/       ")
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System    \n    ");
    console.log("       Processing your registration,please wait...     \n");
    console.log("*****************************************************\n")
    wait(2000);

    if (adminloginc===true){
        console.log("        Success.Returning...")
        customer[i].coupon[0]=new coupon("New User Welcome Gift",10001,"S",8)

        function mail_register() {var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: '4582h@dunearn.edu.sg',
                    pass: 'XXXX',

                }
            });
            mailregister = {
                from: '4582h@dunearn.edu.sg',
                to: customer[i].email,
                subject: 'Your registration is successfully',
                html: '<h1>Thanks for trusting us !:)</h1><br><p>A SGD $8.00 coupon have been credited into your account.We hope that you enjoyed our service</p><br> <h3>Thanks for choosing us!</h3><br><p>Best Regards<br>The NiceMeal Restaurant</p>',


            };

            transporter.sendMail(mailregister)
            return 0;
        }
        mail_register();
        i++;
        wait(2000);
        return 0;

    }
    process.stdout.write('\033c')
    console.log("  ____                             \n" +
        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
        "                                   ")
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System    \n    ");
    console.log("            Your Registration is successful!     \n");
    console.log("                  Thank you ,"+determind_call(i)+" " +customer[i].lastname);
    console.log("            Your membership no. is "+customer[i].memberno);
    console.log("New user coupon have been credited into your account")
    console.log("*****************************************************\n");
    wait(2000);
    customer[i].coupon[0]=new coupon("New User Welcome Gift",10001,"S",8)
    function mail_register1() {var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: '4582h@dunearn.edu.sg',
                pass: 'XXXXX',

            }
        });
        mailregister = {
            from: '4582h@dunearn.edu.sg',
            to: customer[i].email,
            subject: 'Your registration is successfully',
            html: '<h1>Thanks for trusting us !:)</h1><br><p>A SGD $8.00 coupon have been credited into your account.We hope that you enjoyed our service</p><br> <h3>Thanks for choosing us!</h3><br><p>Best Regards<br>The NiceMeal Restaurant</p>',


        };

        transporter.sendMail(mailregister)
        return 0;
    }
    mail_register1();
    i++;
    main_screen();return 0;

}
//Function used to determind whether user is a male or female then return Mr/Mrs
function determind_call(l){
    if (customer[l].sex==="M"){
        return "Mr"
    }
    if (customer[l].sex==="F"){
        return "Mrs"
    }
}
//Function for customer to login
function customer_login(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("                 The NiceMeal Restaurant Login System        ");
    console.log("                        Quality you can taste.               ");
    console.log("                       "+times())
    console.log("                      [1] Back to previous menu")
    console.log("        *****************************************************\n");
   var temploginid= input.questionInt("        Please enter your contact number or membership No.: ");
   if (temploginid===1){
       main_screen()
       return 0;
   }
   for (var k=0;k<customer.length;k++){
       if (temploginid===customer[k].memberno || temploginid===customer[k].contact ){
           currentlogin=k;
           customerloginstatus=true;
       }
   }
   if (customerloginstatus!==true){
       process.stdout.write('\033c')
       console.log("        *****************************************************\n")
       console.log("                 The NiceMeal Restaurant Login System        ");
       console.log("                        Quality you can taste.               ");
       console.log("                       User not found in system \n")
       console.log("                   [1] Retry [2] Back to main menu")
       console.log("        *****************************************************\n");
       function question_notfound(){
        notfound_choice=input.questionInt("        Choice: ")
       }
       question_notfound();
       switch (notfound_choice){
           case 1:
               customer_login();return 0;
               return 0;
               break;
           case 2:
               main_screen();return 0;
               break;
           default:
               console.log("        Invalid option")
               question_notfound();return 0;
               break;
       }
   }
    loginattempt_above3()
   function loginattempt_above3(){
   if (customer[currentlogin].wrongpassword_attempt>3){
       process.stdout.write('\033c')
       console.log("        *****************************************************\n")
       console.log("                 The NiceMeal Restaurant Login System        ");
       console.log("                        Quality you can taste.           \n    ");
       console.log("        Password attempt above limit,please approach our staff ")
       console.log("        *****************************************************\n");
       wait(3000);
       main_screen();return 0;
   }}
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("                 The NiceMeal Restaurant Login System        ");
    console.log("                        Quality you can taste.               ");
    console.log("                       "+times())
    console.log("                       "+time_identify()+" " +determind_call(currentlogin)+" " +customer[currentlogin].lastname)
    console.log("        *****************************************************\n");
    var temploginpassword;
    function verify_password(){
        loginattempt_above3()
        temploginpassword= input.question("        Please enter your password: ");
        if (temploginpassword===customer[currentlogin].password){
            customer[currentlogin].wrongpassword_attempt=0;
            userlogin=true;
            order_screen();return 0;
        }
        else {
            customer[currentlogin].wrongpassword_attempt++;
            loginattempt_above3()
            process.stdout.write('\033c')
            console.log("        *****************************************************\n")
            console.log("                 The NiceMeal Restaurant Login System        ");
            console.log("                        Quality you can taste.               ");
            console.log("                         Sorry,wrong password                ")
            console.log("        Your account will be locked if there is more than 3  ")
            console.log("                              attempts")
            console.log("                     Current Attempt: "+customer[currentlogin].wrongpassword_attempt+"\n")
            console.log("               [1] Retry [2] Back to previous menu")
            console.log("        *****************************************************\n");
            var wrongattemptchoice=input.questionInt("        Choice: ");
            switch (wrongattemptchoice){
                case 1:

                    verify_password();return 0;
                    break;

                case 2:
                    temploginid=0;
                    temploginpassword=0;
                    main_screen();return 0;
                    break;
            }
        }
    }

verify_password()
}
//Menu function for user to edit its own particular after login
function change_particular(){
    if (guestlogin===true){

        process.stdout.write('\033c')
        console.log("  _____                     \n" +
            " | ____|_ __ _ __ ___  _ __ \n" +
            " |  _| | '__| '__/ _ \\| '__|\n" +
            " | |___| |  | | | (_) | |   \n" +
            " |_____|_|  |_|  \\___/|_|   \n" +
            "                            ")
        console.log("*****************************************************\n")
        console.log("         The NiceMeal Restaurant User System      \n  ");
        console.log("       This function is not available to guest")
        console.log("*****************************************************\n")
        wait(3000);
        order_screen();return 0;
    }
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("                 The NiceMeal Restaurant User System        ");
    console.log("                 What would you like to update today\n")
    console.log("                   Name: " +customer[currentlogin].lastname+" "+customer[currentlogin].firstname)
    console.log("                   Phone: " +customer[currentlogin].contact)
    console.log("                   Email: " +customer[currentlogin].email)
    console.log("                   Member ID: " +customer[currentlogin].memberno+"\n")
    console.log("                [1] Contact Number  [2] Email Address")
    console.log("                [3] Passwords       [4] Return to previous screen\n")
    console.log("        *****************************************************\n")
    changeparticularchoice();return 0;
    function changeparticularchoice(){
        var choice=input.questionInt("        Choice: ");
        switch (choice){
            case 1:
                var choicephone=input.questionInt("        New phone number: ");
                customer[currentlogin].contact=choicephone;
                process.stdout.write('\033c')

                console.log("  ____                             \n" +
                    " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                    " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                    "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                    " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                    "                                   ")
                console.log("*****************************************************\n")
                console.log("Change is successful,going back ...");
                console.log("*****************************************************\n")
                wait(3000);
                order_screen()
                return 0;
                break;
            case 2:
                var tempchangeemail=input.question("        Your new email address:")
                customer[currentlogin].email=tempchangeemail;
                process.stdout.write('\033c')
                console.log("  ____                             \n" +
                    " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                    " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                    "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                    " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                    "                                   ")
                console.log("*****************************************************\n")
                console.log("Change is successful,going back ...");
                console.log("*****************************************************\n")
                wait(3000);
                order_screen();return 0;

                break;
            case 3:
                currentpass()
                function currentpass(){
                var currentemppw=input.question("        Current password: ");
                if (currentemppw===customer[currentlogin].password) {
                    process.stdout.write('\033c')
                    console.log("  ____                             \n" +
                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                        "                                   ")
                    console.log("*****************************************************\n")
                    console.log("         The NiceMeal Restaurant User System        ");
                    console.log("              Verification is successful!")
                    console.log("*****************************************************\n")
                    retrypassword();return 0;

                    function retrypassword()
                    {
                    var tempnewpass = input.question("        New password: ");
                    var tempnewconfirmpass = input.question("        Re-enter password: ");
                    if (tempnewconfirmpass === tempnewpass) {
                        customer[currentlogin].password = tempnewconfirmpass;
                        process.stdout.write('\033c')
                        console.log("  ____                             \n" +
                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                            "                                   ")
                        console.log("*****************************************************\n")
                        console.log("Change is successful");
                        console.log("*****************************************************\n")
                        wait(3000);
                        order_screen()
                    } else {
                        process.stdout.write('\033c')
                        console.log("  _____                     \n" +
                            " | ____|_ __ _ __ ___  _ __ \n" +
                            " |  _| | '__| '__/ _ \\| '__|\n" +
                            " | |___| |  | | | (_) | |   \n" +
                            " |_____|_|  |_|  \\___/|_|   \n" +
                            "                            ")
                        console.log("*****************************************************\n")
                        console.log("         The NiceMeal Restaurant User System        ");
                        console.log("              2 password does not match")
                        console.log("               [1] Retry [2] Go back ")
                        console.log("*****************************************************\n")
                        repeatchoice()
                        function repeatchoice() {
                            var choice = input.questionInt("Choice: ");
                            switch (choice){
                                case 1:
                                    retrypassword();return 0;break;
                                case 2:
                                    order_screen();return 0;break;
                                default:
                                    console.log("Invalid Option");
                                    repeatchoice();return 0;
                            }
                        }
                    }
                }
                }
                else{
                    process.stdout.write('\033c')
                    console.log("  _____                     \n" +
                        " | ____|_ __ _ __ ___  _ __ \n" +
                        " |  _| | '__| '__/ _ \\| '__|\n" +
                        " | |___| |  | | | (_) | |   \n" +
                        " |_____|_|  |_|  \\___/|_|   \n" +
                        "                            ")
                    console.log("*****************************************************\n")
                    console.log("         The NiceMeal Restaurant User System        ");
                    console.log("                Verification failed ")
                    console.log("               [1] Retry [2] Go back")
                    console.log("*****************************************************\n")
                    var choice1=input.questionInt("Choice: ")
                    switch (choice1){
                        case 1: currentpass();return 0;break;
                        case 2:order_screen();return 0;break;
                    }
                }}
                break;
            case 4:order_screen();return 0;break;
            default:console.log("Invalid Option");
            changeparticularchoice();return 0;break;

        }

    }
}
//Main menu after user and guest login
function order_screen(){
    totalcost=0;
    usecoupon=false;
    thismenu=0;
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Order System        ");
    if (guestlogin===false){
    console.log("                "+time_identify()+" "+determind_call(currentlogin)+" " +customer[currentlogin].lastname);
    if (customer[currentlogin].coupon.length>0){
    console.log("     Currently you have "+customer[currentlogin].coupon.length+ " coupon that can be used" );
    }
    }
    else {
    console.log("                 "+time_identify()+" " +"Guest "+guest_lastname)
    console.log("     Do consider to be our member for exclusive deals")

    }
    console.log("         What would you like to order today :)\n")
    console.log("           [1] Start order  [2] View Cart")
    console.log("           [3] Order History  [4] Track an order")
    console.log("           [5] View Coupon  [6] Change of account detail")
    console.log("           [7] Logout        [8] Exit\n")
    console.log("*****************************************************\n")
    order_screen_choice();return 0;
    function order_screen_choice() {
        var choice = input.questionInt("Choice: ");
        switch (choice){
            case 1: order_menu();return 0;break;
            case 2: view_cart();return 0;break;
            case 3: order_history();return 0;break;
            case 4:trackorderguest();return 0;break;
            case 5:coupon_view();return 0;break
            case 6:change_particular();return 0;break
            case 7:logout_now();return 0;break;
            case 8:newd();return 0;
            async function newd(){
                process.stdout.write('\033c')
                console.log(
                    " _____ _            _   _ _          __  __            _ \n" +
                    " |_   _| |__   ___  | \\ | (_) ___ ___|  \\/  | ___  __ _| |\n" +
                    "   | | | '_ \\ / _ \\ |  \\| | |/ __/ _ | |\\/| |/ _ \\/ _` | |\n" +
                    "   | | | | | |  __/ | |\\  | | (_|  __| |  | |  __| (_| | |\n" +
                    "   |_| |_| |_|\\___| |_| \\_|_|\\___\\___|_|  |_|\\___|\\__,_|_|\n" +
                    "  ____          _                              _          \n" +
                    " |  _ \\ ___ ___| |_ __ _ _   _ _ __ __ _ _ __ | |_        \n" +
                    " | |_) / _ / __| __/ _` | | | | '__/ _` | '_ \\| __|       \n" +
                    " |  _ |  __\\__ | || (_| | |_| | | | (_| | | | | |_        \n" +
                    " |_| \\_\\___|___/\\__\\__,_|\\__,_|_|  \\__,_|_| |_|\\__|   ")
                console.log("*****************************************************")
                console.log("System exiting ...")
                console.log("*****************************************************")
                wait(3000);
                await fs.writeFile('../.database/customerdetail.dat',JSON.stringify(customer))
                await fs.writeFile('../.database/i.txt',i.toString())
                await fs.writeFile('../.database/order.dat',JSON.stringify(order))
                await fs.writeFile('../.database/admin.dat',JSON.stringify(admin))
                await fs.writeFile('../.database/food.dat',JSON.stringify(food))
                await fs.writeFile('../.database/coupon.dat',JSON.stringify(couponstore))
            }; break;
            default:console.log("Invalid Option");
            order_screen_choice();return 0;break;

        }
    }
}
//Menu after selecting order now: choice to select food by fuzzy search ,view all and by category
function order_menu(){
    process.stdout.write('\033c')
    counterfind=0;
    console.log("        *****************************************************\n")
    console.log("               The NiceMeal Restaurant Ordering System        ");
    console.log("                       Quality you can taste.                 ");
    console.log("                             Food Menu")
    console.log("                        [1] View all items")
    console.log("                        [2] View all category")
    console.log("                        [3] Search for an item")
    console.log("                        [4] Return to previous screen")
    console.log("        *****************************************************\n");
    foodmenuoption()
    function foodmenuoption() {
        var foodmenuchoice = input.questionInt("        Choice: ");
        switch (foodmenuchoice){
            case 1:view_all();return 0;break
            case 2:category_item();return 0;break;
            case 3:search_item();return 0;break;
            case 4:order_screen();return 0;break;

            default:
                console.log("        Invalid Option");
                foodmenuoption();return 0;
                break;

        }
    }
}
//View current cart for member
function view_cart(){
    if (guestlogin===true){
        view_cart_guest();return 0;
    }
     totalcost=0;
    if (customer[currentlogin].cart.length<1){
        process.stdout.write('\033c')
        console.log("        *****************************************************\n")
        console.log("                 The NiceMeal Restaurant Order System        ");
        console.log("                               My cart:")
        console.log("                      You have no item in cart :(\n")
        console.log("                      [1]Back to previous menu")
        console.log("        *****************************************************\n")
        nocartitem();return 0;
        function nocartitem(){
            var choice=input.questionInt("        Choice: ");
            switch (choice){
                case 1: order_screen();return 0;break
                default:console.log("        Invalid Choice");
                nocartitem();return 0;
            }
        }
    }
    process.stdout.write('\033c')
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("                 The NiceMeal Restaurant Order System        ");
    console.log("                               My cart:")
    for (var v=0;v<customer[currentlogin].cart.length;v++){
        console.log("        "+v+". "+customer[currentlogin].cart[v][0].item_name+" "+customer[currentlogin].cart[v][0].item_quantity +"x"+"==>"+"$"+((customer[currentlogin].cart[v][0].item_quantity)*customer[currentlogin].cart[v][0].item_price).toFixed(2))
       totalcost=((customer[currentlogin].cart[v][0].item_quantity)*customer[currentlogin].cart[v][0].item_price)+totalcost
        console.log("        ------")
        if (customer[currentlogin].cart[v][0].item_spicy===true){
           switch (customer[currentlogin].cart[v][0].item_spicy_level){
               case 1:
                   console.log("        No Spicy")
                   break;
               case 2:console.log("        Little Spicy")
                   break
               case 3:
                   console.log("        Very Spicy")
                   break;
               default:
                   console.log("        Original");break;
           }

        }
        if (customer[currentlogin].cart[v][0].item_dry===true){
            switch (customer[currentlogin].cart[v][0].item_dry_level){
                case 1:
                    console.log("        Dry")
                    break;
                case 2:console.log("        Soup")
                    break
                default:
                    console.log("        Original");break;
            }

        }
        if (customer[currentlogin].cart[v][0].item_ice===true){
            switch (customer[currentlogin].cart[v][0].item_ice_level){
                case 1:
                    console.log("        No Ice")
                    break;
                case 2:console.log("        Little Ice")
                    break
                case 3:
                    console.log("        Alot of Ice")
                    break;
                default:
                    console.log("        Original");break;
            }
        }
        console.log("        ------")
    }
    if (usecoupon!==false){
        console.log("        Using coupon:"+customer[currentlogin].coupon[choiceselectioncoupon].coupon_name);

    }
    if (usecoupon!==false&&thismenu===1){

if ((totalcost-customer[currentlogin].coupon[choiceselectioncoupon].coupon_price)>=0){
        console.log("                  Total Cost: $"+(totalcost-customer[currentlogin].coupon[choiceselectioncoupon].coupon_price).toFixed(2))
    }else if((totalcost-customer[currentlogin].coupon[choiceselectioncoupon].coupon_price)<0){
    console.log("                  Total Cost: $ 0.00")
}
    }
if (usecoupon===false){
    console.log("                  Total Cost: $"+totalcost.toFixed(2))}
    if (usecoupon===false&&customer[currentlogin].coupon.length>0){
        console.log("        You have coupons that can be use")
        console.log("        Enter 6 if you want to use them")
    }
    console.log("        [1] Checkout [2] Delete Item [3] Back to previous menu\n")
    console.log("        *****************************************************\n");
    choicecheckout()
    function choicecheckout(){
        var choice =input.questionInt("        Choice: ");
        switch (choice){
            case 6:
                console.log("                *****************************************************\n");
                console.log("                         The NiceMeal Restaurant Order System        ");
                console.log("                               Select a coupon to use ")
                console.log("                                    [10]Go back")
                for (var z=0;z<customer[currentlogin].coupon.length;z++){
                    console.log("                "+z+". "+customer[currentlogin].coupon[z].coupon_name+"==>"+"$ "+customer[currentlogin].coupon[z].coupon_price.toFixed(2))
                }
    selectionchoice()
                function selectionchoice(){
                  selection=input.questionInt("                Choice: ");
                  if (selection===10){
                      view_cart();return 0;

                  }
                if (selection>=customer[currentlogin].coupon.length){
                    console.log("                Invalid Option");
                    selectionchoice();return 0;
                }
                choiceselectioncoupon=selection;
                usecoupon=true;
                thismenu++;
                view_cart()
                }
                break;
            case 1:
                checkout();return 0;
                function checkout(){
                    var choice=input.question("        Are you sure you want to checkout?(Y/N): ")
                    switch (choice){
                        case "Y":
                            console.log("        *****************************************************\n");
                            console.log("                 The NiceMeal Restaurant Order System  \n      ");
                            console.log("                        Payment in process...")
                            console.log("        *****************************************************\n");
                            wait(6000);
                            if (usecoupon===true){

                                totalcost=totalcost-customer[currentlogin].coupon[choiceselectioncoupon].coupon_price;
                                customer[currentlogin].coupon.splice(choiceselectioncoupon,1)
                                if (totalcost<0){
                                    totalcost=0
                                }
                            }

                            templength=order[1].length
                            temporderno=100000+(order[0].length+order[1].length)
                            order[1][templength]=new order_status(temporderno,"Processing",totalcost);
                               order[1][templength].item=customer[currentlogin].cart.slice(0);
                               //console.log(order[1][templength].item[0][0].item_name)
                               customer[currentlogin].cart=[];
                               customer[currentlogin].order_active=temporderno;
                               customer[currentlogin].order_record[customer[currentlogin].order_record.length]=order[1].slice(templength,templength+1)
                            console.log("  ____                             \n" +
                                " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                "                                   ")
                            console.log("*****************************************************\n");
                            console.log("         The NiceMeal Restaurant Order System  \n      ");
                            console.log("                Payment is successful")
                            console.log("             Your order number is "+temporderno)
                            console.log("        You can view your order at the order history")
                            console.log("*****************************************************\n");

                            wait(4000)
                            order_screen();return 0;



                            break;
                        case "N":if (thismenu>1){
                            thismenu++;
                        }
                            view_cart();return 0;
                        break;
                        default:console.log("        Invalid Option");checkout();return 0;
                    }
                }
                break;
            case 2:
                var deleteitem=input.questionInt("        Which item you would like to delete: ");
                deletenow();return 0;
                function deletenow() {
                    var confirmationdelete = input.question("        Are you sure you want to remove " + customer[currentlogin].cart[deleteitem][0].item_name + " ? (Y/N): ");
                    if (confirmationdelete === "Y") {
                        customer[currentlogin].cart.splice(deleteitem, 1);
                        console.log("        Item is deleted,going back ");
                        wait(2000);
                        if (thismenu>1){
                            thismenu++;
                        }
                        order_screen();return 0;
                    } else if (confirmationdelete === "N") {
                        choicecheckout();return 0;
                    } else {
                        console.log("        Invalid Option");
                        deletenow();return 0;
                    }
                }

                break;
            case 3:if (thismenu>1){
                thismenu++;
            } order_screen();return 0;break;
            default: console.log("        Invalid Option");
            choicecheckout();return 0;
        }
    }
}
//View current cart for guest
function view_cart_guest(){
    totalcost=0;
    if (guest_cart.length<1){
        console.log("        *****************************************************\n")
        console.log("                 The NiceMeal Restaurant Order System        ");
        console.log("                               My cart:")
        console.log("                      You have no item in cart :(\n")
        console.log("                      [1]Back to previous menu")
        console.log("        *****************************************************\n")
        nocartitem();return 0;
        function nocartitem(){
            var choice=input.questionInt("        Choice: ");
            switch (choice){
                case 1: order_screen();return 0;break
                default:console.log("        Invalid Choice");
                    nocartitem();return 0;
            }
        }
    }
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("                 The NiceMeal Restaurant Order System        ");
    console.log("                               My cart:")
    for (var v=0;v<guest_cart.length;v++){
        console.log("        "+v+". "+guest_cart[v][0].item_name+" "+guest_cart[v][0].item_quantity +"x"+"==>"+"$"+((guest_cart[v][0].item_quantity)*guest_cart[v][0].item_price).toFixed(2))
        totalcost=((guest_cart[v][0].item_quantity)*guest_cart[v][0].item_price)+totalcost
        console.log("        ------")
        if (guest_cart[v][0].item_spicy===true){
            switch (guest_cart[v][0].item_spicy_level){
                case 1:
                    console.log("        No Spicy")
                    break;
                case 2:console.log("        Little Spicy")
                    break
                case 3:
                    console.log("        Very Spicy")
                    break;
                default:
                    console.log("        Original");break;
            }

        }
        if (guest_cart[v][0].item_dry===true){
            switch (guest_cart[v][0].item_dry_level){
                case 1:
                    console.log("        Dry")
                    break;
                case 2:console.log("        Soup")
                    break
                default:
                    console.log("        Original");break;
            }

        }
        if (guest_cart[v][0].item_ice===true){
            switch (guest_cart[v][0].item_ice_level){
                case 1:
                    console.log("        No Ice")
                    break;
                case 2:console.log("        Little Ice")
                    break
                case 3:
                    console.log("        Alot of Ice")
                    break;
                default:
                    console.log("        Original");break;
            }
        }
        console.log("        ------")
    }
    console.log("                  Total Cost: $"+totalcost.toFixed(2))
   
    console.log("        [1] Checkout [2] Delete Item [3] Back to previous menu\n")
    console.log("        *****************************************************\n");
    choicecheckoutg()
    function choicecheckoutg(){
        var choice =input.questionInt("        Choice: ");
        switch (choice){
            case 1:
                checkout();return 0;
            function checkout(){
                var choice=input.question("        Are you sure you want to checkout?(Y/N): ")
                switch (choice){
                    case "Y":
                        process.stdout.write('\033c')
                        console.log("  ____                             _                   \n" +
                            " |  _ \\ _ __ ___   ___ ___ ___ ___(_)_ __   __ _       \n" +
                            " | |_) | '__/ _ \\ / __/ _ / __/ __| | '_ \\ / _` |      \n" +
                            " |  __/| | | (_) | (_|  __\\__ \\__ | | | | | (_| |_ _ _ \n" +
                            " |_|   |_|  \\___/ \\___\\___|___|___|_|_| |_|\\__, (_(_(_)\n" +
                            "                                           |___/       ")
                        console.log("*****************************************************\n");
                        console.log("         The NiceMeal Restaurant Order System  \n      ");
                        console.log("                Payment in process...")
                        console.log("*****************************************************\n");
                        wait(6000);

                        templength=order[1].length
                        temporderno=100000+(order[0].length+order[1].length)
                        order[1][templength]=new order_status(temporderno,"Processing",totalcost);
                        order[1][templength].item=guest_cart.slice(0);
                        //console.log(order[1][templength].item[0][0].item_name)
                        guest_cart=[];
                        process.stdout.write('\033c')
                        console.log("  ____                             \n" +
                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                            "                                   ")
                        console.log("*****************************************************\n");
                        console.log("         The NiceMeal Restaurant Order System  \n      ");
                        console.log("                Payment is successful")
                        console.log("             Your order number is "+temporderno)
                        console.log("*****************************************************\n");
                        wait(4000)
                        order_screen();return 0;



                        break;
                    case "N":if (thismenu>1){
                        thismenu++;
                    }
                        view_cart();return 0;
                        break;
                    default:console.log("        Invalid Option");checkout();return 0;
                }
            }
                break;
            case 2:
                var deleteitem=input.questionInt("        Which item you would like to delete: ");
                deletenow1();return 0;
            function deletenow1() {
                var confirmationdelete = input.question("        Are you sure you want to remove " + guest_cart[deleteitem][0].item_name + " ? (Y/N): ");
                if (confirmationdelete === "Y") {
                    guest_cart.splice(deleteitem, 1);
                    process.stdout.write('\033c')
                    console.log("  ____                             \n" +
                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                        "                                   ")
                    console.log("        Item is deleted,going back ");
                    wait(2000);
                    if (thismenu>1){
                        thismenu++;
                    }
                    order_screen();return 0;
                } else if (confirmationdelete === "N") {
                    choicecheckoutg();return 0;
                } else {
                    console.log("        Invalid Option");
                    deletenow1();return 0;
                }
            }

                break;
            case 3:if (thismenu>1){
                thismenu++;
            } order_screen();return 0;break;
            default: console.log("        Invalid Option");
                choicecheckoutg();return 0;
        }
    }
}
//View order history --Only for member
function order_history(){
    if (guestlogin===true){
        process.stdout.write('\033c')
        console.log("  _____                     \n" +
            " | ____|_ __ _ __ ___  _ __ \n" +
            " |  _| | '__| '__/ _ \\| '__|\n" +
            " | |___| |  | | | (_) | |   \n" +
            " |_____|_|  |_|  \\___/|_|   \n" +
            "                            ")
        console.log("*****************************************************\n");
        console.log("      The NiceMeal Restaurant Ordering System          ");
        console.log("              Quality you can taste.\n                 ");
        console.log("           Guest cannot use this feature\n                 ");
        console.log("*****************************************************\n");
        wait(4000);
        order_screen()
    }
    process.stdout.write('\033c')
    console.log("        *****************************************************\n");
    console.log("              The NiceMeal Restaurant Ordering System          ");
    console.log("                      Quality you can taste.\n                 ");
    console.log("                         Order History:\n")
    if (customer[currentlogin].order_record.length>0) {
        for (var q = 0; q < customer[currentlogin].order_record.length; q++) {
            fs.appendFile('temp.txt', 'Order History:')
            fs.appendFile('temp.txt', "        " + q + ". " + customer[currentlogin].order_record[q][0].number + "==>" + customer[currentlogin].order_record[q][0].status+"==>"+"$ "+customer[currentlogin].order_record[q][0].cost.toFixed(2))
            fs.appendFile('temp.txt',"\n===========================================\n")
            console.log("                " + q + ". " + customer[currentlogin].order_record[q][0].number + "==>" + customer[currentlogin].order_record[q][0].status+"==>"+"$ "+customer[currentlogin].order_record[q][0].cost.toFixed(2));
            console.log("        ===========================================")
            for (var g = 0; g < customer[currentlogin].order_record[q][0].item.length; g++) {
                fs.appendFile('temp.txt',"\n    "+customer[currentlogin].order_record[q][0].item[g][0].item_name+"\n")
            console.log("            "+customer[currentlogin].order_record[q][0].item[g][0].item_name+"\n")
            }
            fs.appendFile('temp.txt',"\n===========================================\n")
            console.log("        ===========================================")
        }
        console.log("\n")
        console.log("        [1] Send a email receipt for all order [2] Go back")
        console.log("        *****************************************************\n");
        tempc();return 0;
        function tempc(){
            var tempchoice1=input.questionInt("        Choice: ");
            switch (tempchoice1){
                case 1:
                    console.log("        Sending in progress..");
                    console.log("        You will receive your receipt after you exit the program");

                function mail_history() {var nodemailer = require('nodemailer');

                    var transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: '4582h@dunearn.edu.sg',
                            pass: 'XXXXX',

                        }
                    });
                    mailorder = {
                        from: '4582h@dunearn.edu.sg',
                        to: customer[currentlogin].email,
                        subject: 'Your order receipt from The NiceMeal Restaurant',
                        html: '<h1>Your order history is attached below!</h1><br><h3>We true thank you for choosing us!</h3><br><p>Best Regards<br> The NiceMeal Restaurant</p>',
                        attachments:[{
                            filename:'order_history.txt',
                            path:'./temp.txt'
                        }]


                    }

                    transporter.sendMail(mailorder, function (error, info) {
                        if (error) {
                            console.log(error);
                            fs.unlink('./temp.txt')
                            return 0;
                        } else {
                            console.log('Email sent: ' + info.response);
                            fs.unlink('./temp.txt')
                            return 0;
                        }
                    });
                    wait(3000)
                    return 0;
                }
                    mail_history();
                    wait(3000)
                    order_screen()
                    return 0;

                    break;
                case 2: order_screen();return 0;break;
                default: console.log("        Invalid option");
                    tempc();return 0;break;
            }
        }
    }
    else {
    console.log("                         No order found")
    console.log("                          [1] Go back")
        console.log("        *****************************************************\n");
    tempchoice();return 0;
    function tempchoice(){
        var tempchoice1=input.questionInt("        Choice: ");
        switch (tempchoice1){
            case 1:order_screen();return 0;break;
            default:console.log("        Invalid Option");tempchoice();return 0;break;
        }
    }
    }
}
//For member to view current available coupon they have
function coupon_view(){
    if (guestlogin===true){

        process.stdout.write('\033c')
        console.log("  _____                     \n" +
            " | ____|_ __ _ __ ___  _ __ \n" +
            " |  _| | '__| '__/ _ \\| '__|\n" +
            " | |___| |  | | | (_) | |   \n" +
            " |_____|_|  |_|  \\___/|_|   \n" +
            "                            ")
        console.log("*****************************************************\n")
        console.log("         The NiceMeal Restaurant User System     \n   ");
        console.log("       This function is not available to guest")
        console.log("*****************************************************\n")
        wait(3000);
        order_screen();return 0;
    }
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("                 The NiceMeal Restaurant Order System        ");
    console.log("                     You currently have "+customer[currentlogin].coupon.length+" coupon")
    for (var h=0;h<customer[currentlogin].coupon.length;h++){
    console.log("                 "+h+". "+customer[currentlogin].coupon[h].coupon_name+" ==>"+"$ "+customer[currentlogin].coupon[h].coupon_price.toFixed(2))
    }
    console.log("                     [1] Back to previous menu\n")
    console.log("        *****************************************************\n")
    coupon_view_choice();return 0;
    function coupon_view_choice(){
        var choice =input.questionInt("        Choice: ")
        switch (choice){
            case 1: order_screen();return 0;break
            default:console.log("        Invalid Option"); wait(3000)
                coupon_view_choice()
        }
    }
}
//For customer and guest to logout
function logout_now(){
    process.stdout.write('\033c')
    console.log(
        " _____ _            _   _ _          __  __            _ \n" +
        " |_   _| |__   ___  | \\ | (_) ___ ___|  \\/  | ___  __ _| |\n" +
        "   | | | '_ \\ / _ \\ |  \\| | |/ __/ _ | |\\/| |/ _ \\/ _` | |\n" +
        "   | | | | | |  __/ | |\\  | | (_|  __| |  | |  __| (_| | |\n" +
        "   |_| |_| |_|\\___| |_| \\_|_|\\___\\___|_|  |_|\\___|\\__,_|_|\n" +
        "  ____          _                              _          \n" +
        " |  _ \\ ___ ___| |_ __ _ _   _ _ __ __ _ _ __ | |_        \n" +
        " | |_) / _ / __| __/ _` | | | | '__/ _` | '_ \\| __|       \n" +
        " |  _ |  __\\__ | || (_| | |_| | | | (_| | | | | |_        \n" +
        " |_| \\_\\___|___/\\__\\__,_|\\__,_|_|  \\__,_|_| |_|\\__|   ")
    wait(3000);
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Order System        ");
    console.log("                 Logout successful!\n")
    console.log("*****************************************************\n")
    wait(3000)
    currentlogin=0;
    main_screen();return 0;
}
//Function to identity current time and return corresponding greetings like good morning
function time_identify(){
    if (time.getHours()<12){
        return "Good Morning!"
    }
    if (time.getHours()>=12&&time.getHours()<18){
        return "Good Afternoon!"
    }
    if (time.getHours()>=18&&time.getHours()<=19){
        return "Good Evening!"
    }
    if (time.getHours()>19){
        return "Good Night!"
    }
}
//Function to view all food items
function view_all(){
    foodcount=0;
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                       The NiceMeal Restaurant Ordering System        ");
    console.log("                               Quality you can taste.                 ");
    console.log("                                     Our item:\n")
        for (a=0;a<food[0].length;a++){
            console.log("                "+foodcount+". "+food[0][a].item_code+". "+food[0][a].item_name +"==>"+food[0][a].item_price);
            foodcount++;
        }
        for (b=0;b<food[1].length;b++){
            console.log("                "+foodcount+". "+food[1][b].item_code+". "+food[1][b].item_name +"==>"+food[1][b].item_price)
            foodcount++;
        }
        for (c=0;c<food[2].length;c++){
            console.log("                "+foodcount+". "+food[2][c].item_code+". "+food[2][c].item_name +"==>"+food[2][c].item_price)
            foodcount++;
        }
        for (d=0;d<food[3].length;d++){
            console.log("                "+foodcount+". "+food[3][d].item_code+". "+food[3][d].item_name +"==>"+food[3][d].item_price)
            foodcount++;
        }
    for (e=0;e<food[4].length;e++){
        console.log("                "+foodcount+". "+food[4][e].item_code+". "+food[4][e].item_name +"==>"+food[4][e].item_price)
        foodcount++;
    }
    console.log("\n");

        if (guestlogin===true||userlogin===true){
            console.log("                [1] View item's description [2] Add to cart [3] Return back \n")
            console.log("                *****************************************************\n")
            addcartall();return 0;
            function addcartall(){
                var choice =input.questionInt("                Choice: ");
                switch ( choice){
                    case 1: viewitemdescription();return 0;break;
                    case 2:
                        var seeitem=input.questionInt('                Which one to add to cart? :');
                        if (seeitem<0||seeitem>foodcount){
                            console.log("                Invalid Option");
                            wait(3000)
                            addcartall();return 0;
                        }
                        category_number=0;
                        if (seeitem>=a){
                            seeitem -= a;
                            category_number=1;
                            if (seeitem>=b){
                                seeitem -= b;

                                category_number=2;
                                if (seeitem>=c){
                                    seeitem -= c;
                                    category_number=3;
                                if (seeitem>=d){
                                    seeitem-=d;
                                    category_number=4;
                                }}
                            }
                        }
                        if (userlogin===true){
                            customer[currentlogin].cart.push((food[category_number].slice(seeitem,seeitem+1)))
                            tempclass=customer[currentlogin].cart.length-1;
                            quantityoforderuser();return 0;
                            function quantityoforderuser(){
                                var quantity = input.questionInt("                How many do you want: ");
                                if (quantity<0){
                                    quantityoforderuser()
                                }
                                customer[currentlogin].cart[tempclass][0].item_quantity=quantity
                                if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                                    console.log("                ============")
                                    console.log("                Level of spicy")
                                    console.log("                [1] No spicy")
                                    console.log("                [2] Abit Spicy")
                                    console.log("                [3] Very Spicy")
                                    console.log("                ============")
                                    var spicylevel=input.questionInt("                Choice:")
                                    customer[currentlogin].cart[tempclass][0].item_spicy_level=spicylevel

                                }

                                if (customer[currentlogin].cart[tempclass][0].item_dry===true){
                                    console.log("                ============")
                                    console.log("                Dry of with soup")
                                    console.log("                [1] Dry")
                                    console.log("                [2] Soup")
                                    console.log("                ============")
                                    var drylevel=input.questionInt("                Choice:")
                                    customer[currentlogin].cart[tempclass][0].item_dry_level=drylevel

                                }



                                if (customer[currentlogin].cart[tempclass][0].item_ice===true){
                                    console.log("                ============")
                                    console.log("                Level of ice")
                                    console.log("                [1] No ice")
                                    console.log("                [2] Abit ice")
                                    console.log("                [3] Alot of ice")
                                    console.log("                ============")
                                    var icelevel=input.questionInt("                Choice:")
                                    customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                                }
                                console.log("                Added to cart!!");
                                wait(3000);
                                order_menu()




                            }

                        }

                        if (guestlogin===true){
                            guest_cart.push((food[category_number].slice(seeitem,seeitem+1)))
                            tempclass=guest_cart.length-1;
                            quantityoforderguest();return 0;
                            function quantityoforderguest(){
                                var quantity = input.questionInt("                How many do you want: ");
                                if (quantity<0){
                                    quantityoforderguest()
                                }
                                guest_cart[tempclass][0].item_quantity=quantity
                                if (guest_cart[tempclass][0].item_spicy===true){
                                    console.log("                ============")
                                    console.log("                Level of spicy")
                                    console.log("                [1] No spicy")
                                    console.log("                [2] Abit Spicy")
                                    console.log("                [3] Very Spicy")
                                    console.log("                ============")
                                    var spicylevel=input.questionInt("                Choice:")
                                    guest_cart[tempclass][0].item_spicy_level=spicylevel

                                }

                                if (guest_cart[tempclass][0].item_dry===true){
                                    console.log("                ============")
                                    console.log("                Dry of with soup")
                                    console.log("                [1] Dry")
                                    console.log("                [2] Soup")
                                    console.log("                ============")
                                    var drylevel=input.questionInt("                Choice:")
                                    guest_cart[tempclass][0].item_dry_level=drylevel

                                }



                                if (guest_cart[tempclass][0].item_ice===true){
                                    console.log("                ============")
                                    console.log("                Level of ice")
                                    console.log("                [1] No ice")
                                    console.log("                [2] Abit ice")
                                    console.log("                [3] Alot of ice")
                                    console.log("                ============")
                                    var icelevel=input.questionInt("                Choice:")
                                    guest_cart[tempclass][0].item_ice_level=icelevel

                                }
                                console.log("                Added to cart!!");
                                wait(3000);
                                order_menu()




                            }

                        }





                        break;
                    case 3:order_menu();return 0;break;
                    default:console.log("                Invalid Option")
                        wait(3000)
                    addcartall();return 0;
                    break;
                }
            }
        }


        if (guestlogin===false&&userlogin===false){
    console.log("                [1] View an item's description [2]Back to previous screen ");
    console.log("                *****************************************************\n")
    itemchoiceview();return 0;
    function itemchoiceview() {
        var itemchoicedes = input.questionInt("                Choice: ")
        switch (itemchoicedes) {
            case 1:viewitemdescription();return 0;break;
            case 2:food_menu();return 0;break;
            default:
                console.log("                Invalid Option");
                wait(3000)
                itemchoiceview()
        }
    }
}}
//Function to see a items description from view all items function
function viewitemdescription(){
    category_number=0;
    foodcountcheck()
    function foodcountcheck(){
    seeitem=input.questionInt("                Which item do you want to see: ");
    if (seeitem<0||seeitem>=foodcount){
        console.log("                Invalid Option")
        foodcountcheck()
    }
    if (seeitem>=a){
        seeitem -= a;
        category_number++;
        if (seeitem>=b){
            seeitem -= b;
            category_number++;
            if (seeitem>=c){
                seeitem -= c;
                category_number++;
            if (seeitem>=d){
                seeitem-=d;
                category_number=4;
            }}
        }
    }
    }
    process.stdout.write('\033c')
    console.log("                *****************************************************\n");
    console.log("                      The NiceMeal Restaurant Ordering System          ");
    console.log("                              Quality you can taste.\n                 ");
    console.log("                Item description for "+food[category_number][seeitem].item_name +":")   ;
    console.log("                "+food[category_number][seeitem].item_description+"\n");
    console.log("                            [1]Back to previous screen ");
    console.log("                *****************************************************\n");
    backto();return 0;
    function backto(){
        var choice=input.questionInt("                Choice: ")
        switch (choice){
            case 1:
                view_all();return 0;
                break
            default:
                console.log("                Invalid Option");
                backto();return 0;
                break;
        }
    }

}
//Menu for item to select which category item they want to see like rice category or noodle category and etc
function category_item(){
    process.stdout.write('\033c')
    console.log("                *****************************************************\n")
    console.log("                       The NiceMeal Restaurant Ordering System        ");
    console.log("                               Quality you can taste.                 ");
    console.log("                                    Food Category")
    console.log("                                     [0] Promotion  ")
    console.log("                                     [1] Rice")
    console.log("                                     [2] Noodles")
    console.log("                                     [3] Drinks")
    console.log("                                     [4] Others                       ")
    console.log("                                     [5] Go back to previous menu                       ")
    console.log("                *****************************************************\n")
    categorychoice();return 0;
    function categorychoice() {
        var choice = input.questionInt("                Choice :");
        switch (choice){
            case 0: promotioncategory();return 0;break;
            case 1:
                ricecategory()
                break;
            case 2:
                noodlecategory();return 0;
                break;
            case 3:
                drinkcategory();return 0;
                break;
            case 4:
                othercategory();return 0;
                break;
            case 5 :
                if (userlogin===true||guestlogin===true){
                    order_screen();return 0;break;
                }if (userlogin===false&&guestlogin===false){
                main_screen();return 0;break;}
                if (adminloginc===true){
                    admin_control();return 0;break;
                }
                break;
            default:
                console.log("                Invalid option");
                wait(3000)
                categorychoice();return 0;
                break;
        }
    }
}
/* Rice category items.This function also consist of sub functions to produce different options for
 User,guest and non user/guest/admin and admin
User and guest will be able to view description and add to cart but non user/guest/admin can only view description
Admin will have a extra option to edit and remove item
*/
function ricecategory(){
    process.stdout.write('\033c')
    console.log("                        *****************************************************\n")
    console.log("                               The NiceMeal Restaurant Ordering System        ");
    console.log("                                       Quality you can taste.                 ");
    console.log("                                            Rice Category\n")
    for (var r=0;r<food[1].length;r++){
        console.log("                        "+r+". "+food[1][r].item_code+". " + food[1][r].item_name+"==>"+"$ "+food[1][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("                        [1] View an item's description [2] Add to cart [3]Return back ");
        console.log("                        *****************************************************\n")
        addcartrc();return 0;
        function addcartrc(){

            var choice=input.questionInt("                        Choice :")
            switch (choice){
                case 1:   viewricedescription();return 0;
                    break;
                case 2:
    var cartready=input.questionInt("                        Which one to add to cart: ")
                    if (cartready<0||cartready>food[1].length-1){
                        console.log("                        Invalid Option")
                        addcartrc();return 0;
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[1].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();return 0;

                    }
                    function quantityoforderuser(){
                        var quantity = input.questionInt("                        How many do you want: ");
                        if (quantity<0){
                            quantityoforderuser()
                        }
                        customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                        if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                            console.log("                        ============")
                            console.log("                        Level of spicy")
                            console.log("                        [1] No spicy")
                            console.log("                        [2] Abit Spicy")
                            console.log("                        [3] Very Spicy")
                            console.log("                        ============")
                            var spicylevel=input.questionInt("                        Choice:")
                            customer[currentlogin].cart[tempclass][0].item_spicy_level=spicylevel

                        }

                        if (customer[currentlogin].cart[tempclass][0].item_dry===true){
                            console.log("                        ============")
                            console.log("                        Dry of with soup")
                            console.log("                        [1] Dry")
                            console.log("                        [2] Soup")
                            console.log("                        ============")
                            var drylevel=input.questionInt("                        Choice:")
                            customer[currentlogin].cart[tempclass][0].item_dry_level=drylevel

                        }



                        if (customer[currentlogin].cart[tempclass][0].item_ice===true){
                            console.log("                        ============")
                            console.log("                        Level of ice")
                            console.log("                        [1] No ice")
                            console.log("                        [2] Abit ice")
                            console.log("                        [3] Alot of ice")
                            console.log("                        ============")
                            var icelevel=input.questionInt("                        Choice:")
                            customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                        }

                        console.log("                        Added to cart!!");
                        wait(3000)
                        ricecategory();return 0;


                    }


                    if (guestlogin===true){

                        guest_cart.push((food[1].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();return 0;

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("============")
                        var drylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    ricecategory();return 0;


                }

                    break;
                case 3:
                    category_item();return 0;
                    break
                default:
                    console.log("                        Invalid Option")
                    addcartrc();return 0;

            }


        }
    }
    if (userlogin===false&&guestlogin===false&&adminloginc===false) {
        console.log("                        [1] View an item's description [2]Back to previous screen ");
        console.log("                        *****************************************************\n")
        itemchoiceview1();return 0;

        function itemchoiceview1() {
            var itemchoicedes = input.questionInt("                        Choice: ")
            switch (itemchoicedes) {
                case 1:
                    viewricedescription();return 0;
                    break;
                case 2:
                    category_item();return 0;
                    break;
                default:
                    console.log("                        Invalid Option");
                    wait(3000)
                    itemchoiceview1()
            }
        }
    }
    if (adminloginc===true){
        console.log("                        [1] Remove an item [2]Return back [3] Edit item");
        console.log("                        *****************************************************\n")
        adminchoicerice();return 0;
        function adminchoicerice(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:

                    var deleteoption=input.questionInt("                        Which item you want to delete? : ");
                    if (deleteoption<0||deleteoption>=food[1].length){
                        console.log("                        Invalid Option")
                        ricecategory();return 0;
                    }
                    confirmationdelete();return 0;
                    function confirmationdelete() {


                        var confirmation = input.question("                        Are you sure you want to delete " + food[1][deleteoption].item_name+"?: ");
                        switch (confirmation){
                            case "Y": food[1].splice(deleteoption,1);
                            console.log("                        Delete Successful,returning...")
                                wait(3000)
                                ricecategory();return 0;
                            break;
                            case "N":
                                admin_control();return 0;
                                break;
                            default:
                                console.log("                        Invalid option")
                                wait(300)
                                ricecategory();return 0;
                                break;
                        }

                    }

                    break;
                case 2:
                    admin_control();return 0;
                    break;
                case 3:
                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                               The NiceMeal Restaurant Admin System        ");
                    console.log("                                           Item edit")
                    console.log("                        You are warn that changes will only be applied to future order")

                    for (var r=0;r<food[1].length;r++){
                        console.log("                        "+r+". "+food[1][r].item_code+". " + food[1][r].item_name+"==>"+"$ "+food[1][r].item_price.toFixed(2))
                    }

                    console.log("\n")
                    console.log("                                        [1] Edit [2] Return")
                    console.log("                        *****************************************************\n")
                    editchoice()
                    function editchoice() {
                        var choiceedit = input.questionInt("                        Choice: ")
switch (choiceedit){
    case 1:
      var  choiceediter=input.questionInt("                        Which one do you want to edit: ")
        if (choiceediter < 0 || choiceediter >= food[1].length) {
            console.log("                        Invalid Option");
            wait(3000)
            adminchoicerice();return 0;
        }
                    edititem();return 0;
        function edititem(){
        process.stdout.write('\033c')
        console.log("                        *****************************************************\n")
        console.log("                               The NiceMeal Restaurant Admin System        ");
        console.log("                        Edit for item : "+food[1][choiceediter].item_name+"\n")
        console.log("                                 [1] Item Name [2] Item Code")
        console.log("                                 [3] Item Description [4] Item Cost")
        console.log("                                         [5] Return")
        console.log("                        *****************************************************\n")
        editfunction();return 0;
        function editfunction(){
            var choice=input.questionInt("                        Choice: ");
            switch (choice){
                case 1:
                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                        Current Name: "+food[1][choiceediter].item_name+"\n")
                    console.log("                        *****************************************************\n")
                    var itemname=input.question("                        Enter a new item name: ")
                    food[1][choiceediter].item_name=itemname;
                    process.stdout.write('\033c')
                    console.log("  ____                             \n" +
                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                        "                                   ")
                    console.log("*****************************************************\n")
                    console.log("       The NiceMeal Restaurant Admin System        ");
                    console.log("          Change is successful.Returning...")
                    console.log("*****************************************************\n")
                    wait(3000);
                    edititem();return 0;
                    break;
                case 2:   process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                        Current Code: "+food[1][choiceediter].item_code+"\n")
                    console.log("                        *****************************************************\n")
                    var code=input.questionInt("                        Enter a new code: ")
                    for (var b=0;b<food.length;b++){
                        for (var q=0;q<food[b].length;q++ ){
                            if (code===food[b][q].item_code){
                                console.log("                        Conflict item NO. !!! ")
                                console.log("                        Undoing change")
                                wait(3000)
                                edititem()
                            }
                        }
                    }
                    food[1][choiceediter].item_code=code;
                    process.stdout.write('\033c')
                    console.log("  ____                             \n" +
                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                        "                                   ")
                    console.log("*****************************************************\n")
                    console.log("       The NiceMeal Restaurant Admin System        ");
                    console.log("          Change is successful.Returning...")
                    console.log("*****************************************************\n")
                    wait(3000);
                    edititem();return 0;
                    break;
                case 3:
                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                        Current Description: "+food[1][choiceediter].item_description+"\n")
                    console.log("                        *****************************************************\n")
                    var text=input.question("                        Enter a new description: ")
                    food[1][choiceediter].item_description=text;
                    process.stdout.write('\033c')
                    console.log("  ____                             \n" +
                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                        "                                   ")
                    console.log("                        *****************************************************\n")
                    console.log("                               The NiceMeal Restaurant Admin System        ");
                    console.log("                                  Change is successful.Returning...")
                    console.log("                        *****************************************************\n")
                    wait(3000);
                    edititem();return 0;
                    break;
                case 4:
                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                        Current Price: "+food[1][choiceediter].item_price.toFixed(2)+"\n")
                    console.log("                        *****************************************************\n")
                    var cost=input.questionInt("                        Enter a new price: ")
                    food[1][choiceediter].item_price=cost;
                    process.stdout.write('\033c')
                    console.log("  ____                             \n" +
                        " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                        " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                        "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                        " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                        "                                   ")
                    console.log("                        *****************************************************\n")
                    console.log("                               The NiceMeal Restaurant Admin System        ");
                    console.log("                                  Change is successful.Returning...")
                    console.log("                        *****************************************************\n")
                    wait(3000);
                    edititem();return 0;
                    break;
                case 5:admin_control();return 0;break;
                default:
                    console.log("                        Invalid Option")
                    editfunction()
                    break
            }
        }}
        break;


    case 2:admin_control();return 0;
    break;
    default:
        console.log("                        Invalid Options");
        editchoice()
}
                    }

                    break;
                default:
                    console.log("                        Invalid Option")
                    admin_control();return 0;
            }
        }
    }

}
//View rice category items description
function viewricedescription(){
    retryrice();return 0;
    function retryrice() {
        seeitem1 = input.questionInt("                        Which item do you want to see: ");
        if (seeitem1>food[1].length-1 || seeitem1<0){
            console.log("                        Invalid Option");
            wait(1000)
            ricecategory();return 0;

        }

        process.stdout.write('\033c')
        console.log("                        *****************************************************\n");
        console.log("                              The NiceMeal Restaurant Ordering System          ");
        console.log("                                      Quality you can taste.\n                 ");
        console.log("                        Item description for "+food[1][seeitem1].item_name +":")   ;
        console.log("                        "+food[1][seeitem1].item_description+"\n");
        console.log("                                    [1]Back to previous screen ");
        console.log("                        *****************************************************\n");
        backto();return 0;
        function backto(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:
                    ricecategory();return 0;
                    break
                default:
                    console.log("                        Invalid Option");
                    backto();return 0;
                    break;
            }
        }

    }
}
/*Noodle category items.This function also consist of sub functions to produce different options for
 User,guest and non user/guest/admin and admin
User and guest will be able to view description and add to cart but non user/guest/admin can only view description
Admin will have a extra option to edit and remove item
*/
function noodlecategory(){
    process.stdout.write('\033c')
    console.log("                        *****************************************************\n")
    console.log("                               The NiceMeal Restaurant Ordering System        ");
    console.log("                                       Quality you can taste.                 ");
    console.log("                                            Noodle Category\n")
    for (var r=0;r<food[0].length;r++){
        console.log("                        "+r+". "+food[0][r].item_code+". " + food[0][r].item_name+"==>"+"$ "+food[0][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
    console.log("                        [1] View an item's description [2] Add to cart [3]Return back ");
    console.log("                        *****************************************************\n")
        addcartrc();return 0;
        function addcartrc(){

            var choice=input.questionInt("                        Choice :")
            switch (choice){
                case 1:   viewnoodledescription();return 0;
                    break;
                case 2:
                    var cartready=input.questionInt("                        Which one to add to cart: ")
                    if (cartready<0||cartready>food[0].length-1){
                        console.log("                        Invalid Option")
                        addcartrc();return 0;
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[0].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();return 0;

                    }
                function quantityoforderuser(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderuser()
                    }
                    customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                    if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (customer[currentlogin].cart[tempclass][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("                        ============")
                        var drylevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (customer[currentlogin].cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    noodlecategory();return 0;


                }


                    if (guestlogin===true){

                        guest_cart.push((food[0].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();return 0;

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("                        ============")
                        var drylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    noodlecategory();return 0;


                }

                    break;
                case 3:
                    category_item();return 0;
                    break
                default:
                    console.log("                        Invalid Option")
                    addcartrc();return 0;

            }


        }
    }
    if (userlogin===false&&guestlogin===false&&adminloginc===false){
    console.log("                        [1] View an item's description [2]Back to previous screen ");
    console.log("                        *****************************************************\n")
    itemchoiceview1();return 0;
    function itemchoiceview1() {
        var itemchoicedes = input.questionInt("                        Choice: ")
        switch (itemchoicedes) {
            case 1:viewnoodledescription();return 0;break;
            case 2:category_item();return 0;break;
            default:
                console.log("                        Invalid Option");
                wait(3000)
                itemchoiceview1()
        }
    }}
    if (adminloginc===true){
        console.log("                        [1] Remove an item [2]Return back [3] Edit item");
        console.log("                        *****************************************************\n")
        adminchoicenoodle();return 0;
        function adminchoicenoodle(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:

                    var deleteoption=input.questionInt("                        Which item you want to delete? : ");
                    if (deleteoption<0||deleteoption>=food[0].length){
                        console.log("                        Invalid Option")
                        noodlecategory();return 0;
                    }
                    confirmationdelete();return 0;
                function confirmationdelete() {


                    var confirmation = input.question("                        Are you sure you want to delete " + food[0][deleteoption].item_name+"?(Y/N): ");
                    switch (confirmation){
                        case "Y": food[0].splice(deleteoption,1);
                            console.log("                        Delete Successful,returning...")
                            wait(3000)
                            noodlecategory();return 0;
                            break;
                        case "N":
                            admin_control();return 0;
                            break;
                        default:
                            console.log("                        Invalid option")
                            wait(300)
                            noodlecategory();return 0;
                            break;
                    }

                }

                    break;
                case 2:
                    admin_control();return 0;
                    break;
                case 3:
                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                               The NiceMeal Restaurant Admin System        ");
                    console.log("                                           Item edit")
                    console.log("                        You are warn that changes will only be applied to future order")

                    for (var r=0;r<food[0].length;r++){
                        console.log("                        "+r+". "+food[0][r].item_code+". " + food[0][r].item_name+"==>"+"$ "+food[0][r].item_price.toFixed(2))
                    }

                    console.log("\n")
                    console.log("                                        [1] Edit [2] Return")
                    console.log("                        *****************************************************\n")
                    editchoice()
                function editchoice() {
                    var choiceedit = input.questionInt("                        Choice: ")
                    switch (choiceedit){
                        case 1:
                            var choiceediter=input.questionInt("                        Which one do you want to edit: ")
                            if (choiceediter < 0 || choiceediter >= food[0].length) {
                                console.log("                        Invalid Option");
                                wait(3000)
                                adminchoicenoodle();return 0;
                            }
                            edititem();return 0;

                        function edititem(){
                            process.stdout.write('\033c')
                            console.log("                        *****************************************************\n")
                            console.log("                               The NiceMeal Restaurant Admin System        ");
                            console.log("                        Edit for item : "+food[0][choiceediter].item_name+"\n")
                            console.log("                                 [1] Item Name [2] Item Code")
                            console.log("                                 [3] Item Description [4] Item Cost")
                            console.log("                                         [5] Return")
                            console.log("                        *****************************************************\n")
                            editfunction();return 0;
                            function editfunction(){
                                var choice=input.questionInt("                        Choice: ");
                                switch (choice){
                                    case 1:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Name: "+food[0][choiceediter].item_name+"\n")
                                        console.log("                        *****************************************************\n")
                                        var itemname=input.question("                        Enter a new item name: ")
                                        food[0][choiceediter].item_name=itemname;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 2:   process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Code: "+food[0][choiceediter].item_code+"\n")
                                        console.log("                        *****************************************************\n")
                                        var code=input.questionInt("Enter a new code: ")
                                        for (var b=0;b<food.length;b++){
                                            for (var q=0;q<food[b].length;q++ ){
                                                if (code===food[b][q].item_code){
                                                    console.log("                        Conflict item NO. !!! ")
                                                    console.log("                        Undoing change")
                                                    wait(3000)
                                                    edititem()
                                                }
                                            }
                                        }
                                        food[0][choiceediter].item_code=code;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 3:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Description: "+food[0][choiceediter].item_description+"\n")
                                        console.log("                        *****************************************************\n")
                                        var text=input.question("                        Enter a new description: ")
                                        food[0][choiceediter].item_description=text;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 4:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Price: "+food[0][choiceediter].item_price.toFixed(2)+"\n")
                                        console.log("                        *****************************************************\n")
                                        var cost=input.questionInt("                        Enter a new price: ")
                                        food[0][choiceediter].item_price=cost;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 5:admin_control();return 0;break;
                                    default:
                                        console.log("                        Invalid Option")
                                        editfunction()
                                        break
                                }
                            }}
                            break;


                        case 2:admin_control();return 0;
                            break;
                        default:
                            console.log("                        Invalid Options");
                            editchoice()
                    }
                }

                    break;
                default:
                    console.log("                        Invalid Option")
                    admin_control();return 0;
            }
        }
    }
}
//View noodle category items description
function viewnoodledescription(){
    retrynoodle();return 0;
    function retrynoodle() {
        seeitem2 = input.questionInt("                        Which item do you want to see: ");
        if (seeitem2>food[0].length-1 || seeitem2<0){
            console.log("                        Invalid Option");
            wait(1000)
           noodlecategory();return 0;

        }

        process.stdout.write('\033c')
        console.log("                        *****************************************************\n");
        console.log("                              The NiceMeal Restaurant Ordering System          ");
        console.log("                                      Quality you can taste.\n                 ");
        console.log("                        Item description for "+food[0][seeitem2].item_name +":")   ;
        console.log("                        "+food[0][seeitem2].item_description+"\n");
        console.log("                                    [1]Back to previous screen ");
        console.log("                        *****************************************************\n");
        backto();return 0;
        function backto(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:
                    noodlecategory();return 0;
                    break
                default:
                    console.log("                        Invalid Option");
                    backto();return 0;
                    break;
            }
        }

    }

}
/*Drink category items.This function also consist of sub functions to produce different options for
 User,guest and non user/guest/admin and admin
User and guest will be able to view description and add to cart but non user/guest/admin can only view description
Admin will have a extra option to edit and remove item
*/
function drinkcategory(){
    process.stdout.write('\033c')
    console.log("                        *****************************************************\n")
    console.log("                               The NiceMeal Restaurant Ordering System        ");
    console.log("                                       Quality you can taste.                 ");
    console.log("                                            Drink Category\n")
    for (var r=0;r<food[2].length;r++){
        console.log("                        "+r+". "+food[2][r].item_code+". " + food[2][r].item_name+"==>"+"$ "+food[2][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("                        [1] View an item's description [2] Add to cart [3]Return back ");
        console.log("                        *****************************************************\n")
        addcartrc();return 0;
        function addcartrc(){

            var choice=input.questionInt("                        Choice :")
            switch (choice){
                case 1:   viewdrinkdescription();return 0;
                    break;
                case 2:
                    var cartready=input.questionInt("                        Which one to add to cart: ")
                    if (cartready<0||cartready>food[2].length-1){
                        console.log("                        Invalid Option")
                        addcartrc();return 0;
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[2].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();return 0;

                    }
                function quantityoforderuser(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderuser()
                    }
                    customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                    if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (customer[currentlogin].cart[tempclass][0].item_dry===true){
                        console.log("============")
                        console.log("Dry of with soup")
                        console.log("[1] Dry")
                        console.log("[2] Soup")
                        console.log("============")
                        var drylevel=input.questionInt("Choice:")
                        customer[currentlogin].cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (customer[currentlogin].cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    drinkcategory();return 0;


                }

                    if (guestlogin===true){

                        guest_cart.push((food[2].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();return 0;

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("                        ============")
                        var drylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    drinkcategory();return 0;


                }

                    break;
                case 3:
                    category_item();return 0;
                    break
                default:
                    console.log("                        Invalid Option")
                    addcartrc();return 0;

            }


        }
    }
    if (userlogin===false&&guestlogin===false&&adminloginc===false){
    console.log("                        [1] View an item's description [2]Back to previous screen ");
    console.log("                        *****************************************************\n")
    itemchoiceview1();return 0;
    function itemchoiceview1() {
        var itemchoicedes = input.questionInt("                        Choice: ")
        switch (itemchoicedes) {
            case 1:viewdrinkdescription();return 0;break;
            case 2:category_item();return 0;break;
            default:
                console.log("                        Invalid Option");
                itemchoiceview1()
        }
    }}

    if (adminloginc===true){
        console.log("                        [1] Remove an item [2]Return back [3] Edit item");
        console.log("                        *****************************************************\n")
        adminchoicedrink();return 0;
        function adminchoicedrink(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:

                    var deleteoption=input.questionInt("                        Which item you want to delete? : ");
                    if (deleteoption<0||deleteoption>=food[2].length){
                        console.log("                        Invalid Option")
                        drinkcategory();return 0;
                    }
                    confirmationdelete();return 0;
                function confirmationdelete() {


                    var confirmation = input.question("                        Are you sure you want to delete " + food[2][deleteoption].item_name+"?(Y/N): ");
                    switch (confirmation){
                        case "Y": food[2].splice(deleteoption,1);
                            console.log("                        Delete Successful,returning...")
                            wait(3000)
                            drinkcategory();return 0;
                            break;
                        case "N":
                            admin_control();return 0;
                            break;
                        default:
                            console.log("                        Invalid option")
                            wait(300)
                            drinkcategory();return 0;
                            break;
                    }

                }

                    break;
                case 2:
                    admin_control();return 0;
                    break;
                case 3:
                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                               The NiceMeal Restaurant Admin System        ");
                    console.log("                                           Item edit")
                    console.log("                        You are warn that changes will only be applied to future order")

                    for (var r=0;r<food[2].length;r++){
                        console.log("                        "+r+". "+food[2][r].item_code+". " + food[2][r].item_name+"==>"+"$ "+food[2][r].item_price.toFixed(2))
                    }

                    console.log("\n")
                    console.log("                                        [1] Edit [2] Return")
                    console.log("                        *****************************************************\n")
                    editchoice()
                function editchoice() {
                    var choiceedit = input.questionInt("                        Choice: ")
                    switch (choiceedit){
                        case 1:
                            var choiceediter=input.questionInt("                        Which one do you want to edit: ")
                            if (choiceediter < 0 || choiceediter >=food[2].length) {
                                console.log("                        Invalid Option");
                                wait(3000)
                                adminchoicedrink();return 0;
                            }
                            edititem();return 0;
                        function edititem(){
                            process.stdout.write('\033c')
                            console.log("                        *****************************************************\n")
                            console.log("                               The NiceMeal Restaurant Admin System        ");
                            console.log("                        Edit for item : "+food[2][choiceediter].item_name+"\n")
                            console.log("                                 [1] Item Name [2] Item Code")
                            console.log("                                 [3] Item Description [4] Item Cost")
                            console.log("                                         [5] Return")
                            console.log("                        *****************************************************\n")
                            editfunction();return 0;
                            function editfunction(){
                                var choice=input.questionInt("                        Choice: ");
                                switch (choice){
                                    case 1:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Name: "+food[2][choiceediter].item_name+"\n")
                                        console.log("                        *****************************************************\n")
                                        var itemname=input.question("                        Enter a new item name: ")
                                        food[2][choiceediter].item_name=itemname;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 2:   process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Code: "+food[2][choiceediter].item_code+"\n")
                                        console.log("                        *****************************************************\n")
                                        var code=input.questionInt("                        Enter a new code: ")
                                        for (var b=0;b<food.length;b++){
                                            for (var q=0;q<food[b].length;q++ ){
                                                if (code===food[b][q].item_code){
                                                    console.log("                        Conflict item NO. !!! ")
                                                    console.log("                        Undoing change")
                                                    wait(3000)
                                                    edititem()
                                                }
                                            }
                                        }
                                        food[2][choiceediter].item_code=code;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 3:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Description: "+food[2][choiceediter].item_description+"\n")
                                        console.log("                        *****************************************************\n")
                                        var text=input.question("                        Enter a new description: ")
                                        food[2][choiceediter].item_description=text;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 4:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Price: "+food[2][choiceediter].item_price.toFixed(2)+"\n")
                                        console.log("                        *****************************************************\n")
                                        var cost=input.questionInt("                        Enter a new price: ")
                                        food[2][choiceediter].item_price=cost;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 5:admin_control();return 0;break;
                                    default:
                                        console.log("                        Invalid Option")
                                        editfunction()
                                        break
                                }
                            }}
                            break;


                        case 2:admin_control();return 0;
                            break;
                        default:
                            console.log("                        Invalid Options");
                            editchoice()
                    }
                }

                    break;
                default:
                    console.log("                        Invalid Option")
                    admin_control();return 0;
            }
        }
    }



}
//View drink category items description
function viewdrinkdescription(){
    retrydrink();return 0;
    function retrydrink() {
        seeitem4 = input.questionInt("                        Which item do you want to see: ");
        if (seeitem4>food[0].length-1 || seeitem4<0){
            console.log("                        Invalid Option");
            wait(1000)
            drinkcategory();return 0;

        }

        process.stdout.write('\033c')
        console.log("                        *****************************************************\n");
        console.log("                              The NiceMeal Restaurant Ordering System          ");
        console.log("                                      Quality you can taste.\n                 ");
        console.log("                        Item description for "+food[2][seeitem4].item_name +":")   ;
        console.log("                        "+food[2][seeitem4].item_description+"\n");
        console.log("                                    [1]Back to previous screen ");
        console.log("                        *****************************************************\n");
        backto();return 0;
        function backto(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:
                    noodlecategory();return 0;
                    break
                default:
                    console.log("                        Invalid Option");
                    backto();return 0;
                    break;
            }
        }

    }
}

/*Other category items .This function also consist of sub functions to produce different options for
User,guest and non user/guest/admin and admin
User and guest will be able to view description and add to cart but non user/guest/admin can only view description
Admin will have a extra option to edit and remove item

*/
function othercategory(){
    process.stdout.write('\033c')
    console.log("                        *****************************************************\n")
    console.log("                               The NiceMeal Restaurant Ordering System        ");
    console.log("                                       Quality you can taste.                 ");
    console.log("                                            Other Category\n")
    for (var r=0;r<food[3].length;r++){
        console.log("                        "+r+". "+food[3][r].item_code+". " + food[3][r].item_name+"==>"+"$ "+food[3][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("                        [1] View an item's description [2] Add to cart [3]Return back ");
        console.log("                        *****************************************************\n")
        addcartrc();return 0;
        function addcartrc(){

            var choice=input.questionInt("                        Choice :")
            switch (choice){
                case 1:   viewotherdescription();return 0;
                    break;
                case 2:
                    var cartready=input.questionInt("                        Which one to add to cart: ")
                    if (cartready<0||cartready>food[3].length-1){
                        console.log("                        Invalid Option")
                        addcartrc();return 0;
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[3].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();return 0;

                    }
                function quantityoforderuser(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderuser()
                    }
                    customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                    if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (customer[currentlogin].cart[tempclass][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("                        ============")
                        var drylevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (customer[currentlogin].cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    othercategory();return 0;


                }




                    if (guestlogin===true){

                        guest_cart.push((food[3].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();return 0;

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("                        ============")
                        var drylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    othercategory();return 0;


                }
                    break;
                case 3:
                    category_item();return 0;
                    break
                default:
                    console.log("                        Invalid Option")
                    addcartrc();return 0;

            }


        }
    }
    if (userlogin===false&&guestlogin===false&&adminloginc===false){
    console.log("                        [1] View an item's description [2]Back to previous screen ");
    console.log("                        *****************************************************\n")
    itemchoiceview1();return 0;
    function itemchoiceview1() {
        var itemchoicedes = input.questionInt("                        Choice: ")
        switch (itemchoicedes) {
            case 1:viewotherdescription();return 0;break;
            case 2:category_item();return 0;break;
            default:
                console.log("                        Invalid Option");
                itemchoiceview1()
        }
    }}
    if (adminloginc===true){
        console.log("                        [1] Remove an item [2]Return back [3] Edit item");
        console.log("                        *****************************************************\n")
        adminchoiceother();return 0;
        function adminchoiceother(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:

                    var deleteoption=input.questionInt("                        Which item you want to delete? : ");
                    if (deleteoption<0||deleteoption>=food[3].length){
                        console.log("                        Invalid Option")
                        othercategory();return 0;
                    }
                    confirmationdelete();return 0;
                function confirmationdelete() {


                    var confirmation = input.question("                        Are you sure you want to delete " + food[3][deleteoption].item_name+"?(Y/N): ");
                    switch (confirmation){
                        case "Y": food[3].splice(deleteoption,1);
                            console.log("                        Delete Successful,returning...")
                            wait(3000)
                            othercategory();return 0;
                            break;
                        case "N":
                            admin_control();return 0;
                            break;
                        default:
                            console.log("                        Invalid option")
                            wait(300)
                            othercategory();return 0;
                            break;
                    }

                }

                    break;
                case 2:
                    admin_control();return 0;
                    break;
                case 3:
                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                               The NiceMeal Restaurant Admin System        ");
                    console.log("                                           Item edit")
                    console.log("                        You are warn that changes will only be applied to future order")

                    for (var r=0;r<food[3].length;r++){
                        console.log("                        "+r+". "+food[3][r].item_code+". " + food[3][r].item_name+"==>"+"$ "+food[3][r].item_price.toFixed(2))
                    }

                    console.log("\n")
                    console.log("                                        [1] Edit [2] Return")
                    console.log("                        *****************************************************\n")
                    editchoice()
                function editchoice() {
                    var choiceedit = input.questionInt("                        Choice: ")
                    switch (choiceedit){
                        case 1:
                            var choiceediter=input.questionInt("                        Which one do you want to edit: ")
                            if (choiceediter < 0 || choiceediter >= food[3].length) {
                                console.log("                        Invalid Option");
                                wait(3000)
                                adminchoiceother();return 0;
                            }
                            edititem();return 0;
                        function edititem(){
                            process.stdout.write('\033c')
                            console.log("                        *****************************************************\n")
                            console.log("                               The NiceMeal Restaurant Admin System        ");
                            console.log("                        Edit for item : "+food[3][choiceediter].item_name+"\n")
                            console.log("                                 [1] Item Name [2] Item Code")
                            console.log("                                 [3] Item Description [4] Item Cost")
                            console.log("                                         [5] Return")
                            console.log("                        *****************************************************\n")
                            editfunction();return 0;
                            function editfunction(){
                                var choice=input.questionInt("                        Choice: ");
                                switch (choice){
                                    case 1:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Name: "+food[3][choiceediter].item_name+"\n")
                                        console.log("                        *****************************************************\n")
                                        var itemname=input.question("                        Enter a new item name: ")
                                        food[3][choiceediter].item_name=itemname;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 2:   process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Code: "+food[3][choiceediter].item_code+"\n")
                                        console.log("                        *****************************************************\n")
                                        var code=input.questionInt("                        Enter a new code: ")
                                        for (var b=0;b<food.length;b++){
                                            for (var q=0;q<food[b].length;q++ ){
                                                if (code===food[b][q].item_code){
                                                    console.log("                        Conflict item NO. !!! ")
                                                    console.log("                        Undoing change")
                                                    wait(3000)
                                                    edititem()
                                                }
                                            }
                                        }
                                        food[3][choiceediter].item_code=code;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 3:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Description: "+food[3][choiceediter].item_description+"\n")
                                        console.log("                        *****************************************************\n")
                                        var text=input.question("                        Enter a new description: ")
                                        food[3][choiceediter].item_description=text;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 4:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Price: "+food[3][choiceediter].item_price.toFixed(2)+"\n")
                                        console.log("                        *****************************************************\n")
                                        var cost=input.questionInt("                        Enter a new price: ")
                                        food[3][choiceediter].item_price=cost;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 5:admin_control();return 0;break;
                                    default:
                                        console.log("                        Invalid Option")
                                        editfunction()
                                        break
                                }
                            }}
                            break;


                        case 2:admin_control();return 0;
                            break;
                        default:
                            console.log("                        Invalid Options");
                            editchoice()
                    }
                }

                    break;
                default:
                    console.log("                        Invalid Option")
                    admin_control();return 0;
            }
        }
    }
}
//View other category items description
function viewotherdescription(){
    retryother();return 0;
    function retryother() {
        seeitem3 = input.questionInt("                        Which item do you want to see: ");
        if (seeitem3>food[3].length-1 || seeitem3<0){
            console.log("                        Invalid Option");
            wait(1000)
            othercategory();return 0;

        }

        process.stdout.write('\033c')
        console.log("                        *****************************************************\n");
        console.log("                              The NiceMeal Restaurant Ordering System          ");
        console.log("                                      Quality you can taste.\n                 ");
        console.log("                        Item description for "+food[3][seeitem3].item_name +":")   ;
        console.log("                        "+food[3][seeitem3].item_description+"\n");
        console.log("                                    [1]Back to previous screen ");
        console.log("                        *****************************************************\n");
        backto();return 0;
        function backto(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:
                    othercategory();return 0;
                    break
                default:
                    console.log("                        Invalid Option");
                    backto();return 0;
                    break;
            }
        }

    }
}
//View promotion category items description
function viewpromotiondescription(){
    retryother();return 0;
    function retryother() {
        seeitem5 = input.questionInt("                        Which item do you want to see: ");
        if (seeitem5>food[4].length-1 || seeitem5<0){
            console.log("                        Invalid Option");
            wait(1000)
            promotioncategory();return 0;

        }

        process.stdout.write('\033c')
        console.log("                        *****************************************************\n");
        console.log("                              The NiceMeal Restaurant Ordering System          ");
        console.log("                                      Quality you can taste.\n                 ");
        console.log("                        Item description for "+food[4][seeitem5].item_name +":")   ;
        console.log("                        "+food[4][seeitem5].item_description+"\n");
        console.log("                                    [1]Back to previous screen ");
        console.log("                        *****************************************************\n");
        backto();return 0;
        function backto(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:
                    promotioncategory();return 0;
                    break
                default:
                    console.log("                        Invalid Option");
                    backto();return 0;
                    break;
            }
        }

    }
}
/*Promotion category items.This function also consist of sub functions to produce different options for
 User,guest and non user/guest/admin and admin
User and guest will be able to view description and add to cart but non user/guest/admin can only view description
Admin will have a extra option to edit and remove item
*/
function promotioncategory(){
    process.stdout.write('\033c')
    console.log("                        *****************************************************\n")
    console.log("                               The NiceMeal Restaurant Ordering System        ");
    console.log("                                       Quality you can taste.                 ");
    console.log("                                            Promotion Category\n")
    for (var r=0;r<food[4].length;r++){
        console.log("                        "+r+". "+food[4][r].item_code+". " + food[4][r].item_name+"==>"+"$ "+food[4][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("                        [1] View an item's description [2] Add to cart [3]Return back ");
        console.log("                        *****************************************************\n")
        addcartrc();return 0;
        function addcartrc(){

            var choice=input.questionInt("                        Choice :")
            switch (choice){
                case 1:   viewpromotiondescription();return 0;
                    break;
                case 2:
                    var cartready=input.questionInt("                        Which one to add to cart: ")
                    if (cartready<0||cartready>food[4].length-1){
                        console.log("                        Invalid Option")
                        addcartrc();return 0;
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[4].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();return 0;

                    }
                function quantityoforderuser(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderuser()
                    }
                    customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                    if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (customer[currentlogin].cart[tempclass][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("                        ============")
                        var drylevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (customer[currentlogin].cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    promotioncategory();return 0;


                }



                    if (guestlogin===true){

                        guest_cart.push((food[4].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();return 0;

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("                        ============")
                        var drylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    promotioncategory();return 0;


                }
                    
                    
                    break;
                case 3:
                    category_item();return 0;
                    break
                default:
                    console.log("                        Invalid Option")
                    addcartrc();return 0;

            }


        }
    }
    if (userlogin===false&&guestlogin===false&&adminloginc===false){
        console.log("                        [1] View an item's description [2]Back to previous screen ");
        console.log("                        *****************************************************\n")
        itemchoiceview1();return 0;
        function itemchoiceview1() {
            var itemchoicedes = input.questionInt("                        Choice: ")
            switch (itemchoicedes) {
                case 1:viewpromotiondescription();return 0;break;
                case 2:category_item();return 0;break;
                default:
                    console.log("                        Invalid Option");
                    itemchoiceview1()
            }
        }}
    if (adminloginc===true){
        console.log("                        [1] Remove an item [2]Return back [3] Edit item");
        console.log("                        *****************************************************\n")
        adminchoicepromotion();return 0;
        function adminchoicepromotion(){
            var choice=input.questionInt("                        Choice: ")
            switch (choice){
                case 1:

                    var deleteoption=input.questionInt("                        Which item you want to delete? : ");
                    if (deleteoption<0||deleteoption>=food[4].length){
                        console.log("                        Invalid Option")
                        promotioncategory();return 0;
                    }
                    confirmationdelete();return 0;
                function confirmationdelete() {


                    var confirmation = input.question("                        Are you sure you want to delete " + food[4][deleteoption].item_name+"????Y/N): ");
                    switch (confirmation){
                        case "Y": food[4].splice(deleteoption,1);
                            console.log("                        Delete Successful,returning...")
                            wait(3000)
                            promotioncategory();return 0;
                            break;
                        case "N":
                            admin_control();return 0;
                            break;
                        default:
                            console.log("Invalid option")
                            wait(300)
                            promotioncategory();return 0;
                            break;
                    }

                }

                    break;
                case 2:
                    admin_control();return 0;
                    break;
                case 3:
                    process.stdout.write('\033c')
                    console.log("                        *****************************************************\n")
                    console.log("                               The NiceMeal Restaurant Admin System        ");
                    console.log("                                           Item edit")
                    console.log("                        You are warn that changes will only be applied to future order")

                    for (var r=0;r<food[4].length;r++){
                        console.log("                        "+r+". "+food[4][r].item_code+". " + food[4][r].item_name+"==>"+"$ "+food[4][r].item_price.toFixed(2))
                    }

                    console.log("\n")
                    console.log("                                        [1] Edit [2] Return")
                    console.log("                        *****************************************************\n")
                    editchoice()
                function editchoice() {
                    var choiceedit = input.questionInt("                        Choice: ")
                    switch (choiceedit){
                        case 1:
                            var choiceediter=input.questionInt("                        Which one do you want to edit: ")
                            if (choiceediter < 0 || choiceediter >= food[4].length) {
                                console.log("                        Invalid Option");
                                wait(3000)
                                adminchoicepromotion();return 0;
                            }
                            edititem();return 0;
                        function edititem(){
                            process.stdout.write('\033c')
                            console.log("                        *****************************************************\n")
                            console.log("                               The NiceMeal Restaurant Admin System        ");
                            console.log("                        Edit for item : "+food[4][choiceediter].item_name+"\n")
                            console.log("                                 [1] Item Name [2] Item Code")
                            console.log("                                 [3] Item Description [4] Item Cost")
                            console.log("                                         [5] Return")
                            console.log("                        *****************************************************\n")
                            editfunction();return 0;
                            function editfunction(){
                                var choice=input.questionInt("                        Choice: ");
                                switch (choice){
                                    case 1:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Name: "+food[4][choiceediter].item_name+"\n")
                                        console.log("                        *****************************************************\n")
                                        var itemname=input.question("                        Enter a new item name: ")
                                        food[4][choiceediter].item_name=itemname;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 2:   process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Code: "+food[4][choiceediter].item_code+"\n")
                                        console.log("                        *****************************************************\n")
                                        var code=input.questionInt("                        Enter a new code: ")
                                        for (var b=0;b<food.length;b++){
                                            for (var q=0;q<food[b].length;q++ ){
                                                if (code===food[b][q].item_code){
                                                    console.log("                        Conflict item NO. !!! ")
                                                    console.log("                        Undoing change")
                                                    wait(3000)
                                                    edititem()
                                                }
                                            }
                                        }
                                        food[4][choiceediter].item_code=code;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 3:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Description: "+food[4][choiceediter].item_description+"\n")
                                        console.log("                        *****************************************************\n")
                                        var text=input.question("                        Enter a new description: ")
                                        food[4][choiceediter].item_description=text;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 4:
                                        process.stdout.write('\033c')
                                        console.log("                        *****************************************************\n")
                                        console.log("                        Current Price: "+food[4][choiceediter].item_price.toFixed(2)+"\n")
                                        console.log("                        *****************************************************\n")
                                        var cost=input.questionInt("                        Enter a new price: ")
                                        food[4][choiceediter].item_price=cost;
                                        process.stdout.write('\033c')
                                        console.log("  ____                             \n" +
                                            " / ___| _   _  ___ ___ ___ ___ ___ \n" +
                                            " \\___ \\| | | |/ __/ __/ _ / __/ __|\n" +
                                            "  ___) | |_| | (_| (_|  __\\__ \\__ \\\n" +
                                            " |____/ \\__,_|\\___\\___\\___|___|___/\n" +
                                            "                                   ")
                                        console.log("*****************************************************\n")
                                        console.log("       The NiceMeal Restaurant Admin System        ");
                                        console.log("          Change is successful.Returning...")
                                        console.log("*****************************************************\n")
                                        wait(3000);
                                        edititem();return 0;
                                        break;
                                    case 5:admin_control();return 0;break;
                                    default:
                                        console.log("                        Invalid Option")
                                        editfunction()
                                        break
                                }
                            }}
                            break;


                        case 2:admin_control();return 0;
                            break;
                        default:
                            console.log("                        Invalid Options");
                            editchoice()
                    }
                }

                    break;
                default:
                    console.log("                        Invalid Option")
                    admin_control();return 0;
            }
        }
    }
}
//Track an order when user not logon
function trackorderguest(){
     temporder=false;
    finalcall=false
    finalorder=false
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("               The NiceMeal Restaurant Tracking System        ");
    console.log("                       Quality you can taste.                 ");
    console.log("               "+times())
    console.log("                   [1] Return back to main menu")
    console.log("        *****************************************************\n");
     trackfun=input.questionInt("        Enter your phone number (only for active order) or tracking number: ");
    if (trackfun===1){
        if (userlogin===true||guestlogin===true){
order_screen();return 0;
        }
        main_screen();return 0;

    }

    checkstatus();return 0;
    function checkstatus(){
        for (var t=0;t<customer.length;t++){
            if (trackfun===customer[t].phone){
            if (customer[t].order_active!==0){
                temporder=customer[t].order_active;
            }
            else {temporder=false;}
            }
        }

        for (var call=0;call<order.length;call++) {
            for (var o = 0; o < order[call].length; o++) {
                if (trackfun === order[call][o].number || temporder === order[call][o].number) {
                finalcall=call;
                finalorder=o;
                }
            }

        }
        if (finalcall===false&&finalorder===false&&temporder===false) {
            process.stdout.write('\033c')
            console.log("        *****************************************************\n")
            console.log("               The NiceMeal Restaurant Tracking System        ");
            console.log("                       Quality you can taste.                 ");
            console.log("               "+times())
            console.log("                         Order not found!\n")
            console.log("                  [1] Retry [2] Back to main menu")
            console.log("        *****************************************************\n");

            notfound404();return 0;

            function notfound404() {
                var choice = input.questionInt("        Choice: ");
                switch (choice) {
                    case 1:
                        trackorderguest();return 0;
                        break
                    case 2:
                        if (guestlogin===true||userlogin===true){
                            order_screen();return 0;
                            break;
                        }else {
                        main_screen();return 0;
                        break;}
                    default:
                        console.log("        Invalid Option");
                        wait(3000)
                        notfound404();return 0;

                }
            }
        }
        else
            {

                process.stdout.write('\033c')
                console.log("        *****************************************************\n")
                console.log("               The NiceMeal Restaurant Tracking System        ");
                console.log("                       Quality you can taste.                 ");
                console.log("               "+times())
                console.log("            Order Number:"+order[finalcall][finalorder].number)
                console.log("            Order Number:"+order[finalcall][finalorder].status+"\n")
                console.log("            Order Item:")
                for ( var y=0;y<order[finalcall][finalorder].item.length;y++){
                console.log("             "+order[finalcall][finalorder].item[y][0].item_name)
                }
                console.log("                      [1] Back to main menu")
                console.log("        *****************************************************\n")
                choiceback();return 0;
                function choiceback() {
                    var choices = input.questionInt("        Choice: ")
                    switch (choices){
                        case 1:
                            if (userlogin===true||guestlogin===true){
                                order_screen();return 0;
                            }
                            main_screen();return 0;
                            break;
                        default:
                            console.log("        Invalid Option")
                            choiceback()
                    }
                }
            }




    }

}
/*Function to perform fuzzy search.This function also consist of sub functions to produce different options for
User,guest and non user/guest
User and guest will be having the option to add to cart while non user/guest only can view description of items

 */
function search_item(){
counterfind=0;
    foundsearch=false;
    process.stdout.write('\033c')
    console.log("                        *****************************************************\n")
    console.log("                               The NiceMeal Restaurant Ordering System        ");
    console.log("                                       Quality you can taste.                 ");
    console.log("                                             Fuzzy Search\n")
    console.log("                        *****************************************************\n");
    search=input.question("                        Search: ");
    process.stdout.write('\033c')
    console.log("                        *****************************************************\n")
    console.log("                               The NiceMeal Restaurant Ordering System        ");
    console.log("                                       Quality you can taste.                 \n");
    for (var s=0;s<food.length;s++){
        for (var v=0;v<food[s].length;v++){
            if (food[s][v].item_name.indexOf(search)>0){
                foundsearch=true;
                counterfind++
                process.stdout.write("                        ")
                console.log("                        "+counterfind-1+". " +food[s][v].item_code+". "+food[s][v].item_name+"==>"+"$"+food[s][v].item_price.toFixed(2))
            }
        }
    }


    if (guestlogin===true||userlogin===true){
        console.log("                          [1]Add to cart [2] Another search [3] Return back \n")
        console.log("                        *****************************************************\n")
        addcartop();return 0;
        function addcartop(){

            var choice=input.questionInt("                        Choice :")
            switch (choice){
                case 1:

                    var addtocrt=input.questionInt("                        Which one to add to cart: ")
                    if (addtocrt>=counterfind ||addtocrt<0){
                        console.log("                        Invalid Option")
                        addcartop();return 0;
                    }
                    counterfind=0;
                    for (var s=0;s<food.length;s++){
                        for (var v=0;v<food[s].length;v++){
                            if (food[s][v].item_name.indexOf(search)>0){
                               if (counterfind===addtocrt){
                                   temps=s;
                                   tempv=v;


                               }
                                counterfind++
                            }
                        }
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[temps].slice(tempv,tempv+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();return 0;

                    }
                    if (guestlogin===true){
                        guest_cart.push((food[temps].slice(tempv,tempv+1)))
                        tempclassguest=guest_cart.length-1;
                        quantityoforderguest();return 0;
                    }


                    function quantityoforderuser() {
                        var quantity = input.questionInt("                        How many do you want: ");
                        if (quantity<0){
                            quantityoforderuser()
                        }
                        customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                        if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                            console.log("                        ============")
                            console.log("                        Level of spicy")
                            console.log("                        [1] No spicy")
                            console.log("                        [2] Abit Spicy")
                            console.log("                        [3] Very Spicy")
                            console.log("                        ============")
                            var spicylevel=input.questionInt("                        Choice:")
                            customer[currentlogin].cart[tempclass][0].item_spicy_level=spicylevel

                        }



                        if (customer[currentlogin].cart[tempclass][0].item_dry===true){
                            console.log("                        ============")
                            console.log("                        Dry of with soup")
                            console.log("                        [1] Dry")
                            console.log("                        [2] Soup")
                            console.log("                        ============")
                            var drylevel=input.questionInt("                        Choice:")
                            customer[currentlogin].cart[tempclass][0].item_dry_level=drylevel

                        }



                        if (customer[currentlogin].cart[tempclass][0].item_ice===true){
                            console.log("                        ============")
                            console.log("                        Level of ice")
                            console.log("                        [1] No ice")
                            console.log("                        [2] Abit ice")
                            console.log("                        [3] Alot of ice")
                            console.log("                        ============")
                            var icelevel=input.questionInt("                        Choice:")
                            customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                        }

                        console.log("                        Added to cart!!");
                        wait(3000)
                        counterfind=0;
                        order_menu()


                    }

                function quantityoforderguest() {
                    var quantity = input.questionInt("                        How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclassguest][0].item_spicy===true){
                        console.log("                        ============")
                        console.log("                        Level of spicy")
                        console.log("                        [1] No spicy")
                        console.log("                        [2] Abit Spicy")
                        console.log("                        [3] Very Spicy")
                        console.log("                        ============")
                        var spicylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclassguest][0].item_spicy_level=spicylevel

                    }



                    if (guest_cart[tempclassguest][0].item_dry===true){
                        console.log("                        ============")
                        console.log("                        Dry of with soup")
                        console.log("                        [1] Dry")
                        console.log("                        [2] Soup")
                        console.log("                        ============")
                        var drylevel=input.questionInt("                        Choice:")
                        guest_cart[tempclassguest][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclassguest][0].item_ice===true){
                        console.log("                        ============")
                        console.log("                        Level of ice")
                        console.log("                        [1] No ice")
                        console.log("                        [2] Abit ice")
                        console.log("                        [3] Alot of ice")
                        console.log("                        ============")
                        var icelevel=input.questionInt("                        Choice:")
                        guest_cart[tempclassguest][0].item_ice_level=icelevel

                    }

                    console.log("                        Added to cart!!");
                    wait(3000)
                    counterfind=0;
                    order_menu()


                }






                    break;
                case 2:  search_item();return 0;
                break;
                case 3:order_menu();return 0;break;
                default:
                    console.log("                        Invalid Option")
                    addcartop();return 0;
            }

        }
    }



    console.log("\n")
    if (foundsearch===false){
        console.log("                        Not Found\n");

    }

    if (guestlogin===false&&userlogin===false){
    console.log("                            [1] Another search [2] Return back to main\n")
    console.log("                        *****************************************************\n")
    retrysearch();return 0;}

    function retrysearch(){
    var choice=input.questionInt("                        Choice: ");
    switch(choice){
        case 1:
            search_item();return 0;
            break;
        case 2:
            main_screen();return 0;break
        default:
            retrysearch();return 0;
            break;
    }

    }
}
//Menu to enquire user how they want to look for a item ,by search ,by category or view all at once
function food_menu(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("               The NiceMeal Restaurant Ordering System        ");
    console.log("                       Quality you can taste.                 ");
    console.log("                             Food Menu")
    console.log("                        [1] View all items")
    console.log("                        [2] View all category")
    console.log("                        [3] Search for an item")
    console.log("                        [4] Return to previous screen")
    console.log("        *****************************************************\n");
    foodmenuoption()
    function foodmenuoption() {
        var foodmenuchoice = input.questionInt("        Choice: ");
        switch (foodmenuchoice){
            case 1:view_all();return 0;break
            case 2:category_item();return 0;break;
            case 3:search_item();return 0;break;
            case 4:main_screen();return 0;break;

            default:
                console.log("        Invalid Option");
                foodmenuoption();return 0;
                break;

        }
    }
}
//Function to show helpdesk contact
function help(){
    process.stdout.write('\033c')
    console.log("        *****************************************************\n")
    console.log("               The NiceMeal Restaurant Help System        ");
    console.log("                     Always here to help you       \n          ");
    console.log("         Email zhuofan.21@ichat.sp.edu.sg for more assistant\n")
    console.log("                  [1]Return back to main menu")
    console.log("        *****************************************************\n")
    callback();return 0;
    function callback(){
    var choice=input.questionInt("        Choice:")
    switch (choice){
        case 1: main_screen();return 0;break
        default:console.log("        Invalid Option");callback();return 0;break;
    }}
}
//Function to show main menu after loading screen
function main_screen(){

    guestlogin=false;
    customerloginstatus=false;
    userlogin=false;
    currentlogin=false;
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("               "+times())
    console.log("[1] Customer Login                    [2] Guest Login");
    console.log("[3] Customer Registration      [4] Current Promotions");
    console.log("[5] Our Menu                       [6] Track An Order");
    console.log("[7] Admin Login                               [8]Help");
    console.log("[9] Exit                           [10] About Program\n");
    console.log("*****************************************************\n")
    user_selection();return 0;
    function user_selection(){
    var choice0=input.questionInt("Your Choice: ");
    switch (choice0){
        case 1:
            customer_login();return 0;
            break;
        case 2:
            guest_login();return 0;
            break;
        case 3:
            customer_register();return 0;
            break;
        case 4:
            new_promotion();return 0;
            break;
        case 5:
            food_menu();return 0;
            break;
        case 6:
            trackorderguest();return 0;
            break;
        case 7:
            admin_login();return 0;
            break;
        case 8:
            help();return 0;
            break;
        default:
            console.log("Invalid Option")
          main_screen();return 0;
            break;
        case 10:
            about_program();return 0;
            break;
        case 9:newd();return 0;
        async function newd(){
            process.stdout.write('\033c')
            console.log(
                " _____ _            _   _ _          __  __            _ \n" +
                " |_   _| |__   ___  | \\ | (_) ___ ___|  \\/  | ___  __ _| |\n" +
                "   | | | '_ \\ / _ \\ |  \\| | |/ __/ _ | |\\/| |/ _ \\/ _` | |\n" +
                "   | | | | | |  __/ | |\\  | | (_|  __| |  | |  __| (_| | |\n" +
                "   |_| |_| |_|\\___| |_| \\_|_|\\___\\___|_|  |_|\\___|\\__,_|_|\n" +
                "  ____          _                              _          \n" +
                " |  _ \\ ___ ___| |_ __ _ _   _ _ __ __ _ _ __ | |_        \n" +
                " | |_) / _ / __| __/ _` | | | | '__/ _` | '_ \\| __|       \n" +
                " |  _ |  __\\__ | || (_| | |_| | | | (_| | | | | |_        \n" +
                " |_| \\_\\___|___/\\__\\__,_|\\__,_|_|  \\__,_|_| |_|\\__|   ")
            console.log("*****************************************************")
            console.log("System exiting ...")
            console.log("*****************************************************")
            wait(3000);

            await fs.writeFile('../.database/customerdetail.dat',JSON.stringify(customer))
            await fs.writeFile('../.database/i.txt',i.toString())
            await fs.writeFile('../.database/order.dat',JSON.stringify(order))
            await fs.writeFile('../.database/admin.dat',JSON.stringify(admin))
            await fs.writeFile('../.database/food.dat',JSON.stringify(food))
            await fs.writeFile('../.database/coupon.dat',JSON.stringify(couponstore))
        }
    }

    }

}


//Start of program
//Load existing database before program start
//Launch start up loading page and main menu screen
read();
return 0;
async function read(){

   var customerstorage=await fs.readFile('../.database/customerdetail.dat')
    customer=JSON.parse(customerstorage)
    i=await fs.readFile('../.database/i.txt')
    i=parseInt(i)
    var orderstorage= await fs.readFile('../.database/order.dat')
    order=JSON.parse(orderstorage)
    var adminstorage= await fs.readFile('../.database/admin.dat')
    admin=JSON.parse(adminstorage)
    var foodstorage= await fs.readFile('../.database/food.dat')
    food=JSON.parse(foodstorage)
    var couponstorage= await fs.readFile('../.database/coupon.dat')
    couponstore=JSON.parse(couponstorage)
    start_up()
    main_screen();
   return 0;
}


