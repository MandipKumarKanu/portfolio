import { addProject } from "../firebase/projectService";

// Your project data
const projects = [
  {
    image: "https://i.ibb.co/BcZj8hb/image.png",
    title: "School Management System",
    description: "Interactive UI for School CRM",
    link: "https://mypathshala.lennobyte.com/",
    gitLink: null,
    tags: ["React", "Tailwind CSS"],
    category: "Professional",
    isLive: true,
  },
  {
    image: "https://i.ibb.co/qJtKpVJ/image.png",
    title: "Operation Record Book",
    description: "Interactive UI for hospital's operations record book",
    link: "https://operationrecord.lennobyte.com/",
    gitLink: null,
    tags: ["React", "Tailwind CSS"],
    category: "Professional",
    isLive: true,
  },
  {
    image: "https://i.ibb.co/x8w2jMx/image.png",
    title: "LennoLabs+",
    description: "Interactive UI for lab operations",
    link: "https://labsplus.lennobyte.com/",
    gitLink: null,
    tags: ["React", "Tailwind CSS"],
    category: "Professional",
    isLive: true,
  },
  {
    image: "https://i.ibb.co/ZTJKfPd/image.png",
    title: "Corporate Website",
    description: "Lennobyte Solutions corporate website",
    link: "https://lennobyte.com/",
    gitLink: null,
    tags: ["React"],
    category: "Professional",
    isLive: true,
  },
  {
    image: "https://i.ibb.co/bXknhxR/image.png",
    title: "Library Management System",
    description: "Demo credentials: test@gmail.com / test123", // Moving note to description
    note: "Demo credentials: test@gmail.com / test123",
    link: "https://library-management-system-tan.vercel.app/login",
    gitLink: "https://github.com/MandipKumarKanu/library-management-system",
    tags: ["React", "Firebase", "Auth"],
    category: "Personal",
    isLive: true,
  },
  {
    image: "https://i.ibb.co/511K9cW/image.png",
    title: "Remote Mouse Controller",
    description: "Turn your phone into a wireless trackpad for your computer",
    gitLink: "https://github.com/MandipKumarKanu/remote-mouse-controller",
    tags: ["Node.js", "Socket.io", "Mobile"],
    category: "Personal",
    isLive: false, // No live link, so marking as not live
  },
  {
    image: "https://i.ibb.co/T46J8jz/image.png",
    title: "Ur Weather",
    description:
      "A sleek and minimalist app delivering real-time weather updates effortlessly.",
    link: "https://ur-weather.web.app/",
    gitLink: "https://github.com/MandipKumarKanu/ur-weather",
    tags: ["React", "Weather API", "React Query"],
    category: "Personal",
    isLive: true,
  },

  {
    image: "https://i.ibb.co/ZMqR4VJ/image.png",
    title: "Radio Neptune",
    description:
      "Stream your favorite Nepali radio stations online, anytime, anywhere!",
    link: "https://nep-tune.web.app/",
    gitLink: "https://github.com/MandipKumarKanu/radio-station",
    tags: ["React", "Firebase", "Streaming"],
    category: "Personal",
    isLive: true,
  },
  {
    image: "https://i.ibb.co/rMrqwSs/image.png",
    title: "PustakBazzar",
    description:
      "PustakBazzar is a platform where you can buy, sell, rent, or donate books",
    link: "https://pustakbazzar.mandipkk.com.np//",
    gitLink: "https://github.com/MandipKumarKanu/pustakbazzar",
    tags: ["MERN", "E-commerce", "Payment"],
    category: "Personal",
    isLive: true,
  },
];

// Function to seed projects to Firebase
export const seedProjectsToFirebase = async () => {
  console.log("🚀 Starting to seed projects to Firebase...");

  const results = {
    success: [],
    failed: [],
  };

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    try {
      console.log(
        `📤 Adding project ${i + 1}/${projects.length}: ${project.title}`
      );
      const result = await addProject(project);
      results.success.push({ title: project.title, id: result.id });
      console.log(`✅ Successfully added: ${project.title}`);

      // Small delay to avoid overwhelming Firebase
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Failed to add project: ${project.title}`, error);
      results.failed.push({ title: project.title, error: error.message });
    }
  }

  console.log("\n📊 Seeding Results:");
  console.log(`✅ Success: ${results.success.length} projects`);
  console.log(`❌ Failed: ${results.failed.length} projects`);

  if (results.success.length > 0) {
    console.log("\n✅ Successfully added projects:");
    results.success.forEach((project) => {
      console.log(`  - ${project.title} (ID: ${project.id})`);
    });
  }

  if (results.failed.length > 0) {
    console.log("\n❌ Failed to add projects:");
    results.failed.forEach((project) => {
      console.log(`  - ${project.title}: ${project.error}`);
    });
  }

  return results;
};

// Function to run the seeding (can be called from browser console)
export const runSeed = () => {
  seedProjectsToFirebase()
    .then((results) => {
      console.log("🎉 Seeding completed!", results);
    })
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
    });
};
