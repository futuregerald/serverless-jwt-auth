import mongoose from 'mongoose';

export default (() => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 2,
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err, "couldn't connect"));
})();
