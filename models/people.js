const mongoose=require("mongoose")
const peopleSchema=mongoose.Schema(
    {
        fullname:{type:String,required:true},
        phone:{type:Number,required:true},
        village:{type:String,required:true},
        place:{type:String,required:true},
        pincode:{type:Number,required:true},
        houseNo:{type:Number,required:true},
        missingdate:{type:Date,required:true},
        aadharNo:{type:Number,required:true},
        gender:{type:String,required:true},
        age:{type:Number,required:true}
    }
)
const peopleModel=mongoose.model("missingpeople",peopleSchema)
module.exports=peopleModel