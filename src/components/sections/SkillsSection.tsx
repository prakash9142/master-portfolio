import { useState, useEffect, useRef } from "react";
import { skillGroups } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";

interface CommandHelp {
  cmd: string;
  desc: string;
}

const SkillsSection = () => {
  const [history, setHistory] = useState<string[]>([
    "Initializing PKA Core Terminal v1.5.0...",
    "System check: ONLINE.",
    "Type 'help' or tap hotkeys to query modules.",
    "Type 'chat' to enter AI Assistant chatbot mode.",
    ""
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [terminalMode, setTerminalMode] = useState<"command" | "chat">("command");


  const logBufferRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll the log container buffer to bottom, NOT the browser page
  useEffect(() => {
    if (logBufferRef.current) {
      logBufferRef.current.scrollTop = logBufferRef.current.scrollHeight;
    }
  }, [history]);

  const activePrompt = terminalMode === "chat" ? "assistant@prakash:~$ " : "root@prakashkumar:~$ ";

  const commands: CommandHelp[] = [
    { cmd: "frontend", desc: "List frontend skills" },
    { cmd: "backend", desc: "List backend skills" },
    { cmd: "database", desc: "List database skills" },
    { cmd: "tools", desc: "List tooling & DevOps skills" },
    { cmd: "all", desc: "Show complete technical skills matrix" },
    { cmd: "about", desc: "Show brief developer profile bios" },
    { cmd: "contact", desc: "Get mailer & domain properties" },
    { cmd: "chat", desc: "Enter AI Chatbot Assistant mode" },
    { cmd: "matrix", desc: "Trigger simulated Matrix code stream" },
    { cmd: "clear", desc: "Clear terminal buffer screen" },
    { cmd: "help", desc: "List all command instructions" }
  ];

  // Draw a character progress bar: [████████████████░░░░]
  const drawProgressBar = (level: number, size = 10) => {
    const filledCount = Math.round((level / 100) * size);
    const emptyCount = size - filledCount;
    return "[" + "█".repeat(filledCount) + "░".repeat(emptyCount) + "]";
  };

  // Prints lines one-by-one with typewriter delay to look like computing logs
  const printSequence = async (lines: string[]) => {
    setIsTyping(true);
    for (let i = 0; i < lines.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setHistory((prev) => [...prev, lines[i]]);
    }
    setIsTyping(false);
  };

  // Chatbot response builder based on keywords and conversational small talk
  const getChatbotResponse = (query: string): string[] => {
    const q = query.toLowerCase();
    const responses: string[] = [];
    const match = (keywords: string[]) => keywords.some(k => q.includes(k));

    // Conversational Small Talk
    if (match(["hello", "hi", "hey", "greetings", "yo", "hola"])) {
      responses.push("Hi there! I am Prakash's AI shell assistant. How can I help you today?");
      responses.push("Ask me about his 'skills', 'experience', 'projects', or 'pricing'!");
    } else if (match(["how are you", "how's it going", "how's life", "how do you do"])) {
      responses.push("I am functioning at peak efficiency! My CPU is cool and my response buffer is ready.");
      responses.push("How are you doing? Let me know if you need any database logs.");
    } else if (match(["thank", "thanks", "cool", "awesome", "great", "nice"])) {
      responses.push("You're welcome! I am programmed to be as helpful as possible.");
      responses.push("Feel free to type another query or type 'exit' to return to system shell.");
    } else if (match(["who made you", "creator", "created", "developer"])) {
      responses.push("I was engineered by Prakash Kumar Arya as an interactive command-line assistant.");
      responses.push("I'm running locally in your browser memory!");
    }
    
    // Skills & Stack
    else if (match(["skill", "stack", "tech", "language", "framework", "code", "coding"])) {
      responses.push("Prakash's full stack technologies are categorized as follows:");
      responses.push("  - Frontend: React, Next.js, Tailwind CSS, TypeScript");
      responses.push("  - Backend: Node.js, Express, REST APIs");
      responses.push("  - Databases: MongoDB, PostgreSQL, Firebase");
      responses.push("  - Tools: GitHub, Figma, Vercel, Docker");
      responses.push("Which area would you like me to dump logs for? (e.g. 'show frontend')");
    }
    
    // Projects
    else if (match(["project", "portfolio", "work", "apps", "websites", "products"])) {
      responses.push("Prakash has engineered multiple live products:");
      responses.push("  - CRM tools & pharmaceutical portal backends");
      responses.push("  - Static HTML bundles with zero-dependency PHP contact mailers");
      responses.push("  - Interactive WebGL/Three.js canvases");
      responses.push("Type 'projects' to see files, or scroll down to view them!");
    }
    
    // Contact
    else if (match(["email", "contact", "gmail", "mail", "hire", "phone", "reach", "message"])) {
      responses.push("Prakash's direct email inbox is: thekriyak@gmail.com.");
      responses.push("You can also fill out the contact form below to dispatch an SMTP mail instantly.");
    }
    
    // Experience
    else if (match(["experience", "job", "work history", "avacs", "accelerator"])) {
      responses.push("Prakash was a Full Stack Engineer at AVACS Accelerator.");
      responses.push("He designed responsive React interfaces, secure backend routing controllers, and optimized asset pipelines.");
    }
    
    // Education
    else if (match(["education", "college", "degree", "university", "graduate", "study"])) {
      responses.push("Prakash holds a Bachelor of Computer Science, graduating in the Class of 2025.");
    }
    
    // Pricing
    else if (match(["pricing", "rate", "cost", "charge", "price", "freelance", "contract"])) {
      responses.push("Prakash is open for freelance projects, MVP development contracts, and full-time remote opportunities.");
      responses.push("Please send details about your project to thekriyak@gmail.com for a quote and timeline estimation.");
    }
    
    // Jokes / Easter Eggs
    else if (match(["joke", "funny", "laugh", "programming joke"])) {
      const jokes = [
        "Why do programmers wear glasses? Because they can't C#!",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "What is a programmer's favorite hangout place? Foo Bar!",
        "Why did the React component go to therapy? Because it had too many state changes!",
        "How many programmers does it take to change a lightbulb? None, that's a hardware problem!"
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      responses.push(`Here is a database joke: "${randomJoke}"`);
    } else {
      responses.push("__WEB_SEARCH_REQUIRED__");
    }

    return responses;
  };

  const handleCommand = async (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    // Track command history
    setCmdHistory((prev) => [...prev.filter((c) => c !== cmdStr), cmdStr]);
    setHistoryIndex(-1);

    let outputLines: string[] = [];
    let nextMode = terminalMode;

    // If in chat mode, check if we should auto-exit to run a system command
    if (terminalMode === "chat") {
      const isSystemCommand = ["frontend", "backend", "database", "tools", "all", "about", "contact", "matrix", "clear", "help"].includes(cleanCmd);
      if (isSystemCommand) {
        setTerminalMode("command");
        nextMode = "command";
        setHistory((prev) => [...prev, `${activePrompt}${cmdStr}`, "Exiting AI Assistant mode. Executing system command..."]);
      } else {
        setHistory((prev) => [...prev, `${activePrompt}${cmdStr}`]);
      }
    } else {
      setHistory((prev) => [...prev, `${activePrompt}${cmdStr}`]);
    }

    // CHAT MODE EXECUTION
    if (nextMode === "chat") {
      if (cleanCmd === "exit" || cleanCmd === "quit") {
        outputLines.push("Exiting AI Assistant mode. Returning to system shell.");
        setTerminalMode("command");
        await printSequence(outputLines);
        return;
      }

      // Check if user is asking to show a specific system catalog inside chat (dynamic execution!)
      const systemKeywords = ["frontend", "backend", "database", "tools", "all", "about", "contact", "matrix", "clear", "help"];
      const matchedSystemWord = systemKeywords.find(word => cleanCmd.includes(word));

      if (matchedSystemWord) {
        outputLines.push(`[AI] Processing query: Running system command '${matchedSystemWord}'...`);
        
        if (matchedSystemWord === "clear") {
          setHistory([]);
          return;
        }
        
        if (matchedSystemWord === "frontend" || matchedSystemWord === "backend" || matchedSystemWord === "database" || matchedSystemWord === "tools") {
          const targetLabel = matchedSystemWord === "tools" ? "Tools" : matchedSystemWord.charAt(0).toUpperCase() + matchedSystemWord.slice(1);
          const group = skillGroups.find((g) => g.label === targetLabel);
          if (group) {
            outputLines.push(`\n-- Loading ${group.label} competencies --`);
            group.skills.forEach((s) => {
              const bar = drawProgressBar(s.level, 12);
              outputLines.push(`  ${s.name.padEnd(14)} ${bar} ${s.level}%`);
            });
          }
        } else if (matchedSystemWord === "all") {
          outputLines.push("\n-- COMPILING ALL COMPETENCY CHUNKS --");
          skillGroups.forEach((group) => {
            outputLines.push(`\n[${group.label.toUpperCase()}]`);
            group.skills.forEach((s) => {
              const bar = drawProgressBar(s.level, 10);
              outputLines.push(`  ${s.name.padEnd(14)} ${bar} ${s.level}%`);
            });
          });
        } else if (matchedSystemWord === "about") {
          outputLines.push("\nDeveloper Bio Profile:");
          outputLines.push("=======================");
          outputLines.push("  Name:       Prakash KR. Arya");
          outputLines.push("  Education:  Bachelor of Computer Science (Grad 2025)");
          outputLines.push("  Specialty:  Full Stack Web Engineering & Interactive UIs");
        } else if (matchedSystemWord === "contact") {
          outputLines.push("\nMailer Configuration:");
          outputLines.push("======================");
          outputLines.push("  SMTP Server:  smtp.gmail.com (Port 587)");
          outputLines.push("  Recipient:    thekriyak@gmail.com");
        } else if (matchedSystemWord === "matrix") {
          outputLines.push("\nCRACKING DIGITAL MATRIX CODES:");
          for (let i = 0; i < 4; i++) {
            let str = "  ";
            for (let j = 0; j < 25; j++) {
              str += Math.random() > 0.5 ? "1" : "0";
            }
            outputLines.push(str);
          }
        } else if (matchedSystemWord === "help") {
          outputLines.push("\nAvailable Commands:");
          commands.forEach((c) => {
            outputLines.push(`  ${c.cmd.padEnd(12)} - ${c.desc}`);
          });
        }

        outputLines.push("");
        await printSequence(outputLines);
        return;
      }

      // Normal chat query
      const chatResponses = getChatbotResponse(cmdStr);
      const q = cmdStr.toLowerCase();

      // Handle local system queries (date / time)
      if (q.includes("date") || q.includes("today")) {
        const dateStr = new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        await printSequence([`[AI] Current System Date: ${dateStr}`, ""]);
        return;
      }

      if (q.includes("time") || q.includes("clock") || q.includes("hour")) {
        const timeStr = new Date().toLocaleTimeString("en-IN");
        await printSequence([`[AI] Current System Time: ${timeStr}`, ""]);
        return;
      }

      if (chatResponses.length === 1 && chatResponses[0] === "__WEB_SEARCH_REQUIRED__") {
        setHistory((prev) => [...prev, "[AI] Querying web database. Accessing Wikipedia sockets..."]);
        setIsTyping(true);
        
        // Client-side fallback #1: Wikipedia REST page summary (Fast, CORS-enabled, Zero-key!)
        try {
          const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cmdStr)}`);
          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            setIsTyping(false);
            if (wikiData.extract) {
              await printSequence([`[AI] Search Result: ${wikiData.extract}`, ""]);
              return;
            }
          }
        } catch (wikiErr) {
          console.log("Wikipedia client-side direct fetch failed:", wikiErr);
        }

        // Server-side fallback #2: Custom search proxy (DuckDuckGo scraper backend)
        try {
          const apiHost = window.location.hostname === "localhost" ? "http://localhost:5000" : "";
          const response = await fetch(`${apiHost}/api/search`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: cmdStr })
          });
          if (response.ok) {
            const data = await response.json();
            setIsTyping(false);
            if (data.success && data.answer) {
              await printSequence([`[AI] Search Result: ${data.answer}`, ""]);
              return;
            }
          }
          throw new Error("Local server search endpoint returned error");
        } catch (error) {
          console.log("Server search endpoint offline:", error);
        }

        setIsTyping(false);
        await printSequence([
          "[AI] Searched database, but could not locate a direct summary answer.",
          "Try asking about: 'skills', 'experience', 'projects', 'pricing', or 'contact'!"
        ]);
        return;
      }

      await printSequence(chatResponses);
      return;
    }

    // COMMAND MODE EXECUTION
    switch (cleanCmd) {
      case "help":
        outputLines.push("Available Commands:");
        commands.forEach((c) => {
          outputLines.push(`  ${c.cmd.padEnd(12)} - ${c.desc}`);
        });
        break;

      case "clear":
        setHistory([]);
        return;

      case "chat":
        outputLines.push("AI Assistant online. Ask me anything about Prakash!");
        outputLines.push("Type 'exit' to return to system shell command mode.");
        setTerminalMode("chat");
        break;

      case "frontend":
      case "backend":
      case "database":
      case "tools": {
        const targetLabel =
          cleanCmd === "tools"
            ? "Tools"
            : cleanCmd.charAt(0).toUpperCase() + cleanCmd.slice(1);
        const group = skillGroups.find((g) => g.label === targetLabel);

        if (group) {
          outputLines.push(`-- Initializing query for: ${group.label} --`);
          outputLines.push("Status: Connecting socket database...");
          group.skills.forEach((s) => {
            const bar = drawProgressBar(s.level, 12);
            outputLines.push(`  ${s.name.padEnd(14)} ${bar} ${s.level}%`);
          });
        } else {
          outputLines.push(`Error: Category '${cleanCmd}' not found.`);
        }
        break;
      }

      case "all":
        outputLines.push("-- COMPILING ALL COMPETENCY CHUNKS --");
        skillGroups.forEach((group) => {
          outputLines.push(`\n[${group.label.toUpperCase()}]`);
          group.skills.forEach((s) => {
            const bar = drawProgressBar(s.level, 10);
            outputLines.push(`  ${s.name.padEnd(14)} ${bar} ${s.level}%`);
          });
        });
        break;

      case "about":
        outputLines.push("Developer Bio Profile:");
        outputLines.push("=======================");
        outputLines.push("  Name:       Prakash KR. Arya");
        outputLines.push("  Education:  Bachelor of Computer Science (Grad 2025)");
        outputLines.push("  Specialty:  Full Stack Web Engineering & Interactive UIs");
        outputLines.push("  Slogan:     Building custom client engines with extreme polished details.");
        break;

      case "contact":
        outputLines.push("Mailer Configuration:");
        outputLines.push("======================");
        outputLines.push("  SMTP Server:  smtp.gmail.com (Port 587)");
        outputLines.push("  Recipient:    thekriyak@gmail.com");
        outputLines.push("  Website URL:  https://prakashkumar.info");
        outputLines.push("  Route alias:  /api/contact.php");
        break;

      case "matrix":
        outputLines.push("CRACKING DIGITAL MATRIX CODES:");
        for (let i = 0; i < 6; i++) {
          let str = "  ";
          for (let j = 0; j < 25; j++) {
            str += Math.random() > 0.5 ? "1" : "0";
          }
          outputLines.push(str);
        }
        outputLines.push("Connection secured. Core shell unlocked.");
        break;

      case "secret":
        outputLines.push("--- ENCRYPTED SECURITY LOG ---");
        outputLines.push("  [DECRYPTING...] SUCCESS.");
        outputLines.push("  Agent Antigravity: 'Pair programming session active.'");
        outputLines.push("  Prakash: 'Make the load counters count to 100!'");
        outputLines.push("  Status: Complete. Codebase optimized.");
        break;

      default:
        outputLines.push(
          `Command not found: '${cleanCmd}'. Type 'help' or type 'chat' to talk to the AI.`
        );
    }

    outputLines.push(""); // Spacing line
    await printSequence(outputLines);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;
    handleCommand(inputVal);
    setInputVal("");
  };

  // Autocomplete and Arrow command navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const match = commands.find((c) => c.cmd.startsWith(inputVal));
      if (match) {
        setInputVal(match.cmd);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < cmdHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  // Listen for FAQ AI assistant handoff parameters in URL hash
  useEffect(() => {
    const handleFAQHandoff = () => {
      if (window.location.hash.includes("?chat=")) {
        const parts = window.location.hash.split("?");
        if (parts.length > 1) {
          const params = new URLSearchParams(parts[1]);
          const query = params.get("chat");
          if (query) {
            // Switch mode
            setTerminalMode("chat");
            // Clear URL hash back to simple #skills to prevent loop
            window.location.hash = "#skills";
            // Run the chatbot command
            handleCommand(query);
            // Focus terminal input
            setTimeout(() => {
              inputRef.current?.focus();
            }, 150);
          }
        }
      }
    };
    handleFAQHandoff();
    window.addEventListener("hashchange", handleFAQHandoff);
    return () => window.removeEventListener("hashchange", handleFAQHandoff);
  }, [terminalMode]);

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto" id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Interactive Developer Terminal"
        description="Organized around frontend, backend, databases, and tools. Type commands, ask questions, or tap hotkeys to interact."
      />

      {/* Terminal Window HUD Container */}
      <div 
        className="glass-card rounded-[24px] border border-white/5 bg-[#020617]/90 shadow-2xl relative overflow-hidden flex flex-col min-h-[380px] sm:min-h-[460px] cursor-text mt-12 font-mono"
        onClick={focusTerminal}
        style={{ boxShadow: "0 10px 40px -10px rgba(45, 212, 191, 0.15)" }}
      >
        {/* Title Bar Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
          {/* Windows Dots */}
          <div className="flex gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#ef4444]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#eab308]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#22c55e]" />
          </div>
          {/* Console Name */}
          <div className="text-[10px] sm:text-xs text-white/40 tracking-wider">
            {terminalMode === "chat" ? "assistant@prakashkumar:~" : "root@prakashkumar:~"}
          </div>
          {/* Status Indicator */}
          <div>
            {isTyping ? (
              <span className="text-[8px] font-bold text-[#fbbf24] animate-pulse">
                [ PROCESSING ]
              </span>
            ) : (
              <span className="text-[8px] font-bold text-[#22c55e]">
                [ READY ]
              </span>
            )}
          </div>
        </div>

        {/* Console Log Buffer Output */}
        <div 
          ref={logBufferRef}
          className="flex-1 p-5 overflow-y-auto max-h-[320px] sm:max-h-[400px] text-xs sm:text-sm text-[#2dd4bf] space-y-1.5 scrollbar-thin select-text"
        >
          {history.map((line, index) => {
            // Style commands prompts differently
            if (line.startsWith("root@prakashkumar:~$") || line.startsWith("assistant@prakash:~$")) {
              return (
                <div key={index} className="text-white font-bold">
                  {line}
                </div>
              );
            }
            if (line.startsWith("[") || line.startsWith("--")) {
              return (
                <div key={index} className="text-[#fbbf24] font-bold">
                  {line}
                </div>
              );
            }
            if (line.startsWith("  Name:") || line.startsWith("  SMTP Server:") || line.startsWith("  [DECRYPTING...]")) {
              return (
                <div key={index} className="text-white">
                  {line}
                </div>
              );
            }
            return <div key={index}>{line}</div>;
          })}
        </div>

        {/* Command Form Input */}
        <form 
          onSubmit={handleFormSubmit}
          className="flex items-center gap-2 px-5 py-3 border-t border-white/5 bg-white/[0.01]"
        >
          <span className="text-white font-bold text-xs sm:text-sm shrink-0">{activePrompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isTyping 
                ? "system processing..." 
                : terminalMode === "chat" 
                  ? "ask about skills, pricing, projects..." 
                  : "type 'chat' or 'help'..."
            }
            disabled={isTyping}
            className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm p-0 m-0 placeholder-white/20 select-text"
          />
        </form>
      </div>

      {/* Interactive Command Hotkeys HUD */}
      <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
        {commands.map((cmd) => {
          const isChatButton = cmd.cmd === "chat";
          return (
            <button
              key={cmd.cmd}
              onClick={() => {
                if (!isTyping) {
                  handleCommand(cmd.cmd);
                }
              }}
              disabled={isTyping}
              className={`px-4 py-2.5 rounded-xl border font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 ${
                isTyping 
                  ? "opacity-50 cursor-not-allowed border-white/5 bg-white/5 text-white" 
                  : isChatButton
                    ? "bg-[#2dd4bf] border-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-[#050814] font-bold shadow-md shadow-[#2dd4bf]/15"
                    : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 text-white"
              }`}
            >
              {cmd.cmd}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
