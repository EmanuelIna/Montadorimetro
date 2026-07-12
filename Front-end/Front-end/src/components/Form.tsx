const Form: React.FC = () => {
  return (
    <div>
      <input type="text" placeholder="Nome do cliente" />
      <input type="date" placeholder="Data inicio" />
      <input type="time" placeholder="Hora inicio" />
      <input type="date" placeholder="Data fim" />
      <input type="time" placeholder="Hora fim" />
      <select value="select">
        <option value="1">Verde</option>
        <option value="2">Amarela</option>
        <option value="3">Vermelha</option>
      </select>
      <button type="submit">Enviar</button>
    </div>
  );
};

export default Form;
