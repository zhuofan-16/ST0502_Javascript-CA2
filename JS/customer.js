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
module.exports=Customer;