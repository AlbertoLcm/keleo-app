interface ShortcutButtonProps {
  icon: React.ReactNode;
  label: string;
}

const ShortcutButton: React.FC<ShortcutButtonProps> = ({ icon, label }) => (
  <button className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl flex flex-col items-center gap-2 transition border border-white/10 hover:border-white/30 group">
    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
      {icon}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export default ShortcutButton;