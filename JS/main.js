/*
This program is written by CHEN ZHUOFAN | P2100746 | Singapore Polytechnic
Used for ST0502 Fundamental of Programming CA2 Assignment
All commits can be found at https://github.com/zhuofan-16/ST0502_Javascript-CA2
Shall you have any question about this program ,please email me at zhuofan@jiahan16.onmicrosoft.com(Preferred) or zhuofan.21@ichat.sp.edu.sg
 */
var input =require('readline-sync');
const {questionInt} = require("readline-sync");
var currentlogin=0;
const passwordrequire=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
var search="NA"
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

var time=new Date();
function times(){

    console.log("               "+time.toLocaleString("en-sg")+"\n");
}
class Customer{
    constructor(first_name,last_name,sex,contact,password,member_no,email) {
        this.firstname=first_name;
        this.lastname=last_name;
        this.sex=sex;
        this.contact=contact;
        this.email=email;
        this.memberno=member_no;
        this.password=password;
        this.order_record=new Array();
        this.order_active=0;
        this.wrongpassword_attempt=0;
        this.coupon=new Array();
        this.cart=new Array();


    }
}
class Admin{
    constructor(first_name,last_name,sex,contact,staff_no,password) {
        this.firstname=first_name;
        this.lastname=last_name;
        this.sex=sex;
        this.contact=contact;
        this.staffid=staff_no;
        this.password=password;

    }
}
class item{
    constructor(item_name,item_catogory,item_code,item_price,item_description,item_type,item_expire,item_dry,item_spicy,item_ice) {
        this.item_name=item_name;
        this.item_caterogory=item_catogory
        this.item_code=item_code;
        this.item_description=item_description;
        this.item_type=item_type;
        this.item_spicy=item_spicy;
        this.item_dry=item_dry;
        this.item_ice=item_ice;
        this.item_dry_level=0;
        this.item_spicy_level=0;
        this.item_ice_level=0;
        this.item_price=item_price;
        this.item_expire=item_expire;
        this.item_quantity=0;
    }
}
var tempclass=0;
class order_status{
    constructor(order_number,status,cost) {
        this.number=order_number;
        this.status=status;
        this.item=new Array();
        this.cost=cost
    }
}
var food=new Array();
food[0]=new Array();
food[1]=new Array();
food[2]=new Array();
food[3]=new Array();
food[4]=new Array();
var order=new Array();
order[0]=new Array()
order[1]=new Array()
order[0][0]=new order_status(100001,"Delivered");
order[1][0]=new order_status(100002,"Processing")


food[0][0]=new item(" Fried Egg & Chicken Meat Noodle","N","n001",5.8,"Noodle with amazing XXX","F",0,true,true,false)
food[0][1]=new item(" Tomato Lamian","N","n002",6.8,"Noodle with amazing XXX","F",0,true,true,false)
food[0][2]=new item(" Curry Noodle","N","n003",8.4,"Noodle with amazing XXX","F",0,false,false,false)
food[1][0]=new item(" Fried Rice with Prawn","R","r001",6.8,"Rice with amazing XXX","F",0,false,true,false)
food[1][1]=new item(" Fried Mix Grain Rice in Hot Stone Pot","R","r002",8.4,"Rice with amazing XXX","F",0,false,true,false)
food[1][2]=new item(" Fried Rice with White Bait, Fish Meat and Egg White","R","r003",8.4,"Rice with amazing XXX","F",0,false,true,false)
food[2][0]=new item(" Pepsi","D","d001",1.4,"NA","F",0,false,false,true)
food[2][1]=new item(" 7—UP","D","d002",1.4,"NA","F",0,false,false,true)
food[4][0]=new item(" National Day Promotion: Fried Rice with Prawn 2x ,Curry Noodle 2x ,Pepsi 4x","S","sb001",20.00,"NA","L",20210810,true,true,true)

