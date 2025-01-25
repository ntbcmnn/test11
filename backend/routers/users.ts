import express from 'express';
import {Error} from 'mongoose';
import User from '../models/User';
import auth, {RequestWithUser} from '../middleware/auth';

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            display_name: req.body.display_name,
            phone_number: req.body.phone_number,
        });

        user.generateToken();

        await user.save();
        res.send({user, message: "Successfully registered"});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: 'Username not found'});
            return;
        }

        const isMatch = await user.comparePassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Wrong password'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Username and password are correct', user});

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;
    try {
        const user = await User.findOne({_id: userFromAuth._id});

        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: 'Successfully logged out'});
        }
    } catch (e) {
        next(e);
    }
});

export default usersRouter;