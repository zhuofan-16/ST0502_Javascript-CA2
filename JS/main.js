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
    console.log("7.Exit                                8.About Program");
    console.log("*****************************************************\n")
    var choice=input.questionInt("Your Choice: ")
}

start_up();
main_screen();

