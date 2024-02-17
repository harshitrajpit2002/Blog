const mongoose = require('mongoose');

const dbconnection = async()=>{
    try {
      await mongoose.connect('mongodb+srv://rajputharshit37:o1a5tlHt4nJBjSOc@cluster1.rfmuxty.mongodb.net/?retryWrites=true&w=majority')
      console.log('database connectedd');
      
    } catch (error) {
      console.log(error);
    }
  
  }
  

  module.exports = dbconnection;