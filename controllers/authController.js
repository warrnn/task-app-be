import User from "../models/user.js";
import { generateToken } from "../utils/helpers/authHelper.js";

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exits"
            });
        }

        const newUser = await User.create({ name, email, password })

        const token = generateToken(newUser._id);

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}