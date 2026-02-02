import { useState, useEffect } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import './styles.css';

export interface Project {
  id: number;
  name: string;
  description: string;
  perfectFor: string;
  features: string[];
  repoUrl: string;
  demoUrl: string;
  stars: number;
  language: string;
  category: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS",
    perfectFor: "Building modern React apps with accessible, customizable UI components",
    features: ["Copy-paste components", "Full customization", "Dark mode support"],
    repoUrl: "https://github.com/shadcn/ui",
    demoUrl: "https://ui.shadcn.com",
    stars: 72400,
    language: "TypeScript",
    category: "UI"
  },
  {
    id: 2,
    name: "ollama/ollama",
    description: "Get up and running with Llama 3, Mistral, and other large language models locally",
    perfectFor: "Running LLMs on your local machine without cloud dependencies",
    features: ["One-command setup", "Model library", "REST API"],
    repoUrl: "https://github.com/ollama/ollama",
    demoUrl: "https://ollama.ai",
    stars: 98200,
    language: "Go",
    category: "AI/ML"
  },
  {
    id: 3,
    name: "abi/screenshot-to-code",
    description: "Drop in a screenshot and convert it to clean code (HTML/Tailwind/React)",
    perfectFor: "Rapidly prototyping UI from mockups and designs",
    features: ["GPT-4 Vision powered", "Multiple frameworks", "Real-time preview"],
    repoUrl: "https://github.com/abi/screenshot-to-code",
    demoUrl: "https://screenshottocode.com",
    stars: 62800,
    language: "Python",
    category: "AI/ML"
  },
  {
    id: 4,
    name: "janhq/jan",
    description: "An open source alternative to ChatGPT that runs 100% offline on your computer",
    perfectFor: "Privacy-focused AI chat without sending data to the cloud",
    features: ["Offline-first", "Open source", "Extension system"],
    repoUrl: "https://github.com/janhq/jan",
    demoUrl: "https://jan.ai",
    stars: 24100,
    language: "TypeScript",
    category: "AI/ML"
  },
  {
    id: 5,
    name: "electric-sql/pglite",
    description: "Lightweight Postgres packaged as a WASM module for browser and Node.js",
    perfectFor: "Running real PostgreSQL queries directly in the browser",
    features: ["Full Postgres", "WASM powered", "Zero dependencies"],
    repoUrl: "https://github.com/electric-sql/pglite",
    demoUrl: "https://pglite.dev",
    stars: 9800,
    language: "TypeScript",
    category: "Database"
  },
  {
    id: 6,
    name: "heyform/heyform",
    description: "Open-source form builder that allows anyone to create engaging forms",
    perfectFor: "Creating surveys and forms without coding knowledge",
    features: ["40+ field types", "Logic jumps", "Analytics dashboard"],
    repoUrl: "https://github.com/heyform/heyform",
    demoUrl: "https://heyform.net",
    stars: 7200,
    language: "TypeScript",
    category: "Tools"
  },
  {
    id: 7,
    name: "twentyhq/twenty",
    description: "A modern open-source CRM. Alternative to Salesforce",
    perfectFor: "Teams wanting a self-hosted, customizable CRM solution",
    features: ["GraphQL API", "Custom objects", "Email sync"],
    repoUrl: "https://github.com/twentyhq/twenty",
    demoUrl: "https://twenty.com",
    stars: 23400,
    language: "TypeScript",
    category: "Tools"
  },
  {
    id: 8,
    name: "dubinc/dub",
    description: "Open-source link management infrastructure for modern marketing teams",
    perfectFor: "Creating branded short links with advanced analytics",
    features: ["Custom domains", "Analytics", "API-first"],
    repoUrl: "https://github.com/dubinc/dub",
    demoUrl: "https://dub.co",
    stars: 19200,
    language: "TypeScript",
    category: "Tools"
  },
  {
    id: 9,
    name: "coollabsio/coolify",
    description: "An open-source & self-hostable Heroku / Netlify / Vercel alternative",
    perfectFor: "Self-hosting apps without vendor lock-in",
    features: ["One-click deploy", "Auto SSL", "Database hosting"],
    repoUrl: "https://github.com/coollabsio/coolify",
    demoUrl: "https://coolify.io",
    stars: 35600,
    language: "PHP",
    category: "DevOps"
  },
  {
    id: 10,
    name: "n8n-io/n8n",
    description: "Fair-code workflow automation tool with 400+ integrations",
    perfectFor: "Automating workflows without expensive SaaS subscriptions",
    features: ["Self-hostable", "400+ integrations", "Code when needed"],
    repoUrl: "https://github.com/n8n-io/n8n",
    demoUrl: "https://n8n.io",
    stars: 51200,
    language: "TypeScript",
    category: "DevOps"
  },
  {
    id: 11,
    name: "excalidraw/excalidraw",
    description: "Virtual whiteboard for sketching hand-drawn like diagrams",
    perfectFor: "Quick wireframes and collaborative brainstorming sessions",
    features: ["Hand-drawn style", "Real-time collab", "Export to PNG/SVG"],
    repoUrl: "https://github.com/excalidraw/excalidraw",
    demoUrl: "https://excalidraw.com",
    stars: 87600,
    language: "TypeScript",
    category: "UI"
  },
  {
    id: 12,
    name: "maybe-finance/maybe",
    description: "The OS for your personal finances built on modern tech stack",
    perfectFor: "Self-hosting your personal finance tracker",
    features: ["Investment tracking", "Net worth calc", "Synced accounts"],
    repoUrl: "https://github.com/maybe-finance/maybe",
    demoUrl: "https://maybe.co",
    stars: 34800,
    language: "Ruby",
    category: "Tools"
  }
];

const CATEGORIES = ["All", "AI/ML", "UI", "Tools", "Database", "DevOps"];

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProjects(MOCK_PROJECTS);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      <div className="scanlines" />
      <div className="noise" />

      <Header />

      <main className="main-content">
        <FilterBar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="projects-grid">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="skeleton-line w-60" />
                <div className="skeleton-line w-full" />
                <div className="skeleton-line w-80" />
              </div>
            ))
          ) : (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          )}
        </div>

        {!isLoading && filteredProjects.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">{'>'}_ </span>
            <p>No projects found matching your criteria</p>
            <button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
              Reset filters
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <span>Requested by <a href="https://twitter.com/aiob_me" target="_blank" rel="noopener noreferrer">@aiob_me</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></span>
      </footer>
    </div>
  );
}

export default App;
