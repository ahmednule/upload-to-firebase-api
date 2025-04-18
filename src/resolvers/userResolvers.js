import prisma from "../context.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const userResolvers = {
    Mutation:{
        signup: async(_, {email, name, password}) => {
            if(!email || !password) 
                throw new Error("Email and password are required fields")
            try {
                const hashedpassword = await bcrypt.hash(password, 10)
                const user = await prisma.user.create({
                    data:{
                        email, name, password: hashedpassword
                    }
                })
                const token = await jwt.sign({userId: user.id}, process.env.JWT_SECRET || "make-sure-to-add-the-scret-key")
                return ({
                    user, token
                })
                
            } catch (error) {
                console.log(error.message)
            }
        },
        login:async(_, {email, password}) =>{
            if(!email || !password) throw new Error("Email or Password Is Missing")
                try {
                  const user = await prisma.user.findUnique({
                    where:{email}
                  }) 
                  if(!user) throw new Error("User does not exist")
                    const validPassword = await bcrypt.compare(password, user.password)
                if (!validPassword) throw new Error("Password is Wrong")
                    const token = await jwt.sign({userId:user.id}, process.env.JWT_SECRET || "make sure you add the jwt secret key")
                return({user, token})
                } catch (error) {
                    console.log(error.message)
                }
        }
    },
    Query:{
        users: async() => {
            const users = await prisma.user.findMany({})
            return users
        },
        user: async(_, {id}) => {
            try {
                const user = await prisma.user.findUnique({where:{id}})
                if (!user) throw new Error("The user does not exist")
                    const token =  await jwt.sign({userId:user.id}, process.env.JWT_SECRET || "make sure you add the jwt secret key")
                return ({user, token})
            } catch (error) {
                console.log(error.message)
            }
        }
    }
}

export default userResolvers;