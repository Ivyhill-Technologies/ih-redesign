export function ToolTile({ tool }) {
    const IconComp = tool.icon;
    return (
        <div className="group relative bg-white min-h-[200px] overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-10 transition-opacity duration-200 group-hover:opacity-0">
                {IconComp ? (
                    <IconComp size={32} className="text-fg-3 opacity-70" />
                ) : (
                    <img src={tool.src} alt="" aria-hidden="true" className="h-8 w-auto grayscale opacity-70" />
                )}
                <span className="text-[11px] text-fg-3 font-mono tracking-[0.06em] uppercase">{tool.name}</span>
            </div>
            {tool.description && (
                <div className="absolute inset-0 flex flex-col justify-between gap-2 bg-steel-900 px-5 py-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="text-[10px] text-ivy-green-400 font-mono tracking-[0.08em] uppercase">{tool.name}</span>
                    <p className="m-0 text-[12px] leading-[1.45] text-white/85">{tool.description}</p>
                </div>
            )}
        </div>
    );
}
