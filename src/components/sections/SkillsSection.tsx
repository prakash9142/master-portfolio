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
        className="rounded-[20px] border border-white/[0.07] bg-[#020617]/95 shadow-2xl relative overflow-hidden flex flex-col cursor-text mt-12 font-mono"
        onClick={focusTerminal}
        style={{
          boxShadow: terminalMode === "chat"
            ? "0 0 0 1px rgba(167,139,250,0.15), 0 20px 60px -15px rgba(167,139,250,0.15)"
            : "0 0 0 1px rgba(45,212,191,0.12), 0 20px 60px -15px rgba(45,212,191,0.12)",
          transition: "box-shadow 0.5s ease",
        }}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
          }}
        />

        {/* Top glow accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
          style={{
            background: terminalMode === "chat"
              ? "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)"
              : "linear-gradient(90deg, transparent, rgba(45,212,191,0.5), transparent)",
            transition: "background 0.5s ease",
          }}
        />

        {/* Title Bar Header */}
        <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          {/* Traffic dots */}
          <div className="flex gap-2 items-center">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 hover:bg-[#ef4444] transition-colors cursor-pointer" title="close" />
            <span className="w-3 h-3 rounded-full bg-[#eab308]/80 hover:bg-[#eab308] transition-colors cursor-pointer" title="minimize" />
            <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 hover:bg-[#22c55e] transition-colors cursor-pointer" title="maximize" />
          </div>

          {/* Console path */}
          <div
            className="text-[10px] sm:text-xs tracking-wider transition-colors duration-500"
            style={{ color: terminalMode === "chat" ? "rgba(167,139,250,0.7)" : "rgba(45,212,191,0.5)" }}
          >
            {terminalMode === "chat" ? "assistant@prakashkumar:~" : "root@prakashkumar:~"}
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: isTyping ? "#fbbf24" : "#22c55e",
                boxShadow: isTyping ? "0 0 6px #fbbf24" : "0 0 6px #22c55e",
                animation: isTyping ? "pulse 1s infinite" : "none",
              }}
            />
            <span
              className="text-[9px] font-bold font-mono tracking-widest"
              style={{ color: isTyping ? "#fbbf24" : "#22c55e" }}
            >
              {isTyping ? "PROCESSING" : "READY"}
            </span>
          </div>
        </div>

        {/* Console Log Buffer Output */}
        <div
          ref={logBufferRef}
          className="relative z-10 flex-1 p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm space-y-1.5 select-text"
          style={{
            maxHeight: "360px",
            color: terminalMode === "chat" ? "#c4b5fd" : "#2dd4bf",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.1) transparent",
          }}
        >
          {history.map((line, index) => {
            if (line.startsWith("root@prakashkumar:~$") || line.startsWith("assistant@prakash:~$")) {
              return (
                <div key={index} className="text-white font-bold flex items-center gap-1">
                  <span style={{ color: terminalMode === "chat" ? "#a78bfa" : "#2dd4bf" }}>›</span>
                  <span>{line}</span>
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
                <div key={index} className="text-white/90">
                  {line}
                </div>
              );
            }
            if (line === "") {
              return <div key={index} className="h-1" />;
            }
            return (
              <div key={index} style={{ color: terminalMode === "chat" ? "rgba(196,181,253,0.75)" : "rgba(45,212,191,0.8)" }}>
                {line}
              </div>
            );
          })}
          {/* Blinking cursor at end */}
          {!isTyping && (
            <span
              className="inline-block w-2 h-3 ml-0.5 align-middle animate-pulse"
              style={{ backgroundColor: terminalMode === "chat" ? "#a78bfa" : "#2dd4bf", opacity: 0.8 }}
            />
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="relative z-10 flex items-center gap-2 px-5 py-3.5 border-t border-white/[0.06] bg-white/[0.015]"
        >
          <span
            className="font-bold text-xs sm:text-sm shrink-0 transition-colors duration-500"
            style={{ color: terminalMode === "chat" ? "#a78bfa" : "#2dd4bf" }}
          >
            {activePrompt}
          </span>
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
                  : "type 'help' or click a hotkey below..."
            }
            disabled={isTyping}
            className="flex-1 bg-transparent border-none outline-none text-white/90 text-xs sm:text-sm p-0 m-0 placeholder-white/15 select-text"
          />
          {/* Submit hint */}
          {inputVal.length > 0 && (
            <span className="text-[9px] text-white/20 font-mono shrink-0">↵ enter</span>
          )}
        </form>
      </div>

      {/* ── Premium Hotkeys HUD ── */}
      <div className="mt-5 space-y-3">
        <p className="text-center text-[9px] font-mono uppercase tracking-[0.2em] text-white/20">
          Quick Hotkeys
        </p>

        {/* Skills category row — color-coded */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { cmd: "frontend",  color: "#2dd4bf", label: "Frontend" },
            { cmd: "backend",   color: "#60a5fa", label: "Backend" },
            { cmd: "database",  color: "#a78bfa", label: "Database" },
            { cmd: "tools",     color: "#34d399", label: "Tools" },
            { cmd: "all",       color: "#f59e0b", label: "All Skills" },
          ].map(({ cmd, color, label }) => (
            <button
              key={cmd}
              onClick={() => { if (!isTyping) handleCommand(cmd); }}
              disabled={isTyping}
              className="px-3.5 py-2 rounded-xl border font-mono text-[10px] sm:text-xs tracking-wider transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              style={{
                color: isTyping ? "rgba(255,255,255,0.25)" : color,
                borderColor: isTyping ? "rgba(255,255,255,0.05)" : `${color}30`,
                backgroundColor: isTyping ? "rgba(255,255,255,0.02)" : `${color}0d`,
                boxShadow: isTyping ? "none" : `0 2px 10px ${color}0a`,
                cursor: isTyping ? "not-allowed" : "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Utility row */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {[
            { cmd: "about",   label: "About" },
            { cmd: "contact", label: "Contact" },
            { cmd: "matrix",  label: "Matrix" },
            { cmd: "clear",   label: "Clear" },
            { cmd: "help",    label: "Help" },
          ].map(({ cmd, label }) => (
            <button
              key={cmd}
              onClick={() => { if (!isTyping) handleCommand(cmd); }}
              disabled={isTyping}
              className="px-3.5 py-2 rounded-xl border font-mono text-[10px] sm:text-xs tracking-wider text-white/50 border-white/[0.07] bg-white/[0.03] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:text-white/80 hover:bg-white/[0.06] active:scale-95"
              style={{ cursor: isTyping ? "not-allowed" : "pointer", opacity: isTyping ? 0.4 : 1 }}
            >
              {label}
            </button>
          ))}

          {/* Chat — always accent colored */}
          <button
            onClick={() => { if (!isTyping) handleCommand("chat"); }}
            disabled={isTyping}
            className="px-5 py-2 rounded-xl font-mono text-[10px] sm:text-xs tracking-wider font-bold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5"
            style={{
              backgroundColor: isTyping ? "rgba(45,212,191,0.2)" : "#2dd4bf",
              color: "#050814",
              boxShadow: isTyping ? "none" : "0 4px 20px rgba(45,212,191,0.3)",
              cursor: isTyping ? "not-allowed" : "pointer",
            }}
          >
            <span>💬</span>
            <span>AI Chat</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
