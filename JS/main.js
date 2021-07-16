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
        this.wrongpassword_attempt=0;
    }
}
class Admin{
    constructor(first_name,last_name,sex,contact,staff_no) {
        this.firstname=first_name;
        this.lastname=last_name;
        this.sex=sex;
        this.contact=contact;
        this.staffid=staff_no;
    }
}
var customer=new Array();
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
    var guest_firstname=input.question("Your First Name: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("*****************************************************\n")
    var guest_lastname=input.question("Your Last Name: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("*****************************************************\n")
    var guest_sex=input.question("Your Sex: (M/F) ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("*****************************************************\n")
    var guest_phone=input.question("Your Contact Number: ");
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("      The NiceMeal Restaurant Guest System        ");
    console.log("Estimated Time Of Waiting: "+(Math.round(Math.random()*11+10)) + " Minutes");
    console.log("*****************************************************\n")
    function guest_confirmation_prompt() {
        var guest_confirmation = input.question("Continue to order? (Y/N): ");
        if (guest_confirmation === "Y") {
            common_order();
        } else if (guest_confirmation === "N") {
            main_screen();
        } else {
            console.log("Invalid Option");
            guest_confirmation_prompt();
        }
    }
    guest_confirmation_prompt();

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
    var temp_contact=input.question("Your Contact Number: ");
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
function customer_login(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("         The NiceMeal Restaurant Login System        ");
    console.log("                Quality you can taste.               ");
    times();
    console.log("*****************************************************\n");
   var temploginid= input.questionInt("Please enter your contact Number or membership No.: ");
   for (var k=0;k<customer.length;k++){
       if (temploginid===customer[k].memberno || temploginid===customer[k].contact ){
           currentlogin=k;
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
function main_screen(){
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
            main_menu();
            break;
        case 6:
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

