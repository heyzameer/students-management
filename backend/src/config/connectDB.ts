import mongoose from 'mongoose'

const connectDB = async (mongoUrl: string) => {
    try {
        await mongoose.connect(mongoUrl)
        console.log(`DataBase connected successfully in port - ${mongoUrl}`)
    } catch (error: any) {
       console.log(`DataBese coneection failed - ${error.toString()}`)
    }
}

export default connectDB;