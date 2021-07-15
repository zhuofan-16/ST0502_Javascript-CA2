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
    console.log('\x1Bc')
    console.log("*****************************************************\n")
    console.log("The NiceMeal Restaurant Ordering System");
    console.log("Quality you can taste.\n")
    times();
    console.log("System loading,please wait...\n")
    console.log("*****************************************************\n")
    wait(2000);

}
function aboutprogram(){
    console.log('\x1Bc')
    console.log("*****************************************************\n")
    console.log("Project Name:The NiceMeal Restaurant Ordering System");
    console.log(" Module Name: ST0502 : Fundamentals Of Programming ")
    console.log("          Module Lecturer: Ms Junie Tan ")
    console.log("Student Name: CHEN ZHUOFAN |  Singapore Polytechnic")
    console.log("             Student ID: P2100746")
    console.log("          Program Language: Javascript")
    console.log(" [1] Next page    [2] Back to main menu     [3] Exit\n")
    console.log("*****************************************************")
}
function main_screen(){
    console.log('\x1Bc')
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
            process.exit(0)
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

