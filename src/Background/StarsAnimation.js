import React, { useRef, useEffect } from "react";
import "./StarsAnimation.css";

//constants
const PARTICLE_COUNT = 40;
const FLARE_COUNT = 10;
const MOTION = 0.0002;
const COLOR = "#0cc6fd";
const PARTICLE_SIZE_BASE = 1;
const PARTICLE_SIZE_MULTIPLIER = 0.5;
const FLARE_SIZE_BASE = 100;
const FLARE_SIZE_MULTIPLIER = 100;

const StarsAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let animationFrameId;

        //Variables
        const particles = [];
        const flares = [];
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;

        //utility functions
        const random = (min, max, float = false) =>
            float ? Math.random() * (max - min) + min : Math.floor(Math.random() * (max - min + 1)) + min;

        const resizeCanvas = () => {
            canvas.width = canvasWidth = window.innerWidth;
            canvas.height = canvasHeight = window.innerHeight;
        };

        const position = (x, y, z) => ({
            x: x * canvasWidth,
            y: y * canvasHeight,
            z,
        });

        //Particle class
        class Particle {
            constructor() {
                this.x = random(-0.1, 1.1, true);
                this.y = random(-0.1, 1.1, true);
                this.z = random(0, 4, true);
                this.opacity = random(0.1, 1, true);
                this.vx = random(-MOTION, MOTION, true); // Horizontal velocity
                this.vy = random(-MOTION, MOTION, true); // Vertical velocity
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Reset particle if it moves out of bounds
                if (this.x < -0.1 || this.x > 1.1 || this.y < -0.1 || this.y > 1.1) {
                    this.x = random(-0.1, 1.1, true);
                    this.y = random(-0.1, 1.1, true);
                }
            }

            render() {
                this.update();
                const { x, y, z } = position(this.x, this.y, this.z);
                const radius = (z * PARTICLE_SIZE_MULTIPLIER + PARTICLE_SIZE_BASE) * (canvasWidth / 1000);

                context.beginPath();
                context.globalAlpha = this.opacity;
                context.fillStyle = COLOR;
                context.arc(x, y, radius, 0, Math.PI * 2, false);
                context.fill();
                context.closePath();
            }
        }

        class Flare {
            constructor() {
                this.x = random(-0.25, 1.25, true);
                this.y = random(-0.25, 1.25, true);
                this.z = random(0, 2, true);
                this.opacity = random(0.01, 0.1, true);
                this.vx = random(-MOTION, MOTION, true);
                this.vy = random(-MOTION, MOTION, true);
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Reset flare if it moves out of bounds
                if (this.x < -0.25 || this.x > 1.25 || this.y < -0.25 || this.y > 1.25) {
                    this.x = random(-0.25, 1.25, true);
                    this.y = random(-0.25, 1.25, true);
                }
            }

            render() {
                this.update();
                const { x, y, z } = position(this.x, this.y, this.z);
                const radius = (z * FLARE_SIZE_MULTIPLIER + FLARE_SIZE_BASE) * (canvasWidth / 1000);

                context.beginPath();
                context.globalAlpha = this.opacity;
                context.fillStyle = COLOR;
                context.arc(x, y, radius, 0, Math.PI * 2, false);
                context.fill();
                context.closePath();
            }
        }

        //Initialize Particles and Flares
        const init = () => {
            particles.length = 0;
            flares.length = 0;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }

            for (let i = 0; i < FLARE_COUNT; i++) {
                flares.push(new Flare());
            }
        };

        //render loop
        const render = () => {
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            particles.forEach((Particle) => Particle.render());
            flares.forEach((Flare) => Flare.render());

            animationFrameId = requestAnimationFrame(render);
        };

        //resize listener
        const handleResize = () => {
            resizeCanvas();
            init();
        };

        //Set up canvas and animation
        resizeCanvas();
        init();
        render();
        window.addEventListener("resize", handleResize);

        //cleanup on component unmount
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return <canvas ref={canvasRef} className="stars-animation" />;
};

export default StarsAnimation;