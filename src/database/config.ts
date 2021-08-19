import mongoose from 'mongoose';

const dbConnection = async() => {
    const cnn:string = process.env.DB_CNN_STRING || '';
    try {
        
        await mongoose.connect( cnn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - vea logs');
    }
}

export default dbConnection;