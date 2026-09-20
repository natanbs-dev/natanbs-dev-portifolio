import { useEffect, useState } from 'react';

interface TerminalLine {
  cmd: string;
  out: string;
}

const LINES: TerminalLine[] = [
  { cmd: 'whoami', out: 'natan-barbosa' },
  { cmd: 'cat stack.txt', out: 'Java [Spring Boot] · Python · JavaScript · Linux' },
  { cmd: 'uptime', out: '3+ anos de experiência, full-stack' },
  { cmd: 'projects --count', out: '20+ projetos concluídos, e, atualmente, trabalhando como dev Backend ' },
];

const TYPE_SPEED = 55;
const OUT_DELAY = 350;
const LINE_PAUSE = 600;

export function Terminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    if (lineIdx >= LINES.length) return;

    const target = LINES[lineIdx].cmd;

    if (charCount < target.length) {
      const t = window.setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED);
      return () => window.clearTimeout(t);
    }

    const t1 = window.setTimeout(() => setShowOut(true), OUT_DELAY);
    const t2 = window.setTimeout(() => {
      setShowOut(false);
      setCharCount(0);
      setLineIdx((i) => i + 1);
    }, OUT_DELAY + LINE_PAUSE);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [lineIdx, charCount]);

  return (
    <div className="terminal-window w-full max-w-xl overflow-hidden text-left font-mono text-sm md:text-base">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800 bg-[#111111]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
        <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
        <span className="ml-3 text-gray-400 text-xs md:text-sm">
          natan@portfolio: ~
        </span>
      </div>

      <div className="p-4 space-y-3 min-h-[180px]">
        {LINES.map((line, i) => {
          if (i > lineIdx) return null;

          const isCurrent = i === lineIdx;
          const shown = isCurrent
            ? line.cmd.slice(0, charCount)
            : line.cmd;
          const outVisible = isCurrent ? showOut : true;

          return (
            <div key={i} className="space-y-1">
              <p className="text-gray-200">
                <span className="text-[#b74b4b] font-semibold">$</span>{' '}
                {shown}
                {isCurrent && charCount < line.cmd.length && (
                  <span className="animate-caret text-[#b74b4b]">▊</span>
                )}
              </p>
              {outVisible && (
                <p className="text-gray-400 pl-5">{line.out}</p>
              )}
            </div>
          );
        })}

        {lineIdx >= LINES.length && (
          <p className="text-gray-200">
            <span className="text-[#b74b4b] font-semibold">$</span>
            <span className="animate-caret text-[#b74b4b] ml-1">▊</span>
          </p>
        )}
      </div>
    </div>
  );
}