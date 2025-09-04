"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bar, BarChart, Line, ComposedChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import type { CityTotals } from "../api/apiTypes"
import { rupiahFormatter } from "../lib/rupiahFormatter"

interface CityDetailDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedCity: CityTotals | null
}

export default function CityDetailDialog({ open, onOpenChange, selectedCity }: CityDetailDialogProps) {
    const getChartData = (cityData: CityTotals) => [
        { name: "PAUD", schools: cityData.jmlPaud, budget: cityData.anggaranPaud },
        { name: "SD", schools: cityData.jmlSd, budget: cityData.anggaranSd },
        { name: "SMP", schools: cityData.jmlSmp, budget: cityData.anggaranSmp },
        { name: "SMA", schools: cityData.jmlSma, budget: cityData.anggaranSma },
    ]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] min-w-[70vw] overflow-hidden">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-xl font-semibold">Detail Wilayah</DialogTitle>
                            <p className="text-sm text-gray-600 mt-1">
                                Informasi Revitalisasi Sekolah di {selectedCity?.namaWilayah}
                            </p>
                        </div>
                    </div>
                </DialogHeader>
                <ScrollArea className="w-full h-[80%]">
                    {selectedCity && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-4 border rounded-sm p-2">
                                <h3 className="text-lg font-medium">Jumlah Revitalisasi Sekolah per Jenjang</h3>
                                <ChartContainer
                                    config={{
                                        schools: {
                                            label: "Jumlah Sekolah:",
                                            color: "#3b82f6",
                                        },
                                    }}
                                    className="h-[200px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={getChartData(selectedCity)}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis domain={[0, 100]} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="schools" fill="#3b82f6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>

                            <div className="space-y-4 border rounded-sm p-2">
                                <h3 className="text-lg font-medium">Total Anggaran Revitalisasi per Jenjang</h3>
                                <ChartContainer
                                    config={{
                                        budget: {
                                            label: "Anggaran",
                                            color: "#3b82f6",
                                        },
                                    }}
                                    className="h-[200px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={getChartData(selectedCity)}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" domain = {[0,200]} />
                                            <YAxis domain={[0, 1000000000]} />
                                            <ChartTooltip
                                                content={<ChartTooltipContent formatter={(value) => [rupiahFormatter.format(Number(value))]} />}
                                            />
                                            <Bar dataKey="budget" fill="#3b82f6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>

                            <div className="col-span-1 md:col-span-2 space-y-4 border rounded-sm p-2">
                                <h3 className="text-lg font-medium">Revitalisasi Sekolah dan Anggaran per Jenjang</h3>
                                <ChartContainer
                                    config={{
                                        schools: {
                                            label: "Jumlah Sekolah:",
                                            color: "#3b82f6",
                                        },
                                        budget: {
                                            label: "Anggaran",
                                            color: "#10b981",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={getChartData(selectedCity)}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis yAxisId="left" domain={[0, 100]} />
                                            <YAxis yAxisId="right" orientation="right" domain={[0, 1000000000]} />
                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent
                                                        formatter={(value, name) => [
                                                            name !== "budget" && "Jumlah Sekolah:",
                                                            name === "budget" ? rupiahFormatter.format(Number(value)) : value,
                                                        ]}
                                                    />
                                                }
                                            />
                                            <Bar yAxisId="left" dataKey="schools" fill="#3b82f6" />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="budget"
                                                stroke="#10b981"
                                                strokeWidth={3}
                                                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                                            />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
