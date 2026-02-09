// Tipos para a API COMEXSTAT do MDIC

export type FlowType = 'import' | 'export';

export interface ComexstatPeriod {
  from: string; // formato: "YYYY-MM"
  to: string;   // formato: "YYYY-MM"
}

export type FilterName = 
  | 'country'
  | 'state'
  | 'ncm'
  | 'ncmPosition'
  | 'ncmSubposition'
  | 'ncmSection'
  | 'ncmChapter'
  | 'economicBlock'
  | 'cuci'
  | 'cuciPosition'
  | 'cuciSection'
  | 'cgce'
  | 'cgceLevel1'
  | 'cgceLevel2'
  | 'cgceLevel3'
  | 'isic'
  | 'isicSection'
  | 'isicDivision'
  | 'isicGroup'
  | 'isicClass'
  | 'sh'
  | 'shPosition'
  | 'shSection'
  | 'shChapter'
  | 'shSubposition'
  | 'urf'
  | 'transPort'
  | 'mun'
  | 'mesoregion'
  | 'microregion'
  | 'metropolitanArea'
  | 'planningRegion'
  | 'immediateGeoRegion'
  | 'intermediaryGeoRegion';

export type MetricName = 
  | 'metricFOB'
  | 'metricKG'
  | 'metricStatistic'
  | 'metricFreight'
  | 'metricInsurance'
  | 'metricCIF';

export type DetailName = FilterName;

export interface ComexstatFilter {
  filter: FilterName;
  values: (string | number)[];
}

export interface ComexstatRequest {
  flow: FlowType;
  monthDetail: boolean;
  period: ComexstatPeriod;
  filters: ComexstatFilter[];
  details: DetailName[];
  metrics: MetricName[];
}

export interface ComexstatDataItem {
  coNcm: string;
  year: string;
  monthNumber: string;
  country: string;
  state: string;
  ncm: string;
  metricFOB: string;
  metricFreight: string;
  metricInsurance: string;
  metricCIF: string;
  metricKG: string;
  metricStatistic: string;
  [key: string]: string | number; // Para campos dinâmicos
}

export interface ComexstatResponse {
  data: {
    list: ComexstatDataItem[];
  };
  success: boolean;
  message: string | null;
  processo_info: string | null;
  language: string;
}

// Tipos para os filtros disponíveis
export interface FilterOption {
  id: number | string;
  text: string;
  noNcm?: string;
}

export interface FiltersMetadata {
  filters: {
    id: FilterName;
    text: string;
  }[];
}

// Tipos para agregações e insights
export interface AggregatedData {
  totalFOB: number;
  totalKG: number;
  totalCIF: number;
  totalFreight: number;
  totalInsurance: number;
  avgFOBPerKG: number;
  avgFreightPerKG: number;
}

export interface StateAggregation {
  state: string;
  totalFOB: number;
  totalKG: number;
  totalCIF: number;
  percentage: number;
}

export interface MonthAggregation {
  year: string;
  month: string;
  totalFOB: number;
  totalKG: number;
  totalCIF: number;
}

export interface CountryAggregation {
  country: string;
  totalFOB: number;
  totalKG: number;
  totalCIF: number;
  percentage: number;
}
