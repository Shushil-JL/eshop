const User = require("../schemas/user");

const cloudinary = require('cloudinary')

exports.register = async (req, res) => {
    try {
// console.log(req.body)
        const { avatar, fname,lname, email, password,contact } = req.body;
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({
            success: false,
            meessage: "User already exists"

        })
        // const myCloud = await cloudinary.uploader.upload(avatar, {
        //     folder: "Avatars"
        // })

        user = await User.create({
            name:{
                fname:fname,
                lname:lname},email, password, avatar: {
                // public_id: myCloud.public_id,
                public_id: "myCloud.public_id",

                url: "https://media.istockphoto.com/id/1419532732/photo/diversity-in-working-team-using-internet-on-phones-and-digital-tablet-for-teamwork-growth-in.webp?b=1&s=612x612&w=0&k=20&c=PWbQL27aT7woHwQT34m2SGG7nZ4cz64UmCoRY7xWMms="
                // url: myCloud.secure_url
            },
            contact
        })
        const token = await user.generateToken()

        res.status(201).cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).json({
            success: true,
            user,
            token,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body


        const user = await User.findOne({ email }).select("+password")
        // .populate("posts followers following")
        if (!user) {
            return res.status(400).json({
                success: false,
                messsage: "User doesnot exist"
            })
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }


        const token = await user.generateToken()

        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).json({
            success: true,
            user,
            token,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.logout = (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "Logged Out Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}