import React from "react";
import { motion } from "framer-motion";

// assets
import EmployeeImg from "../../assets/images/employee-bg.jpg";

const variants1 = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const variants2 = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            x: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        x: -500,
        opacity: 0,
        transition: {
            x: { stiffness: 1000 },
        },
    },
};
const variants3 = {
    open: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 500,
        x: 0,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

const Manucho = () => {
    return (
        <motion.div
            variants={variants1}
            className="container view-employee-details"
        >
            <motion.img src='manucho_ello.jpg' variants={variants2} />
            <motion.div variants={variants2} className="title">
                <h4>Emmanuel Ochieng</h4>
                <p>Software Developer</p>
                <span>( 2020 - Present )</span>
            </motion.div>
            <motion.div variants={variants3} className="description">
                <h3>What will I bring?</h3>
                <p style={{ textAlign: "left" }}>
                    I posses a wealth of work experience (3+ years) so you can expect high quality work from me
                </p>
                <ul>
                    <li>
                        I have experience mentoring junior developers (2) and guiding them on how to execute their tasks
                    </li>
                    <li>
                        Like this UI? Expect better to come
                    </li>
                    <li>Apart from the creative side of development, I am well adept in logical side. I have worked with full stack technologies like Remix</li>

                </ul>
            </motion.div>
            <motion.div variants={variants3} className="identity">
                <h3>Who I am?</h3>
                <p style={{ textAlign: "left" }}>
                    Well, I do have quite a number of qualities that I use to express meyself
                </p>
                <ul>
                    <li>
                        I'm a Chelsea fan (Tough times right now)
                    </li>
                    <li>
                        I love a bit of anime here and then
                    </li>
                    <li>Exercise is important to me. Healthy body, healthy mind right?</li>
                    <li>I take prefer tea over coffee compared to other developers</li>
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default Manucho;
