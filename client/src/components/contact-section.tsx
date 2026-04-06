import React, { useState, useEffect } from 'react';
import { personalInfo } from '@/data/personal-info';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [inView, setInView] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  // Command to display
  const commandText = 'cat contact_info.sh && ./send_message.sh';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);

          // Simulate typing command
          let currentText = '';
          let index = 0;

          const interval = setInterval(() => {
            if (index < commandText.length) {
              currentText += commandText[index];
              setTypedCommand(currentText);
              index++;
            } else {
              clearInterval(interval);

              // Show form after command is typed
              setTimeout(() => {
                setShowContactForm(true);
              }, 500);
            }
          }, 100);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend
    console.log('Form submitted:', formData);

    // Show success message with animation
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    window.location.href = `mailto:baladhithyat@gmail.com`;
  };


  return (
    <section id="contact" className="py-16 md:py-20 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Terminal-like header */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12">
          <div className="flex items-center text-white mb-2">
            <span className="terminal-text mr-2">~/portfolio $</span>
            <span className="terminal-font text-white text-lg">cd contact/</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/20 pb-2 mb-6">
            CONTACT_ME<span className="animate-blink">_</span>
          </h2>
        </div>

        {/* Terminal window */}
        <div className="border border-white/20 bg-black rounded overflow-hidden mb-8">
          {/* Terminal header */}
          <div className="border-b border-white/20 bg-white/5 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-white/60 text-xs font-mono">contact-me.sh</div>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm">
            <div className="flex mb-4">
              <span className="text-green-400 mr-2">user@portfolio:~/contact$</span>
              <span className="text-white">{typedCommand}</span>
              {typedCommand !== commandText && <span className="animate-blink">|</span>}
            </div>

            {/* Contact Information Output */}
            {typedCommand.includes('cat') && (
              <div className="mb-6 animate-fadeIn text-white/80">
                <div className="mb-4 text-xs text-white/60 border-b border-white/10 pb-2">
                  # CONTACT INFORMATION
                  <br />
                  # Use the information below to get in touch
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border border-white/10 p-3 bg-white/5">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-envelope text-green-400 mr-2"></i>
                      <span className="text-green-400 font-bold">EMAIL</span>
                    </div>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-white/90 hover:text-white hover:underline block break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>

                  <div className="border border-white/10 p-3 bg-white/5">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-phone text-green-400 mr-2"></i>
                      <span className="text-green-400 font-bold">PHONE</span>
                    </div>
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-white/90 hover:text-white hover:underline"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>

                  <div className="border border-white/10 p-3 bg-white/5">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-map-marker-alt text-green-400 mr-2"></i>
                      <span className="text-green-400 font-bold">LOCATION</span>
                    </div>
                    <span className="text-white/90">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

                <div className="mb-6 border border-white/10 p-3 bg-white/5">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-link text-green-400 mr-2"></i>
                    <span className="text-green-400 font-bold">SOCIAL</span>
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white hover:underline flex items-center"
                    >
                      <i className="fab fa-github mr-1"></i> GitHub
                    </a>
                    <a 
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white hover:underline flex items-center"
                    >
                      <i className="fab fa-linkedin mr-1"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Form Section */}
            {showContactForm && (
              <div className="animate-fadeIn">
                <div className="text-green-400 mb-4">
                  $ ./send_message.sh
                  <span className="text-white/60 ml-2">// Send me a message directly</span>
                </div>

                {/* Form success message */}
                {formSubmitted ? (
                  <div className="border border-green-400/30 bg-green-400/10 p-4 text-center">
                    <i className="fas fa-check-circle text-green-400 text-xl mb-2"></i>
                    <p className="text-green-400 font-bold">Message Sent Successfully!</p>
                    <p className="text-white/70 text-sm mt-1">I'll get back to you shortly.</p>
                    <div className="mt-3 text-xs text-white/50">
                      <span className="text-white/70">exit code:</span> 0
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 max-w-2xl mx-auto">
                    <Button
                      onClick={handleSendMessage}
                      variant="outline"
                      className="w-full border-white/50 text-white hover:bg-white hover:text-black transition-all font-mono"
                    >
                      $ send_message
                    </Button>
                  </div>
                )}

                {/* Command prompt after form */}
                <div className="flex mt-4 border-t border-white/10 pt-4">
                  <span className="text-green-400 mr-2">user@portfolio:~/contact$</span>
                  <span className="animate-blink">_</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Terminal prompt at bottom */}
        <div className="mt-6 text-center">
          <div className="inline-block border border-white/20 px-4 py-2 font-mono text-xs text-white/60">
            $ echo "Looking forward to connect!" {'>>'} /var/log/messages
          </div>
        </div>
      </div>
    </section>
  );
}