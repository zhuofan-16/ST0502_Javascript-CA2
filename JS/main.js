var input =require('readline-sync');
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}


function times(){
    var time=new Date();
    console.log(time.toUTCString()+"\n");
}

function start_up(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("The NiceMeal Restaurant Ordering System");
    console.log("Quality you can taste.\n")
    times();
    console.log("System loading,please wait...\n")
    console.log("*****************************************************\n")
    wait(2000);

}
function aboutprogrampage2(){
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
    function aboutuseroption2(){
        var choice=input.questionInt("Your Choice: ");
        switch (choice){
            case 1:
                main_screen();
                break;
            case 2:
                process.exit(0);
                break;
            default:
                aboutuseroption2();
                break;

        }
    }
    aboutuseroption2()
}
function aboutprogram(){

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
    function aboutuseroption(){
        var choice=input.questionInt("Your Choice: ");
        switch (choice){
            case 1:
                aboutprogrampage2();
                break;
            case 2:
                main_screen();
                break;
            case 3:
                process.exit(0);
                break;
            default:
                aboutuseroption();
                break;

        }
    }
    aboutuseroption()
}
function main_screen(){
    process.stdout.write('\033c')
    console.log("*****************************************************\n")
    console.log("The NiceMeal Restaurant Ordering System");
    console.log("Quality you can taste.")
    times();
    console.log("1.Customer Login                        2.Guest Login");
    console.log("3.Customer Registration          4.Current Promotions");
    console.log("5.Our Menu                           6.Track An Order");
    console.log("5.Admin Login                                  6.Help");
    console.log("7.Exit                                8.About Program\n");
    console.log("*****************************************************\n")
    function userselection(){
    var choice=input.questionInt("Your Choice: ");
    switch (choice){
        case 1:break;
        case 2:break;
        case 3:break;
        case 4:break;
        case 5:break;
        case 6:break;
        case 7:
            process.exit(0);
            break;
        case 8:
            aboutprogram();
            break;
        default: userselection();break;
    }

    }
    userselection();
}

start_up();
main_screen();

