import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  // State to manage visibility of additional projects
  const [showMore, setShowMore] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/projects?populate=*");
        const result = await response.json();
        console.log("API Response:", result); // Log full response to check structure

        // Check if the data is an array and has items
        if (Array.isArray(result.data)) {
          const projectData = result.data.map((item) => {
            // Ensure you have correct field names according to your Strapi model
            const title = item.title || "No Title";
            const paragraph = item.paragraph || "No Description";
            // Check if image exists, if not use a placeholder
            const imageUrl = item.image?.url || "placeholder-image-url.jpg"; // Add optional chaining to avoid errors

            return {
              title,
              description: paragraph,
              image: `http://localhost:1337${imageUrl}`, // Use full URL for the image
            };
          }).filter(Boolean); // Filter out any null values
          console.log(projectData);
          setProjects(projectData);
        } else {
          console.error("Unexpected data structure:", result.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto h-auto" style={{ backgroundColor: '#FBCFEC' }}>
      {/* Menu Bar */}
      <header className="menu-bar sticky top-0 z-50 flex items-center h-24 px-10 bg-pink-300 shadow-md">
        <div className="logo w-1/2">
          <img
            src="moch.png" // Ensure this image path is correct
            alt="Profile Logo"
            className="h-28 object-cover w-36"
          />
        </div>
        <nav className="menu w-2/3">
          <ul className="flex justify-center space-x-10 text-black text-2xl font-bold uppercase">
            <li>
              <a className="hover:text-pink-600" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-pink-600" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="hover:text-pink-600" href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a className="hover:text-pink-600" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow mb-10" id="home">
        {/* Left Box (Text) */}
        <div className="box1 w-1/2 flex flex-col justify-center pl-20">
          <h1 className="text-5xl font-bold text-gray-800">
            Hello, I'm <br />
            <span className="text-pink-400">
              <AnimatedText />
            </span>
          </h1>
          <p className="text-lg text-gray-800 mt-4">
            I'm a Full-Stack Developer in Cambodia 🇰🇭, always ready to tackle challenges and build new websites for clients.
          </p>
          <a
            href="#projects"
            className="inline-block w-36 ml-auto mt-6 bg-pink-400 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
          >
            <strong>My Projects</strong>
          </a>
        </div>

        {/* Right Box (Image) */}
        <div className="box2 w-1/2 flex justify-center items-center">
          <div className="box2-1 w-2/5 h-[420px] rounded-lg overflow-hidden mt-10">
            <img
              src="momo.jpeg" // Ensure this image path is correct
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <section className="container mx-auto p-6 bg-pink-300 rounded-lg shadow-md mb-10" id="about">
        <h2 className="text-4xl font-bold mb-4 text-pink-500 text-center">About Me</h2>

        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* Left Box (Image) */}
          <div className="box2 w-full md:w-1/2 flex justify-center items-center mb-7 md:mb-0">
            <div className="box2-1 w-2/6 h-[350px] rounded-lg overflow-hidden">
              <img
                src="girl.jpeg" // Ensure this image path is correct
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Box (Text) */}
          <div className="box1 w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left justify-center pl-0 md:pl-20">
            <p className="text-lg text-gray-800 mt-4">
              Hi! I’m <strong>Lorn Sreymoch</strong>, a Full-Stack Developer from Cambodia studying Web and Mobile App Development at SOB Margaret. I specialize in JavaScript, React.js, and Node.js, with hands-on experience in Express.js, PostgreSQL, and RESTful APIs.
            </p>
            <p className="text-lg text-gray-800 mt-4">
              I love tackling challenges and am committed to writing clean code and creating user-friendly applications. My projects range from a link shortener to my portfolio website, showcasing my skills and creativity.
            </p>
            <p className="text-lg text-gray-800 mt-4">
              In my free time, I enjoy coding tutorials and funny videos on YouTube to stay inspired. I believe in continuous learning and am excited to collaborate on innovative projects.
            </p>
          </div>
        </div>
      </section>

      {/* My Project Section */}
      <section className="container mx-auto p-6 bg-pink-300 rounded-lg shadow-md mb-10" id="projects">
        <h2 className="text-4xl font-bold mb-4 text-pink-500 text-center">My Projects</h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, showMore ? projects.length : 3).map((project, index) => (
            <div key={index} className="bg-pink-300 border border-pink-400 p-2 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <img
                src={project.image} // Replace with your project image path
                alt={`Project ${index + 1}`}
                className="w-96 h-72 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-800 text-center mb-4">{project.description}</p>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-700 transition duration-300"
          >
            {showMore ? 'Show Less' : 'See More'}
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto p-6 bg-pink-300 rounded-lg shadow-md" id="contact">
        <h2 className="text-4xl font-bold mb-4 text-pink-500 text-center">Contact Me</h2>
        <p className="text-lg mb-6">We're open for any suggestions or just to have a chat!</p>

        {/* Contact Information */}
        <div className="flex flex-col space-y-4 ">
          <div className="flex justify-between">
            <div className="flex items-start">
              <div className="icon text-2xl text-pink-600 mr-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="text">
                <h2 className="font-bold text-lg">Address</h2>
                <p>
                  <a
                    className="text-blue-500 hover:underline"
                    href="https://www.google.com/maps/place/PSE+-+Pour+un+Sourire+d'Enfant+(OBK+Campus)/@11.5367401,104.8989818,17z/data=!3m1!4b1!4m6!3m5!1s0x310951e344c7b4f:0x7389bc2d178f0ae8!8m2!3d11.5367401!4d104.9011705!16s%2Fg%2F1tfm1t_k"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PSE - Pour un Sourire d'Enfant
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="icon text-2xl text-pink-500 mr-3">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="text">
                <h2 className="font-bold text-lg">Phone</h2>
                <p className="text-gray-800">+885-70-857-113</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="icon text-2xl text-pink-500 mr-3">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="text">
                <h2 className="font-bold text-lg">Email</h2>
                <p className="text-gray-800">
                  <a
                    className="text-blue-500 hover:underline"
                    href="mailto:sreymoch.lorn@institute.pse.ngo"
                  >
                    sreymoch.lorn@institute.pse.ngo
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
          <ContactForm />
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-pink-500 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Lorn Sreymoch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const ContactForm = () => {
  // State for form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log('Form submitted:', { fullName, email, message });
    // Reset form fields
    setFullName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-1/2 p-2 border rounded-lg "
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-1/2 p-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <textarea
        placeholder="Message"
        className="w-full p-2 border rounded-lg "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="5"
      />
      <button
        type="submit"
        className="w-36 ml-auto bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
      >
        <strong>Send</strong>
      </button>
    </form>
  );
};

// Animated Text Component
const AnimatedText = () => {
  const phrases = ["Lorn Sreymoch", "A Developer", "A Full-Stack Developer"];
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      setCurrentPhrase(phrases[index]);
    }, 2000); // Change phrase every 2 seconds

    return () => clearInterval(interval);
  }, [index, phrases]);

  return <span>{currentPhrase}</span>;
};

export default Home;


