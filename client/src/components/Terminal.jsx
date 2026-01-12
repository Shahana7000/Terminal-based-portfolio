import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Terminal = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([
        { type: 'info', content: 'Welcome to Terminal Portfolio v1.0.0' },
        { type: 'info', content: 'Type "help" to see available commands.' }
    ]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const handleCommand = async (cmd) => {
        const newOutput = [...output, { type: 'command', content: `> ${cmd}` }];
        const lowerCmd = cmd.toLowerCase().trim();

        if (lowerCmd === 'clear') {
            setOutput([]);
            return;
        }

        if (lowerCmd === 'help') {
            newOutput.push({ type: 'component', component: <HelpMenu /> });
        } else if (lowerCmd === 'projects') {
            try {
                const res = await axios.get(`${API_URL}/projects`);
                newOutput.push({ type: 'component', component: <ProjectList projects={res.data} /> });
            } catch (e) {
                newOutput.push({ type: 'error', content: 'Failed to fetch projects.' });
            }
        } else if (lowerCmd === 'education') {
            try {
                const res = await axios.get(`${API_URL}/education`);
                newOutput.push({ type: 'component', component: <EducationList education={res.data} /> });
            } catch (e) {
                newOutput.push({ type: 'error', content: 'Failed to fetch education.' });
            }
        } else if (lowerCmd === 'techstack') {
            try {
                const res = await axios.get(`${API_URL}/techstack`);
                newOutput.push({ type: 'component', component: <TechStackList techStack={res.data} /> });
            } catch (e) {
                newOutput.push({ type: 'error', content: 'Failed to fetch tech stack.' });
            }
        } else if (lowerCmd === 'experience') {
            try {
                const res = await axios.get(`${API_URL}/experience`);
                newOutput.push({ type: 'component', component: <ExperienceList experience={res.data} /> });
            } catch (e) {
                newOutput.push({ type: 'error', content: 'Failed to fetch experience.' });
            }
        } else if (lowerCmd === 'resume') {
            try {
                const res = await axios.get(`${API_URL}/resume`);
                if (res.data && res.data.link && res.data.link !== '#') {
                    window.open(res.data.link, '_blank');
                    newOutput.push({ type: 'success', content: 'Opening resume...' });
                } else {
                    newOutput.push({ type: 'error', content: 'Resume link not set by admin.' });
                }
            } catch (e) {
                newOutput.push({ type: 'error', content: 'Failed to fetch resume.' });
            }
        } else {
            newOutput.push({ type: 'error', content: `Command not found: ${cmd}` });
        }

        setOutput(newOutput);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    return (
        <div className="relative w-full max-w-[900px] h-[600px] bg-black/60 terminal-window rounded-xl overflow-hidden border border-white/10 flex flex-col font-mono text-sm sm:text-base mx-4">
            <div className="scanline"></div>

            {/* MAC HEADER */}
            <div className="h-9 bg-white/5 backdrop-blur-md flex items-center px-4 space-x-2 border-b border-white/5 select-none z-20">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors shadow-sm cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors shadow-sm cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors shadow-sm cursor-pointer"></div>
                <div className="flex-1 text-center text-white/40 text-xs font-semibold tracking-wide">user@portfolio:~</div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto text-gray-200 scrollbar-hide z-10" onClick={() => inputRef.current?.focus()}>
                {output.map((line, i) => (
                    <div key={i} className="mb-2">
                        {line.type === 'component' ? (
                            line.component
                        ) : (
                            <div className={`${line.type === 'error' ? 'text-red-400' : line.type === 'command' ? 'text-blue-400 font-bold' : 'text-gray-300'} whitespace-pre-wrap glow-text`}>
                                {line.content}
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex items-center mt-4">
                    <span className="text-green-400 mr-3 font-bold">➜</span>
                    <span className="text-blue-400 mr-3 font-bold">~</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-white/90 flex-1 font-mono text-lg caret-white"
                        autoFocus
                        autoComplete="off"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

/* Sub-components for Rich UI */
const HelpMenu = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2 p-4 bg-white/5 rounded border border-white/10">
        <div><span className="text-yellow-400 font-bold">projects</span> - View my work</div>
        <div><span className="text-yellow-400 font-bold">education</span> - My academic background</div>
        <div><span className="text-yellow-400 font-bold">experience</span> - My professional journey</div>
        <div><span className="text-yellow-400 font-bold">techstack</span> - Skills & Technologies</div>
        <div><span className="text-yellow-400 font-bold">resume</span> - View my Resume</div>
        <div><span className="text-yellow-400 font-bold">clear</span> - Clear terminal</div>
    </div>
);

const ProjectList = ({ projects }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {projects.map((p, i) => (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="p-4 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors cursor-pointer group"
            >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-blue-300 group-hover:text-blue-200">{p.title}</h3>
                    <span className="text-xs text-gray-500 bg-black/20 px-2 py-1 rounded">Project</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                    {p.techBucket.map((t, j) => (
                        <span key={j} className="text-xs text-yellow-500/80 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">{t}</span>
                    ))}
                </div>
            </motion.div>
        ))}
    </div>
);

const EducationList = ({ education }) => (
    <div className="space-y-4 my-4">
        {education.map((e, i) => (
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="flex items-start bg-white/5 p-4 rounded border-l-4 border-green-500"
            >
                <div>
                    <h3 className="text-green-400 font-bold text-lg">{e.institution}</h3>
                    <p className="text-gray-300 text-base">{e.degree}</p>
                    <p className="text-gray-500 text-sm italic">{e.year}</p>
                </div>
            </motion.div>
        ))}
    </div>
);

const TechStackList = ({ techStack }) => (
    <div className="space-y-6 my-4">
        {techStack.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>
                <h3 className="text-pink-400 font-bold border-b border-pink-500/30 pb-1 mb-3 inline-block">{t.category}</h3>
                <div className="flex flex-wrap gap-3">
                    {t.items.map((item, j) => (
                        <span key={j} className="px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all text-sm">
                            {item}
                        </span>
                    ))}
                </div>
            </motion.div>
        ))}
    </div>
);

const ExperienceList = ({ experience }) => (
    <div className="space-y-6 my-4">
        {experience.map((exp, i) => (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="relative pl-6 border-l-2 border-purple-500/30"
            >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#1d1f21]"></div>
                <h3 className="text-purple-400 font-bold text-lg leading-none mb-1">{exp.role}</h3>
                <h4 className="text-gray-300 text-md font-semibold mb-1">{exp.company}</h4>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">{exp.duration}</p>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[90%]">{exp.description}</p>
            </motion.div>
        ))}
    </div>
);

export default Terminal;
