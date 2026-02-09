import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  ComexstatRequest, 
  ComexstatResponse, 
  FilterOption,
  FilterName
} from '@/app/comexstat/types';

// Hook para buscar dados do COMEXSTAT
export function useComexstatData() {
  return useMutation({
    mutationFn: async (request: ComexstatRequest): Promise<ComexstatResponse> => {
      const response = await fetch('/api/comexstat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Falha ao consultar dados');
      }

      return response.json();
    },
  });
}

interface FiltersResponse {
  data: {
    id: FilterName;
    text: string;
  }[];
}

// Hook para buscar lista de filtros disponíveis
export function useComexstatFilters() {
  return useQuery<FiltersResponse>({
    queryKey: ['comexstat-filters'],
    queryFn: async () => {
      const response = await fetch('/api/comexstat/filters');
      if (!response.ok) {
        throw new Error('Falha ao carregar filtros');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}

interface FilterValuesResponse {
  data: FilterOption[];
}

// Hook para buscar valores de um filtro específico
export function useComexstatFilterValues(filterId: FilterName | null) {
  return useQuery<FilterValuesResponse>({
    queryKey: ['comexstat-filter-values', filterId],
    queryFn: async () => {
      if (!filterId) throw new Error('Filter ID não fornecido');
      
      const response = await fetch(`/api/comexstat/filters/${filterId}`);
      if (!response.ok) {
        throw new Error(`Falha ao carregar valores do filtro ${filterId}`);
      }
      return response.json();
    },
    enabled: !!filterId,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
}

// Hook para buscar valores de países
export function useCountries() {
  return useComexstatFilterValues('country');
}

// Hook para buscar valores de NCM
export function useNcmValues() {
  return useComexstatFilterValues('ncm');
}

// Hook para buscar valores de estados
export function useStates() {
  return useComexstatFilterValues('state');
}