class coupon{
    constructor(coupon_name,coupon_code,coupon_type,coupon_price) {
        this.coupon_name=coupon_name;
        this.coupon_code=coupon_code;
        this.coupon_type=coupon_type
        this.coupon_price=coupon_price;
    }
}
var customer=new Array();
var admin=new Array();
admin[0]=new Admin("admin","admin","","",10001,"admin")
var i=0;
function start_up(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n");
    console.log("      The NiceMeal Restaurant Ordering System          ");
    console.log("              Quality you can taste.\n                 ");
    times();
    console.log("           System loading,please wait...\n             ");
    console.log("*****************************************************\n");
    wait(2000);

}
function about_program_page2(){
    process.stdout.write('\033c')
    console.log("*****************************************************")
    console.log("Project Name:The NiceMeal Restaurant Ordering System\n");
    console.log("Description:A command prompt texted-based application")
    console.log("application to digitalize their food menu to allow ")
    console.log("their customers to make order. The restaurant ")
    console.log("organises their items in categories and each item may")
    console.log("or may not have a list of options to customise order\n")
    console.log("      Default admin ID:10001 Password:admin\n")
    console.log("       [1] Back to main menu     [2] Exit         \n ")
    console.log("*****************************************************")
    function about_useroption2(){
        var choice=input.questionInt("Your Choice: ");
        switch (choice){
            case 1:
                main_screen();
                break;
            case 2:
                process.exit(0);
                break;
            default:
                about_useroption2();
                break;

        }
    }
    about_useroption2()
}
function new_promotion(){
        process.stdout.write('\033c')
        console.log("*****************************************************\n");
        console.log("      The NiceMeal Restaurant Ordering System          ");
        console.log("              Quality you can taste.\n                 ");
        console.log("                 Promotion Items:")
   for (var m=0;m<food[4].length;m++){
       console.log(m+". "+food[4][m].item_code+ ". "+food[4][m].item_name+"==>"+"$ "+ food[4][m].item_price.toFixed(2))
   }
   console.log('\n');
       console.log("[1] View an item's description [2]Back to previous screen")
       console.log("*****************************************************\n");
       function itemoverviewchoice(){
        var itemoverview=input.questionInt("Choice: ")
    switch(itemoverview){
        case 1:
            var customeroverview=input.questionInt("Which item do you want to see?: ");
            process.stdout.write('\033c')
            console.log("*****************************************************\n");
            console.log("      The NiceMeal Restaurant Ordering System          ");
            console.log("              Quality you can taste.\n                 ");
            console.log("Item description for "+food[4][customeroverview].item_name +":")   ;
            console.log(food[4][customeroverview].item_description+"\n");
            console.log("            [1]Back to previous screen ");
            console.log("*****************************************************\n");
            backto();
            function backto(){
            var backtooption=input.questionInt("Choice: ");
            switch (backtooption){
                case 1:
                    new_promotion();
                break;
                default:
                    console.log("Invalid option");
                    backto();
                    break;
            }}
            break;
        case 2:
            main_screen();
            break
        default:
            console.log("Invalid option");
             itemoverviewchoice();
             break;

    }  }
    itemoverviewchoice();

}
function about_program(){

    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("Project Name:The NiceMeal Restaurant Ordering System");
    console.log(" Module Name: ST0502 : Fundamentals Of Programming ")
    console.log("          Module Lecturer: Ms Junie Tan ")
    console.log("Student Name: CHEN ZHUOFAN |  Singapore Polytechnic")
    console.log("             Student ID: P2100746")
    console.log("          Program Language: Javascript\n")
    console.log(" [1] Next page    [2] Back to main menu     [3] Exit\n")
    console.log("*****************************************************")
    function about_useroption(){
        var choice=input.questionInt("Your Choice: ");
        switch (choice){
            case 1:
                about_program_page2();
                break;
            case 2:
                main_screen();
                break;
            case 3:
                process.exit(0);
                break;
            default:
                about_useroption();
                break;

        }
    }
    about_useroption()
}
var guest_cart=new Array();
function guest_login(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("*****************************************************\n")
    guest_firstname=input.question("Your First Name: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("*****************************************************\n")
     guest_lastname=input.question("Your Last Name: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("*****************************************************\n")
    function registerguestsex(){
        guest_sex=input.question("Your Sex: (M/F) :");
        if (guest_sex!=="M"&&guest_sex!=="F")
        {
            console.log("Invalid gender,please retry");
            registerguestsex()
        }

    }

    registerguestsex();
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("*****************************************************\n")
     guest_phone=input.question("Your Contact Number: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("*****************************************************\n")
    guest_email=input.question("Your Email: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("    Estimated Time Of Waiting: "+(Math.round(Math.random()*11+10)) + " Minutes");
    console.log("*****************************************************\n")
    function guest_confirmation_prompt() {
        var guest_confirmation = input.question("Continue to order? (Y/N): ");
        if (guest_confirmation === "Y") {
            guestlogin=true;
            order_screen();

        } else if (guest_confirmation === "N") {
            main_screen();
        } else {
            console.log("Invalid Option");
            guest_confirmation_prompt();
        }
    }
    guest_confirmation_prompt();

}
var temp_admin_login;
var temp_admin_password;
var adminlogin;
var adminloginstatus;
var adminloginc;
function admin_login() {
    process.stdout.write('\033c')
    console.log("*****************************************************\n");
    console.log("    The NiceMeal Restaurant Admin Management System    ");
    times();
    console.log("*****************************************************\n");
    temp_admin_login = input.questionInt("Admin ID: ");
    for (var l = 0; l < admin.length; l++){
        if(admin[l].staffid === temp_admin_login){

            adminlogin = l;
            adminloginstatus=true;

        }

    }
    process.stdout.write('\033c')
    console.log("*****************************************************\n");
    console.log("    The NiceMeal Restaurant Admin Management System    ");
    times();
    console.log("*****************************************************\n");
    temp_admin_password= input.question("Password: ");
    if (adminloginstatus!==true){
        console.log("Wrong admin ID or password,going back to main menu");
        wait(3000)
        main_screen();
    }
    if (temp_admin_password===admin[adminlogin].password){
        adminloginc=true;
        admin_control();
    }else {
        console.log("Wrong admin ID or password,going back to main menu");
        wait(3000)
        main_screen();
    }





}
function admin_control(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Admin System        ");
    console.log("            "+time_identify()+"Admin"+admin[adminlogin].lastname+"\n");
    console.log("      [1] User control (View,Edit,Add,Remove)   ")
    console.log("      [2] User password reset   ")
    console.log("      [3] Menu Control (View,Edit,Add,Remove)  ")
    console.log("      [4] Coupon Control (View,Edit,Distribute)  ")
    console.log("      [5] Add new admin   [6] Update particulars ")
    console.log("      [6] Today's Sale    [7] Logout ")
    console.log("                    [8]Exit")
    console.log("*****************************************************\n")
    admincontrolchoice();
    function admincontrolchoice(){

            var choice = input.questionInt("Choice: ");
            switch (choice){
                case 1:user_control();break;
                case 2:user_password_reset();break;
                case 3:menu_control();break;
                case 4:coupon_control();break;
                case 5:addnewadmin();break;
                case 6:changeparticular_admin();break;
                case 7:
                    adminloginc=false;
                    adminloginstatus=false;
                    adminlogin=0;
                    break;
                case 8:
                    process.exit(0);
                    break;
                default:
                    console.log("Invalid Option ");
                    admincontrolchoice();
            }
    }
}

function customer_register(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System        ");
    console.log("    Become a member of The NiceMeal Restaurant today     \n");
    console.log("*****************************************************\n")
    var temp_firstname=input.question("Your First Name: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System        ");
    console.log("    Become a member of The NiceMeal Restaurant today     \n");
    console.log("*****************************************************\n")
    var temp_lastname=input.question("Your Last Name: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System        ");
    console.log("    Become a member of The NiceMeal Restaurant today     \n");
    console.log("*****************************************************\n");
    function registersex(){
    temp_sex=input.question("Your Sex: (M/F): ");
    if (temp_sex!=="M"&&temp_sex!=="F")
    {
        console.log("Invalid gender,please retry");
        registersex()
    }

    }
    registersex();

    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System        ");
    console.log("    Become a member of The NiceMeal Restaurant today     \n");
    console.log("*****************************************************\n")
    var temp_contact=input.questionInt("Your Contact Number: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System        ");
    console.log("    Become a member of The NiceMeal Restaurant today     \n");
    console.log("*****************************************************\n")
    var temp_email=input.question("Your Email address :");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System        ");
    console.log("    Become a member of The NiceMeal Restaurant today     \n");
    console.log("*****************************************************\n");
    console.log("Requirement:1.Contain at least 8 characters")
    console.log("            2.Contain at least 1 number")
    console.log("            3.Contain at least 1 lowercase character (a-z)")
    console.log("            4.Contain at least 1 uppercase character (a-z)")
    function passwordtype(){
     temp_password=input.question("Create a password:  ");
     if (passwordrequire.test(temp_password)){
     confirm_password =input.question("Confirm your password: ");
        if (temp_password!==confirm_password){
            console.log("Passwords does not match");
            passwordtype();
        }
     }else{
         console.log("Passwords does not meet requirement");
         passwordtype()
     }
    }
    passwordtype();


    customer[i]=new Customer(temp_firstname,temp_lastname,temp_sex,temp_contact,temp_password,600000+i,temp_email);
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System    \n    ");
    console.log("       Processing your registration,please wait...     \n");
    console.log("*****************************************************\n")
    wait(2000);
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Registration System    \n    ");
    console.log("            Your Registration is successful!     \n");
    console.log("                  Thank you ,"+determind_call(i)+" " +customer[i].lastname);
    console.log("            Your membership no. is "+customer[i].memberno);
    console.log("New user coupon have been credited into your account")
    console.log("*****************************************************\n");
    wait(2000);
    customer[i].coupon[0]=new coupon("New User Welcome Gift",10001,"S",8)
    i++;
    customer_login();

}
function determind_call(l){
    if (customer[l].sex==="M"){
        return "Mr"
    }
    if (customer[l].sex==="F"){
        return "Mrs"
    }
}
var customerloginstatus;
var notfound_choice;
function customer_login(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Login System        ");
    console.log("                Quality you can taste.               ");
    times();
    console.log("              [1] Back to previous menu")
    console.log("*****************************************************\n");
   var temploginid= input.questionInt("Please enter your contact number or membership No.: ");
   if (temploginid===1){
       main_screen()
   }
   for (var k=0;k<customer.length;k++){
       if (temploginid===customer[k].memberno || temploginid===customer[k].contact ){
           currentlogin=k;
           customerloginstatus=true;
       }
   }
   if (customerloginstatus!==true){
       process.stdout.write('\033c')
       console.log("*****************************************************\n")
       console.log("         The NiceMeal Restaurant Login System        ");
       console.log("                Quality you can taste.               ");
       console.log("               User not found in system \n")
       console.log("           [1] Retry [2] Back to main menu")
       console.log("*****************************************************\n");
       function question_notfound(){
        notfound_choice=input.questionInt("Choice: ")
       }
       question_notfound();
       switch (notfound_choice){
           case 1:
               customer_login();
               break;
           case 2:
               main_screen();
               break;
           default:
               console.log("Invalid option")
               question_notfound();
               break;
       }
   }
    loginattempt_above3()
   function loginattempt_above3(){
   if (customer[currentlogin].wrongpassword_attempt>3){
       process.stdout.write('\033c')
       console.log("*****************************************************\n")
       console.log("         The NiceMeal Restaurant Login System        ");
       console.log("                Quality you can taste.           \n    ");
       console.log("Password attempt above limit,please approach our staff ")
       console.log("*****************************************************\n");
       wait(3000);
       main_screen();
   }}
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Login System        ");
    console.log("                Quality you can taste.               ");
    times();
    console.log("               "+time_identify()+" " +determind_call(currentlogin)+" " +customer[currentlogin].lastname)
    console.log("*****************************************************\n");
    var temploginpassword;
    function verify_password(){
        loginattempt_above3()
        temploginpassword= input.question("Please enter your password: ");
        if (temploginpassword===customer[currentlogin].password){
            customer[currentlogin].wrongpassword_attempt=0;
            userlogin=true;
            order_screen();
        }
        else {
            customer[currentlogin].wrongpassword_attempt++;
            loginattempt_above3()
            process.stdout.write('\033c')
            console.log("*****************************************************\n")
            console.log("         The NiceMeal Restaurant Login System        ");
            console.log("                Quality you can taste.               ");
            console.log("                 Sorry,wrong password                ")
            console.log("Your account will be locked if there is more than 3  ")
            console.log("                      attempts")
            console.log("             Current Attempt: "+customer[currentlogin].wrongpassword_attempt+"\n")
            console.log("[1] Retry [2] Forgot Password [3] Back to previous menu")
            console.log("*****************************************************\n");
            var wrongattemptchoice=input.questionInt("Choice: ");
            switch (wrongattemptchoice){
                case 1:

                    verify_password();
                    break;
                case 2:
                    reset_password();
                    break;
                case 3:
                    temploginid=0;
                    temploginpassword=0;
                    main_screen();
                    break;
            }
        }
    }

verify_password()
}
 choiceselectioncoupon=10;

function change_particular(){
    if (guestlogin===true){
        process.stdout.write('\033c')
        console.log("*****************************************************\n")
        console.log("         The NiceMeal Restaurant User System      \n  ");
        console.log("       This function is not available to guest")
        console.log("*****************************************************\n")
        wait(3000);
        order_screen();
    }
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant User System        ");
    console.log("         What would you like to update today\n")
    console.log("           Name: " +customer[currentlogin].lastname+" "+customer[currentlogin].firstname)
    console.log("           Phone: " +customer[currentlogin].contact)
    console.log("           Email: " +customer[currentlogin].email)
    console.log("           Member ID: " +customer[currentlogin].memberno+"\n")
    console.log("        [1] Contact Number  [2] Email Address")
    console.log("        [3] Passwords       [4] Return to previous screen\n")
    console.log("*****************************************************\n")
    changeparticularchoice();
    function changeparticularchoice(){
        var choice=input.questionInt("Choice: ");
        switch (choice){
            case 1:
                var choice=input.questionInt("New phone number: ");
                customer[currentlogin].contact=choice;
                order_screen()
                break;
            case 2:
                var tempchangeemail=input.question("Your new email address:")
                customer[currentlogin].email=tempchangeemail;
                console.log("Change is successful,going back ...");
                wait(3000);
                order_screen();
                break;
            case 3:
                currentpass()
                function currentpass(){
                var currentemppw=input.question("Current password: ");
                if (currentemppw===customer[currentlogin].password) {
                    process.stdout.write('\033c')
                    console.log("*****************************************************\n")
                    console.log("         The NiceMeal Restaurant User System        ");
                    console.log("              Verification is successful!")
                    console.log("*****************************************************\n")
                    retrypassword();

                    function retrypassword()
                    {
                    var tempnewpass = input.question("New password: ");
                    var tempnewconfirmpass = input.question("Re-enter password: ");
                    if (tempnewconfirmpass === tempnewpass) {
                        customer[currentlogin].password = tempnewconfirmpass;
                        console.log("Change is successful");
                        wait(3000);
                        order_screen()
                    } else {
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
                                    retrypassword();break;
                                case 2:
                                    order_screen();break;
                                default:
                                    console.log("Invalid Option");
                                    repeatchoice();
                            }
                        }
                    }
                }
                }
                else{
                    process.stdout.write('\033c')
                    console.log("*****************************************************\n")
                    console.log("         The NiceMeal Restaurant User System        ");
                    console.log("                Verification failed ")
                    console.log("               [1] Retry [2] Go back")
                    console.log("*****************************************************\n")
                    var choice1=input.questionInt("Choice: ")
                    switch (choice1){
                        case 1: currentpass();break;
                        case 2:order_screen();break;
                    }
                }}
                break;
            case 4:order_screen();break;
            default:console.log("Invalid Option");
            changeparticularchoice();break;

        }

    }
}
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
    console.log("   Currently you have "+customer[currentlogin].coupon.length+ " coupon that can be used" );
    }
    }
    else {
    console.log("                 "+time_identify()+" " +"Guest "+guest_lastname)
    console.log("    Do consider to be our member for exclusive deals")

    }
    console.log("       What would you like to order today :)\n")
    console.log("           [1] Start order  [2] View Cart")
    console.log("           [3] Order History  [4] Track an order")
    console.log("           [5] View Coupon  [6] Change of account detail")
    console.log("           [7] Logout        [8] Exit\n")
    console.log("*****************************************************\n")
    order_screen_choice();
    function order_screen_choice() {
        var choice = input.questionInt("Choice: ");
        switch (choice){
            case 1: order_menu();break;
            case 2: view_cart();break;
            case 3: order_history();break;
            case 4:trackorderguest();break;
            case 5:coupon_view();break
            case 6:change_particular();break
            case 7:logout_now();break;
            case 8:process.exit(0);break;
            default:console.log("Invalid Option");
            order_screen_choice();break;

        }
    }
}
var temps=0
var tempv=0;
function order_menu(){
    process.stdout.write('\033c')
    counterfind=0;
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                     Food Menu")
    console.log("                [1] View all items")
    console.log("                [2] View all category")
    console.log("                [3] Search for an item")
    console.log("                [4] Return to previous screen")
    console.log("*****************************************************\n");
    foodmenuoption()
    function foodmenuoption() {
        var foodmenuchoice = input.questionInt("Choice: ");
        switch (foodmenuchoice){
            case 1:view_all();break
            case 2:category_item();break;
            case 3:search_item();break;
            case 4:order_screen();break;

            default:
                console.log("Invalid Option");
                foodmenuoption();
                break;

        }
    }
}
var totalcost=0;
var usecoupon=false;
var thismenu=0;
function view_cart(){
    if (guestlogin===true){
        view_cart_guest();
    }
     totalcost=0;
    if (customer[currentlogin].cart.length<1){
        console.log("*****************************************************\n")
        console.log("         The NiceMeal Restaurant Order System        ");
        console.log("                       My cart:")
        console.log("              You have no item in cart :(\n")
        console.log("              [1]Back to previous menu")
        console.log("*****************************************************\n")
        nocartitem();
        function nocartitem(){
            var choice=input.questionInt("Choice: ");
            switch (choice){
                case 1: order_screen();break
                default:console.log("Invalid Choice");
                nocartitem();
            }
        }
    }
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Order System        ");
    console.log("                       My cart:")
    for (var v=0;v<customer[currentlogin].cart.length;v++){
        console.log(v+". "+customer[currentlogin].cart[v][0].item_name+" "+customer[currentlogin].cart[v][0].item_quantity +"x"+"==>"+"$"+((customer[currentlogin].cart[v][0].item_quantity)*customer[currentlogin].cart[v][0].item_price).toFixed(2))
       totalcost=((customer[currentlogin].cart[v][0].item_quantity)*customer[currentlogin].cart[v][0].item_price)+totalcost
        console.log("------")
        if (customer[currentlogin].cart[v][0].item_spicy===true){
            console.log(customer[currentlogin].cart[v][0].item_spicy_level)
        }
        if (customer[currentlogin].cart[v][0].item_dry===true){
            console.log(customer[currentlogin].cart[v][0].item_dry_level)
        }
        if (customer[currentlogin].cart[v][0].item_ice===true){
            console.log(customer[currentlogin].cart[v][0].item_ice_level)
        }
        console.log("------")
    }
    if (usecoupon!==false){
        console.log("Using coupon:"+customer[currentlogin].coupon[choiceselectioncoupon].coupon_name);

    }
    if (usecoupon!==false&&thismenu===1){


        console.log("          Total Cost: $"+(totalcost-customer[currentlogin].coupon[choiceselectioncoupon].coupon_price).toFixed(2))
    }
if (usecoupon===false){
    console.log("          Total Cost: $"+totalcost.toFixed(2))}
    if (usecoupon===false&&customer[currentlogin].coupon.length>0){
        console.log("You have coupons that can be use")
        console.log("Enter 6 if you want to use them")
    }
    console.log("[1] Checkout [2] Delete Item [3] Back to previous menu\n")
    console.log("*****************************************************\n");
    choicecheckout()
    function choicecheckout(){
        var choice =input.questionInt("Choice: ");
        switch (choice){
            case 6:
                console.log("*****************************************************\n");
                console.log("         The NiceMeal Restaurant Order System        ");
                console.log("               Select a coupon to use ")
                console.log("                       [10]Go back")
                for (var z=0;z<customer[currentlogin].coupon.length;z++){
                    console.log(z+". "+customer[currentlogin].coupon[z].coupon_name+"==>"+"$ "+customer[currentlogin].coupon[z].coupon_price.toFixed(2))
                }
    selectionchoice()
                function selectionchoice(){
                  selection=input.questionInt("Choice: ");
                  if (selection===10){
                      view_cart();

                  }
                if (selection>=customer[currentlogin].coupon.length){
                    console.log("Invalid Option");
                    selectionchoice();
                }
                choiceselectioncoupon=selection;
                usecoupon=true;
                thismenu++;
                view_cart()
                }
                break;
            case 1:
                checkout();
                function checkout(){
                    var choice=input.question("Are you sure you want to checkout?(Y/N): ")
                    switch (choice){
                        case "Y":
                            console.log("*****************************************************\n");
                            console.log("         The NiceMeal Restaurant Order System  \n      ");
                            console.log("                Payment in process...")
                            console.log("*****************************************************\n");
                            wait(6000);
                            if (usecoupon===true){
                                customer[currentlogin].coupon.splice(choiceselectioncoupon,1)
                            }

                            templength=order[1].length
                            temporderno=100000+(order[0].length+order[1].length)
                            order[1][templength]=new order_status(temporderno,"Processing",totalcost);
                               order[1][templength].item=customer[currentlogin].cart.slice(0);
                               //console.log(order[1][templength].item[0][0].item_name)
                               customer[currentlogin].cart=[];
                               customer[currentlogin].order_active=temporderno;
                               customer[currentlogin].order_record[customer[currentlogin].order_record.length]=order[1].slice(templength,templength+1)
                            console.log("*****************************************************\n");
                            console.log("         The NiceMeal Restaurant Order System  \n      ");
                            console.log("                Payment is successful")
                            console.log("             Your order number is "+temporderno)
                            console.log("        A email receipt have been sent to you!")
                            console.log("*****************************************************\n");
                            wait(4000)
                            order_screen();



                            break;
                        case "N":if (thismenu>1){
                            thismenu++;
                        }
                            view_cart();
                        break;
                        default:console.log("Invalid Option");checkout();
                    }
                }
                break;
            case 2:
                var deleteitem=input.questionInt("Which item you would like to delete: ");
                deletenow();
                function deletenow() {
                    var confirmationdelete = input.question("Are you sure you want to remove " + customer[currentlogin].cart[deleteitem][0].item_name + " ? (Y/N): ");
                    if (confirmationdelete === "Y") {
                        customer[currentlogin].cart.splice(deleteitem, 1);
                        console.log("Item is deleted,going back ");
                        wait(2000);
                        if (thismenu>1){
                            thismenu++;
                        }
                        order_screen();
                    } else if (confirmationdelete === "N") {
                        choicecheckout();
                    } else {
                        console.log("Invalid Option");
                        deletenow();
                    }
                }

                break;
            case 3:if (thismenu>1){
                thismenu++;
            } order_screen();break;
            default: console.log("Invalid Option");
            choicecheckout();
        }
    }
}
function view_cart_guest(){
    totalcost=0;
    if (guest_cart.length<1){
        console.log("*****************************************************\n")
        console.log("         The NiceMeal Restaurant Order System        ");
        console.log("                       My cart:")
        console.log("              You have no item in cart :(\n")
        console.log("              [1]Back to previous menu")
        console.log("*****************************************************\n")
        nocartitem();
        function nocartitem(){
            var choice=input.questionInt("Choice: ");
            switch (choice){
                case 1: order_screen();break
                default:console.log("Invalid Choice");
                    nocartitem();
            }
        }
    }
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Order System        ");
    console.log("                       My cart:")
    for (var v=0;v<guest_cart.length;v++){
        console.log(v+". "+guest_cart[v][0].item_name+" "+guest_cart[v][0].item_quantity +"x"+"==>"+"$"+((guest_cart[v][0].item_quantity)*guest_cart[v][0].item_price).toFixed(2))
        totalcost=((guest_cart[v][0].item_quantity)*guest_cart[v][0].item_price)+totalcost
        console.log("------")
        if (guest_cart[v][0].item_spicy===true){
            console.log(guest_cart[v][0].item_spicy_level)
        }
        if (guest_cart[v][0].item_dry===true){
            console.log(guest_cart[v][0].item_dry_level)
        }
        if (guest_cart[v][0].item_ice===true){
            console.log(guest_cart[v][0].item_ice_level)
        }
        console.log("------")
    }
    console.log("          Total Cost: $"+totalcost.toFixed(2))
   
    console.log("[1] Checkout [2] Delete Item [3] Back to previous menu\n")
    console.log("*****************************************************\n");
    choicecheckoutg()
    function choicecheckoutg(){
        var choice =input.questionInt("Choice: ");
        switch (choice){
            case 1:
                checkout();
            function checkout(){
                var choice=input.question("Are you sure you want to checkout?(Y/N): ")
                switch (choice){
                    case "Y":
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

                        console.log("*****************************************************\n");
                        console.log("         The NiceMeal Restaurant Order System  \n      ");
                        console.log("                Payment is successful")
                        console.log("             Your order number is "+temporderno)
                        console.log("        A email receipt have been sent to you!")
                        console.log("*****************************************************\n");
                        wait(4000)
                        order_screen();



                        break;
                    case "N":if (thismenu>1){
                        thismenu++;
                    }
                        view_cart();
                        break;
                    default:console.log("Invalid Option");checkout();
                }
            }
                break;
            case 2:
                var deleteitem=input.questionInt("Which item you would like to delete: ");
                deletenow1();
            function deletenow1() {
                var confirmationdelete = input.question("Are you sure you want to remove " + guest_cart[deleteitem][0].item_name + " ? (Y/N): ");
                if (confirmationdelete === "Y") {
                    guest_cart.splice(deleteitem, 1);
                    console.log("Item is deleted,going back ");
                    wait(2000);
                    if (thismenu>1){
                        thismenu++;
                    }
                    order_screen();
                } else if (confirmationdelete === "N") {
                    choicecheckoutg();
                } else {
                    console.log("Invalid Option");
                    deletenow1();
                }
            }

                break;
            case 3:if (thismenu>1){
                thismenu++;
            } order_screen();break;
            default: console.log("Invalid Option");
                choicecheckoutg();
        }
    }
}
function order_history(){
    if (guestlogin===true){
        process.stdout.write('\033c')
        console.log("*****************************************************\n");
        console.log("      The NiceMeal Restaurant Ordering System          ");
        console.log("              Quality you can taste.\n                 ");
        console.log("           Guest cannot use this feature\n                 ");
        console.log("*****************************************************\n");
        wait(4000);
        order_screen()
    }
    process.stdout.write('\033c')
    console.log("*****************************************************\n");
    console.log("      The NiceMeal Restaurant Ordering System          ");
    console.log("              Quality you can taste.\n                 ");
    console.log("                 Order History:\n")
    if (customer[currentlogin].order_record.length>0) {
        for (var q = 0; q < customer[currentlogin].order_record.length; q++) {
            console.log("        " + q + ". " + customer[currentlogin].order_record[q][0].number + "==>" + customer[currentlogin].order_record[q][0].status+"==>"+"$ "+customer[currentlogin].order_record[q][0].cost.toFixed(2));
            console.log("===========================================")
            for (var g = 0; g < customer[currentlogin].order_record[q][0].item.length; g++) {
                console.log("    "+customer[currentlogin].order_record[q][0].item[g][0].item_name)
            }
            console.log("===========================================")
        }
        console.log("\n")
        console.log("[1] Send a email receipt for a order [2] Go back")
        console.log("*****************************************************\n");
        tempc();
        function tempc(){
            var tempchoice1=input.questionInt("Choice: ");
            switch (tempchoice1){
                case 1:
                    console.log("Sending in progress..");break;
                case 2: order_screen();break;
                default: console.log("Invalid option");
                    tempc();break;
            }
        }
    }
    else {
    console.log("                 No order found")
    console.log("                  [1] Go back")
        console.log("*****************************************************\n");
    tempchoice();
    function tempchoice(){
        var tempchoice1=input.questionInt("Choice: ");
        switch (tempchoice1){
            case 1:order_screen();break;
            default:console.log("Invalid Option");tempchoice();break;
        }
    }
    }
}
function coupon_view(){
    if (guestlogin===true){
        process.stdout.write('\033c')
        console.log("*****************************************************\n")
        console.log("         The NiceMeal Restaurant User System     \n   ");
        console.log("       This function is not available to guest")
        console.log("*****************************************************\n")
        wait(3000);
        order_screen();
    }
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Order System        ");
    console.log("     You currently have "+customer[currentlogin].coupon.length+" coupon")
    for (var h=0;h<customer[currentlogin].coupon.length;h++){
    console.log("         "+h+". "+customer[currentlogin].coupon[h].coupon_name+" ==>"+"$ "+customer[currentlogin].coupon[h].coupon_price.toFixed(2))
    }
    console.log("             [1] Back to previous menu\n")
    console.log("*****************************************************\n")
    coupon_view_choice();
    function coupon_view_choice(){
        var choice =input.questionInt("Choice: ")
        switch (choice){
            case 1: order_screen();break
            default:console.log("Invalid Option");coupon_view_choice()
        }
    }
}
function logout_now(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Order System        ");
    console.log("                 Logout successful!\n")
    console.log("*****************************************************\n")
    wait(3000)
    currentlogin=0;
    main_screen();
}
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
var foodcount=0;
var a,b,c,d,e;
function view_all(){
    foodcount=0;
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                     Our item:\n")
        for (a=0;a<food[0].length;a++){
            console.log(foodcount+". "+food[0][a].item_code+". "+food[0][a].item_name +"==>"+food[0][a].item_price);
            foodcount++;
        }
        for (b=0;b<food[1].length;b++){
            console.log(foodcount+". "+food[1][b].item_code+". "+food[1][b].item_name +"==>"+food[1][b].item_price)
            foodcount++;
        }
        for (c=0;c<food[2].length;c++){
            console.log(foodcount+". "+food[2][c].item_code+". "+food[2][c].item_name +"==>"+food[2][c].item_price)
            foodcount++;
        }
        for (d=0;d<food[3].length;d++){
            console.log(foodcount+". "+food[3][d].item_code+". "+food[3][d].item_name +"==>"+food[3][d].item_price)
            foodcount++;
        }
    for (e=0;e<food[4].length;e++){
        console.log(foodcount+". "+food[4][e].item_code+". "+food[4][e].item_name +"==>"+food[4][e].item_price)
        foodcount++;
    }
    console.log("\n");

        if (guestlogin===true||userlogin===true){
            console.log("[1] View item's description [2] Add to cart [3] Return back \n")
            console.log("*****************************************************\n")
            addcartall();
            function addcartall(){
                var choice =input.questionInt("Choice: ");
                switch ( choice){
                    case 1: viewitemdescription();break;
                    case 2:
                        var seeitem=input.questionInt('Which one to add to cart? :');
                        if (seeitem<0||seeitem>foodcount){
                            console.log("Invalid Option");
                            addcartall();
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
                            quantityoforderuser();
                            function quantityoforderuser(){
                                var quantity = input.questionInt("How many do you want: ");
                                if (quantity<0){
                                    quantityoforderuser()
                                }
                                customer[currentlogin].cart[tempclass][0].item_quantity=quantity
                                if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                                    console.log("============")
                                    console.log("Level of spicy")
                                    console.log("[1] No spicy")
                                    console.log("[2] Abit Spicy")
                                    console.log("[3] Very Spicy")
                                    console.log("============")
                                    var spicylevel=input.questionInt("Choice:")
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
                                    console.log("============")
                                    console.log("Level of ice")
                                    console.log("[1] No ice")
                                    console.log("[2] Abit ice")
                                    console.log("[3] Alot of ice")
                                    console.log("============")
                                    var icelevel=input.questionInt("Choice:")
                                    customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                                }
                                console.log("Added to cart!!");
                                wait(3000);
                                order_menu()




                            }

                        }

                        if (guestlogin===true){
                            guest_cart.push((food[category_number].slice(seeitem,seeitem+1)))
                            tempclass=guest_cart.length-1;
                            quantityoforderguest();
                            function quantityoforderguest(){
                                var quantity = input.questionInt("How many do you want: ");
                                if (quantity<0){
                                    quantityoforderguest()
                                }
                                guest_cart[tempclass][0].item_quantity=quantity
                                if (guest_cart[tempclass][0].item_spicy===true){
                                    console.log("============")
                                    console.log("Level of spicy")
                                    console.log("[1] No spicy")
                                    console.log("[2] Abit Spicy")
                                    console.log("[3] Very Spicy")
                                    console.log("============")
                                    var spicylevel=input.questionInt("Choice:")
                                    guest_cart[tempclass][0].item_spicy_level=spicylevel

                                }

                                if (guest_cart[tempclass][0].item_dry===true){
                                    console.log("============")
                                    console.log("Dry of with soup")
                                    console.log("[1] Dry")
                                    console.log("[2] Soup")
                                    console.log("============")
                                    var drylevel=input.questionInt("Choice:")
                                    guest_cart[tempclass][0].item_dry_level=drylevel

                                }



                                if (guest_cart[tempclass][0].item_ice===true){
                                    console.log("============")
                                    console.log("Level of ice")
                                    console.log("[1] No ice")
                                    console.log("[2] Abit ice")
                                    console.log("[3] Alot of ice")
                                    console.log("============")
                                    var icelevel=input.questionInt("Choice:")
                                    guest_cart[tempclass][0].item_ice_level=icelevel

                                }
                                console.log("Added to cart!!");
                                wait(3000);
                                order_menu()




                            }

                        }





                        break;
                    case 3:order_menu();break;
                    default:console.log("Invalid Option");
                    addcartall();
                    break;
                }
            }
        }


        if (guestlogin===false&&userlogin===false){
    console.log("[1] View an item's description [2]Back to previous screen ");
    console.log("*****************************************************\n")
    itemchoiceview();
    function itemchoiceview() {
        var itemchoicedes = input.questionInt("Choice: ")
        switch (itemchoicedes) {
            case 1:viewitemdescription();break;
            case 2:food_menu();break;
            default:
                console.log("Invalid Option");
                itemchoiceview()
        }
    }
}}
var category_number=0;

