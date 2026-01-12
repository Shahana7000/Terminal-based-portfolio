const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Education = require('../models/Education');
const TechStack = require('../models/TechStack');
const Experience = require('../models/Experience');
const Resume = require('../models/Resume');

// --- CRUD: PROJECTS ---
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/projects', async (req, res) => {
    const project = new Project(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/projects/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- CRUD: EDUCATION ---
router.get('/education', async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/education', async (req, res) => {
    const education = new Education(req.body);
    try {
        const newEducation = await education.save();
        res.status(201).json(newEducation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/education/:id', async (req, res) => {
    try {
        const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/education/:id', async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- CRUD: TECH STACK ---
router.get('/techstack', async (req, res) => {
    try {
        const techStack = await TechStack.find();
        res.json(techStack);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/techstack', async (req, res) => {
    const techStack = new TechStack(req.body);
    try {
        const newTechStack = await techStack.save();
        res.status(201).json(newTechStack);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/techstack/:id', async (req, res) => {
    try {
        const updated = await TechStack.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/techstack/:id', async (req, res) => {
    try {
        await TechStack.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tech Stack deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- CRUD: EXPERIENCE ---
router.get('/experience', async (req, res) => {
    try {
        const experience = await Experience.find();
        res.json(experience);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/experience', async (req, res) => {
    const experience = new Experience(req.body);
    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/experience/:id', async (req, res) => {
    try {
        const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/experience/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- CRUD: RESUME ---
router.get('/resume', async (req, res) => {
    try {
        // Just return the first active resume link
        const resume = await Resume.findOne();
        res.json(resume || { link: '#' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/resume', async (req, res) => {
    try {
        // We only want one resume, so delete existing and create new
        await Resume.deleteMany({});
        const resume = new Resume(req.body);
        const newResume = await resume.save();
        res.status(201).json(newResume);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Auth (Simple)
router.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === 'admin123') { // Simple hardcoded password
        res.json({ success: true, token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// Seed Data Endpoint (GET for easier browser access)
router.get('/seed', async (req, res) => {
    try {
        await Project.deleteMany({});
        await Education.deleteMany({});
        await TechStack.deleteMany({});
        await Experience.deleteMany({});

        const projects = [
            {
                title: "Terminal Portfolio",
                description: "A highly interactive, Mac-terminal styled portfolio website built with MERN stack. Features command-line navigation and rich UI animations.",
                techBucket: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
                link: "#"
            },
            {
                title: "E-Commerce Platform",
                description: "Full-featured shopping platform with cart, payment gateway integration, and admin dashboard.",
                techBucket: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
                link: "#"
            },
            {
                title: "Task Management App",
                description: "Real-time task collaboration tool with drag-and-drop kanban boards and team chat.",
                techBucket: ["Vue.js", "Firebase", "Vuex"],
                link: "#"
            }
        ];

        const education = [
            {
                institution: "Stanford University",
                degree: "Master of Science in Computer Science",
                year: "2022-2024",
                details: "Specialized in Artificial Intelligence. Research paper on Neural Networks published."
            },
            {
                institution: "University of Technology",
                degree: "Bachelor of Engineering in Software",
                year: "2018-2022",
                details: "Graduated with Honors. Sentinel Project Lead."
            }
        ];

        const techStack = [
            { category: "Frontend", items: ["React", "Next.js", "Vue", "Tailwind", "Framer Motion"] },
            { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "GraphQL"] },
            { category: "Database", items: ["MongoDB", "PostgreSQL", "Redis"] },
            { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Git"] }
        ];

        const experience = [
            {
                role: "Senior Software Engineer",
                company: "Tech Corp Inc.",
                duration: "2024 - Present",
                description: "Leading a team of 5 developers building scalable cloud solutions. Reduced server costs by 30%."
            },
            {
                role: "Full Stack Developer",
                company: "Creative Startups LLC",
                duration: "2022 - 2024",
                description: "Developed and launched 3 major web applications. Implemented real-time features using WebSockets."
            }
        ];

        await Project.insertMany(projects);
        await Education.insertMany(education);
        await TechStack.insertMany(techStack);
        await Experience.insertMany(experience);

        res.json({ message: "Database Seeded with Expanded Data" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
