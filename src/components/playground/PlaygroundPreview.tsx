import React from 'react';

interface PlaygroundPreviewProps {
  code: string;
}

const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = ({ code }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-slate-900/40">
      <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Resultado em Tempo Real</span>
      </div>
      <div className="flex-1 p-4 md:p-6 flex items-center justify-center overflow-auto">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-border/60 p-4 md:p-6 min-h-[250px] md:min-h-[300px] flex items-center justify-center">
          <iframe
            title="Playground Preview"
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8">
                  <script src="https://cdn.tailwindcss.com"></script>
                  <style>
                    body {
                      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                      padding: 1rem;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 80vh;
                      margin: 0;
                      background-color: transparent;
                    }
                  </style>
                </head>
                <body>
                  ${code}
                </body>
              </html>
            `}
            className="w-full h-[350px] border-none bg-transparent"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPreview;