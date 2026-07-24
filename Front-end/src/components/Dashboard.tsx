import Form from "./Form";
import ListaServicos from "./ListaServicos";
import type { NavView } from "./NavBar";

interface DashboardProps {
  activeView: NavView;
}

const Dashboard = ({ activeView }: DashboardProps) => {
  const renderView = () => {
    switch (activeView) {
      case "cronometro":
        return <Form />;
      case "servicos":
        return <ListaServicos />;
      case "compras":
        return <Form />;
    }
  };
  return <div>{renderView()}</div>;
};

export default Dashboard;
