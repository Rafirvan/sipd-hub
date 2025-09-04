import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart"
import { Pie, PieChart, Legend, Cell } from "recharts";

interface PieChartCardProps {
    PAUD: number | undefined,
    SD: number | undefined,
    SMP: number | undefined,
    SMA: number | undefined,
    province?: string,
}

export default function PieChartCard({ PAUD, SD, SMP, SMA, province }: PieChartCardProps) {

    const truncateForChart = (num: number | undefined) => {
        if (!num) return 0
        return Math.round(num / 1000000)
    }

    const chartData = [
        { level: "PAUD", budget: truncateForChart(PAUD), fill: "yellow" },
        { level: "SD", budget: truncateForChart(SD), fill: "red" },
        { level: "SMP", budget: truncateForChart(SMP), fill: "blue" },
        { level: "SMA", budget: truncateForChart(SMA), fill: "gray" },
    ];

    const chartConfig = {
        budget: { label: "Budget" },
        PAUD: { label: "PAUD", color: "yellow" },
        SD: { label: "SD", color: "red" },
        SMP: { label: "SMP", color: "blue" },
        SMA: { label: "SMA", color: "gray" },
    } satisfies ChartConfig

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                    Anggaran Revitalisasi - {province ? "Provinsi " + province : "Nasional"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                    Detail alokasi anggaran untuk setiap tingkat pendidikan
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart key={province}>
                        <ChartTooltip
                            cursor={false}
                            content={({ payload }) => {
                                if (!payload || payload.length === 0) return null;
                                const { name, value } = payload[0];
                                return (
                                    <div className="bg-white p-2 rounded shadow">
                                        {name}: {value} Juta
                                    </div>
                                );
                            }}
                        />

                        <Pie
                            data={chartData}
                            dataKey="budget"
                            nameKey="level"
                            innerRadius={60}
                        >
                            {chartData.map((entry) => (
                                <Cell key={entry.level} fill={entry.fill} />
                            ))}
                        </Pie>

                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            formatter={(value: string) => value}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
