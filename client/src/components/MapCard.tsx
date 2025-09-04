"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useState } from "react"
import {provincesCode} from "@/lib/provincesCode.ts";

export default function MapCard({selectProvinceHandler}: {
    selectProvinceHandler: (code: string) => void
}) {
    const [searchValue, setSearchValue] = useState("")


    const sortedProvinces = provincesCode.sort((a, b) => a.namaProvinsi.localeCompare(b.namaProvinsi))

    return (
        <Card className="w-full max-w-4xl mx-auto h-full">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                    Persebaran Program Revitalisasi Sekolah Nasional
                </CardTitle>
                <CardDescription className="text-gray-600">
                    Menampilkan distribusi program revitalisasi sekolah di seluruh provinsi
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Pilih Provinsi</h3>
                    <Command className="rounded-lg border shadow-md h-full">
                        <CommandInput placeholder="Cari provinsi..." value={searchValue} onValueChange={setSearchValue} />
                        <CommandList className="h-full">
                            <CommandEmpty>Tidak ada provinsi yang ditemukan</CommandEmpty>
                            <CommandGroup>
                                {sortedProvinces.map((province) => (
                                    <CommandItem
                                        key={province.kodePro}
                                        value={province.namaProvinsi}
                                        onSelect={() => {
                                            selectProvinceHandler(province.kodePro)
                                            setSearchValue("")
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span className="font-medium">{province.namaProvinsi}</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
            </CardContent>
        </Card>
    )
}
