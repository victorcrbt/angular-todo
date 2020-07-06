import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/angular-todo', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
