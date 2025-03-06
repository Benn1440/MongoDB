const mongoose = require('mongoose');
// const { Schema } = mongoose;

mongoose.connect(
    'mongodb+srv://benokafor67:<femopassword>@cluster0.j47i7.mongodb.net/'
).then(()=>console.log('Database Connected Successfully')).catch((err)=>{
    console.log('Connection not Successful', err)
});

const musicSchema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: { type: Date, default: Date.now}
    // meta: {
    //   votes: Number,
    //   favs: Number
    // }
  });

  //create Album Model
const Music = mongoose.model('Music', musicSchema);

async function runQueryExamples() {
  try{
    const newMusic = await Music.create({
      title: "Not Like Us", 
      author: "Kendrick Lamal",
      age: 3,
      isActive: true,
      tags: ['nfl', 'half-time', 'super bowl'],
    });
    console.log('Music Album', newMusic);

  const getAllMusic = await Music.find({isActive: true});
  console.log('All Users Album', getAllMusic);

  //Get Music by Id
  const getMusicById = await Music.findById(newMusic._id);
  console.log('User ID retrieved', getMusicById );

  //select specific fields
  const selectSpecificMusic = await Music.find().select('title - _id ');
  console.log('selectSpecificMusic', selectSpecificMusic );

  // Update Music
  const updateMusic = await Music.findByIdAndUpdate(newMusic._id, {
    $set: {age: 15}, 
    $push: {tags: 'USA'}
  },{new: true});
  
  console.log('Updated Music', updateMusic);

  }catch(err){
    console.log('Error', err);
  }finally{
    await mongoose.connection.close()
  }
}

runQueryExamples();