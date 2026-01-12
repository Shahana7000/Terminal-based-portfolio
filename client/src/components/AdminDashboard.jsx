import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Ensure the URL ends with /api if it doesn't already
const API_URL = baseApiUrl.endsWith('/api') ? baseApiUrl : `${baseApiUrl}/api`;

const AdminDashboard = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('projects');
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({});
    const [editingId, setEditingId] = useState(null);

    const checkAuth = async () => {
        if (!password && !token) return;
        try {
            if (!token) {
                const res = await axios.post(`${API_URL}/login`, { password });
                if (res.data.success) {
                    setToken(res.data.token);
                    localStorage.setItem('token', res.data.token);
                }
            }
        } catch (e) {
            alert('Invalid Password');
        }
    };

    const fetchData = async () => {
        if (!token) return;
        try {
            const res = await axios.get(`${API_URL}/${activeTab}`);
            if (activeTab === 'resume') {
                // Resume is a single object, but we use an array for consistent state
                setItems([res.data]);
                // Pre-fill form if resume exists
                if (res.data && res.data.link) {
                    setFormData({ link: res.data.link });
                }
            } else {
                setItems(res.data);
            }
        } catch (e) {
            console.error(e);
            setItems([]);
        }
    };

    useEffect(() => {
        fetchData();
        setFormData({});
        setEditingId(null);
    }, [token, activeTab]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        await axios.delete(`${API_URL}/${activeTab}/${id}`);
        fetchData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/${activeTab}/${editingId}`, formData);
            } else {
                await axios.post(`${API_URL}/${activeTab}`, formData);
            }
            setFormData({});
            setEditingId(null);
            fetchData();
        } catch (err) {
            alert('Error saving data');
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        const { _id, __v, ...data } = item;
        setFormData(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Handle arrays (split by comma)
        if (['techBucket', 'items'].includes(name)) {
            setFormData({ ...formData, [name]: value.split(',') });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    if (!token) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black relative overflow-hidden font-mono">
                {/* Background Effects */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-bounce"></div>
                <div className="scanline"></div>

                <div className="relative z-10 p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">Admin Access</h2>
                    <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-widest">Restricted Area</p>

                    <form onSubmit={(e) => { e.preventDefault(); checkAuth(); }} className="space-y-6">
                        <div className="relative group">
                            <input
                                type="password"
                                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-center tracking-widest"
                                placeholder="ENTER PASSWORD"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg transform active:scale-95 transition-all mb-4"
                        >
                            UNLOCK SYSTEM
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <a href="/" className="text-xs text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-gray-500 pb-1">Return to Terminal</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black relative font-mono text-gray-200 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/05 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="scanline"></div>

            <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/5 p-4 rounded-lg border border-white/10 backdrop-blur-md">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Admin Dashboard</h1>
                    <button
                        onClick={() => { setToken(''); localStorage.removeItem('token'); }}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
                    {['projects', 'education', 'experience', 'techstack', 'resume'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`capitalize px-6 py-2 rounded-t-lg transition-all ${activeTab === tab ? 'bg-blue-600/20 text-blue-300 border border-blue-500/50 border-b-0' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 sticky top-8">
                            <h2 className="text-xl mb-6 text-blue-300 font-bold border-b border-white/10 pb-2 flex items-center">
                                <span className="mr-2">{editingId ? '⚡ Edit Item' : '✨ Add New Item'}</span>
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {activeTab === 'projects' && (
                                    <>
                                        <input name="title" placeholder="Title" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.title || ''} onChange={handleInputChange} />
                                        <textarea name="description" placeholder="Description" required rows="4" className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.description || ''} onChange={handleInputChange} />
                                        <input name="techBucket" placeholder="Tech (comma separated)" className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.techBucket || ''} onChange={handleInputChange} />
                                        <input name="link" placeholder="Link" className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.link || ''} onChange={handleInputChange} />
                                    </>
                                )}
                                {activeTab === 'education' && (
                                    <>
                                        <input name="institution" placeholder="Institution" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.institution || ''} onChange={handleInputChange} />
                                        <input name="degree" placeholder="Degree" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.degree || ''} onChange={handleInputChange} />
                                        <input name="year" placeholder="Year" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.year || ''} onChange={handleInputChange} />
                                        <textarea name="details" placeholder="Details" className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.details || ''} onChange={handleInputChange} />
                                    </>
                                )}
                                {activeTab === 'experience' && (
                                    <>
                                        <input name="role" placeholder="Role" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.role || ''} onChange={handleInputChange} />
                                        <input name="company" placeholder="Company" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.company || ''} onChange={handleInputChange} />
                                        <input name="duration" placeholder="Duration" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.duration || ''} onChange={handleInputChange} />
                                        <textarea name="description" placeholder="Description" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.description || ''} onChange={handleInputChange} />
                                    </>
                                )}
                                {activeTab === 'techstack' && (
                                    <>
                                        <input name="category" placeholder="Category" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.category || ''} onChange={handleInputChange} />
                                        <input name="items" placeholder="Items (comma separated)" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.items || ''} onChange={handleInputChange} />
                                    </>
                                )}
                                {activeTab === 'resume' && (
                                    <>
                                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded mb-4 text-sm text-yellow-200">
                                            Paste your Google Drive or external resume link here.
                                        </div>
                                        <input name="link" placeholder="https://drive.google.com/..." required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-blue-500 outline-none transition-colors" value={formData.link || ''} onChange={handleInputChange} />
                                    </>
                                )}
                                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3 rounded text-white font-bold shadow-lg transform active:scale-95 transition-all">
                                    {activeTab === 'resume' ? 'Update Resume Link' : (editingId ? 'Update Item' : 'Create Item')}
                                </button>
                                {editingId && activeTab !== 'resume' && <button type="button" onClick={() => { setEditingId(null); setFormData({}); }} className="w-full bg-white/10 hover:bg-white/20 py-2 rounded text-gray-300 mt-2 transition-colors">Cancel Edit</button>}
                            </form>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2 space-y-4 pb-20">
                        {(!items || items.length === 0) && (
                            <div className="text-center py-20 text-gray-500 bg-white/5 rounded-xl border border-white/5 border-dashed">
                                No items found. Start adding some!
                            </div>
                        )}
                        {Array.isArray(items) && items.map(item => (
                            <div key={item._id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group relative">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 pr-4">
                                        <h3 className="font-bold text-xl text-blue-300 mb-2">
                                            {item.title || item.institution || item.role || item.category || (activeTab === 'resume' ? 'Current Resume Link' : '')}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed break-all">
                                            {activeTab === 'resume' ? item.link : (item.description || item.degree || item.company || (item.items && item.items.join(', ')))}
                                        </p>
                                        {(item.year || item.duration) && (
                                            <span className="inline-block mt-3 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/20">
                                                {item.year || item.duration}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col space-y-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity absolute top-4 right-4 sm:static">
                                        <button onClick={() => handleEdit(item)} className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
