"use client"

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type {CityTotals, ProvinceTotals} from "@/api/apiTypes.ts";

interface ChartDataProps {
    data: ProvinceTotals[] | CityTotals[] | null;
    province?:string
}


export default function BarChartCard({ data, province }: ChartDataProps) {
    const chartDataProcessed = (data ?? []).map(p => ({
        region: "namaProvinsi" in p ? p.namaProvinsi : p.namaWilayah,
        schools:
            Number(p.jmlPaud) +
            Number(p.jmlSd) +
            Number(p.jmlSmp) +
            Number(p.jmlSma),
        budget:
            Number(p.anggaranPaud) +
            Number(p.anggaranSd) +
            Number(p.anggaranSmp) +
            Number(p.anggaranSma),
    }))
        .sort((a, b) => a.region.localeCompare(b.region));

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                    Banyaknya Revitalisasi Sekolah Berdasarkan Anggaran Revitalisasi - {province ? "Provinsi " + province : "Nasional"}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                    Data revitalisasi sekolah dan anggaran per jenjang
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        schools: {
                            label: "Jumlah Sekolah",
                            color: "#ff6b35",
                        },
                        budget: {
                            label: "Anggaran",
                            color: "#3b82f6",
                        },
                    }}
                    className="h-[400px] w-full"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={chartDataProcessed}
                            margin={{ top: 20, right: 80, bottom: 60, left: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="region"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis
                                yAxisId="left"
                                orientation="left"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                domain={[0, 24]}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                domain={[0, 360000]}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                                formatter={(value, name) => [
                                    name === "schools" ? `${value} sekolah` : `Rp ${value.toLocaleString("id-ID")}`
                                ]}
                            />
                            <Bar
                                yAxisId="left"
                                dataKey="schools"
                                fill="var(--color-schools)"
                                radius={[0, 0, 0, 0]}
                                barSize={40}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="budget"
                                stroke="var(--color-budget)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-budget)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: "var(--color-budget)", strokeWidth: 2 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

