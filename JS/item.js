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
module.exports=item;