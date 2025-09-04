import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {rupiahFormatter} from "../../lib/rupiahFormatter.ts";

interface TextSummarySingularCardProps {
    title: string
    count: number | undefined
    budget: number | undefined
    borderColor: string
    backgroundColor: string
    textColor: string
}

interface TextSummaryCardProps {
    AmountSMA: number | undefined
    AmountSMP: number | undefined
    AmountSD: number | undefined
    AmountPAUD: number | undefined
    BudgetSMA: number | undefined
    BudgetSMP: number | undefined
    BudgetSD: number | undefined
    BudgetPAUD: number | undefined
    province?: string

}

function TextSummarySingularCard({ title, count, budget, borderColor, backgroundColor, textColor }: TextSummarySingularCardProps) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <Card className={`border-l-4 h-20 flex justify-center rounded-sm ${borderColor} ${backgroundColor}`}>
                <CardContent >
                    <p className={`text-sm font-medium ${textColor} `}>{title}</p>
                    <p className="text-lg font-bold text-gray-900">{count}</p>
                </CardContent>
            </Card>

            <Card className={`border-l-4 h-20 flex justify-center rounded-sm  ${borderColor} ${backgroundColor}`}>
                <CardContent>
                    <p className={`text-sm font-medium ${textColor} `}>Anggaran {title}</p>
                    <p className="text-lg    font-bold text-gray-900">{rupiahFormatter.format(budget ?? 0)}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default function TextSummaryCard({AmountSMA, AmountSMP, AmountSD, AmountPAUD,BudgetSMA, BudgetSMP,BudgetPAUD, BudgetSD, province}: TextSummaryCardProps) {
    const statisticsData = [
        {
            title: "Total Revitalisasi Sekolah",
            count: (Number(AmountSMA) || 0)
                + (Number(AmountSMP) || 0)
                + (Number(AmountSD) || 0)
                + (Number(AmountPAUD) || 0),

            budget: (Number(BudgetSMA) || 0)
                + (Number(BudgetSMP) || 0)
                + (Number(BudgetSD) || 0)
                + (Number(BudgetPAUD) || 0),

            borderColor: "border-l-blue-500",
            backgroundColor: "bg-blue-50/30",
            textColor: "text-blue-600",
        },
        {
            title: "Revitalisasi Sekolah PAUD",
            count: AmountPAUD,
            budget: BudgetPAUD,
            borderColor: "border-l-green-500",
            backgroundColor: "bg-green-50/30",
            textColor: "text-green-600",
        },
        {
            title: "Revitalisasi Sekolah SD",
            count: AmountSD,
            budget: BudgetSD,
            borderColor: "border-l-orange-500",
            backgroundColor: "bg-orange-50/30",
            textColor: "text-orange-600",
        },
        {
            title: "Revitalisasi Sekolah SMP",
            count: AmountSMP,
            budget: BudgetSMP,
            borderColor: "border-l-purple-500",
            backgroundColor: "bg-purple-50/30",
            textColor: "text-purple-600",
        },
        {
            title: "Revitalisasi Sekolah SMA",
            count: AmountSMA,
            budget: BudgetSMA,
            borderColor: "border-l-red-500",
            backgroundColor: "bg-red-50/30",
            textColor: "text-red-600",
        },
    ]

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Data Ringkasan - {province?("Provinsi "+province):"Nasional"}</CardTitle>
                <CardDescription className="text-gray-600">
                    Detail alokasi anggaran untuk setiap tingkat pendidikan
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {statisticsData.map((item, index) => (
                    <TextSummarySingularCard
                        key={index}
                        title={item.title}
                        count={item.count}
                        budget={item.budget}
                        borderColor={item.borderColor}
                        backgroundColor={item.backgroundColor}
                        textColor={item.textColor}
                    />
                ))}
            </CardContent>
        </Card>
    )
}
