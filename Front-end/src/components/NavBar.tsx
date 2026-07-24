export type NavView = "cronometro" | "servicos" | "compras";

interface NavBarProps {
  activeView: NavView;
  onSelect: (view: NavView) => void;
}

const NavBar = ({ activeView, onSelect }: NavBarProps) => {
  const links: Array<{ key: NavView; label: string }> = [
    { key: "cronometro", label: "Cronometro" },
    { key: "servicos", label: "Servicos" },
    { key: "compras", label: "Compras" },
  ];

  return (
    <div>
      <div>Montadorimetro</div>
      <div>
        {links.map((link) => (
          <button
            key={link.key}
            onClick={() => onSelect(link.key)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border:
                activeView === link.key
                  ? "2px solid #60a5fa"
                  : "1px solid transparent",
              background: activeView === link.key ? "#2563eb" : "#374151",
              color: "white",
              cursor: "pointer",
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
