import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log(' MongoBD Connected successfully')
        })

        connection.on('error', err => {
            console.log(' MongoBD Connected err, please make sure MongoDB is running', err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong');
        console.log(error)
    }
}