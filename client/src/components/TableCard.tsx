"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronUp, ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import type { CityTotals, ProvinceTotals } from "../api/apiTypes"
import { rupiahFormatter } from "../lib/rupiahFormatter"
import CityDetailDialog from "./CityDetailDialog"

interface TableCardProps {
    data: ProvinceTotals[] | CityTotals[]
    province?: string
}

export default function TableCard({ data, province }: TableCardProps) {
    const [selectedCity, setSelectedCity] = useState<CityTotals | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const isCityData = data.length > 0 && "namaWilayah" in data[0]

    const tableData = data
        .slice()
        .sort((a, b) => {
            const nameA = "namaProvinsi" in a ? a.namaProvinsi : a.namaWilayah
            const nameB = "namaProvinsi" in b ? b.namaProvinsi : b.namaWilayah
            return nameA.localeCompare(nameB)
        })
        .map((p) => ({
            province: "namaProvinsi" in p ? p.namaProvinsi : p.namaWilayah,
            rawData: p,
            educationTypes: [
                { type: "PAUD", schools: p.jmlPaud, budget: rupiahFormatter.format(p.anggaranPaud) },
                { type: "SD", schools: p.jmlSd, budget: rupiahFormatter.format(p.anggaranSd) },
                { type: "SMP", schools: p.jmlSmp, budget: rupiahFormatter.format(p.anggaranSmp) },
                { type: "SMA", schools: p.jmlSma, budget: rupiahFormatter.format(p.anggaranSma) },
            ],
        }))

    const handleCityClick = (cityData: CityTotals) => {
        setSelectedCity(cityData)
        setDialogOpen(true)
    }

    return (
        <>
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                        {province
                            ? `Tabel Revitalisasi Sekolah Provinsi - Provinsi ${province}`
                            : "Tabel Revitalisasi Sekolah Berdasarkan Provinsi"}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Daftar jumlah sekolah yang direvitalisasi beserta anggaran
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="w-full h-65 pr-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-medium text-gray-700 w-1/4">
                                        {isCityData ? "Wilayah" : "Provinsi"}
                                    </TableHead>
                                    <TableHead className="font-medium text-gray-700 w-1/4">Bentuk Pendidikan</TableHead>
                                    <TableHead className="font-medium text-gray-700 w-1/4 text-center">Banyak Sekolah</TableHead>
                                    <TableHead className="font-medium text-gray-700 w-1/4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            Anggaran
                                            <div className="flex flex-col">
                                                <ChevronUp className="h-3 w-3 text-gray-400" />
                                                <ChevronDown className="h-3 w-3 text-gray-400" />
                                            </div>
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {tableData.map((provinceData) =>
                                    provinceData.educationTypes.map((education, idx) => (
                                        <TableRow key={`${provinceData.province}-${education.type}`} className="hover:bg-gray-50">
                                            <TableCell className="font-medium text-gray-900 w-1/4">
                                                {idx === 0 ? (
                                                    isCityData ? (
                                                        <Badge
                                                            variant="secondary"
                                                            className="cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-colors"
                                                            onClick={() => handleCityClick(provinceData.rawData as CityTotals)}
                                                        >
                                                            {provinceData.province}
                                                        </Badge>
                                                    ) : (
                                                        provinceData.province
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </TableCell>
                                            <TableCell className="text-gray-700 w-1/4">{education.type}</TableCell>
                                            <TableCell className="text-center text-gray-900 w-1/4">
                                                {education.schools.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right text-gray-900 w-1/4">{education.budget}</TableCell>
                                        </TableRow>
                                    )),
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>

            <CityDetailDialog open={dialogOpen} onOpenChange={setDialogOpen} selectedCity={selectedCity} />
        </>
    )
}
