const mongoose=require('mongoose')
const {Schema}=mongoose;

const bookingSchema=new Schema({
owner:String,
resident:String,
 _id:String,
checkingDate:Date,
checkoutDate:Date,
checkinTime: String,
checkoutTime: String

})

const bookModel=mongoose.model('Book',bookingSchema);

module.exports=bookModel;