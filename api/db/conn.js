const mongoose=require('mongoose')
const db =process.env.DATABASE;

mongoose.connect(
  db,
  {
    useNewurlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("conneted to db");
  }
);

module.exports = mongoose