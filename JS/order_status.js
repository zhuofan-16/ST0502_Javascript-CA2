class order_status{
    constructor(order_number,status,cost) {
        this.number=order_number;
        this.status=status;
        this.item=new Array();
        this.cost=cost
    }
}
module.exports=order_status;