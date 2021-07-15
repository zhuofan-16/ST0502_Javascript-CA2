var input =require('readline-sync');

function progress_bar() {
    for (let i = 0; i <= 50; i++) {
        const progress = ">".repeat(i)
        const left = 50 - i
        const empty = " ".repeat(left)
        process.stdout.write(`\r[${progress}${empty}] ${i * 2}%`)

    }

}
function times(){
    var time=new Date();
    console.log(time.toUTCString());
}

function start_up(){
    console.log("***************************************************\n")
    console.log("The NiceMeal Restaurant Ordering System");
    console.log("Quality you can taste.\n")
    times();
    console.log("System loading,please wait...\n")
    console.log("***************************************************\n")

}
function main_screen(){
    console.log("***************************************************\n")
    console.log("The NiceMeal Restaurant Ordering System");
    console.log("Quality you can taste.\n")
    console.log("1.Customer Login                        2.Guest Login");
    console.log("3.Customer Registration          4.Current Promotions");
    console.log("5.Our Menu                           6.Track An Order");
    console.log("5.Admin Login                                  6.Help");
    console.log("7.Exit                                8.About Program");
    console.log("***************************************************\n")
    var choice=input.questionInt("Your Choice")
}

start_up();
main_screen();

