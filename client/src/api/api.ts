import axios from "axios";
import type { NationalTotals, ProvinceTotals, CityTotals } from "./apiTypes";

const BASE_URL = "http://localhost:3001";

export async function fetchNationalTotals(): Promise<NationalTotals> {
    const res = await axios.get<NationalTotals>(`${BASE_URL}/totals/national`);
    return res.data;
}

export async function fetchAllProvinces(): Promise<ProvinceTotals[]> {
    const res = await axios.get<ProvinceTotals[]>(`${BASE_URL}/totals/provinces`);
    return res.data;
}

export async function fetchProvince(kodePro: string): Promise<ProvinceTotals> {
    const res = await axios.get<ProvinceTotals>(`${BASE_URL}/totals/provinces/${kodePro}`);
    return res.data;
}

export async function fetchProvinceCities(kodePro: string): Promise<CityTotals[]> {
    const res = await axios.get<CityTotals[]>(`${BASE_URL}/totals/provinces/${kodePro}/cities`);
    return res.data;
}

export async function fetchCity(kodePro: string, kodeKab: string): Promise<CityTotals> {
    const res = await axios.get<CityTotals>(
        `${BASE_URL}/totals/provinces/${kodePro}/cities/${kodeKab}`
    );
    return res.data;
}
