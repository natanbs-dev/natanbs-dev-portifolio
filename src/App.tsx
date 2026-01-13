import { useState, useEffect, FormEvent } from 'react';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formResult, setFormResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const roles = ['Full Stack Developer', 'Java Developer', 'Python Developer', 'Linux Enthusiast', 'Backend Developer'];

  useEffect(() => {
    const currentRole = roles[textIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length + 1));
        if (typedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentRole.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();           // Impede reload da página
  setIsSubmitting(true);            // Mostra "Enviando..."
  setFormResult('');                // Limpa resultado anterior

  const formData = new FormData(event.currentTarget);
  formData.append('access_key', '9b9a99c8-f482-407e-ad5b-2ce3f3d57d29');
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setFormResult('success');                    // Mostra mensagem verde
      (event.target as HTMLFormElement).reset();   // Limpa o formulário
    } else {
      setFormResult('error');                      // Mostra mensagem vermelha
    }
  } catch {
    setFormResult('error');
  } finally {
    setIsSubmitting(false);                        // Remove "Enviando..."
  }
};



  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Sobre' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projetos' },
    { id: 'experience', label: 'Experiência' },
    { id: 'contact', label: 'Contato' },
  ];

  const skills = [
    { name: 'Java', level: 90, icon: 'fa-brands fa-java' },
    { name: 'Python', level: 85, icon: 'fa-brands fa-python' },
    { name: 'JavaScript', level: 80, icon: 'fa-brands fa-js' },
    { name: 'Linux', level: 88, icon: 'fa-brands fa-linux' },
    { name: 'Shell Script', level: 85, icon: 'fa-solid fa-terminal' },
    { name: 'Docker', level: 75, icon: 'fa-brands fa-docker' },
    { name: 'Git', level: 90, icon: 'fa-brands fa-git-alt' },
    { name: 'SQL', level: 82, icon: 'fa-solid fa-database' },
  ];

   const projects = [
    {
      title: 'Linux Lightweight',
      description: 'Scripts e configurações para otimização de sistemas Linux, focando em performance e redução de consumo de recursos.',
      tech: ['Linux', 'Shell Script', 'Bash', 'DevOps'],
      github: 'https://github.com/natanbs-dev/linux_lightweight',
    },
    {
      title: 'PicPay Backend Challenge',
      description: 'Solução para o desafio técnico do PicPay, implementando uma API de transferências entre usuários.',
      tech: ['Java', 'Spring Boot', 'REST API', 'H2'],
      github: 'https://github.com/natanbs-dev/PicPay-backend-challenge',
    },
    {
      title: 'Desafio Técnico Entrevista',
      description: 'Implementação de desafio técnico para processo seletivo, demonstrando boas práticas de código e arquitetura.',
      tech: ['Java', 'Clean Code', 'Design Patterns', 'Testing'],
      github: 'https://github.com/natanbs-dev/desafio_tecnico_entrevista',
    },
    {
      title: 'Teach Python',
      description: 'Repositório educacional com exemplos e exercícios para ensino de Python, desde o básico até conceitos avançados.',
      tech: ['Python', 'Educação', 'Algoritmos', 'Estrutura de Dados'],
      github: 'https://github.com/natanbs-dev/teach-python',
    },
  ];

  const experiences = [
    {
      role: 'Suporte Técnico',
      // company: 'Empresa de Tecnologia',
      period: '2020 - 2023',
      description: 'Desempenhei um papel crucial na instalação e manutenção de sistemas operacionais. \nCriação de scripts de automação, manutenção de sistemas e suporte a infraestrutura.',
    },
    {
      role: 'Desenvolvedor Trainee',
      company: 'Compass Uol',
      period: '2023 - 2024',
      description: 'Desenvolvimento de APIs RESTful, integração de sistemas e automação de processos.',
    },
    {
      role:'Freelancer',
      company: 'compass uol',
      period: '2024 - 2026',
      description:'Desenvolvimento de scripts, suporte técnico, cibersegurança, desenvolvimento de RESTful'
    },

  ];

  return (
    <div className="min-h-screen bg-black text-white font-[Poppins]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full py-4 px-[9%] bg-black/90 backdrop-blur-sm flex justify-between items-center z-50 border-b border-gray-800">
        <a href="#" className="text-3xl md:text-4xl text-[#b74b4b] font-extrabold cursor-pointer transition-transform duration-500 hover:scale-110">
          Natan<span className="text-white">.dev</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-black/95 md:bg-transparent p-4 md:p-0 gap-4 md:gap-8`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-lg md:text-xl font-medium transition-all duration-300 py-2 md:py-0 text-left border-b-2 md:border-b-3 ${
                activeSection === item.id
                  ? 'text-[#b74b4b] border-[#b74b4b]'
                  : 'text-white border-transparent hover:text-[#b74b4b] hover:border-[#b74b4b]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center gap-8 md:gap-16 px-[9%] pt-24 pb-12">
        <div className="text-center md:text-left animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Olá! Sou o <span className="text-[#b74b4b]">Natan</span>
          </h1>
          <h3 className="text-2xl md:text-4xl font-semibold my-4">
             <span className="text-[#b74b4b]">{typedText}</span>
            <span className="animate-pulse">|</span>
          </h3>
          <p className="text-base md:text-lg text-gray-400 max-w-lg mb-6">
            Backend Developer apaixonado por criar soluções robustas e escaláveis. 
            Especializado em Java, Python e automação com Shell Script no ambiente Linux.
          </p>

          <div className="flex justify-center md:justify-start gap-4 mb-8">
            <a
              href="https://www.linkedin.com/in/barbosa-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border-2 border-[#b74b4b] text-[#b74b4b] rounded-full text-xl transition-all duration-300 hover:bg-[#b74b4b] hover:text-black hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_25px_#b74b4b]"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/natanbs-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border-2 border-[#b74b4b] text-[#b74b4b] rounded-full text-xl transition-all duration-300 hover:bg-[#b74b4b] hover:text-black hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_25px_#b74b4b]"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            {/* <a
              href="bonham_nt@proton.me"
              className="w-12 h-12 flex items-center justify-center border-2 border-[#b74b4b] text-[#b74b4b] rounded-full text-xl transition-all duration-300 hover:bg-[#b74b4b] hover:text-black hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_25px_#b74b4b]"
            >
              <i className="fa-solid fa-envelope"></i>
            </a> */}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="px-8 py-3 bg-[#b74b4b] text-white rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-[#8a3939] hover:scale-105 hover:shadow-[0_0_25px_#b74b4b]"
            >
              Entre em Contato
            </a>
            <a
              href="https://github.com/natanbs-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-[#b74b4b] text-[#b74b4b] rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-[#b74b4b] hover:text-white hover:scale-105"
            >
              Ver GitHub
            </a>
          </div>
        </div>

        <div className="relative animate-float">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#b74b4b] to-[#4a1d1d] p-1">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <div className="text-8xl md:text-9xl text-[#b74b4b]">
                <i className="fa-solid fa-code"></i>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#b74b4b] rounded-full flex items-center justify-center text-2xl text-white shadow-lg">
            <i className="fa-brands fa-java"></i>
          </div>
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#2d2d2d] rounded-full flex items-center justify-center text-xl text-[#b74b4b] shadow-lg">
            <i className="fa-brands fa-python"></i>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-[9%] py-20 bg-[#0a0a0a]">
        <div className="w-full">
          {/* Título centralizado */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Sobre <span className="text-[#b74b4b]">Mim</span>
          </h2>
          
          {/* Texto principal - CENTRALIZADO NA TELA */}
          <div className="w-full flex justify-center mb-20">
            <div className="max-w-4xl text-center space-y-8 px-4">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Sou um <span className="text-[#b74b4b] font-semibold">Desenvolvedor</span> baseado no Brasil, 
                com paixão por construir sistemas robustos e escaláveis. Minha jornada na programação começou 
                com a curiosidade de entender como as coisas funcionam por baixo dos panos.
              </p>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Especializado em <span className="text-[#b74b4b] font-semibold">Java, Python e JavaScript</span>, 
                tenho experiência sólida com ambientes Linux e automação através de Shell Script. 
                Acredito que código limpo e bem documentado é a base de qualquer projeto de sucesso.
              </p>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Quando não estou programando, gosto de explorar novas tecnologias, contribuir com projetos 
                open source e compartilhar conhecimento com a comunidade dev.
              </p>
            </div>
          </div>
          {/* Cards de estatísticas e informações */}
          <div className="max-w-10xl mx-auto grid md:grid-cols-2 gap-5 items-start">
            {/* Estatísticas */}
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="bg-[#1a1a1a] px-8 py-6 rounded-xl border border-gray-800 text-center min-w-[140px] hover:border-[#b74b4b] transition-all duration-300">
                <span className="text-[#b74b4b] font-bold text-4xl block">3+</span>
                <p className="text-gray-400 text-sm mt-2">Anos de Experiência</p>
              </div>
              <div className="bg-[#1a1a1a] px-8 py-6 rounded-xl border border-gray-800 text-center min-w-[140px] hover:border-[#b74b4b] transition-all duration-300">
                <span className="text-[#b74b4b] font-bold text-4xl block">20+</span>
                <p className="text-gray-400 text-sm mt-2">Projetos Completados</p>
              </div>
              <div className="bg-[#1a1a1a] px-8 py-6 rounded-xl border border-gray-800 text-center min-w-[140px] hover:border-[#b74b4b] transition-all duration-300">
                <span className="text-[#b74b4b] font-bold text-4xl block">10+</span>
                <p className="text-gray-400 text-sm mt-2">Tecnologias Dominadas</p>
              </div>
            </div>
            {/* Informações Rápidas */}
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 hover:border-[#b74b4b] transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6 text-[#b74b4b]">Informações Rápidas</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <i className="fa-solid fa-user text-[#b74b4b] text-xl w-8"></i>
                  <div>
                    <p className="text-gray-400 text-sm">Nome</p>
                    <p className="font-medium text-lg">Natan Barbosa</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <i className="fa-solid fa-location-dot text-[#b74b4b] text-xl w-8"></i>
                  <div>
                    <p className="text-gray-400 text-sm">Localização</p>
                    <p className="font-medium text-lg">Brasil</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <i className="fa-solid fa-briefcase text-[#b74b4b] text-xl w-8"></i>
                  <div>
                    <p className="text-gray-400 text-sm">Cargo</p>
                    <p className="font-medium text-lg">Backend Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <i className="fa-solid fa-laptop-code text-[#b74b4b] text-xl w-8"></i>
                  <div>
                    <p className="text-gray-400 text-sm">Disponibilidade</p>
                    <p className="font-medium text-lg text-green-400">Disponível para projetos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center px-[9%] py-20">
        <div className="max-w-10xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Minhas <span className="text-[#b74b4b]">Skills</span>
          </h2>
          <p className="text-center text-gray-400 mb-4 max-w-12xl mx-auto">
            Tecnologias e ferramentas que utilizo no dia a dia para construir soluções eficientes.
          </p>
          
          {/* GitHub Link - Destaque */}
          <div className="text-center mb-12">
            <a
              href="https://github.com/natanbs-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#b74b4b] to-[#8a3939] text-white rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(183,75,75,0.5)]"
            >
              <i className="fa-brands fa-github text-2xl"></i>
              Veja meus projetos no GitHub
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#b74b4b] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#b74b4b]/20 rounded-lg flex items-center justify-center group-hover:bg-[#b74b4b] transition-all duration-300">
                      <i className={`${skill.icon} text-2xl text-[#b74b4b] group-hover:text-white transition-all duration-300`}></i>
                    </div>
                    <span className="text-lg font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-[#b74b4b] font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#b74b4b] to-[#d67373] h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-6 text-gray-300">Outras Tecnologias</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Spring Boot', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Wayland', 'Microsoft Azure', 'AWS', 'CI/CD', 'Kubernetes', 'kali-linux'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-full text-sm text-gray-300 hover:border-[#b74b4b] hover:text-[#b74b4b] transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center px-[9%] py-20 bg-[#0a0a0a]">
        <div className="max-w-10xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Meus <span className="text-[#b74b4b]">Projetos</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-12xl mx-auto">
            Alguns dos projetos que desenvolvi utilizando diferentes tecnologias e abordagens.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden hover:border-[#b74b4b] transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-[#b74b4b]/20 to-[#1a1a1a] flex items-center justify-center">
                  <i className="fa-solid fa-folder-open text-6xl text-[#b74b4b] group-hover:scale-110 transition-transform duration-300"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#b74b4b] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#b74b4b]/20 text-[#b74b4b] rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#b74b4b] hover:text-white transition-colors duration-300"
                  >
                    <i className="fa-brands fa-github"></i>
                    Ver no GitHub
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/natanbs-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#b74b4b] text-[#b74b4b] rounded-full text-lg font-semibold transition-all duration-300 hover:bg-[#b74b4b] hover:text-white hover:scale-105"
            >
              <i className="fa-brands fa-github text-2xl"></i>
              Ver todos os projetos no GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center px-[9%] py-20">
        <div className="max-w-1xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Minha <span className="text-[#b74b4b]">Experiência</span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#b74b4b] to-transparent"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#b74b4b] rounded-full border-4 border-black"></div>

                <div className="flex-1 ml-8 md:ml-0"></div>
                
                <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 hover:border-[#b74b4b] transition-all duration-300">
                    <span className="text-[#b74b4b] text-sm font-semibold">{exp.period}</span>
                    <h3 className="text-xl font-bold mt-2">{exp.role}</h3>
                    <p className="text-gray-400 font-medium">{exp.company}</p>
                    <p className="text-gray-300 mt-3">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mt-6">
            <h3 className="text-4xl font-bold text-center mb-4">
              <i className=" max-w-36xl mx-auto w-full fa-solid fa-graduation-cap text-[#b74b4b] mr-3"></i>
              Formação <span className="text-[#b74b4b]">Acadêmica</span>
            </h3>

            
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 max-w-xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#b74b4b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-university text-[#b74b4b] text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Análise e Desenvolvimento de Sistemas</h4>
                  <p className="text-gray-400">Estácio de Sá</p>
                  <p className="text-[#b74b4b] text-sm mt-1">2020 - 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-[9%] py-20 bg-[#0a0a0a]">
        <div className="max-w-12xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Entre em <span className="text-[#b74b4b]">Contato</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-12xl mx-auto">
            Tem um projeto em mente? Vamos conversar! Estou sempre aberto a novas oportunidades e parcerias.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Vamos criar algo incrível juntos</h3>
              
              <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-[#b74b4b] transition-all duration-300">
                <div className="w-12 h-12 bg-[#b74b4b] rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-envelope text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium">bonham_nt@proton.me</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-[#b74b4b] transition-all duration-300">
                <div className="w-12 h-12 bg-[#b74b4b] rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-location-dot text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Localização</p>
                  <p className="font-medium">Brasil</p>
                </div>
              </div>

              <a
                href="https://github.com/natanbs-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-[#b74b4b] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#b74b4b] rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-github text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">GitHub</p>
                  <p className="font-medium">github.com/natanbs-dev</p>
                </div>
              </a>

              <div className="pt-6">
                <p className="text-gray-400 mb-4">Me siga nas redes sociais:</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/natanbs-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-[#1a1a1a] border border-gray-700 text-gray-400 rounded-lg text-xl transition-all duration-300 hover:bg-[#b74b4b] hover:text-white hover:border-[#b74b4b]"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/barbosa-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-[#1a1a1a] border border-gray-700 text-gray-400 rounded-lg text-xl transition-all duration-300 hover:bg-[#b74b4b] hover:text-white hover:border-[#b74b4b]"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                 
                </div>
              </div>
            </div>

             {/* Contact Form */}
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800">
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Campos ocultos do Web3Forms */}
                <input type="hidden" name="subject" value="Nova mensagem do Portfólio!" />
                <input type="hidden" name="from_name" value="Portfólio Natan Barbosa" />
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Nome</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#b74b4b] focus:outline-none transition-colors duration-300 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#b74b4b] focus:outline-none transition-colors duration-300 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Mensagem</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Sua mensagem..."
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#b74b4b] focus:outline-none transition-colors duration-300 text-white resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#b74b4b] text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#8a3939] hover:shadow-[0_0_25px_rgba(183,75,75,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <i className="fa-solid fa-paper-plane ml-2"></i>
                    </>
                  )}
                </button>

                {/* Mensagem de sucesso */}
                {formResult === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
                    <i className="fa-solid fa-check-circle mr-2"></i>
                    Mensagem enviada com sucesso! Entrarei em contato em breve.
                  </div>
                )}

                {/* Mensagem de erro */}
                {formResult === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">
                    <i className="fa-solid fa-times-circle mr-2"></i>
                    Erro ao enviar mensagem. Tente novamente ou envie um email diretamente.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      

       {/* Footer */}
      <footer className="py-8 px-[5%] border-t border-gray-800">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2 text-gray-400 order-2 md:order-1">
            <span>Feito com</span>
            <i className="fa-solid fa-heart text-[#b74b4b] animate-pulse"></i>
            <span>e muito</span>
            <i className="fa-solid fa-mug-hot text-[#b74b4b]"></i>
          </div>
          {/*copyright no extremo direito */}
          <p className="text-gray-400 order-1 md:order-2 text-right">
            © 2026 <span className="text-[#b74b4b]">Natan Barbosa</span>. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