var seeitem;
function viewitemdescription(){
    category_number=0;
    foodcountcheck()
    function foodcountcheck(){
    seeitem=input.questionInt("Which item do you want to see: ");
    if (seeitem<0||seeitem>=foodcount){
        console.log("Invalid Option")
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
    console.log("*****************************************************\n");
    console.log("      The NiceMeal Restaurant Ordering System          ");
    console.log("              Quality you can taste.\n                 ");
    console.log("Item description for "+food[category_number][seeitem].item_name +":")   ;
    console.log(food[category_number][seeitem].item_description+"\n");
    console.log("            [1]Back to previous screen ");
    console.log("*****************************************************\n");
    backto();
    function backto(){
        var choice=input.questionInt("Choice: ")
        switch (choice){
            case 1:
                view_all();
                break
            default:
                console.log("Invalid Option");
                backto();
                break;
        }
    }

}
function category_item(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                    Food Category")
    console.log("                     [0] Promotion  ")
    console.log("                     [1] Rice")
    console.log("                     [2] Noodles")
    console.log("                     [3] Drinks")
    console.log("                     [4] Others                       ")
    console.log("                     [5] Go back to previous menu                       ")
    console.log("*****************************************************\n")
    categorychoice();
    function categorychoice() {
        var choice = input.questionInt("Choice :");
        switch (choice){
            case 0: promotioncategory();break;
            case 1:
                ricecategory()
                break;
            case 2:
                noodlecategory();
                break;
            case 3:
                drinkcategory();
                break;
            case 4:
                othercategory();
                break;
            case 5 :
                if (userlogin===true||guestlogin===true){
                    order_screen();break;
                }if (userlogin===false&&guestlogin===false){
                main_screen();break;}
            default:
                console.log("Invalid option");
                categorychoice();
                break;
        }
    }
}
function ricecategory(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                    Rice Category\n")
    for (var r=0;r<food[1].length;r++){
        console.log(r+". "+food[1][r].item_code+". " + food[1][r].item_name+"==>"+"$ "+food[1][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("[1] View an item's description [2] Add to cart [3]Return back ");
        console.log("*****************************************************\n")
        addcartrc();
        function addcartrc(){

            var choice=input.questionInt("Choice :")
            switch (choice){
                case 1:   viewricedescription();
                    break;
                case 2:
    var cartready=input.questionInt("Which one to add to cart: ")
                    if (cartready<0||cartready>food[1].length-1){
                        console.log("Invalid Option")
                        addcartrc();
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[1].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();

                    }
                    function quantityoforderuser(){
                        var quantity = input.questionInt("How many do you want: ");
                        if (quantity<0){
                            quantityoforderuser()
                        }
                        customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                        if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                            console.log("============")
                            console.log("Level of spicy")
                            console.log("[1] No spicy")
                            console.log("[2] Abit Spicy")
                            console.log("[3] Very Spicy")
                            console.log("============")
                            var spicylevel=input.questionInt("Choice:")
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
                            console.log("============")
                            console.log("Level of ice")
                            console.log("[1] No ice")
                            console.log("[2] Abit ice")
                            console.log("[3] Alot of ice")
                            console.log("============")
                            var icelevel=input.questionInt("Choice:")
                            customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                        }

                        console.log("Added to cart!!");
                        wait(3000)
                        ricecategory();


                    }


                    if (guestlogin===true){

                        guest_cart.push((food[1].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("============")
                        console.log("Dry of with soup")
                        console.log("[1] Dry")
                        console.log("[2] Soup")
                        console.log("============")
                        var drylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    ricecategory();


                }

                    break;
                case 3:
                    category_item();
                    break
                default:
                    console.log("Invalid Option")
                    addcartrc();

            }


        }
    }
    if (userlogin===false&&guestlogin===false) {
        console.log("[1] View an item's description [2]Back to previous screen ");
        console.log("*****************************************************\n")
        itemchoiceview1();

        function itemchoiceview1() {
            var itemchoicedes = input.questionInt("Choice: ")
            switch (itemchoicedes) {
                case 1:
                    viewricedescription();
                    break;
                case 2:
                    category_item();
                    break;
                default:
                    console.log("Invalid Option");
                    itemchoiceview1()
            }
        }
    }

}
function viewricedescription(){
    retryrice();
    function retryrice() {
        seeitem1 = input.questionInt("Which item do you want to see: ");
        if (seeitem1>food[1].length-1 || seeitem1<0){
            console.log("Invalid Option");
            retryrice();

        }

        process.stdout.write('\033c')
        console.log("*****************************************************\n");
        console.log("      The NiceMeal Restaurant Ordering System          ");
        console.log("              Quality you can taste.\n                 ");
        console.log("Item description for "+food[1][seeitem1].item_name +":")   ;
        console.log(food[1][seeitem1].item_description+"\n");
        console.log("            [1]Back to previous screen ");
        console.log("*****************************************************\n");
        backto();
        function backto(){
            var choice=input.questionInt("Choice: ")
            switch (choice){
                case 1:
                    ricecategory();
                    break
                default:
                    console.log("Invalid Option");
                    backto();
                    break;
            }
        }

    }
}
function noodlecategory(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                    Noodle Category\n")
    for (var r=0;r<food[0].length;r++){
        console.log(r+". "+food[0][r].item_code+". " + food[0][r].item_name+"==>"+"$ "+food[0][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("[1] View an item's description [2] Add to cart [3]Return back ");
        console.log("*****************************************************\n")
        addcartrc();
        function addcartrc(){

            var choice=input.questionInt("Choice :")
            switch (choice){
                case 1:   viewnoodledescription();
                    break;
                case 2:
                    var cartready=input.questionInt("Which one to add to cart: ")
                    if (cartready<0||cartready>food[0].length-1){
                        console.log("Invalid Option")
                        addcartrc();
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[0].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();

                    }
                function quantityoforderuser(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderuser()
                    }
                    customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                    if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
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
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    noodlecategory();


                }


                    if (guestlogin===true){

                        guest_cart.push((food[0].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("============")
                        console.log("Dry of with soup")
                        console.log("[1] Dry")
                        console.log("[2] Soup")
                        console.log("============")
                        var drylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    noodlecategory();


                }

                    break;
                case 3:
                    category_item();
                    break
                default:
                    console.log("Invalid Option")
                    addcartrc();

            }


        }
    }
    if (userlogin===false&&guestlogin===false){
    console.log("[1] View an item's description [2]Back to previous screen ");
    console.log("*****************************************************\n")
    itemchoiceview1();
    function itemchoiceview1() {
        var itemchoicedes = input.questionInt("Choice: ")
        switch (itemchoicedes) {
            case 1:viewnoodledescription();break;
            case 2:category_item();break;
            default:
                console.log("Invalid Option");
                itemchoiceview1()
        }
    }}
}
function viewnoodledescription(){
    retrynoodle();
    function retrynoodle() {
        seeitem2 = input.questionInt("Which item do you want to see: ");
        if (seeitem2>food[0].length-1 || seeitem2<0){
            console.log("Invalid Option");
            retrynoodle();

        }

        process.stdout.write('\033c')
        console.log("*****************************************************\n");
        console.log("      The NiceMeal Restaurant Ordering System          ");
        console.log("              Quality you can taste.\n                 ");
        console.log("Item description for "+food[0][seeitem2].item_name +":")   ;
        console.log(food[0][seeitem2].item_description+"\n");
        console.log("            [1]Back to previous screen ");
        console.log("*****************************************************\n");
        backto();
        function backto(){
            var choice=input.questionInt("Choice: ")
            switch (choice){
                case 1:
                    noodlecategory();
                    break
                default:
                    console.log("Invalid Option");
                    backto();
                    break;
            }
        }

    }

}
function drinkcategory(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                    Drink Category\n")
    for (var r=0;r<food[2].length;r++){
        console.log(r+". "+food[2][r].item_code+". " + food[2][r].item_name+"==>"+"$ "+food[2][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("[1] View an item's description [2] Add to cart [3]Return back ");
        console.log("*****************************************************\n")
        addcartrc();
        function addcartrc(){

            var choice=input.questionInt("Choice :")
            switch (choice){
                case 1:   viewdrinkdescription();
                    break;
                case 2:
                    var cartready=input.questionInt("Which one to add to cart: ")
                    if (cartready<0||cartready>food[2].length-1){
                        console.log("Invalid Option")
                        addcartrc();
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[2].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();

                    }
                function quantityoforderuser(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderuser()
                    }
                    customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                    if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
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
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    drinkcategory();


                }

                    if (guestlogin===true){

                        guest_cart.push((food[2].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("============")
                        console.log("Dry of with soup")
                        console.log("[1] Dry")
                        console.log("[2] Soup")
                        console.log("============")
                        var drylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    drinkcategory();


                }

                    break;
                case 3:
                    category_item();
                    break
                default:
                    console.log("Invalid Option")
                    addcartrc();

            }


        }
    }
    if (userlogin===false&&guestlogin===false){
    console.log("[1] View an item's description [2]Back to previous screen ");
    console.log("*****************************************************\n")
    itemchoiceview1();
    function itemchoiceview1() {
        var itemchoicedes = input.questionInt("Choice: ")
        switch (itemchoicedes) {
            case 1:viewdrinkdescription();break;
            case 2:category_item();break;
            default:
                console.log("Invalid Option");
                itemchoiceview1()
        }
    }}



}
function viewdrinkdescription(){
    retrydrink();
    function retrydrink() {
        seeitem4 = input.questionInt("Which item do you want to see: ");
        if (seeitem4>food[0].length-1 || seeitem4<0){
            console.log("Invalid Option");
            retrydrink();

        }

        process.stdout.write('\033c')
        console.log("*****************************************************\n");
        console.log("      The NiceMeal Restaurant Ordering System          ");
        console.log("              Quality you can taste.\n                 ");
        console.log("Item description for "+food[2][seeitem4].item_name +":")   ;
        console.log(food[2][seeitem4].item_description+"\n");
        console.log("            [1]Back to previous screen ");
        console.log("*****************************************************\n");
        backto();
        function backto(){
            var choice=input.questionInt("Choice: ")
            switch (choice){
                case 1:
                    noodlecategory();
                    break
                default:
                    console.log("Invalid Option");
                    backto();
                    break;
            }
        }

    }
}
function othercategory(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                    Other Category\n")
    for (var r=0;r<food[3].length;r++){
        console.log(r+". "+food[3][r].item_code+". " + food[3][r].item_name+"==>"+"$ "+food[3][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("[1] View an item's description [2] Add to cart [3]Return back ");
        console.log("*****************************************************\n")
        addcartrc();
        function addcartrc(){

            var choice=input.questionInt("Choice :")
            switch (choice){
                case 1:   viewotherdescription();
                    break;
                case 2:
                    var cartready=input.questionInt("Which one to add to cart: ")
                    if (cartready<0||cartready>food[3].length-1){
                        console.log("Invalid Option")
                        addcartrc();
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[3].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();

                    }
                function quantityoforderuser(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderuser()
                    }
                    customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                    if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
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
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    othercategory();


                }




                    if (guestlogin===true){

                        guest_cart.push((food[3].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("============")
                        console.log("Dry of with soup")
                        console.log("[1] Dry")
                        console.log("[2] Soup")
                        console.log("============")
                        var drylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    othercategory();


                }
                    break;
                case 3:
                    category_item();
                    break
                default:
                    console.log("Invalid Option")
                    addcartrc();

            }


        }
    }
    if (userlogin===false&&guestlogin===false){
    console.log("[1] View an item's description [2]Back to previous screen ");
    console.log("*****************************************************\n")
    itemchoiceview1();
    function itemchoiceview1() {
        var itemchoicedes = input.questionInt("Choice: ")
        switch (itemchoicedes) {
            case 1:viewotherdescription();break;
            case 2:category_item();break;
            default:
                console.log("Invalid Option");
                itemchoiceview1()
        }
    }}
}
function viewotherdescription(){
    retryother();
    function retryother() {
        seeitem3 = input.questionInt("Which item do you want to see: ");
        if (seeitem3>food[0].length-1 || seeitem3<0){
            console.log("Invalid Option");
            retryother();

        }

        process.stdout.write('\033c')
        console.log("*****************************************************\n");
        console.log("      The NiceMeal Restaurant Ordering System          ");
        console.log("              Quality you can taste.\n                 ");
        console.log("Item description for "+food[3][seeitem3].item_name +":")   ;
        console.log(food[3][seeitem3].item_description+"\n");
        console.log("            [1]Back to previous screen ");
        console.log("*****************************************************\n");
        backto();
        function backto(){
            var choice=input.questionInt("Choice: ")
            switch (choice){
                case 1:
                    othercategory();
                    break
                default:
                    console.log("Invalid Option");
                    backto();
                    break;
            }
        }

    }
}


function viewpromotiondescription(){
    retryother();
    function retryother() {
        seeitem5 = input.questionInt("Which item do you want to see: ");
        if (seeitem5>food[4].length-1 || seeitem5<0){
            console.log("Invalid Option");
            retryother();

        }

        process.stdout.write('\033c')
        console.log("*****************************************************\n");
        console.log("      The NiceMeal Restaurant Ordering System          ");
        console.log("              Quality you can taste.\n                 ");
        console.log("Item description for "+food[4][seeitem5].item_name +":")   ;
        console.log(food[4][seeitem5].item_description+"\n");
        console.log("            [1]Back to previous screen ");
        console.log("*****************************************************\n");
        backto();
        function backto(){
            var choice=input.questionInt("Choice: ")
            switch (choice){
                case 1:
                    promotioncategory();
                    break
                default:
                    console.log("Invalid Option");
                    backto();
                    break;
            }
        }

    }
}
function promotioncategory(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                    Promotion Category\n")
    for (var r=0;r<food[4].length;r++){
        console.log(r+". "+food[4][r].item_code+". " + food[4][r].item_name+"==>"+"$ "+food[4][r].item_price.toFixed(2))
    }
    console.log("\n")
    if (userlogin===true || guestlogin===true){
        console.log("[1] View an item's description [2] Add to cart [3]Return back ");
        console.log("*****************************************************\n")
        addcartrc();
        function addcartrc(){

            var choice=input.questionInt("Choice :")
            switch (choice){
                case 1:   viewpromotiondescription();
                    break;
                case 2:
                    var cartready=input.questionInt("Which one to add to cart: ")
                    if (cartready<0||cartready>food[4].length-1){
                        console.log("Invalid Option")
                        addcartrc();
                    }
                    if (userlogin===true){

                        customer[currentlogin].cart.push((food[4].slice(cartready,cartready+1)))
                        tempclass=customer[currentlogin].cart.length-1;
                        quantityoforderuser();

                    }
                function quantityoforderuser(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderuser()
                    }
                    customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                    if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
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
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    promotioncategory();


                }



                    if (guestlogin===true){

                        guest_cart.push((food[4].slice(cartready,cartready+1)))
                        tempclass=guest_cart.length-1;
                        quantityoforderguest();

                    }
                function quantityoforderguest(){
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclass][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_spicy_level=spicylevel

                    }

                    if (guest_cart[tempclass][0].item_dry===true){
                        console.log("============")
                        console.log("Dry of with soup")
                        console.log("[1] Dry")
                        console.log("[2] Soup")
                        console.log("============")
                        var drylevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclass][0].item_ice===true){
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        guest_cart[tempclass][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    promotioncategory();


                }
                    
                    
                    break;
                case 3:
                    category_item();
                    break
                default:
                    console.log("Invalid Option")
                    addcartrc();

            }


        }
    }
    if (userlogin===false&&guestlogin===false){
        console.log("[1] View an item's description [2]Back to previous screen ");
        console.log("*****************************************************\n")
        itemchoiceview1();
        function itemchoiceview1() {
            var itemchoicedes = input.questionInt("Choice: ")
            switch (itemchoicedes) {
                case 1:viewpromotiondescription();break;
                case 2:category_item();break;
                default:
                    console.log("Invalid Option");
                    itemchoiceview1()
            }
        }}
}
var temporder=false;
var finalcall=false
var finalorder=false
function trackorderguest(){
     temporder=false;
    finalcall=false
    finalorder=false
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Tracking System        ");
    console.log("               Quality you can taste.                 ");
    times();
    console.log("           [1] Return back to main menu")
    console.log("*****************************************************\n");
     trackfun=input.questionInt("Enter your phone number (only for active order) or tracking number: ");
    if (trackfun===1){
        if (userlogin===true||guestlogin===true){
order_screen();
        }
        main_screen();

    }

    checkstatus();
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
            console.log("*****************************************************\n")
            console.log("       The NiceMeal Restaurant Tracking System        ");
            console.log("               Quality you can taste.                 ");
            times();
            console.log("                 Order not found!\n")
            console.log("          [1] Retry [2] Back to main menu")
            console.log("*****************************************************\n");

            notfound404();

            function notfound404() {
                var choice = input.questionInt("Choice: ");
                switch (choice) {
                    case 1:
                        trackorderguest();
                        break
                    case 2:
                        if (guestlogin===true||userlogin===true){
                            order_screen();
                            break;
                        }else {
                        main_screen();
                        break;}
                    default:
                        console.log("Invalid Option");
                        notfound404();

                }
            }
        }
        else
            {

                process.stdout.write('\033c')
                console.log("*****************************************************\n")
                console.log("       The NiceMeal Restaurant Tracking System        ");
                console.log("               Quality you can taste.                 ");
                times();
                console.log("    Order Number:"+order[finalcall][finalorder].number)
                console.log("    Order Number:"+order[finalcall][finalorder].status+"\n")
                console.log("    Order Item:")
                for ( var y=0;y<order[finalcall][finalorder].item.length;y++){
                console.log("     "+order[finalcall][finalorder].item[y][0].item_name)
                }
                console.log("              [1] Back to main menu")
                console.log("*****************************************************\n")
                choiceback();
                function choiceback() {
                    var choices = input.questionInt("Choice: ")
                    switch (choices){
                        case 1:
                            if (userlogin===true||guestlogin===true){
                                order_screen();
                            }
                            main_screen();
                            break;
                        default:
                            console.log("Invalid Option")
                            choiceback()
                    }
                }
            }




    }

}
var counterfind=0;
var foundsearch=false;
var tempclassguest;
function search_item(){
counterfind=0;
    foundsearch=false;
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                     Fuzzy Search\n")
    console.log("*****************************************************\n");
    search=input.question("Search: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 \n");
    for (var s=0;s<food.length;s++){
        for (var v=0;v<food[s].length;v++){
            if (food[s][v].item_name.indexOf(search)>0){
                foundsearch=true;
                counterfind++
                console.log(counterfind-1+". " +food[s][v].item_code+". "+food[s][v].item_name+"==>"+"$"+food[s][v].item_price.toFixed(2))
            }
        }
    }


    if (guestlogin===true||userlogin===true){
        console.log("  [1]Add to cart [2] Another search [3] Return back \n")
        console.log("*****************************************************\n")
        addcartop();
        function addcartop(){

            var choice=input.questionInt("Choice :")
            switch (choice){
                case 1:

                    var addtocrt=input.questionInt("Which one to add to cart: ")
                    if (addtocrt>=counterfind ||addtocrt<0){
                        console.log("Invalid Option")
                        addcartop();
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
                        quantityoforderuser();

                    }
                    if (guestlogin===true){
                        guest_cart.push((food[temps].slice(tempv,tempv+1)))
                        tempclassguest=guest_cart.length-1;
                        quantityoforderguest();
                    }


                    function quantityoforderuser() {
                        var quantity = input.questionInt("How many do you want: ");
                        if (quantity<0){
                            quantityoforderuser()
                        }
                        customer[currentlogin].cart[tempclass][0].item_quantity=quantity

                        if (customer[currentlogin].cart[tempclass][0].item_spicy===true){
                            console.log("============")
                            console.log("Level of spicy")
                            console.log("[1] No spicy")
                            console.log("[2] Abit Spicy")
                            console.log("[3] Very Spicy")
                            console.log("============")
                            var spicylevel=input.questionInt("Choice:")
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
                            console.log("============")
                            console.log("Level of ice")
                            console.log("[1] No ice")
                            console.log("[2] Abit ice")
                            console.log("[3] Alot of ice")
                            console.log("============")
                            var icelevel=input.questionInt("Choice:")
                            customer[currentlogin].cart[tempclass][0].item_ice_level=icelevel

                        }

                        console.log("Added to cart!!");
                        wait(3000)
                        counterfind=0;
                        order_menu()


                    }

                function quantityoforderguest() {
                    var quantity = input.questionInt("How many do you want: ");
                    if (quantity<0){
                        quantityoforderguest()
                    }
                    guest_cart[tempclass][0].item_quantity=quantity

                    if (guest_cart[tempclassguest][0].item_spicy===true){
                        console.log("============")
                        console.log("Level of spicy")
                        console.log("[1] No spicy")
                        console.log("[2] Abit Spicy")
                        console.log("[3] Very Spicy")
                        console.log("============")
                        var spicylevel=input.questionInt("Choice:")
                        guest_cart[tempclassguest][0].item_spicy_level=spicylevel

                    }



                    if (guest_cart[tempclassguest][0].item_dry===true){
                        console.log("============")
                        console.log("Dry of with soup")
                        console.log("[1] Dry")
                        console.log("[2] Soup")
                        console.log("============")
                        var drylevel=input.questionInt("Choice:")
                        guest_cart[tempclassguest][0].item_dry_level=drylevel

                    }



                    if (guest_cart[tempclassguest][0].item_ice===true){
                        console.log("============")
                        console.log("Level of ice")
                        console.log("[1] No ice")
                        console.log("[2] Abit ice")
                        console.log("[3] Alot of ice")
                        console.log("============")
                        var icelevel=input.questionInt("Choice:")
                        guest_cart[tempclassguest][0].item_ice_level=icelevel

                    }

                    console.log("Added to cart!!");
                    wait(3000)
                    counterfind=0;
                    order_menu()


                }






                    break;
                case 2:  search_item();
                break;
                case 3:order_menu();break;
                default:
                    console.log("Invalid Option")
                    addcartop();
            }

        }
    }



    console.log("\n")
    if (foundsearch===false){
    console.log("                    Not Found\n");

    }

    if (guestlogin===false&&userlogin===false){
    console.log("    [1] Another search [2] Return back to main\n")
    console.log("*****************************************************\n")
    retrysearch();}

    function retrysearch(){
    var choice=input.questionInt("Choice: ");
    switch(choice){
        case 1:
            search_item();
            break;
        case 2:
            main_screen();break
        default:
            retrysearch();
            break;
    }

    }
}
function food_menu(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                     Food Menu")
    console.log("                [1] View all items")
    console.log("                [2] View all category")
    console.log("                [3] Search for an item")
    console.log("                [4] Return to previous screen")
    console.log("*****************************************************\n");
    foodmenuoption()
    function foodmenuoption() {
        var foodmenuchoice = input.questionInt("Choice: ");
        switch (foodmenuchoice){
            case 1:view_all();break
            case 2:category_item();break;
            case 3:search_item();break;
            case 4:main_screen();break;

            default:
                console.log("Invalid Option");
                foodmenuoption();
                break;

        }
    }
}
function help(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Help System        ");
    console.log("             Always here to help you       \n          ");
    console.log(" Email zhuofan.21@ichat.sp.edu.sg for more assistant\n")
    console.log("          [1]Return back to main menu")
    console.log("*****************************************************\n")
    callback();
    function callback(){
    var choice=input.questionInt("Choice:")
    switch (choice){
        case 1: main_screen();break
        default:console.log("Invalid Option");callback();break;
    }}
}
var guestlogin;
function main_screen(){
    guestlogin=false;
    customerloginstatus=false;
    userlogin=false;
    currentlogin=false;
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    times();
    console.log("[1] Customer Login                    [2] Guest Login");
    console.log("[3] Customer Registration      [4] Current Promotions");
    console.log("[5] Our Menu                       [6] Track An Order");
    console.log("[7] Admin Login                               [8]Help");
    console.log("[9] Exit                           [10] About Program\n");
    console.log("*****************************************************\n")
    function user_selection(){
    var choice=input.questionInt("Your Choice: ");
    switch (choice){
        case 1:
            customer_login();
            break;
        case 2:
            guest_login();
            break;
        case 3:
            customer_register();
            break;
        case 4:
            new_promotion();
            break;
        case 5:
            food_menu();
            break;
        case 6:
            trackorderguest();
            break;
        case 7:
            admin_login();
            break;
        case 8:
            help();
            break;
        case 9:
            process.exit(0);
            break;
        case 10:
            about_program();
            break;
        default: user_selection();break;
    }

    }
    user_selection();
}

start_up();
main_screen();

