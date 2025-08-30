import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const PROJECTS_COLLECTION = 'projects';

// Fallback data for when Firebase is not configured
const fallbackProjects = [
  {
    id: "1",
    image: "https://i.ibb.co/ZMqR4VJ/image.png",
    title: "Radio Neptune",
    description: "Stream your favorite Nepali radio stations online, anytime, anywhere!",
    link: "https://nep-tune.web.app/",
    gitLink: "https://github.com/MandipKumarKanu/radio-station",
    tags: ["React", "Firebase", "Streaming"],
    category: "Personal",
    isLive: true
  },
  {
    id: "2",
    image: "https://i.ibb.co/bXknhxR/image.png",
    title: "Library Management System",
    description: null,
    note: "Demo credentials: test@gmail.com / test123",
    link: "https://library-management-system-tan.vercel.app/login",
    gitLink: "https://github.com/MandipKumarKanu/library-management-system",
    tags: ["React", "Firebase", "Auth"],
    category: "Personal",
    isLive: true
  },
  {
    id: "3",
    image: "https://i.ibb.co/T46J8jz/image.png",
    title: "Ur Weather",
    description: "A sleek and minimalist app delivering real-time weather updates effortlessly.",
    link: "https://ur-weather.web.app/",
    gitLink: "https://github.com/MandipKumarKanu/ur-weather",
    tags: ["React", "Weather API", "React Query"],
    category: "Personal",
    isLive: true
  }
];

export const addProject = async (projectData) => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please set up your environment variables.');
  }
  
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...projectData };
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

// Get all projects
export const getProjects = async () => {
  if (!isFirebaseConfigured) {
    console.warn('Firebase not configured, returning fallback projects');
    return fallbackProjects;
  }
  
  try {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects.length > 0 ? projects : fallbackProjects;
  } catch (error) {
    console.error('Error getting projects:', error);
    console.warn('Falling back to default projects');
    return fallbackProjects;
  }
};

// Update a project
export const updateProject = async (projectId, projectData) => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please set up your environment variables.');
  }
  
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: new Date()
    });
    return { id: projectId, ...projectData };
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please set up your environment variables.');
  }
  
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
    return projectId;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
