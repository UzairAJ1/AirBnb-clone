const mongoose=require('mongoose');
const {Schema}=mongoose

const placeSchema=new Schema({
// owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},    
owner:String,
title:String,
address:String,
photos:[String],
description:String,
perks:[String],
checkIn:Number,
checkOut:Number,
maxGuests:Number,
});

const placeModel=mongoose.model('Place',placeSchema);

module.exports=placeModel;
