import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Metricas.module.css";
import { percentualCancelados, resumoFinanceiro, lucroPorTipoDeEvento1, qtdPorMes, faturamentDespesaMes, tipoEventoContagem } from "../../api/api";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Metricas = () => {
  const [percentualCancelado, setPercentualCancelado] = useState(0);
  const [faturamento, setFaturamento] = useState(0);
  const [lucroPorTipoDeEvento, setLucroPorTipoDeEvento] = useState({
    labels: ["Aniversário", "Casamento", "Infantil", "Debutante", "Corporativo", "Outro"],
    datasets: [
      {
        label: "Lucro",
        data: [0, 0, 0, 0, 0, 0], 
        backgroundColor: "#a45e9e",
        borderWidth: 1,
      },
    ],
  });
  const [quantidadeDeOrcamentoEvento, setQuantidadeDeOrcamentoEvento] = useState(
    {
      labels: ["Aniversário", "Casamento", "Infantil", "Debutante", "Corporativo", "Outro"],
      datasets: [
        {
          label: "Quantidade de Orçamentos",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: "#ff77a9",
          borderWidth: 1,
        },
      ],
    }
  );
  const [quantidadeDeOrcamentoPorMes, setQuantidadeDeOrcamentoMes] = useState(
    {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Orçamentos",
        data: [94, 77, 22, 12, 45, 30], 
        backgroundColor: "#6F002C",
      },
    ],
    }
  );
  const [faturamentoDespesasMes, setFaturamentoDespesasMes] = useState({
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Faturamento",
        data: [0, 0, 0, 0, 0, 0],
        borderColor: "#ff77a9",
        backgroundColor: "rgba(255, 119, 169, 0.2)",
        tension: 0.4,
      },
      {
        label: "Despesas",
        data: [0, 0, 0, 0, 0, 0], 
        borderColor: "#a45e9e",
        backgroundColor: "rgba(164, 94, 158, 0.2)",
        tension: 0.4,
      },
    ],
  })
  const [gastos, setGastos] = useState(0);
  const [lucro, setLucro] = useState(0);

  useEffect(() => {
    const getPercentualCancelados = async () => {
      const response = await percentualCancelados();
      setPercentualCancelado(response.data);
    };
  
    const getResumoFinanceiro = async () => {
      const response = await resumoFinanceiro();
      setFaturamento(response.data.faturamentoTotal);
      setGastos(response.data.despesaTotal);
      setLucro(response.data.lucroTotal);
    };
  
    const getLucroPorTipoDeEvento = async () => {
      
      const response = await lucroPorTipoDeEvento1();
      const tiposEventos = ["Aniversário", "Casamento", "Infantil", "Debutante", "Corporativo", "Outro"];
      const lucroPorEvento = tiposEventos.map((tipo) => {
        const evento = response.data.find((item) => item.tipoEvento.toUpperCase() === tipo.toUpperCase());
        return evento ? evento.lucro : 0;
      });
      setLucroPorTipoDeEvento({
        labels: tiposEventos,
        datasets: [
          {
            label: "Lucro",
            data: lucroPorEvento,
            backgroundColor: "#a45e9e",
            borderWidth: 1,
          },
        ],
      });
    };
    const getQtdPorMes = async () => {
      const response = await qtdPorMes();
      const mesesLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      const dataOrcamentos = Array(12).fill(0); 
      response.data.forEach((item) => {
        dataOrcamentos[item.mes - 1] = item.quantidade; 
      });
      setQuantidadeDeOrcamentoMes({
        labels: mesesLabels,
        datasets: [
          {
            label: "Orçamentos",
            data: dataOrcamentos,
            backgroundColor: "#C54477",
          },
        ],
      });
    };
    const getFaturamentoDespesasMes = async () => {
      const response = await faturamentDespesaMes();
      const mesesLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      const dataFaturamento = Array(12).fill(0); 
      const dataDespesas = Array(12).fill(0); 
      response.data.forEach((item) => {
        dataFaturamento[item.mes - 1] = item.faturamento; 
        dataDespesas[item.mes - 1] = item.despesa; 
      });
      setFaturamentoDespesasMes({
        labels: mesesLabels,
        datasets: [
          {
            label: "Faturamento",
            data: dataFaturamento,
            borderColor: "#ff77a9",
            backgroundColor: "rgba(255, 119, 169, 0.2)",
            tension: 0.4,
          },
          {
            label: "Despesas",
            data: dataDespesas,
            borderColor: "#a45e9e",
            backgroundColor: "rgba(164, 94, 158, 0.2)",
            tension: 0.4,
          },
        ],
      });
    }
    const getQunatidadeOrcamentoPorEvento = async () => {
      try {
        const response = await tipoEventoContagem();
        const tiposEventos = ["Aniversário", "Casamento", "Infantil", "Debutante", "Corporativo", "Outro"];
        const quantidadePorEvento = tiposEventos.map((tipo) => {
          const evento = response.data?.find((item) => item?.nome?.toUpperCase() === tipo.toUpperCase());
          return evento ? evento.quantidade : 0;
        });
        setQuantidadeDeOrcamentoEvento({
          labels: tiposEventos,
          datasets: [
            {
              label: "Quantidade de Orçamentos",
              data: quantidadePorEvento,
              backgroundColor: "#ff77a9",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar quantidade de orçamentos por evento:", error);
      }
    };
    
    getQunatidadeOrcamentoPorEvento();
    getFaturamentoDespesasMes()
    getQtdPorMes();
    getPercentualCancelados();
    getResumoFinanceiro();
    getLucroPorTipoDeEvento();
  }, []);

  const formatarNumero = (numero) => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numero);
  };



  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };


  

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.kpis}>
        <div className={`${styles.boxKPI} ${styles.cancelamentoConversao}`}>
          <h2>Taxa de conversão de orçamento</h2>
          <div className={styles.containerBox}>
            <h1>{(100 - percentualCancelado).toFixed(2)}%</h1>
            <div className={styles.linha}></div>
            <h1 style={{ textAlign: "right" }}>{percentualCancelado.toFixed(2)}%</h1>
          </div>
          <h2 style={{ textAlign: "right" }}>Taxa de cancelamento de orçamento</h2>
        </div>
        <div className={`${styles.boxKPI} ${styles.lucroFinalizado}`}>
          <h2>Lucro por orçamentos finalizados</h2>
          <h1>R$ {formatarNumero(lucro)}</h1>
        </div>
        <div className={`${styles.boxKPI} ${styles.faturamento}`}>
          <h2>Faturamento por orçamentos confirmados</h2>
          <h1>R$ {formatarNumero(faturamento)}</h1>
        </div>
        <div className={`${styles.boxKPI} ${styles.gastos}`}>
          <h2>Gastos de eventos</h2>
          <h1>R$ {formatarNumero(gastos)}</h1>
        </div>
      </div>
      <div >
        <div className={styles.graficos}>
          <div className={styles.grafico}>
            <h2>Quantidade de Orçamentos por Tipo de Evento</h2>
            <Bar className={styles.itemGrafico} data={quantidadeDeOrcamentoEvento} options={barOptions} />
          </div>
          <div className={styles.grafico}>
            <h2>Lucro por Tipo de Evento</h2>
            <Bar data={lucroPorTipoDeEvento} className={styles.itemGrafico} options={barOptions} />
          </div>
        </div>
        <div className={styles.graficos}>
        <div className={styles.grafico}>
          <h2>Número de Orçamentos por Período</h2>
          <Bar data={quantidadeDeOrcamentoPorMes} className={styles.itemGrafico} options={barOptions} />
        </div>
        <div className={styles.grafico}>
          <h2>Faturamento e Despesas por Mês</h2>
          <Line data={faturamentoDespesasMes} options={lineOptions} className={styles.itemGrafico} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Metricas;
