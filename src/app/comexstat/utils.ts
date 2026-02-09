import { 
  ComexstatDataItem, 
  AggregatedData, 
  StateAggregation, 
  MonthAggregation,
  CountryAggregation
} from './types';

// Função auxiliar para converter string para número
const toNumber = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

// Calcula agregações totais dos dados
export function calculateTotals(data: ComexstatDataItem[]): AggregatedData {
  const totals = data.reduce(
    (acc, item) => ({
      totalFOB: acc.totalFOB + toNumber(item.metricFOB),
      totalKG: acc.totalKG + toNumber(item.metricKG),
      totalCIF: acc.totalCIF + toNumber(item.metricCIF),
      totalFreight: acc.totalFreight + toNumber(item.metricFreight),
      totalInsurance: acc.totalInsurance + toNumber(item.metricInsurance),
    }),
    { totalFOB: 0, totalKG: 0, totalCIF: 0, totalFreight: 0, totalInsurance: 0 }
  );

  return {
    ...totals,
    avgFOBPerKG: totals.totalKG > 0 ? totals.totalFOB / totals.totalKG : 0,
    avgFreightPerKG: totals.totalKG > 0 ? totals.totalFreight / totals.totalKG : 0,
  };
}

// Agrupa dados por estado
export function aggregateByState(data: ComexstatDataItem[]): StateAggregation[] {
  const stateMap = new Map<string, { totalFOB: number; totalKG: number; totalCIF: number }>();
  
  data.forEach(item => {
    const state = item.state;
    const current = stateMap.get(state) || { totalFOB: 0, totalKG: 0, totalCIF: 0 };
    
    stateMap.set(state, {
      totalFOB: current.totalFOB + toNumber(item.metricFOB),
      totalKG: current.totalKG + toNumber(item.metricKG),
      totalCIF: current.totalCIF + toNumber(item.metricCIF),
    });
  });

  const totalFOB = Array.from(stateMap.values()).reduce((sum, v) => sum + v.totalFOB, 0);
  
  return Array.from(stateMap.entries())
    .map(([state, values]) => ({
      state,
      ...values,
      percentage: totalFOB > 0 ? (values.totalFOB / totalFOB) * 100 : 0,
    }))
    .sort((a, b) => b.totalFOB - a.totalFOB);
}

// Agrupa dados por mês
export function aggregateByMonth(data: ComexstatDataItem[]): MonthAggregation[] {
  const monthMap = new Map<string, { totalFOB: number; totalKG: number; totalCIF: number }>();
  
  data.forEach(item => {
    const key = `${item.year}-${item.monthNumber}`;
    const current = monthMap.get(key) || { totalFOB: 0, totalKG: 0, totalCIF: 0 };
    
    monthMap.set(key, {
      totalFOB: current.totalFOB + toNumber(item.metricFOB),
      totalKG: current.totalKG + toNumber(item.metricKG),
      totalCIF: current.totalCIF + toNumber(item.metricCIF),
    });
  });

  return Array.from(monthMap.entries())
    .map(([key, values]) => {
      const [year, month] = key.split('-');
      return { year, month, ...values };
    })
    .sort((a, b) => {
      const dateA = `${a.year}-${a.month}`;
      const dateB = `${b.year}-${b.month}`;
      return dateA.localeCompare(dateB);
    });
}

// Agrupa dados por país
export function aggregateByCountry(data: ComexstatDataItem[]): CountryAggregation[] {
  const countryMap = new Map<string, { totalFOB: number; totalKG: number; totalCIF: number }>();
  
  data.forEach(item => {
    const country = item.country;
    const current = countryMap.get(country) || { totalFOB: 0, totalKG: 0, totalCIF: 0 };
    
    countryMap.set(country, {
      totalFOB: current.totalFOB + toNumber(item.metricFOB),
      totalKG: current.totalKG + toNumber(item.metricKG),
      totalCIF: current.totalCIF + toNumber(item.metricCIF),
    });
  });

  const totalFOB = Array.from(countryMap.values()).reduce((sum, v) => sum + v.totalFOB, 0);
  
  return Array.from(countryMap.entries())
    .map(([country, values]) => ({
      country,
      ...values,
      percentage: totalFOB > 0 ? (values.totalFOB / totalFOB) * 100 : 0,
    }))
    .sort((a, b) => b.totalFOB - a.totalFOB);
}

// Formata valores monetários em USD
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Formata valores de peso em KG
export function formatWeight(value: number): string {
//   if (value >= 1_000_000) {
//     return `${(value / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} t`;
//   }
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kg`;
}

// Formata percentual
export function formatPercentage(value: number): string {
  return `${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
}

// Obtém o nome do mês
export function getMonthName(monthNumber: string): string {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const index = parseInt(monthNumber, 10) - 1;
  return months[index] || monthNumber;
}

// Gera período padrão (último mes)
export function getDefaultPeriod(): { from: string; to: string } {
  const now = new Date();
  const to = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const from = `${oneMonthAgo.getFullYear()}-${String(oneMonthAgo.getMonth() + 1).padStart(2, '0')}`;
  
  return { from, to };
}
