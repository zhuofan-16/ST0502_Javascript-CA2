/*
This program is written by CHEN ZHUOFAN | P2100746 | Singapore Polytechnic
Used for ST0502 Fundamental of Programming CA2 Assignment
All commits can be found at https://github.com/zhuofan-16/ST0502_Javascript-CA2
Shall you have any question about this program ,please email me at zhuofan.21@ichat.sp.edu.sg
 */
var input =require('readline-sync');
var currentlogin=0;
const passwordrequire=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
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
    constructor(first_name,last_name,sex,contact,password,member_no,order_record) {
        this.firstname=first_name;
        this.lastname=last_name;
        this.sex=sex;
        this.contact=contact;
        this.memberno=member_no;
        this.password=password;
        this.order_record=order_record;
        this.order_active=0;
        this.wrongpassword_attempt=0;
        this.coupon=new Array();


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
    constructor(item_name,item_catogory,item_code,item_price,item_description,item_type,item_expire,item_dry,item_spicy) {
        this.item_name=item_name;
        this.item_caterogory=item_catogory
        this.item_code=item_code;
        this.item_description=item_description;
        this.item_type=item_type;
        this.item_spicy=item_spicy;
        this.item_dry=item_dry;
        this.item_price=item_price;
        this.item_expire=item_expire;
    }
}
class order_status{
    constructor(order_number,status) {
        this.number=order_number;
        this.status=status;
        this.item=new Array();
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
order[1][0].item[0]="Fried Egg & Chicken Meat Noodle"
order[1][0].item[1]="Fried Rice with Prawn"
order[1][0].item[2]="7—UP"
order[0][0].item[0]="Fried Egg & Chicken Meat Noodle"
order[0][0].item[1]="Fried Rice with Prawn"
order[0][0].item[2]="7—UP"


food[0][0]=new item(" Fried Egg & Chicken Meat Noodle","N","n001",5.8,"Noodle with amazing XXX","F",0,true,true)
food[0][1]=new item(" Tomato Lamian","N","n002",6.8,"Noodle with amazing XXX","F",0,true,true)
food[0][2]=new item(" Curry Noodle","N","n003",8.4,"Noodle with amazing XXX","F",0,false,false)
food[1][0]=new item(" Fried Rice with Prawn","R","r001",6.8,"Rice with amazing XXX","F",0,false,true)
food[1][1]=new item(" Fried Mix Grain Rice in Hot Stone Pot","R","r002",8.4,"Rice with amazing XXX","F",0,false,true)
food[1][2]=new item(" Fried Rice with White Bait, Fish Meat and Egg White","R","r003",8.4,"Rice with amazing XXX","F",0,false,true)
food[2][0]=new item(" Pepsi","D","d001",1.4,"NA","F",0,false,false)
food[2][1]=new item(" 7—UP","D","d002",1.4,"NA","F",0,false,false)
food[4][0]=new item(" National Day Promotion: Fried Rice with Prawn 2x ,Curry Noodle 2x ,Pepsi 4x","S","sb001",20.00,"NA","L",20210810,false,false)

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
    console.log("Estimated Time Of Waiting: "+(Math.round(Math.random()*11+10)) + " Minutes");
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


    customer[i]=new Customer(temp_firstname,temp_lastname,temp_sex,temp_contact,temp_password,600000+i,0);
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
       console.log("               User not found in system ")
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

function order_screen(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Order System        ");
    if (guestlogin===false){
    console.log("                  "+time_identify()+" "+determind_call(currentlogin)+" " +customer[currentlogin].lastname);
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
function coupon_view(){
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
var a,b,c,d;
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
    console.log("\n");
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
}
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
            }
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
            case 5 :main_screen();break;
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
    console.log("[1] View an item's description [2]Back to previous screen ");
    console.log("*****************************************************\n")
    itemchoiceview1();
    function itemchoiceview1() {
        var itemchoicedes = input.questionInt("Choice: ")
        switch (itemchoicedes) {
            case 1:viewricedescription();break;
            case 2:category_item();break;
            default:
                console.log("Invalid Option");
                itemchoiceview1()
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
    }
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
    }
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
    }
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
                        main_screen();
                        break;
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
                console.log("     "+order[finalcall][finalorder].item[y])
                }
                console.log("              [1] Back to main menu")
                console.log("*****************************************************\n")
                choiceback();
                function choiceback() {
                    var choices = input.questionInt("Choice: ")
                    switch (choices){
                        case 1:
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
var foundsearch=false;
function search_item(){
    foundsearch=false;
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 ");
    console.log("                     Fuzzy Search\n")
    console.log("*****************************************************\n");
    var search=input.question("Search: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("       The NiceMeal Restaurant Ordering System        ");
    console.log("               Quality you can taste.                 \n");
    for (var s=0;s<food.length;s++){
        for (var v=0;v<food[s].length;v++){
            if (food[s][v].item_name.indexOf(search)>0){
                foundsearch=true;
                console.log(food[s][v].item_code+". "+food[s][v].item_name+"==>"+"$"+food[s][v].item_price.toFixed(2))
            }
        }
    }
    console.log("\n")
    if (foundsearch===false){
    console.log("                    Not Found\n");

    }
    console.log("    [1] Another search [2] Return back to main\n")
    console.log("*****************************************************\n")
    retrysearch();
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

