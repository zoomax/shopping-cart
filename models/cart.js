

function Cart(oldCart) {
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalQty = oldCart.totalQty || 0;
    this.items = oldCart.items || [];


    this.add = function (item, itemId) {
        let itemIndex = this.items.findIndex((item) => {
            return item._id == itemId;
        });
        console.log(itemIndex);
        if (itemIndex != -1) {
            this.items[itemIndex].qty++
            this.totalQty++
            this.totalPrice += this.items[itemIndex].price
        } else {
            let  newItem ={...item._doc , qty : 1} ; 
            this.items.push(newItem);
            this.totalQty++ ; 
            this.totalPrice += item.price;

        }
    }
    this.generateArray  = function () {
        const array  = [] ; 
        this.items.forEach(element => {
            array.push(element) ; 
        }); 
        return array ; 
    }

}


module.exports = Cart ; 