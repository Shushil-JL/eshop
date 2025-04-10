const user = require("../schemas/user");


exports.register = async (req, res) => {
    try {
console.log(req.body)
        const { avatar, name, email, password } = req.body;
        // let user = await User.findOne({ email })
        // if (user) return res.status(400).json({
        //     success: false,
        //     meessage: "User already exists"

        // })
        // const myCloud = await cloudinary.uploader.upload(avatar, {
        //     folder: "Avatars"
        // })

        // user = await User.create({
        //     name: `@${name}`, email, password, avatar: {
        //         public_id: myCloud.public_id,
        //         // url: "https://media.istockphoto.com/id/1419532732/photo/diversity-in-working-team-using-internet-on-phones-and-digital-tablet-for-teamwork-growth-in.webp?b=1&s=612x612&w=0&k=20&c=PWbQL27aT7woHwQT34m2SGG7nZ4cz64UmCoRY7xWMms="
        //         url: myCloud.secure_url
        //     }
        // })
        // const token = await user.generateToken()

        // res.status(201).cookie("token", token, {
        //     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        //     httpOnly: true,
        // }).json({
        //     success: true,
        //     user,
        //     token,
        // })
        res.json({
            success: true,
            name,
            email,
            password,
            message:"user registration success"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}