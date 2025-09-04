export interface SchoolTotals {
    jmlPaud: number;
    jmlSd: number;
    jmlSmp: number;
    jmlSma: number;
}

export interface BudgetTotals {
    anggaranPaud: number;
    anggaranSd: number;
    anggaranSmp: number;
    anggaranSma: number;
}


export interface NationalTotals extends SchoolTotals, BudgetTotals {}

export interface ProvinceTotals extends SchoolTotals, BudgetTotals {
    kodePro: string;
    namaWilayah: string;
    namaProvinsi: string;
}

export interface CityTotals extends SchoolTotals, BudgetTotals {
    kodePro: string;
    kodeKab: string;
    namaWilayah: string;
}
