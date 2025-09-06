import axios from "axios";

const BASE_URL = import.meta.env.VITE_VIACEP_URL || "https://viacep.com.br/ws";

export interface CepResponse { // padrão da API ViaCEP, português
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export class CepService {
  static async getAddress(cep: string): Promise<CepResponse | null> {
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length !== 8) {
      throw new Error("CEP deve conter 8 dígitos");
    }

    try {
      const response = await axios.get<CepResponse>(
        `${BASE_URL}/${cleanedCep}/json/`,
        {
          timeout: 5000,
          validateStatus: (status) => status === 200,
        }
      );

      if ("erro" in response.data) {
        return null;
      }

      return response.data;
    } catch {
      throw new Error("Erro ao buscar CEP. Tente novamente.");
    }
  }
}